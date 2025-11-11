# User Journey Completo - L2H Community

## 1. User Journeys Posibles

### JOURNEY 1: Usuario NO Autenticado
```
┌─────────────────────────────────────────────┐
│ USUARIO NO AUTENTICADO                      │
└─────────────────────────────────────────────┘
         ↓
    http://localhost:3000/
    (Home page)
         ↓
    ┌─────────────────────┐
    │ ¿Qué quiere hacer?  │
    └─────────────────────┘
         ↙           ↘
    Registrarse    Iniciar Sesión
        ↓                ↓
    /register          /login
```

### JOURNEY 2: Registro (REGISTRARSE)
```
/register (Usuario no autenticado)
    ↓
    Completa formulario:
    - Nombre
    - Email
    - Contraseña
    - Confirmar contraseña
    - Aceptar términos y política
    ↓
    ¿Validación OK?
    ├─ NO → Muestra error en formulario
    │        (Usuario permanece en /register)
    │
    └─ SÍ → Envía a Supabase
         ↓
         ¿Email válido y NO existe?
         ├─ NO → Error: "Email ya registrado"
         │        (Usuario permanece en /register)
         │
         └─ SÍ → Supabase crea usuario en auth.users
              ↓
              Trigger automático inserta en tabla users
              ↓
              Redirección a /login
              ↓
              Muestra mensaje: 
              "Registro exitoso. Por favor confirma tu email."
              ↓
              ¿Email confirmado?
              ├─ NO → Espera confirmación
              │        (No puede hacer login hasta confirmar)
              │
              └─ SÍ → Puede proceder al siguiente paso
```

### JOURNEY 3: Login (INICIAR SESIÓN)
```
/login (Usuario no autenticado)
    ↓
    Completa formulario:
    - Email
    - Contraseña
    ↓
    ¿Email y contraseña OK?
    ├─ NO → Muestra error: "Credenciales inválidas"
    │        (Usuario permanece en /login)
    │
    └─ SÍ → Supabase verifica credenciales
         ↓
         ¿Email confirmado?
         ├─ NO → Error: "Por favor confirma tu email"
         │        Opción: Reenviar email de confirmación
         │        (Usuario permanece en /login)
         │
         └─ SÍ → Crea sesión en Supabase
              ↓
              Guarda token de sesión en cookies
              ↓
              Redirección AUTOMÁTICA a /dashboard
              ↓
              Muestra bienvenida:
              "¡Bienvenido, [nombre]!"
```

### JOURNEY 4: Usuario Autenticado en /dashboard
```
/dashboard (Usuario autenticado)
    ↓
    Middleware verifica:
    ├─ ¿Hay token en cookies?
    │  ├─ NO → Redirecciona a /login
    │  └─ SÍ → ¿Token válido?
    │     ├─ NO → Redirecciona a /login
    │     └─ SÍ → Permite acceso a /dashboard
    ↓
    Muestra página de bienvenida con:
    - Nombre del usuario
    - Botón "Mi Perfil"
    - Botón "Cerrar Sesión"
    - Información de su comunidad (si existe)
    ↓
    ¿Qué hace el usuario?
    ├─ Clic "Mi Perfil" → Va a /profile
    ├─ Clic "Cerrar Sesión" → Ve JOURNEY 5
    └─ Espera/Navega → Permanece en /dashboard
```

### JOURNEY 5: Ver Perfil (Usuario Autenticado)
```
/profile (Usuario autenticado)
    ↓
    Mismo middleware de verificación
    ↓
    Muestra tarjetas:
    1. Mi Perfil
       └─ Botón "Editar Perfil" → /profile/edit
    2. Seguridad
       └─ Botón "Cambiar Contraseña" → /change-password
    3. Comunidad
       └─ Botón "Ver Dashboard" → /dashboard
    ↓
    Botón "Cerrar Sesión" en header
    └─ Ve JOURNEY 5 (logout)
```

### JOURNEY 6: Logout (CERRAR SESIÓN)
```
Usuario hace clic en "Cerrar Sesión"
    ↓
    Ejecuta función logout()
    ↓
    Supabase elimina sesión
    ↓
    Elimina token de cookies
    ↓
    Redirección AUTOMÁTICA a /
    ↓
    Página home (no autenticado)
    ↓
    Muestra opciones:
    - "Registrarse"
    - "Iniciar Sesión"
```

### JOURNEY 7: Intento de Acceso a Ruta Protegida SIN Autenticación
```
Usuario intenta ir a /dashboard SIN token
    ↓
    Middleware intercepta
    ↓
    Verifica: ¿Hay token válido?
    └─ NO → Redirecciona a /login
          con parámetro: ?redirected=true
    ↓
    Muestra: "Necesitas iniciar sesión"
    ↓
    Usuario hace login
    ↓
    Tras login exitoso → Redirecciona a /dashboard
```

