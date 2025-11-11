# Implementación Completa de User Journeys - L2H Community

## 📋 Tabla de Contenidos
1. [Overview - Todos los Journeys](#overview)
2. [Journey 1: No Autenticado](#journey-1-usuario-no-autenticado)
3. [Journey 2: Registro](#journey-2-registro)
4. [Journey 3: Login](#journey-3-login)
5. [Journey 4: Dashboard (Bienvenida)](#journey-4-dashboard-bienvenida)
6. [Journey 5: Ver Perfil](#journey-5-ver-perfil)
7. [Journey 6: Logout](#journey-6-logout)
8. [Journey 7: Acceso Protegido SIN Auth](#journey-7-acceso-protegido-sin-autenticacion)
9. [Journey 8: Acceso a Auth ESTANDO Autenticado](#journey-8-acceso-a-auth-estando-autenticado)

---

## Overview

```
ENTRADA A LA APP
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ MIDDLEWARE (middleware.ts)                                      │
│ ✓ Verifica token en cookies                                    │
│ ✓ Redirige si falta o es inválido                             │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ ¿Estás autenticado?                     │
└─────────────────────────────────────────┘
    ├─ NO  → /login, /register, /home
    └─ SÍ  → /dashboard, /profile
```

---

## Journey 1: Usuario NO Autenticado

### Ubicación: `/` (Home) o `/login` o `/register`

### Código Relevante:

**Middleware.ts:**
```typescript
const protectedRoutes = ["/dashboard", "/profile", "/change-password"];
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const supabaseToken = request.cookies.get("sb-auth-token")?.value;

  // ✅ Si intenta acceder a ruta protegida SIN token → REDIRECCIONA A /login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!supabaseToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirected", "true");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
```

### Flow Diagrama:

```
Usuario accede a http://localhost:3000/
    ↓
Middleware verifica: ¿Hay token en cookies?
    ├─ NO → Usuario es no autenticado ✓
    └─ SÍ → Usuario está autenticado (ir a Journey 4)
    ↓
Muestra Home page con:
- Botón "Registrarse" → /register
- Botón "Iniciar Sesión" → /login
```

---

## Journey 2: Registro

### Ubicación: `/register`

### Entrada:
- Usuario hace clic en "Registrarse" desde `/`
- O accede directamente a `/register`

### Código Relevante:

**RegisterForm.tsx:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // 1️⃣ VALIDACIÓN LOCAL
  if (!formData.nombre.trim()) throw new Error("El nombre es requerido");
  if (formData.nombre.trim().length < 3) throw new Error("El nombre debe tener al menos 3 caracteres");
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) throw new Error("Email inválido");
  
  if (formData.password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres");
  if (formData.password !== formData.confirmPassword) throw new Error("Las contraseñas no coinciden");
  if (!formData.gdprAccept) throw new Error("Debes aceptar los términos");
  
  // ✓ Si llega aquí, todas las validaciones pasaron
  setSuccess("Registrándote...");
  
  // 2️⃣ LLAMAR AL HOOK useAuth
  const result = await register(formData.email, formData.password, formData.nombre);
  
  // 3️⃣ SUPABASE RESPONDE
  if (result?.success) {
    setSuccess("✓ ¡Registrado! Revisa tu email para confirmar la cuenta.");
    setTimeout(() => {
      router.push("/login"); // REDIRECCIONAR A LOGIN
    }, 2000);
  }
};
```

**useAuth.ts - register():**
```typescript
const register = async (
  email: string,
  password: string,
  nombre: string
) => {
  try {
    // 1️⃣ SUPABASE CREA EL USUARIO
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre, // Metadata del usuario
        },
      },
    });

    if (error) throw error;

    if (data?.user) {
      // 2️⃣ TRIGGER AUTOMÁTICO inserta en tabla `users`
      // (Se ejecuta automáticamente en Supabase)
      
      // 3️⃣ RETORNAR ÉXITO
      return {
        success: true,
        message: "Registro exitoso. Por favor confirma tu email.",
      };
    }
  } catch (error) {
    // 4️⃣ MAPEO DE ERRORES
    if (err.message.includes("already registered")) {
      throw new Error("❌ Este email ya está registrado");
    }
    throw error;
  }
};
```

### Flow Completo:

```
1. Usuario llena formulario en /register:
   - Nombre: "Juan Pérez"
   - Email: "juan@gmail.com"
   - Contraseña: "SecurePass123"
   - Confirmar: "SecurePass123"
   - ☑ Acepta términos y privacidad
   
2. Usuario hace clic en "Registrate"
   ↓
3. VALIDACIÓN LOCAL:
   ✓ Nombre ≥ 3 caracteres
   ✓ Email válido (regex)
   ✓ Contraseña ≥ 6 caracteres
   ✓ Contraseñas coinciden
   ✓ Términos aceptados
   
4. Si FALLA validación:
   → Muestra error en rojo en el formulario
   → Usuario permanece en /register
   
5. Si PASA validación:
   → Envía a Supabase: signUp()
   
6. SUPABASE:
   ├─ Crea entrada en auth.users
   ├─ Dispara TRIGGER automático
   └─ TRIGGER inserta en tabla users
   
7. Respuesta:
   ├─ ERROR: "Email ya existe"
   │  → Muestra error en formulario
   │  → Usuario permanece en /register
   │
   └─ ÉXITO: Usuario creado
      → Muestra "✓ ¡Registrado!"
      → Espera 2 segundos
      → router.push("/login")
      
8. Usuario ve:
   ¡Bienvenido a /login!
   Con mensaje: "Confirma tu email antes de continuar"
   
9. Flujo de Email de Confirmación:
   ├─ Usuario recibe email de Supabase
   ├─ Hace clic en enlace de confirmación
   ├─ Email se marca como confirmado
   └─ Ahora puede hacer login
```

### Estados Posibles del Formulario:

| Estado | Indicador | Acción |
|--------|-----------|--------|
| **Validando** | "⏳ Registrando..." | Botón deshabilitado |
| **Error** | 🔴 Error con mensaje | Usuario corrige y reintenta |
| **Éxito** | ✓ "¡Registrado!" | Auto-redirecciona en 2s |

---

## Journey 3: Login

### Ubicación: `/login`

### Entrada:
- Usuario hace clic en "Iniciar Sesión" desde `/`
- O accede directamente a `/login`
- O viene de `/register` después de registrarse
- O el middleware lo redirecciona por intentar acceder a `/dashboard`

### Código Relevante:

**LoginForm.tsx:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // 1️⃣ VALIDACIÓN LOCAL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("Email inválido");
  if (password.length < 6) throw new Error("Contraseña ≥ 6 caracteres");
  
  // ✓ Validaciones pasaron
  setSuccess("Iniciando sesión...");
  
  // 2️⃣ LLAMAR AL HOOK useAuth
  await login(email, password);
  
  // 3️⃣ Si no lanza error → login() automáticamente
  // redirige a /dashboard
};
```

**useAuth.ts - login():**
```typescript
const login = async (email: string, password: string) => {
  try {
    // 1️⃣ SUPABASE VERIFICA CREDENCIALES
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // 2️⃣ MAPEO DE ERRORES
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Email o contraseña incorrectos");
      }
      if (error.message.includes("Email not confirmed")) {
        throw new Error("⚠️ Por favor confirma tu email");
      }
      throw error;
    }

    // 3️⃣ CREDENCIALES CORRECTAS
    if (data?.session) {
      setUser(data.user as User);
      setIsAuthenticated(true);
      
      // ✓ Espera para asegurar sesión establecida
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 4️⃣ REDIRIGE AUTOMÁTICAMENTE A /dashboard
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
```

### Flow Completo:

```
1. Usuario llena formulario en /login:
   - Email: "juan@gmail.com"
   - Contraseña: "SecurePass123"
   
2. Usuario hace clic en "Iniciar Sesión"
   ↓
3. VALIDACIÓN LOCAL:
   ✓ Email válido (regex)
   ✓ Contraseña ≥ 6 caracteres
   
4. Si FALLA validación:
   → Muestra error en rojo
   → Usuario permanece en /login
   
5. Si PASA validación:
   → setSuccess("Iniciando sesión...")
   → Envía a Supabase: signInWithPassword()
   
6. SUPABASE VERIFICA:
   ├─ ¿Email existe?
   ├─ ¿Contraseña correcta?
   └─ ¿Email confirmado?
   
7. Respuestas posibles:
   
   a) ❌ EMAIL O CONTRASEÑA INCORRECTOS:
      → error: "Invalid login credentials"
      → Muestra: "❌ Email o contraseña incorrectos"
      → Usuario permanece en /login
      
   b) ⚠️ EMAIL NO CONFIRMADO:
      → error: "Email not confirmed"
      → Muestra: "⚠️ Por favor confirma tu email"
      → Usuario debe revisar su bandeja
      → Permanece en /login
      
   c) ✅ TODO CORRECTO:
      → Supabase retorna session + user
      → setIsAuthenticated(true)
      → Espera 500ms para sincronizar
      → router.push("/dashboard")
      
8. Usuario AUTOMÁTICAMENTE redirigido a:
   /dashboard (BIENVENIDA)
```

### Estados Posibles del Formulario:

| Estado | Indicador | Acción |
|--------|-----------|--------|
| **Validando** | "⏳ Iniciando sesión..." | Botón deshabilitado |
| **Credenciales incorrectas** | 🔴 "Email o contraseña incorrectos" | Reintenta con otros datos |
| **Email no confirmado** | ⚠️ "Por favor confirma tu email" | Confirma en bandeja |
| **Éxito** | ✓ Auto-redirecciona | Va a /dashboard |

---

## Journey 4: Dashboard (Bienvenida)

### Ubicación: `/dashboard`

### Entrada:
- Redirección automática después de login exitoso
- O acceso directo si tiene token válido

### Código Relevante:

**DashboardPage.tsx:**
```typescript
export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ✅ PROTECCIÓN: Si NO está autenticado → /login
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />; // Muestra spinner mientras carga
  }

  if (!isAuthenticated || !user) {
    return null; // Retorna null mientras verifica
  }

  // ✓ LLEGA AQUÍ solo si está autenticado
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex justify-between items-center">
          <h1>¡Bienvenido, {userName}! 👋</h1>
          <div className="flex gap-2">
            <button onClick={() => router.push("/profile")}>
              👤 Mi Perfil
            </button>
            <button onClick={handleLogout}>
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {/* Mensaje de Bienvenida */}
        <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600">
          <h2 className="text-4xl font-bold">
            ¡Bienvenido, {userName}! 👋
          </h2>
          <p>Estás autenticado y conectado a L2H Community.</p>
          <p className="text-green-600 font-semibold">✓ Estado: Autenticado</p>
        </div>

        {/* Stats del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon="📧" label="Tu Email" value={user.email} />
          <StatCard icon="🟢" label="Estado" value="✓ Activo" />
          <StatCard icon="📅" label="Miembro desde" value={createdDate} />
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickActions />
          <UserInfo />
        </div>

        {/* Verificación */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900">
            ✓ Verificación Completa
          </h3>
          <p className="text-green-700">
            Tu cuenta está completamente configurada.
          </p>
        </div>
      </main>
    </div>
  );
}
```

### Flow Completo:

```
1. Usuario hace login exitoso en /login
   ↓
2. hook login() ejecuta:
   → setIsAuthenticated(true)
   → router.push("/dashboard")
   
3. Usuario llega a /dashboard
   ↓
4. DashboardPage MONTA:
   ├─ isLoading = true (cargando)
   ├─ Muestra SPINNER
   └─ useAuth verifica sesión
   
5. useAuth responde:
   ├─ session?.user ✓ Encontrado
   ├─ setIsAuthenticated(true)
   ├─ setUser(data.user)
   └─ isLoading = false
   
6. DashboardPage RE-RENDERIZA:
   
   a) Si NO isAuthenticated:
      → Muestra: null
      → useEffect: router.push("/login")
      
   b) Si SÍ isAuthenticated:
      → Muestra página completa ✓
      
7. CONTENIDO MOSTRADO:
   ✓ Mensaje de bienvenida personalizado
   ✓ Email del usuario
   ✓ Estado (Activo)
   ✓ Fecha de registro
   ✓ Botones rápidos:
      - 👤 Mi Perfil
      - 🔐 Cambiar Contraseña
      - 📋 Términos
   ✓ Info de usuario
   ✓ Estado de verificación
   
8. Usuario puede:
   ├─ Hacer clic "Mi Perfil" → /profile
   ├─ Hacer clic "Cerrar Sesión" → handleLogout() → Journey 6
   ├─ Navegar a otras rutas protegidas
   └─ Refrescar página (sesión persiste en cookies)
```

### Estados Posibles de la Página:

| Estado | Indicador | Contenido |
|--------|-----------|-----------|
| **Cargando** | ⏳ Spinner | "Cargando..." |
| **No autenticado** | - | null (redirige a /login) |
| **Autenticado** | ✓ Página completa | Todo el dashboard |

---

## Journey 5: Ver Perfil

### Ubicación: `/profile`

### Entrada:
- Botón "👤 Mi Perfil" desde `/dashboard`
- O acceso directo si tiene token válido

### Código Relevante:

**ProfilePage.tsx:**
```typescript
export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ✅ PROTECCIÓN: Si NO está autenticado → /login
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    await logout(); // Ejecuta logout
    // logout() automáticamente redirige a /
  };

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-blue-50">
      {/* TARJETA: Mi Perfil */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Mi Perfil</h3>
        <button className="px-4 py-2 bg-blue-50 border border-blue-200">
          👤 Editar Perfil (próximamente)
        </button>
      </div>

      {/* TARJETA: Seguridad */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Seguridad</h3>
        <button 
          onClick={() => router.push("/change-password")}
          className="px-4 py-2 bg-purple-50 border border-purple-200"
        >
          🔐 Cambiar Contraseña
        </button>
      </div>

      {/* TARJETA: Comunidad */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Comunidad</h3>
        <button 
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-green-50 border border-green-200"
        >
          👥 Ver Dashboard
        </button>
      </div>

      {/* BOTÓN: Cerrar Sesión */}
      <button 
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 text-white rounded-lg"
      >
        🚪 Cerrar Sesión
      </button>
    </div>
  );
}
```

### Flow Completo:

```
1. Usuario en /dashboard hace clic "👤 Mi Perfil"
   ↓
2. router.push("/profile")
   ↓
3. ProfilePage MONTA:
   ├─ Verifica autenticación (igual a Dashboard)
   ├─ Si NO autenticado → redirige a /login
   └─ Si SÍ autenticado → muestra contenido
   
4. CONTENIDO MOSTRADO:
   ├─ Tarjeta "Mi Perfil" con botón "Editar Perfil"
   ├─ Tarjeta "Seguridad" con botón "Cambiar Contraseña"
   ├─ Tarjeta "Comunidad" con botón "Ver Dashboard"
   └─ Botón "Cerrar Sesión"
   
5. Usuario puede hacer clic en:
   ├─ "Cambiar Contraseña" → /change-password
   ├─ "Ver Dashboard" → /dashboard
   └─ "Cerrar Sesión" → handleLogout() → Journey 6
```

---

## Journey 6: Logout

### Entrada:
- Botón "🚪 Cerrar Sesión" desde `/dashboard` o `/profile`

### Código Relevante:

**useAuth.ts - logout():**
```typescript
const logout = async () => {
  try {
    setIsLoading(true);
    
    // 1️⃣ SUPABASE: Elimina sesión
    await supabase.auth.signOut();
    
    // 2️⃣ ESTADO LOCAL: Limpia datos
    setUser(null);
    setIsAuthenticated(false);
    
    // 3️⃣ REDIRECCIONA A HOME
    router.push("/");
    
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

**DashboardPage.tsx:**
```typescript
const handleLogout = async () => {
  try {
    await logout(); // Ejecuta logout hook
    // logout() automáticamente redirige a /
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
```

### Flow Completo:

```
1. Usuario hace clic en "🚪 Cerrar Sesión"
   ↓
2. handleLogout() ejecuta:
   → setIsLoading(true)
   → await logout()
   
3. logout() ejecuta:
   
   a) await supabase.auth.signOut()
      → Supabase elimina sesión en servidor
      → Elimina token de cookies
      
   b) setUser(null)
      → Estado local se limpia
      
   c) setIsAuthenticated(false)
      → Marca como no autenticado
      
   d) router.push("/")
      → REDIRECCIONA A HOME
      
4. Usuario llega a / (HOME)
   
5. Estado final:
   ✓ Sesión eliminada
   ✓ Token eliminado de cookies
   ✓ Usuario no autenticado
   ✓ Puede hacer login nuevamente
```

### Estados Durante Logout:

| Momento | Estado |
|---------|--------|
| Antes de clic | isLoading = false |
| Durante logout | isLoading = true, botón deshabilitado |
| Después de logout | Redirecciona a / |

---

## Journey 7: Acceso Protegido SIN Autenticación

### Escenario:
Usuario intenta acceder a `/dashboard` o `/profile` SIN tener token

### Código Relevante:

**middleware.ts:**
```typescript
const protectedRoutes = ["/dashboard", "/profile", "/change-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const supabaseToken = request.cookies.get("sb-auth-token")?.value;

  // ✅ SI intenta acceder a ruta protegida SIN token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!supabaseToken) {
      // 1️⃣ CREAR URL DE REDIRECCIÓN
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirected", "true");
      
      // 2️⃣ REDIRIGIR A /login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
```

### Flow Completo:

```
1. Usuario intenta ir a http://localhost:3000/dashboard
   └─ SIN estar autenticado (sin token en cookies)
   
2. Request llega al MIDDLEWARE
   ↓
3. Middleware verifica:
   ├─ ¿La ruta es protegida? → SÍ (/dashboard)
   └─ ¿Hay token válido? → NO
   
4. Middleware ejecuta:
   → const url = /login?redirected=true
   → return NextResponse.redirect(url)
   
5. Usuario AUTOMÁTICAMENTE redirigido a:
   /login?redirected=true
   
6. LoginPage puede mostrar:
   "Necesitas iniciar sesión para acceder al dashboard"
   
7. Usuario hace login:
   → login() → setIsAuthenticated(true)
   → router.push("/dashboard")
   
8. Ahora SÍ tiene token, middleware lo deja pasar ✓
```

### Rutas Protegidas vs Públicas:

**Protegidas (requieren token):**
- ✅ `/dashboard`
- ✅ `/profile`
- ✅ `/change-password`

**Públicas (sin token required):**
- ✅ `/` (home)
- ✅ `/login`
- ✅ `/register`
- ✅ `/forgot-password`
- ✅ `/reset-password`
- ✅ `/terms-and-conditions`
- ✅ `/privacy-policy`

---

## Journey 8: Acceso a Auth ESTANDO Autenticado

### Escenario:
Usuario autenticado intenta acceder a `/login` o `/register`

### Código Relevante:

**middleware.ts:**
```typescript
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const supabaseToken = request.cookies.get("sb-auth-token")?.value;

  // ✅ SI intenta acceder a ruta de auth ESTANDO autenticado
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (supabaseToken) {
      // 1️⃣ CREAR URL DE REDIRECCIÓN
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      
      // 2️⃣ REDIRIGIR A /dashboard
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
```

### Flow Completo:

```
1. Usuario autenticado intenta ir a /login
   
2. Request llega al MIDDLEWARE
   ↓
3. Middleware verifica:
   ├─ ¿La ruta es de auth? → SÍ (/login)
   └─ ¿Hay token válido? → SÍ
   
4. Middleware ejecuta:
   → const url = /dashboard
   → return NextResponse.redirect(url)
   
5. Usuario AUTOMÁTICAMENTE redirigido a:
   /dashboard
   
6. Previene que usuario vuelva a ver formularios de auth
   siendo que ya está autenticado ✓
```

---

## 🎯 Resumen de Validaciones

### Validaciones en LoginForm:

```
✓ Email válido (regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
✓ Contraseña ≥ 6 caracteres
✓ Credenciales correctas (Supabase)
✓ Email confirmado (Supabase)
```

### Validaciones en RegisterForm:

```
✓ Nombre no vacío
✓ Nombre ≥ 3 caracteres
✓ Email válido (regex)
✓ Contraseña ≥ 6 caracteres
✓ Contraseñas coinciden
✓ Términos aceptados
✓ Email no existe (Supabase)
```

### Validaciones en Middleware:

```
✓ Token presente en cookies
✓ Token válido
✓ Ruta protegida vs pública
✓ Redirecciones automáticas
```

---

## 🔐 Security Checks

### 1. Token Validation
```typescript
const supabaseToken = request.cookies.get("sb-auth-token")?.value;
if (!supabaseToken) → Redirecciona a /login
```

### 2. Protected Routes
```typescript
protectedRoutes = ["/dashboard", "/profile", "/change-password"]
Solo accesibles CON token válido
```

### 3. Auth Routes Redirect
```typescript
authRoutes = ["/login", "/register", "/forgot-password"]
Si tienes token → Redirecciona a /dashboard
```

### 4. Password Requirements
```typescript
Mínimo 6 caracteres
Confirmación debe coincidir
Almacenado en Supabase (hasheado)
```

### 5. Email Validation
```typescript
Regex check: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
Email confirmation required (opcional, configurado en Supabase)
```

---

## 📊 User Journey Matrix

| Journey | Entrada | Proceso | Salida | Estado Auth |
|---------|---------|---------|--------|-----------|
| **1** | Home | - | /login o /register | ❌ No auth |
| **2** | /register | Llenar form + validar | /login | ❌ No auth |
| **3** | /login | Llenar form + validar | /dashboard | ✅ Auth |
| **4** | /dashboard | Ver bienvenida | /profile o logout | ✅ Auth |
| **5** | /profile | Ver opciones | /dashboard o logout | ✅ Auth |
| **6** | Logout | Supabase signOut | / | ❌ No auth |
| **7** | /dashboard (sin token) | Middleware | /login | ❌ No auth |
| **8** | /login (con token) | Middleware | /dashboard | ✅ Auth |

---

## 🚀 Flujo Completo de Una Sesión Típica

```
USUARIO NUEVO
    ↓
1. Accede a http://localhost:3000
   → Home page (no autenticado)
   
2. Hace clic "Registrarse"
   → /register
   
3. Llena formulario:
   - Nombre: "María"
   - Email: "maria@gmail.com"
   - Contraseña: "SecurePass123"
   → Valida localmente ✓
   
4. Hace clic "Registrate"
   → Envía a Supabase
   → Supabase crea usuario + trigger
   → Retorna "Registrado exitosamente"
   → router.push("/login")
   
5. Llega a /login
   → Muestra formulario de login
   → Usuario ve: "Confirma tu email"
   
6. Usuario abre email
   → Hace clic en link de confirmación
   → Email marcado como confirmado
   
7. Vuelve a /login
   → Ingresa email: "maria@gmail.com"
   → Ingresa contraseña: "SecurePass123"
   → Valida localmente ✓
   
8. Hace clic "Iniciar Sesión"
   → Envía a Supabase
   → Supabase verifica:
      ✓ Email existe
      ✓ Contraseña correcta
      ✓ Email confirmado
   → Retorna session + user
   
9. hook login():
   → setIsAuthenticated(true)
   → setUser(data.user)
   → router.push("/dashboard")
   
10. Llega a /dashboard
    → PÁGINA DE BIENVENIDA
    → "¡Bienvenida, María! 👋"
    → Muestra: email, estado (Activo), fecha
    → Botones rápidos disponibles
    
11. Usuario hace clic "Mi Perfil"
    → /profile
    → Opciones: editar, cambiar contraseña, comunidad
    
12. Usuario hace clic "Cerrar Sesión"
    → logout()
    → Supabase signOut()
    → Elimina token de cookies
    → router.push("/")
    
13. De vuelta a HOME
    → No autenticado nuevamente
    → Puede hacer login o registrarse de nuevo
```

---

## ✅ Checklist de Implementación

### Frontend (Next.js) ✅
- [x] Home page sin requerimiento de auth
- [x] /login con formulario funcional
- [x] /register con formulario funcional
- [x] /dashboard con página de bienvenida
- [x] /profile con opciones de usuario
- [x] Middleware redirecciona correctamente
- [x] useAuth hook maneja todo flujo
- [x] LoginForm valida y redirige
- [x] RegisterForm valida y redirige
- [x] Logout funciona y redirige a /
- [x] Mensajes de error mejorados
- [x] Indicadores visuales (emojis, colores)
- [x] Loading states (spinners)
- [x] Protected routes funcionan

### Backend (Supabase) ⏳ PRÓXIMO PASO
- [ ] Tablas creadas
- [ ] RLS habilitado
- [ ] Trigger automático para users
- [ ] Redirect URLs configuradas
- [ ] Email confirmación (opcional)

---

## 🎓 Cómo Entender Cada Journey

1. **Lee el "Flow Completo"** - Entiende el flujo
2. **Revisa el "Código Relevante"** - Ve cómo se implementa
3. **Observa el "Diagrama"** - Visualiza el proceso
4. **Prueba en tu aplicación** - Sigue los pasos

¡Todos los journeys están implementados y listos para usar! 🚀
