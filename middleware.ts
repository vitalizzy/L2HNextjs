import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Rutas que requieren autenticación
const protectedRoutes = ["/dashboard", "/profile", "/change-password"];

// Rutas que solo deben ser accesibles sin autenticación
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ACTUALIZAR SESIÓN DE SUPABASE Y SINCRONIZAR COOKIES
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 2. OBTENER USUARIO ACTUAL
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. PROTEGER RUTAS
  // Si intenta acceder a ruta protegida SIN usuario, redirigir a login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirected", "true");
      return NextResponse.redirect(url);
    }
  }

  // 4. PREVENIR RE-AUTENTICACIÓN
  // Si intenta acceder a ruta de auth ESTANDO autenticado, redirigir a dashboard
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
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
