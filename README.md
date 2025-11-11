# L2H Community - Next.js Version

Versión moderna del proyecto L2H Community migranda de HTML/Vanilla JS a React/Next.js.

## 🚀 Características

- ✅ Autenticación con Supabase
- ✅ Gestión de propietarios
- ✅ Dashboard interactivo
- ✅ Onboarding multipasos
- ✅ Temas oscuro/claro
- ✅ Totalmente responsivo
- ✅ TypeScript
- ✅ Tailwind CSS

## 📋 Requisitos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Iniciar desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
app/                    # App Router
├── (auth)/            # Rutas de autenticación
├── (dashboard)/       # Rutas del dashboard (protegidas)
└── page.tsx          # Landing page

components/           # Componentes React
├── auth/             # Componentes de autenticación
├── dashboard/        # Componentes del dashboard
├── common/           # Componentes reutilizables
└── layout/           # Layouts

lib/                  # Funciones y utilidades
├── supabase/         # Configuración de Supabase
├── types.ts          # TypeScript types
└── utils.ts          # Funciones de utilidad

hooks/                # React hooks personalizados
api/                  # API routes
```

## 🔐 Rutas Disponibles

### Públicas
- `/` - Landing page
- `/auth/login` - Iniciar sesión
- `/auth/register` - Registrarse
- `/auth/forgot-password` - Recuperar contraseña
- `/privacy` - Política de privacidad

### Privadas (requieren autenticación)
- `/dashboard` - Dashboard del usuario
- `/dashboard/onboarding` - Onboarding de vivienda

## 🔑 Variables de Entorno

```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
NEXT_PUBLIC_APP_NAME=L2H Community
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🏗️ Build para Producción

```bash
npm run build
npm start
```

## 📦 Desplegar a Vercel

```bash
vercel deploy
```

## 🔄 Migración desde HTML

Este proyecto fue migrado desde una versión HTML/Vanilla JS. Ver `NEXTJS-MIGRATION-PLAN.md` para detalles.

## 📝 Licencia

Privado - L2H Community

## 🤝 Contribuir

Para reportar bugs o sugerir features, crea un issue en GitHub.
