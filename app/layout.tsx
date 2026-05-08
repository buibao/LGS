import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Be_Vietnam_Pro } from "next/font/google";
import { getLocale } from "next-intl/server";
import { validateRuntimeEnv } from "@/lib/env";
import "./globals.css";

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
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
