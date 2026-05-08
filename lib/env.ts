const TEST_CLERK_KEY_PREFIXES = ["pk_test_", "sk_test_"] as const;
const REQUIRED_PRODUCTION_ENV_VARS = [
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "DATABASE_URL",
] as const;

function allowTestClerkKeysInProduction() {
  return process.env.ALLOW_TEST_CLERK_KEYS_IN_PRODUCTION === "true";
}

function isTestClerkKey(value: string | undefined) {
  return TEST_CLERK_KEY_PREFIXES.some((prefix) => value?.startsWith(prefix));
}

export function validateRuntimeEnv() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (process.env.npm_lifecycle_event === "build") {
    return;
  }

  const missingVars = REQUIRED_PRODUCTION_ENV_VARS.filter(
    (key) => !process.env[key],
  );

  if (missingVars.length) {
    throw new Error(
      `Missing required production environment variables: ${missingVars.join(", ")}.`,
    );
  }

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;

  if (isTestClerkKey(publishableKey) || isTestClerkKey(secretKey)) {
    if (allowTestClerkKeysInProduction()) {
      console.warn(
        "ALLOW_TEST_CLERK_KEYS_IN_PRODUCTION=true is enabled. Test Clerk keys are being allowed in production for a temporary demo deployment.",
      );
      return;
    }

    throw new Error(
      "Production Clerk deployments must use live keys. Replace pk_test_/sk_test_ with your Clerk production instance keys before deploying.",
    );
  }
}
