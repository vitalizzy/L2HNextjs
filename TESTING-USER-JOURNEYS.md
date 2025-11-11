# Testing Manual - User Journeys - L2H Community

## 🧪 Cómo Probar Cada User Journey Manualmente

Este documento te guía para probar cada journey en tu navegador.

---

## Prerequisites

```bash
# 1. Verificar que el servidor esté corriendo
npm run dev

# Accede a http://localhost:3000
```

---

## Journey 1: Usuario NO Autenticado ✅

### Test Case: Usuario accede a home sin autenticación

**Pasos:**
1. Abre navegador
2. Ve a `http://localhost:3000/`
3. Limpia cookies (DevTools → Application → Cookies → Delete "sb-auth-token")

**Esperado:**
- ✓ Ves la home page
- ✓ Puedes ver botones "Registrarse" e "Iniciar Sesión"
- ✓ NO hay información de usuario

**Verificación en DevTools:**
```javascript
// Console → Ejecuta:
document.cookie // Debe estar vacío o sin sb-auth-token
```

---

## Journey 2: Registro ✅

### Test Case 1: Validación Local - Campos Vacíos

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Haz clic en "Registrate" SIN llenar formulario

**Esperado:**
- ✓ Navegador valida campos requeridos
- ✓ No envía al servidor

---

### Test Case 2: Validación Local - Nombre Corto

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Llena:
   - Nombre: "Jo" (solo 2 caracteres)
   - Email: "test@gmail.com"
   - Contraseña: "TestPass123"
   - Confirmar: "TestPass123"
3. Haz clic en "Registrate"

**Esperado:**
- ✓ Muestra error: "❌ El nombre debe tener al menos 3 caracteres"
- ✓ Formulario permanece en la misma página
- ✓ Los datos se mantienen

---

### Test Case 3: Validación Local - Email Inválido

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Llena:
   - Nombre: "Juan Pérez"
   - Email: "notanemail" (sin @)
   - Contraseña: "TestPass123"
   - Confirmar: "TestPass123"
3. Haz clic en "Registrate"

**Esperado:**
- ✓ Muestra error: "❌ Email inválido"
- ✓ Formulario permanece en la misma página

---

### Test Case 4: Validación Local - Contraseña Corta

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Llena:
   - Nombre: "Juan Pérez"
   - Email: "juan@gmail.com"
   - Contraseña: "123" (solo 3 caracteres)
   - Confirmar: "123"
3. Haz clic en "Registrate"

**Esperado:**
- ✓ Muestra error: "❌ La contraseña debe tener al menos 6 caracteres"
- ✓ Formulario permanece en la misma página

---

### Test Case 5: Validación Local - Contraseñas No Coinciden

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Llena:
   - Nombre: "Juan Pérez"
   - Email: "juan@gmail.com"
   - Contraseña: "TestPass123"
   - Confirmar: "DifferentPass456"
3. Haz clic en "Registrate"

**Esperado:**
- ✓ Muestra error: "❌ Las contraseñas no coinciden"
- ✓ Formulario permanece en la misma página

---

### Test Case 6: Validación Local - Términos No Aceptados

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Llena correctamente TODO EXCEPTO:
   - NO marques el checkbox de términos
3. Haz clic en "Registrate"

**Esperado:**
- ✓ Muestra error: "❌ Debes aceptar los términos y políticas de privacidad"
- ✓ Formulario permanece en la misma página

---

### Test Case 7: Validación de Links a Términos

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Haz clic en link "términos y condiciones"

**Esperado:**
- ✓ Te redirecciona a `/terms-and-conditions`
- ✓ Muestra página con términos

**Pasos 2:**
1. Vuelve a `/register`
2. Haz clic en link "política de privacidad"

**Esperado:**
- ✓ Te redirecciona a `/privacy-policy`
- ✓ Muestra página con privacidad

---

### Test Case 8: Registro Exitoso (CON SUPABASE)

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Llena:
   - Nombre: "Test User [DATE]" (ej: "Test User 2024-11-11")
   - Email: "testuser[TIMESTAMP]@gmail.com" (ej: "testuser202411111234@gmail.com")
   - Contraseña: "TestPass123456"
   - Confirmar: "TestPass123456"
   - ☑ Acepta términos
3. Haz clic en "Registrate"