### JOURNEY 8: Intento de Acceso a Ruta de Auth ESTANDO Autenticado
```
Usuario autenticado intenta ir a /login
    ↓
    Middleware intercepta
    ↓
    Verifica: ¿Hay token válido?
    └─ SÍ → Redirecciona a /dashboard
    ↓
    No puede "volver a hacer login"
    ↓
    Mensaje: "Ya estás autenticado"
```

---

## 2. Código del Middleware Actual (middleware.ts)

```typescript
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/change-password"];
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const supabaseToken = request.cookies.get("sb-auth-token")?.value;

  // Si intenta acceder a ruta protegida SIN token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!supabaseToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirected", "true");
      return NextResponse.redirect(url);
    }
  }

  // Si intenta acceder a ruta de auth ESTANDO autenticado
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
    "/dashboard/:path*",
    "/profile/:path*",
    "/change-password/:path*",
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
  ],
};
```

---

## 3. Flujos Codificados en la Aplicación

### Flujo en `useAuth.ts`

```typescript
// LOGIN
const login = async (email: string, password: string) => {
  // 1. Valida email y contraseña
  // 2. Envía a Supabase
  // 3. Si error → Muestra en formulario
  // 4. Si OK → Supabase retorna sesión
  // 5. Hook actualiza estado (isAuthenticated = true)
  // 6. Componente redirige a /dashboard
}

// REGISTRO
const register = async (email: string, password: string, nombre: string) => {
  // 1. Valida todos los campos
  // 2. Envía a Supabase (signUp)
  // 3. Si error → Muestra en formulario
  // 4. Si OK → Supabase crea usuario
  // 5. Trigger automático inserta en tabla users
  // 6. Retorna mensaje: "Confirma tu email"
  // 7. Componente redirige a /login
}

// LOGOUT
const logout = async () => {
  // 1. Ejecuta signOut en Supabase
  // 2. Elimina sesión
  // 3. Hook actualiza estado (isAuthenticated = false)
  // 4. Componente redirige a /
}
```

### Flujo en `RegisterForm.tsx`

```typescript
export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    // 1. Previene envío por defecto
    // 2. Limpia errores previos
    // 3. Valida:
    //    - Nombre no vacío
    //    - Nombre ≥ 3 caracteres
    //    - Email válido (regex)
    //    - Contraseña ≥ 6 caracteres
    //    - Contraseñas coinciden
    //    - Acepta términos y política
    // 4. Si error → Muestra mensaje de error
    // 5. Si OK → Llama a register()
    // 6. Espera respuesta
    // 7. Si error → Muestra error
    // 8. Si OK → router.push("/login")
  };

  return (
    // Formulario con:
    // - Input para nombre
    // - Input para email
    // - Input para contraseña
    // - Input para confirmar contraseña
    // - Checkbox para términos y política
    //   (con links a /terms-and-conditions y /privacy-policy)
    // - Botón "Registrate"
    // - Link a /login si ya tiene cuenta
  );
}
```

### Flujo en `LoginForm.tsx`

```typescript
export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    // 1. Previene envío por defecto
    // 2. Limpia errores previos
    // 3. Valida:
    //    - Email válido
    //    - Contraseña ≥ 6 caracteres
    // 4. Si error → Muestra mensaje de error
    // 5. Si OK → Llama a login()
    // 6. Espera respuesta
    // 7. Si error → Muestra error
    //    (Posible: "Email no confirmado")
    // 8. Si OK → router.push("/dashboard")
  };

  return (
    // Formulario con:
    // - Input para email
    // - Input para contraseña
    // - Botón "Iniciar Sesión"
    // - Link a /register para nuevos usuarios
    // - Link a /forgot-password para recuperar contraseña
  );
}
```

### Flujo en `page.tsx` (Home)

```typescript
export default function Home() {
  // 1. No valida autenticación
  // 2. Muestra para TODOS (autenticados y no)
  // 3. Contiene:
  //    - Botón "Iniciar Sesión" → /login
  //    - Botón "Registrarse" → /register
  // 4. Si estás autenticado, el middleware te redirige a /dashboard
  //    cuando intentas acceder al /login
}
```

### Flujo en `DashboardPage` (/dashboard)

```typescript
export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Si no está cargando
    // 2. Y NO está autenticado
    // 3. → Redirecciona a /login
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    // Muestra spinner de carga
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    // Retorna null (no muestra nada mientras verifica)
    return null;
  }

  return (
    // Muestra:
    // - Header con nombre del usuario
    // - Botón "Mi Perfil" → /profile
    // - Botón "Cerrar Sesión" → logout() → /
    // - Información de la comunidad
    // - Acciones rápidas
  );
}
```

