import { NextResponse, type NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "sid"
const AUTH_PAGES = ["/login", "/register"]

/**
 * Login hanya dipakai untuk area admin.
 * Halaman portal belajar (/, /latihan, /kerjakan, /profil) terbuka untuk umum.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME)
  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/")

  if (AUTH_PAGES.includes(pathname)) {
    // Sudah login: tidak perlu buka halaman login/register lagi.
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    return NextResponse.next()
  }

  if (isAdminArea && !hasSession) {
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
