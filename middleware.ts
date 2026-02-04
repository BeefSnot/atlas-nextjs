import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSessionCookie, isValidRedirectPath, SESSION_COOKIE_NAME } from "@/lib/session";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = parseSessionCookie(sessionCookie);

  const isProtectedRoute = pathname.startsWith("/ui");
  const isLoginRoute = pathname === "/login";

  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && session) {
    const redirectParam = req.nextUrl.searchParams.get("redirectTo");
    const target = redirectParam && isValidRedirectPath(redirectParam) ? redirectParam : "/ui";
    const targetUrl = new URL(target, req.url);
    return NextResponse.redirect(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ui/:path*", "/login"],
};