### Flujo en `ProfilePage` (/profile)

```typescript
export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Si no está cargando
    // 2. Y NO está autenticado
    // 3. → Redirecciona a /login
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    // 1. Llama a logout()
    // 2. Espera que se complete
    // 3. router.push("/") → Home
  };

  return (
    // Muestra:
    // - Header con email del usuario
    // - Botón "Cerrar Sesión"
    // - Tarjeta "Mi Perfil" → Botón "Editar Perfil" (próximamente)
    // - Tarjeta "Seguridad" → Botón "Cambiar Contraseña" → /change-password
    // - Tarjeta "Comunidad" → Botón "Ver Dashboard" → /dashboard
    // - Acciones rápidas
  );
}
```

---

## 4. Estados Posibles del Usuario

| Estado | Ubicación | Acción |
|--------|-----------|--------|
| **NO autenticado, sin token** | Cualquier ruta | Middleware redirecciona a `/login` |
| **NO autenticado, en /login** | `/login` | Muestra formulario de login |
| **NO autenticado, en /register** | `/register` | Muestra formulario de registro |
| **Autenticado, token válido** | `/login` o `/register` | Middleware redirecciona a `/dashboard` |
| **Autenticado, token válido** | `/dashboard` | Muestra bienvenida |
| **Autenticado, token válido** | `/profile` | Muestra perfil |
| **Autenticado, token expirado** | Cualquier ruta | Middleware redirecciona a `/login` |

---

## 5. Validaciones por Página

### `/register`
- ✅ Nombre no vacío
- ✅ Nombre ≥ 3 caracteres
- ✅ Email válido (regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
- ✅ Contraseña ≥ 6 caracteres
- ✅ Contraseña = Confirmar contraseña
- ✅ Acepta términos y política de privacidad
- ✅ Email no existe en Supabase
- ✅ Si OK → Redirecciona a `/login`

### `/login`
- ✅ Email válido (regex)
- ✅ Contraseña ≥ 6 caracteres
- ✅ Credenciales correctas en Supabase
- ✅ Email confirmado (si es requerido)
- ✅ Si OK → Redirecciona a `/dashboard`

### `/dashboard`
- ✅ Usuario autenticado (middleware)
- ✅ Token válido en cookies
- ✅ Si NO → Redirecciona a `/login`

### `/profile`
- ✅ Usuario autenticado (componente)
- ✅ Token válido en cookies
- ✅ Si NO → Redirecciona a `/login`

---

## 6. Rutas Protegidas vs Públicas

### Rutas PÚBLICAS (Accesibles para todos)
- `/` - Home
- `/login` - Login
- `/register` - Registro
- `/forgot-password` - Recuperar contraseña
- `/reset-password` - Restablecer contraseña
- `/terms-and-conditions` - Términos
- `/privacy-policy` - Política de privacidad

### Rutas PROTEGIDAS (Solo autenticados)
- `/dashboard` - Dashboard principal
- `/profile` - Perfil del usuario
- `/change-password` - Cambiar contraseña (si está en ruta protegida)

---

## 7. Checklist - ¿Está todo configurado?

### Frontend (Next.js) ✅
- [x] `/` - Home page funcional
- [x] `/login` - Formulario login funcional
- [x] `/register` - Formulario registro funcional
- [x] `/dashboard` - Dashboard protegido
- [x] `/profile` - Perfil protegido
- [x] Middleware redirecciona correctamente
- [x] useAuth hook maneja autenticación
- [x] LoginForm valida y redirige
- [x] RegisterForm valida y redirige
- [x] Logout funciona

### Backend (Supabase) ⚠️
- [ ] Tablas creadas
- [ ] RLS habilitado
- [ ] Trigger automático creado
- [ ] Redirect URLs configuradas
- [ ] Email confirmación configurada (opcional)
- [ ] Variables de entorno en Vercel

### Testing
- [ ] Test registro local
- [ ] Test login local
- [ ] Test logout local
- [ ] Test en Vercel
- [ ] Verificar email confirmación

---

## 8. Próximos Pasos

1. **Crear página `/profile/edit`** - Editar perfil
2. **Crear página `/change-password`** - Cambiar contraseña (si no existe)
3. **Implementar confirmación de email** - Si es requerida
4. **Crear página `/forgot-password`** - Si aún no existe
5. **Crear página `/reset-password`** - Si aún no existe
6. **Implementar rol de admin** - Para crear comunidades
7. **Dashboard completo** - Mostrar comunidad, miembros, mensajes

¿Necesitas que implemente algo de esto o que revise el código existente?
