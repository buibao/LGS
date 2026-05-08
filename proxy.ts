import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const isPublicRoute = createRouteMatcher([
  "/",
  "/(vi|en)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/capture/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  if (!isPublicRoute(req)) {
    await auth.protect();
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
});

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
