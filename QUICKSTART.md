# 🚀 Quick Start Guide

## **Project Locations**

### **HTML Project (Original)**
```
📁 c:\Users\Jesus Vita\Documents\Proyecto Charts Web Lomas\Migracion Web a Supabase
   - Contains: login.html, register.html, dashboard.html, *.js files
   - Status: ✅ Fixed and working
   - Use for: Reference, bug fixes, legacy support
```

### **Next.js Project (New)** ← **USE THIS ONE**
```
📁 c:\Users\Jesus Vita\Documents\NextJS-Projects\community-nextjs
   - Contains: React components, Next.js pages, TypeScript
   - Status: 🚀 Ready for development
   - Use for: New feature development
```

---

## **Setup Instructions**

### **1. Open Next.js Project**
```powershell
code "c:\Users\Jesus Vita\Documents\NextJS-Projects\community-nextjs"
```

### **2. Configure Environment**
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **3. Start Development Server**
```powershell
cd "c:\Users\Jesus Vita\Documents\NextJS-Projects\community-nextjs"
npm run dev
```

Visit: **http://localhost:3000**

---

## **Available Routes**

### **Public Routes**
- `http://localhost:3000` - Landing page
- `http://localhost:3000/auth/login` - Login
- `http://localhost:3000/auth/register` - Registration
- `http://localhost:3000/auth/forgot-password` - Password recovery
- `http://localhost:3000/auth/reset-password` - Reset password
- `http://localhost:3000/privacy-policy` - Privacy policy

### **Protected Routes** (require login)
- `http://localhost:3000/dashboard` - User dashboard
- `http://localhost:3000/auth/change-password` - Change password

---

## **Common Commands**

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Testing & Linting
npm run lint            # Run ESLint
npm run type-check      # TypeScript check

# Git
git status              # Check changes
git add .               # Stage files
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub
```

---

## **File Structure Overview**

```
community-nextjs/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages layout
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── change-password/
│   ├── (dashboard)/              # Dashboard pages layout
│   │   └── dashboard/
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/
│   ├── auth/                     # Auth forms
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── layout/                   # Layout wrappers
│       └── AuthLayout.tsx
│
├── hooks/
│   └── useAuth.ts               # Auth logic hook
│
├── lib/
│   ├── supabase/
│   │   └── client.ts            # Supabase client
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Utility functions
│
├── styles/
│   └── globals.css              # Tailwind CSS
│
├── middleware.ts                # Route protection
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
└── next.config.ts              # Next.js config
```

---

## **Authentication Flow**

### **Registration**
```
User visits /auth/register
    ↓
Fills form (name, email, password, GDPR)
    ↓
RegisterForm validates & calls useAuth.register()
    ↓
Supabase creates auth user
    ↓
User prompted to verify email
    ↓
✅ Account ready
```

### **Login**
```
User visits /auth/login
    ↓
Enters email & password
    ↓
LoginForm validates & calls useAuth.login()
    ↓
Supabase authenticates
    ↓
Session stored
    ↓
Redirects to /dashboard
    ↓
✅ Logged in
```

### **Password Recovery**
```
User visits /auth/forgot-password
    ↓
Enters email
    ↓
Supabase sends recovery email
    ↓
User clicks link in email
    ↓
Opens reset-password page
    ↓
Sets new password
    ↓
✅ Password reset
```

---

## **Testing Checklist**

- [ ] Start dev server: `npm run dev`
- [ ] Visit http://localhost:3000 (landing page)
- [ ] Test registration flow
  - [ ] Register with valid data
  - [ ] Check email for confirmation
  - [ ] Login with new account
- [ ] Test login flow
  - [ ] Login with correct credentials
  - [ ] Verify redirect to dashboard
  - [ ] Check user info displayed
- [ ] Test logout
  - [ ] Click "Cerrar Sesión" button
  - [ ] Should redirect to login
- [ ] Test password recovery
  - [ ] Go to forgot-password
  - [ ] Request recovery email
  - [ ] Follow reset link
  - [ ] Set new password
- [ ] Test change password
  - [ ] Login to account
  - [ ] Go to change-password
  - [ ] Change password
  - [ ] Logout and login with new password
- [ ] Test route protection
  - [ ] Try accessing /dashboard without login
  - [ ] Should redirect to /auth/login

---

## **Troubleshooting**

### **Port 3000 already in use**
```powershell
# Use different port
npm run dev -- -p 3001
```

### **Supabase connection issues**
- Verify `.env.local` has correct credentials
- Check Supabase project is running
- Check internet connection

### **Build errors**
```powershell
# Clear cache and rebuild
rm -r .next
npm run build
```

### **TypeScript errors**
```powershell
# Run type check
npm run type-check

# Or during dev, errors show in console
npm run dev
```

---

## **What's Next?**

1. ✅ **Phase 1 & 2 Complete:**
   - Next.js setup done
   - Authentication components created
   - Project moved to separate folder

2. 🔄 **Phase 3 - Dashboard:**
   - Create dashboard components
   - Implement onboarding flow
   - Add property management

3. 🚀 **Phase 4 - Production:**
   - Deploy to Vercel/hosting
   - Set up monitoring
   - Optimize performance

---

**Last Updated:** November 11, 2025  
**Project Status:** 🟢 Ready for Development
