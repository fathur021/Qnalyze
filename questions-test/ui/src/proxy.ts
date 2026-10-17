import { NextResponse, type NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "sid"
const AUTH_PAGES = ["/login", "/register"]

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME)
  const isAuthPage = AUTH_PAGES.includes(pathname)

  if (isAuthPage) {
    if (hasSession) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  }

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
}
