# Vercel Deployment Configuration

Este proyecto está configurado para desplegarse en Vercel.

## Pasos para desplegar:

### 1. Crear cuenta en Vercel (si no tienes)
https://vercel.com/signup

### 2. Conectar tu repositorio GitHub
- Ve a https://vercel.com/new
- Selecciona "Import Git Repository"
- Busca y selecciona "vitalizzy/L2HNextjs"
- Haz clic en "Import"

### 3. Configurar Variables de Entorno
En la sección "Environment Variables" de Vercel, agrega:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

Obtén estos valores de:
https://supabase.com/dashboard/project/_/settings/api

### 4. Deploy
Haz clic en "Deploy" - ¡Eso es todo!

Vercel automaticamente:
- Detectará que es un proyecto Next.js
- Instalará dependencias
- Compilará el proyecto
- Desplegará en una URL: `https://your-project.vercel.app`

### 5. Deploy automático
Cada vez que hagas push a la rama `main` en GitHub, Vercel automáticamente:
- Detectará los cambios
- Compilará
- Desplegará la nueva versión

### Tips:
- Las Preview Deployments se crean automáticamente para cada Pull Request
- Puedes ver logs en tiempo real en el dashboard de Vercel
- Los errores se mostrarán claramente

Para más información: https://vercel.com/docs/frameworks/nextjs
