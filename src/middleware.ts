import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/login", "/about", "/notice", "/admission", "/contact"].includes(nextUrl.pathname)
  const isDashboardRoute = nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/teacher") || nextUrl.pathname.startsWith("/student") || nextUrl.pathname.startsWith("/parent")

  if (isApiAuthRoute) return null

  if (isLoggedIn && nextUrl.pathname === "/login") {
    const role = (req.auth?.user as any).role
    if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", nextUrl))
    if (role === "TEACHER") return NextResponse.redirect(new URL("/teacher", nextUrl))
    return NextResponse.redirect(new URL("/student", nextUrl))
  }

  if (!isLoggedIn && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
