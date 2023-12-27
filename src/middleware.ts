import { NextRequest, NextResponse } from "next/server";

const protectedPatterns = [/^\/dashboard/, /^\/settings/]; // Regex patterns for protected routes
const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/twofactor-auth",
  "/user-verification",
  "/reset-password",
  "/forgot-password",
  "/confirmation_link",
];

const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedPatterns.some((pattern) =>
    pattern.test(pathname)
  );

  if (!token && isProtectedRoute) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (token && authRoutes.includes(pathname)) {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
};

export default middleware;
