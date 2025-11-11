# Guía de Deployment en Vercel - Paso a Paso

## Requisitos previos:
- ✅ Cuenta de GitHub (ya tienes vitalizzy/L2HNextjs)
- ✅ Credenciales de Supabase (o puedes usar valores placeholder)

## Paso 1: Ir a Vercel
1. Abre https://vercel.com/new en tu navegador
2. Si no tienes cuenta, crea una haciendo clic en "Sign Up"
3. Puedes autenticarte con GitHub para mayor facilidad

## Paso 2: Conectar Repositorio
1. En Vercel, haz clic en "Import Git Repository"
2. Busca "vitalizzy/L2HNextjs" en la barra de búsqueda
3. Haz clic en el repositorio para seleccionarlo
4. Haz clic en "Import"

## Paso 3: Configurar Project Settings
En la pantalla "Configure Project":
- **Project Name:** community-nextjs (o el que prefieras)
- **Framework:** Next.js (debe detectarse automáticamente)
- **Root Directory:** ./ (por defecto está bien)

## Paso 4: Agregar Variables de Entorno (IMPORTANTE)
En la sección "Environment Variables", agrega:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://placeholder.supabase.co
(o tu URL real de Supabase)

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
(o tu clave real de Supabase)
```

**Cómo obtener tus credenciales reales:**
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a Settings > API
4. Copia "Project URL" y "anon public"

## Paso 5: Deploy
1. Revisa que todo esté correcto
2. Haz clic en "Deploy"
3. ¡Espera a que termine! (suele tardar 2-5 minutos)

Vercel mostrará:
- Logs en tiempo real
- Estado de build
- Tu URL de acceso: `https://your-project.vercel.app`

## Paso 6: Acceder a tu aplicación
Una vez completado el deploy:
- Tu app estará en vivo en: `https://your-project.vercel.app`
- Cada push a `main` auto-desplegará una nueva versión
- Los PRs generarán "Preview Deployments" automáticamente

## Troubleshooting:

### Error: "Build failed"
- Verifica que no hay errores de TypeScript: `npm run build` localmente
- Revisa los logs en Vercel dashboard

### Error: "Environment variables not found"
- Asegúrate de haber agregado todas las variables
- Redeploy después de agregar nuevas variables

### Error: "Module not found"
- Ejecuta `npm install` localmente
- Haz push de `package-lock.json`

## Monitoreo Post-Deploy

En el dashboard de Vercel puedes ver:
- **Deployments:** Historial de todos los deploys
- **Analytics:** Performance y usage
- **Logs:** Errores en tiempo real
- **Settings:** Configuración del proyecto

## Para desplegar cambios futuros:
Simplemente hace push a GitHub:
```bash
git add .
git commit -m "tu mensaje"
git push origin main
```

Vercel automáticamente:
1. Detectará los cambios
2. Compilará el proyecto
3. Desplegará la nueva versión
4. Te enviará una notificación

¡Listo! 🚀
