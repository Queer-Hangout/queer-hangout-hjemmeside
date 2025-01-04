import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLanguage } from "./config/languages";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect only if the user is at the root path `/`
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url));
  }

  // Allow other routes to proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: "/", // Apply only to the root route
};
