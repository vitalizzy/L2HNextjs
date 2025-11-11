import { type NextRequest, NextResponse } from "next/server";

// Rutas que requieren autenticación
const protectedRoutes = ["/dashboard", "/profile", "/change-password"];

// Rutas que solo deben ser accesibles sin autenticación
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/change-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener el token de sesión de las cookies
  const supabaseToken = request.cookies.get("sb-auth-token")?.value;

  // Si es una ruta protegida y no hay token, redirigir a login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!supabaseToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirected", "true");
      return NextResponse.redirect(url);
    }
  }

  // Si es una ruta de autenticación y hay token, redirigir a dashboard
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (supabaseToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Proteger dashboard routes
    "/dashboard/:path*",
    "/profile/:path*",
    "/change-password/:path*",
    // Auth routes
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
  ],
};
