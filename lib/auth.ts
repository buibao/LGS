import { MembershipRole } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function requireSession() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return userId;
}

export async function getCurrentWorkspace() {
  const clerkId = await requireSession();
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses[0]?.emailAddress ??
    `${clerkId}@leadops.local`;
  const name =
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
    clerkUser?.username ||
    "LeadOps User";

  const user = await db.user.upsert({
    where: { clerkId },
    update: { email, name },
    create: { clerkId, email, name },
  });

  let membership = await db.membership.findFirst({
    where: { userId: user.id },
    include: { organization: true },
    orderBy: { createdAt: "asc" },
  });

  if (!membership) {
    const existingOrg = await db.organization.findFirst({
      orderBy: { createdAt: "asc" },
    });

    const organization =
      existingOrg ??
      (await db.organization.create({
        data: {
          name: `${name.split(" ")[0] || "My"} Workspace`,
          slug: `${slugify(name)}-${Math.random().toString(36).slice(2, 7)}`,
        },
      }));

    membership = await db.membership.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: MembershipRole.OWNER,
      },
      include: { organization: true },
    });
  }

  return {
    user,
    organization: membership.organization,
    membership,
  };
}
