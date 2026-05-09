import { SignUp } from "@clerk/nextjs";

const DEFAULT_SIGN_UP_URL = "/sign-up";
const DEFAULT_AUTH_REDIRECT_URL = "/vi/dashboard";

export default function SignUpPage() {
  const signUpUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? DEFAULT_SIGN_UP_URL;
  const fallbackRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL ??
    DEFAULT_AUTH_REDIRECT_URL;
  const forceRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL ??
    fallbackRedirectUrl;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12">
      <SignUp
        path={signUpUrl}
        routing="path"
        fallbackRedirectUrl={fallbackRedirectUrl}
        forceRedirectUrl={forceRedirectUrl}
      />
    </div>
  );
}