**Esperado:**
- ✓ Muestra "Registrándote..." (spinning)
- ✓ Después muestra: "✓ ¡Registrado! Revisa tu email para confirmar la cuenta."
- ✓ Espera 2 segundos
- ✓ Se redirecciona automáticamente a `/login`

**Verificación en DevTools:**
```javascript
// Console → Ejecuta:
document.cookie // Aún SIN token (no confirmado)
```

---

### Test Case 9: Registro - Email Duplicado (CON SUPABASE)

**Pasos:**
1. Ve a `http://localhost:3000/register`
2. Llena con email que YA EXISTE:
   - Email: "testuser202411111234@gmail.com" (del test anterior)
3. Haz clic en "Registrate"

**Esperado:**
- ✓ Muestra error: "❌ Este email ya está registrado"
- ✓ Formulario permanece en la misma página
- ✓ Puedes intentar con otro email

---

## Journey 3: Login ✅

### Test Case 1: Validación Local - Email Inválido

**Pasos:**
1. Ve a `http://localhost:3000/login`
2. Llena:
   - Email: "notanemail"
   - Contraseña: "TestPass123"
3. Haz clic en "Iniciar Sesión"

**Esperado:**
- ✓ Muestra error: "❌ Email inválido"
- ✓ Formulario permanece en la misma página

---

### Test Case 2: Validación Local - Contraseña Corta

**Pasos:**
1. Ve a `http://localhost:3000/login`
2. Llena:
   - Email: "test@gmail.com"
   - Contraseña: "123" (solo 3 caracteres)
3. Haz clic en "Iniciar Sesión"

**Esperado:**
- ✓ Muestra error: "❌ La contraseña debe tener al menos 6 caracteres"
- ✓ Formulario permanece en la misma página

---

### Test Case 3: Login - Credenciales Incorrectas (CON SUPABASE)

**Pasos:**
1. Ve a `http://localhost:3000/login`
2. Llena:
   - Email: "noexiste@gmail.com"
   - Contraseña: "WrongPassword123"
3. Haz clic en "Iniciar Sesión"

**Esperado:**
- ✓ Muestra "⏳ Iniciando sesión..." (spinning)
- ✓ Después muestra: "❌ Email o contraseña incorrectos"
- ✓ Formulario permanece en la misma página

---

### Test Case 4: Login - Email No Confirmado (CON SUPABASE)

**Pasos:**
1. Ve a `http://localhost:3000/login`
2. Llena con credentials del Test 8 de Registro (SIN confirmar email):
   - Email: "testuser202411111234@gmail.com"
   - Contraseña: "TestPass123456"
3. Haz clic en "Iniciar Sesión"

**Esperado:**
- ✓ Muestra "⏳ Iniciando sesión..."
- ✓ Después muestra: "⚠️ Por favor confirma tu email antes de iniciar sesión"
- ✓ Formulario permanece
- ✓ Usuario no logueado

**Nota:** Necesitas confirmar el email en Supabase para continuar

---

### Test Case 5: Login Exitoso (CON SUPABASE)

**Pasos:**

**Opción A: Usar un usuario creado previamente**
1. Ve a `http://localhost:3000/login`
2. Llena con credentials de usuario existente y confirmado
3. Haz clic en "Iniciar Sesión"

**Opción B: Usar Supabase para confirmar email**
1. Usa Supabase Dashboard
2. Ve a Authentication > Users
3. Busca el email del Test 8
4. Marca "Email Confirmed" → true
5. Vuelve a `/login`
6. Llena:
   - Email: "testuser202411111234@gmail.com"
   - Contraseña: "TestPass123456"
7. Haz clic en "Iniciar Sesión"

**Esperado:**
- ✓ Muestra "⏳ Iniciando sesión..."
- ✓ Espera 500ms
- ✓ Se redirecciona AUTOMÁTICAMENTE a `/dashboard`
- ✓ Ves página de bienvenida

**Verificación en DevTools:**
```javascript
// Console → Ejecuta:
document.cookie // Debe contener "sb-auth-token"
```

---

### Test Case 6: Login - Links de Navegación

**Pasos:**
1. Ve a `http://localhost:3000/login`
2. Haz clic en "¿No tienes cuenta? Regístrate aquí"

**Esperado:**
- ✓ Te redirecciona a `/register`

**Pasos 2:**
1. Ve a `http://localhost:3000/login`
2. Haz clic en "¿Olvidaste tu contraseña? Recuperarla"

