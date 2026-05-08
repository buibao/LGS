const DEFAULT_LOCAL_APP_URL = "http://localhost:3000";

function normalizeAppUrl(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  const valueWithProtocol = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    return new URL(valueWithProtocol).origin;
  } catch {
    return undefined;
  }
}

function getRuntimeOrigin(): string | undefined {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }

  return undefined;
}

export function getAppUrl(): string {
  return (
    normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL) ??
    normalizeAppUrl(process.env.NEXT_PUBLIC_VERCEL_URL) ??
    normalizeAppUrl(process.env.VERCEL_URL) ??
    getRuntimeOrigin() ??
    DEFAULT_LOCAL_APP_URL
  );
}

export function getPublicAppUrl(): string {
  return (
    normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL) ??
    normalizeAppUrl(process.env.NEXT_PUBLIC_VERCEL_URL) ??
    getRuntimeOrigin() ??
    normalizeAppUrl(process.env.VERCEL_URL) ??
    DEFAULT_LOCAL_APP_URL
  );
}
