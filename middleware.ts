import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLanguage, languages } from "@/config/languages";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect only if the user is at the root path `/`
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url));
  }

  // Create a response object that continues the request
  const response = NextResponse.next();

  // Set a custom header for the detected language
  response.headers.set(
    "x-detected-language",
    languages.find((lang) => pathname.startsWith(`/${lang}/`)) ||
      defaultLanguage
  );

  return response;
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
