import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { validateRuntimeEnv } from "@/lib/env";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeadOps AI",
  description: "Turn social media leads into booked appointments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  validateRuntimeEnv();

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
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