**Esperado:**
- ✓ Te redirecciona a `/forgot-password`

---

## Journey 4: Dashboard (Bienvenida) ✅

### Test Case 1: Acceso a Dashboard AUTENTICADO

**Pasos:**
1. Haz login exitoso (Test 5 de Login)

**Esperado:**
- ✓ Auto-redirecciona a `/dashboard`
- ✓ Ves página con:
  - "¡Bienvenido, [tu nombre]! 👋"
  - Tu email
  - Estado: "✓ Activo"
  - Fecha de registro
  - Tarjetas con opciones rápidas
  - Botones: "Mi Perfil" y "Cerrar Sesión"

---

### Test Case 2: Datos en Dashboard

**Pasos:**
1. Estás en `/dashboard` (autenticado)

**Esperado:**
- ✓ Ver tu email correcto
- ✓ Ver "✓ Activo" en verde
- ✓ Ver fecha de registro
- ✓ Botón "Mi Perfil" funciona
- ✓ Botón "Cerrar Sesión" funciona

---

### Test Case 3: Links Rápidos en Dashboard

**Pasos:**
1. Estás en `/dashboard`
2. Haz clic en "👤 Ver Mi Perfil"

**Esperado:**
- ✓ Te redirecciona a `/profile`

**Pasos 2:**
1. Vuelve a `/dashboard`
2. Haz clic en "🔐 Cambiar Contraseña"

**Esperado:**
- ✓ Te redirecciona a `/change-password`

**Pasos 3:**
1. Vuelve a `/dashboard`
2. Haz clic en "📋 Términos y Condiciones"

**Esperado:**
- ✓ Te redirecciona a `/terms-and-conditions`

---

## Journey 5: Ver Perfil ✅

### Test Case 1: Acceso a Perfil AUTENTICADO

**Pasos:**
1. Estás en `/dashboard`
2. Haz clic en "Mi Perfil"

**Esperado:**
- ✓ Te redirecciona a `/profile`
- ✓ Ves tres tarjetas:
  - "Mi Perfil" con botón "Editar Perfil"
  - "Seguridad" con botón "Cambiar Contraseña"
  - "Comunidad" con botón "Ver Dashboard"
- ✓ Ves botón "Cerrar Sesión" en la parte superior

---

### Test Case 2: Navegar desde Perfil

**Pasos:**
1. Estás en `/profile`
2. Haz clic en "🔐 Cambiar Contraseña"

**Esperado:**
- ✓ Te redirecciona a `/change-password`

**Pasos 2:**
1. Vuelve a `/profile`
2. Haz clic en "👥 Ver Dashboard"

**Esperado:**
- ✓ Te redirecciona a `/dashboard`

---

## Journey 6: Logout ✅

### Test Case 1: Logout desde Dashboard

**Pasos:**
1. Estás en `/dashboard` (autenticado)
2. Haz clic en "🚪 Cerrar Sesión"

**Esperado:**
- ✓ Botón se desactiva (loading state)
- ✓ Se ejecuta logout:
  - Supabase signOut()
  - Limpia cookies
  - Limpia estado local
- ✓ Te redirecciona AUTOMÁTICAMENTE a `/`
- ✓ Ves home page

**Verificación en DevTools:**
```javascript
// Console → Ejecuta:
document.cookie // NO debe contener "sb-auth-token"
```

---

### Test Case 2: Logout desde Perfil

**Pasos:**
1. Estás en `/profile` (autenticado)
2. Haz clic en "🚪 Cerrar Sesión"

**Esperado:**
- ✓ Botón se desactiva (loading state)
- ✓ Se ejecuta logout
- ✓ Te redirecciona AUTOMÁTICAMENTE a `/`
- ✓ Ves home page (no autenticado)

---

## Journey 7: Acceso Protegido SIN Autenticación ✅

### Test Case 1: Intento de Acceso a /dashboard SIN Token

**Pasos:**
1. Limpia todas las cookies (DevTools → Application → Cookies → Delete All)
2. Ve directamente a `http://localhost:3000/dashboard`

**Esperado:**
- ✓ Middleware intercepta
- ✓ Auto-redirecciona a `/login`
- ✓ URL muestra: `/login?redirected=true`

---

### Test Case 2: Intento de Acceso a /profile SIN Token

