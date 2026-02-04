export const SESSION_COOKIE_NAME = "atlas_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = {
  userId: string;
  email: string;
};

export function parseSessionCookie(value?: string | null): SessionPayload | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as SessionPayload;
    if (parsed && typeof parsed.userId === "string" && typeof parsed.email === "string") {
      return parsed;
    }
    return null;
  } catch (error) {
    console.warn("Failed to parse session cookie", error);
    return null;
  }
}

export function isValidRedirectPath(path: string): boolean {
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  return true;
}

export function getSafeRedirectPath(pathValue: FormDataEntryValue | null | undefined, fallback = "/ui") {
  if (typeof pathValue === "string" && isValidRedirectPath(pathValue)) {
    return pathValue;
  }
  return fallback;
}
