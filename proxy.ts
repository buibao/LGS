import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/leads(.*)",
  "/campaigns(.*)",
  "/reports(.*)",
  "/settings(.*)",
  "/vi/dashboard(.*)",
  "/vi/leads(.*)",
  "/vi/campaigns(.*)",
  "/vi/reports(.*)",
  "/vi/settings(.*)",
  "/en/dashboard(.*)",
  "/en/leads(.*)",
  "/en/campaigns(.*)",
  "/en/reports(.*)",
  "/en/settings(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    const pathname = req.nextUrl.pathname;

    if (isProtectedRoute(req)) {
      await auth.protect();
    }

    if (pathname.startsWith("/api/") || pathname.startsWith("/trpc/")) {
      return NextResponse.next();
    }

    if (
      pathname === "/sign-in" ||
      pathname === "/sign-up" ||
      pathname.startsWith("/sign-in/") ||
      pathname.startsWith("/sign-up/") ||
      pathname.startsWith("/capture/")
    ) {
      return NextResponse.next();
    }

    return handleI18nRouting(req);
  },
  {
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  },
);

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)", "/(api|trpc)(.*)"],
};