**Pasos:**
1. Limpia todas las cookies
2. Ve directamente a `http://localhost:3000/profile`

**Esperado:**
- ✓ Middleware intercepta
- ✓ Auto-redirecciona a `/login`

---

### Test Case 3: Intento de Acceso a /change-password SIN Token

**Pasos:**
1. Limpia todas las cookies
2. Ve directamente a `http://localhost:3000/change-password`

**Esperado:**
- ✓ Middleware intercepta
- ✓ Auto-redirecciona a `/login`

---

## Journey 8: Acceso a Auth ESTANDO Autenticado ✅

### Test Case 1: Acceso a /login ESTANDO Autenticado

**Pasos:**
1. Haz login (Test 5 de Login)
2. Estás autenticado en `/dashboard`
3. Intenta ir a `http://localhost:3000/login` (escribiendo URL)

**Esperado:**
- ✓ Middleware intercepta
- ✓ Auto-redirecciona a `/dashboard`
- ✓ No ves formulario de login

---

### Test Case 2: Acceso a /register ESTANDO Autenticado

**Pasos:**
1. Estás autenticado (en `/dashboard`)
2. Intenta ir a `http://localhost:3000/register` (escribiendo URL)

**Esperado:**
- ✓ Middleware intercepta
- ✓ Auto-redirecciona a `/dashboard`
- ✓ No ves formulario de registro

---

## 🔍 Debugging Tips

### Verificar Token en DevTools

```javascript
// Console → Ejecuta:
document.cookie

// Resultado si autenticado:
// "sb-auth-token=eyJhbGc...xxxxx"

// Resultado si NO autenticado:
// "" (vacío)
```

### Verificar Estado en React DevTools

```
React DevTools → Select useAuth hook
  ├─ isAuthenticated: true/false
  ├─ isLoading: true/false
  ├─ user: { email, id, ... } / null
  └─ user.user_metadata: { nombre, ... }
```

### Verificar Logs en Consola

```javascript
// Si hay errores, verás en Console:
// "Login error: ..."
// "Register error: ..."
// "Logout error: ..."
```

### Limpiar Todo y Empezar de Nuevo

```javascript
// Console → Ejecuta:
document.cookie = ""
localStorage.clear()
sessionStorage.clear()
location.reload()

// O en DevTools → Application → Clear all site data
```

---

## ✅ Checklist de Testing Completo

### Validaciones
- [ ] Nombre < 3 caracteres muestra error
- [ ] Email inválido muestra error
- [ ] Contraseña < 6 caracteres muestra error
- [ ] Contraseñas no coinciden muestra error
- [ ] Términos no aceptados muestra error

### Registro
- [ ] Validaciones locales funcionan
- [ ] Email duplicado rechazado
- [ ] Registro exitoso redirige a /login
- [ ] Links a términos y privacidad funcionan

### Login
- [ ] Validaciones locales funcionan
- [ ] Credenciales incorrectas rechazadas
- [ ] Email no confirmado rechazado
- [ ] Login exitoso redirige a /dashboard
- [ ] Links a registro y recuperar contraseña funcionan

### Dashboard
- [ ] Muestra nombre de bienvenida
- [ ] Muestra email correcto
- [ ] Muestra estado "Activo"
- [ ] Muestra fecha de registro
- [ ] Botón "Mi Perfil" funciona
- [ ] Botón "Cerrar Sesión" funciona

### Perfil
- [ ] Acceso solo si autenticado
- [ ] Muestra tres tarjetas
- [ ] Botones funcionan
- [ ] Botón logout funciona

### Middleware
- [ ] No autenticado → /login
- [ ] Autenticado en /login → /dashboard
- [ ] Autenticado en /register → /dashboard
- [ ] No autenticado en /dashboard → /login
- [ ] No autenticado en /profile → /login

### Cookies
- [ ] Después de login, existe sb-auth-token
- [ ] Después de logout, NO existe sb-auth-token
- [ ] Token persiste al refrescar página

---

## 🚀 Próximos Pasos Después de Testing

1. **Supabase Setup** - Crear tablas y RLS (si no está hecho)
2. **Email Confirmation** - Configurar en Supabase
3. **Change Password** - Implementar `/change-password`
4. **Forgot Password** - Implementar `/forgot-password`
5. **Reset Password** - Implementar `/reset-password`

¡Felicidades si pasaste todos los tests! 🎉
