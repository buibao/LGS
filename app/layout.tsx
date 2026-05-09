import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Be_Vietnam_Pro } from "next/font/google";
import { getLocale } from "next-intl/server";
import { validateRuntimeEnv } from "@/lib/env";
import "./globals.css";

const DEFAULT_SIGN_IN_URL = "/sign-in";
const DEFAULT_SIGN_UP_URL = "/sign-up";
const DEFAULT_AUTH_REDIRECT_URL = "/vi/dashboard";

const appFont = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeadOps AI",
  description: "Turn social media leads into booked appointments.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  validateRuntimeEnv();
  const locale = await getLocale();
  const signInUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? DEFAULT_SIGN_IN_URL;
  const signUpUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? DEFAULT_SIGN_UP_URL;
  const signInFallbackRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL ??
    DEFAULT_AUTH_REDIRECT_URL;
  const signUpFallbackRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL ??
    DEFAULT_AUTH_REDIRECT_URL;
  const signInForceRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL ??
    signInFallbackRedirectUrl;
  const signUpForceRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL ??
    signUpFallbackRedirectUrl;

  return (
    <html
      lang={locale}
      className={`${appFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[var(--background)] text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <ClerkProvider
          signInUrl={signInUrl}
          signUpUrl={signUpUrl}
          signInFallbackRedirectUrl={signInFallbackRedirectUrl}
          signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
          signInForceRedirectUrl={signInForceRedirectUrl}
          signUpForceRedirectUrl={signUpForceRedirectUrl}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
