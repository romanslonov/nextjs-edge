import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/lucia";

export const middleware = async (request: NextRequest) => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const isLoginOrSignup = routeIsLoginOrSignup(request.nextUrl.pathname);

  if (sessionId) {
    const session = await lucia.validateSession(sessionId);

    if (session && isLoginOrSignup) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!session && !isLoginOrSignup) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } else if (!isLoginOrSignup) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

function routeIsLoginOrSignup(pathname: string) {
  return (
    pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup")
  );
}
