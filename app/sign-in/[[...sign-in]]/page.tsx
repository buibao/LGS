import { SignIn } from "@clerk/nextjs";

const DEFAULT_SIGN_IN_URL = "/sign-in";
const DEFAULT_AUTH_REDIRECT_URL = "/vi/dashboard";

export default function SignInPage() {
  const signInUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? DEFAULT_SIGN_IN_URL;
  const fallbackRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL ??
    DEFAULT_AUTH_REDIRECT_URL;
  const forceRedirectUrl =
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL ??
    fallbackRedirectUrl;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12">
      <SignIn
        path={signInUrl}
        routing="path"
        fallbackRedirectUrl={fallbackRedirectUrl}
        forceRedirectUrl={forceRedirectUrl}
      />
    </div>
  );
}
