# Guía de Configuración de Supabase para L2H Community

## 1. Estructura de Tablas Necesarias en Supabase

Tu proyecto necesita las siguientes tablas en Supabase:

### Tabla: `users` (Perfil de Usuario)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  telefono VARCHAR(20),
  foto_url TEXT,
  comunidad_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: `comunidades` (Comunidades)
```sql
CREATE TABLE comunidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  ubicacion VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: `miembros_comunidad`
```sql
CREATE TABLE miembros_comunidad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comunidad_id UUID NOT NULL REFERENCES comunidades(id) ON DELETE CASCADE,
  rol VARCHAR(50) DEFAULT 'miembro',
  fecha_union TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, comunidad_id)
);
```

### Tabla: `mensajes` (Mensajería)
```sql
CREATE TABLE mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  autor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comunidad_id UUID NOT NULL REFERENCES comunidades(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: `eventos` (Eventos)
```sql
CREATE TABLE eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comunidad_id UUID NOT NULL REFERENCES comunidades(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha TIMESTAMP NOT NULL,
  ubicacion VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 2. Pasos para Configurar Supabase

### Paso 1: Crear las Tablas
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Copia y ejecuta cada comando SQL anterior

### Paso 2: Configurar Autenticación
1. Ve a **Authentication > Settings**
2. En **Email** asegúrate que esté habilitado
3. Configura **Email Templates** si es necesario
4. En **Redirect URLs** agrega:
   - `http://localhost:3000/dashboard` (local)
   - `http://localhost:3000/login` (local)
   - `https://your-vercel-url.vercel.app/dashboard` (production)
   - `https://your-vercel-url.vercel.app/login` (production)

### Paso 3: Políticas de Seguridad (RLS)
1. Ve a **Authentication > Policies**
2. Para tabla `users`, crea estas policies:

**SELECT Policy:**
```sql
SELECT * FROM users WHERE id = auth.uid() OR NULL = auth.uid() IS FALSE
```

**INSERT Policy:**
```sql
INSERT INTO users (id, email, nombre) 
VALUES (auth.uid(), auth.email(), '')
WHERE auth.uid() IS NOT NULL
```

**UPDATE Policy:**
```sql
UPDATE users SET nombre = NEW.nombre, telefono = NEW.telefono, foto_url = NEW.foto_url 
WHERE id = auth.uid()
```

## 3. Flujo de Autenticación Esperado

### Registro:
1. Usuario completa formulario en `/register`
2. Supabase crea usuario en `auth.users` con email y contraseña
3. Se crea registro en tabla `users` con metadata
4. Email de confirmación se envía (si está configurado)
5. Usuario redirigido a `/login`

### Login:
1. Usuario ingresa email y contraseña en `/login`
2. Supabase verifica credenciales
3. Si es correcto, crea sesión
4. Usuario redirigido a `/dashboard`
5. En `/dashboard` puede ir a `/profile`

### Logout:
1. Usuario hace clic en "Cerrar Sesión"
2. Sesión se elimina
3. Usuario redirigido a `/`

## 4. Verificar Funcionamiento

### Test Local:
1. Ejecuta `npm run dev`
2. Ve a http://localhost:3000
3. Haz clic en "Registrarse"
4. Completa el formulario
5. Verifica que:
   - Se muestre mensaje de éxito
   - Te redirija a `/login`
   - Puedas entrar con las credenciales
   - Veas tu nombre en dashboard

### Test en Vercel:
1. Ve a tu URL en Vercel
2. Repite los pasos anteriores
3. Verifica que funcione igual

## 5. Posibles Problemas y Soluciones

### Problema: No se envía email de confirmación
**Solución:** 
- Ve a Auth > Email Templates
- Asegúrate que "Confirm signup" esté habilitado
- Verifica que uses email real (no test)

### Problema: Usuario no se redirige correctamente
**Solución:**
- Verifica que `/login`, `/dashboard`, `/profile` existan (ya existen ✓)
- Revisa los logs en Vercel: https://vercel.com/dashboard
- Verifica que middleware.ts redirija correctamente

### Problema: Error "Supabase credentials not found"
**Solución:**
- En Vercel, ve a Settings > Environment Variables
- Agrega:
  - `NEXT_PUBLIC_SUPABASE_URL=` (tu URL de Supabase)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=` (tu clave anónima)
- Redeploy después

### Problema: Usuario registrado pero no aparece en tabla `users`
**Solución:**
- Ve a SQL Editor en Supabase
- Ejecuta: `SELECT * FROM users;`
- Si está vacía, necesitas crear un trigger para inserta automáticamente

## 6. Crear Trigger para Insertar en Tabla Users Automáticamente

Si usuarios no aparecen automáticamente en tabla `users`, ejecuta esto:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, nombre)
  VALUES (new.id, new.email, '');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 7. Verificar Credenciales

Para obtener tus credenciales de Supabase:

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings > API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. En tu proyecto, actualiza `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...xxxxx
```

6. En Vercel, agrega las mismas variables en Settings > Environment Variables

## 8. Checklist de Configuración

- [ ] ✓ Supabase proyecto creado
- [ ] ✓ Tablas creadas (users, comunidades, miembros_comunidad, mensajes, eventos)
- [ ] ✓ RLS habilitado en Auth > Policies
- [ ] ✓ Email confirmación configurado (opcional)
- [ ] ✓ Redirect URLs configuradas
- [ ] ✓ Trigger para auto-insertar usuarios creado
- [ ] ✓ Variables de entorno en `.env.local`
- [ ] ✓ Variables de entorno en Vercel
- [ ] ✓ Test de registro local completado
- [ ] ✓ Test de login local completado
- [ ] ✓ Test en Vercel completado

## 9. URLs y Flujos Finales

**URLs después del Login:**
- `/` → Home (no autenticado)
- `/login` → Login (no autenticado)
- `/register` → Registro (no autenticado)
- `/dashboard` → Dashboard (autenticado) ← Destino después de login
- `/profile` → Perfil (autenticado)
- `/change-password` → Cambiar contraseña (autenticado)

**Redirecciones Automáticas:**
- Si intentas acceder a `/dashboard` SIN estar autenticado → Redirige a `/login`
- Si intentas acceder a `/login` ESTANDO autenticado → Redirige a `/dashboard`
- Si haces logout → Redirige a `/`

¿Necesitas ayuda con alguno de estos pasos?
