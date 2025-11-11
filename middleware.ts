import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Rutas que requieren autenticación
const protectedRoutes = ["/dashboard", "/profile", "/change-password"];

// Rutas que solo deben ser accesibles sin autenticación
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("[Middleware] Processing request:", pathname);

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

  console.log("[Middleware] User found:", user?.email || "no user");

  // 3. PROTEGER RUTAS
  // Si intenta acceder a ruta protegida SIN usuario, redirigir a login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!user) {
      console.log("[Middleware] No user for protected route, redirecting to login");
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirected", "true");
      return NextResponse.redirect(url);
    } else {
      // 3.1 VERIFICAR PROPIEDADES ANTES DE ACCEDER AL DASHBOARD
      if (pathname.startsWith("/dashboard")) {
        console.log("[Middleware] Checking properties for user:", user.email);
        
        const { data: properties, error } = await supabase
          .from("properties")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (error) {
          console.error("[Middleware] Error checking properties:", error.message);
        }

        if (!properties || properties.length === 0) {
          console.log("[Middleware] User has no properties, redirecting to onboarding");
          const url = request.nextUrl.clone();
          url.pathname = "/onboarding/properties";
          return NextResponse.redirect(url);
        }
      }

      console.log("[Middleware] User authorized for protected route:", pathname);
    }
  }

  // 4. PREVENIR RE-AUTENTICACIÓN
  // Si intenta acceder a ruta de auth ESTANDO autenticado, redirigir a dashboard
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (user) {
      console.log("[Middleware] User trying to access auth route, redirecting to dashboard");
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
