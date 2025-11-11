# 🔖 PROJECT REFERENCE - Important Paths & Commands

**Last Updated:** November 11, 2025

---

## 📂 KEY PATHS

### **Old HTML Project (Reference Only)**
```
c:\Users\Jesus Vita\Documents\Proyecto Charts Web Lomas\Migracion Web a Supabase
```

### **New Next.js Project (Active Development)** ⭐
```
c:\Users\Jesus Vita\Documents\NextJS-Projects\community-nextjs
```

---

## ⚡ QUICK COMMANDS

### **Open Project in VS Code**
```powershell
code "c:\Users\Jesus Vita\Documents\NextJS-Projects\community-nextjs"
```

### **Navigate to Project**
```powershell
cd "c:\Users\Jesus Vita\Documents\NextJS-Projects\community-nextjs"
```

### **Start Development Server**
```powershell
npm run dev
# Visit: http://localhost:3000
```

### **Build for Production**
```powershell
npm run build
npm start
```

### **Type Check**
```powershell
npm run type-check
```

### **Lint Code**
```powershell
npm run lint
```

---

## 🌐 ROUTES TO TEST

### **Public (No Login Required)**
- `http://localhost:3000/` - Landing page
- `http://localhost:3000/auth/login` - Login form
- `http://localhost:3000/auth/register` - Registration form
- `http://localhost:3000/auth/forgot-password` - Password recovery
- `http://localhost:3000/auth/reset-password` - Reset password (via email)
- `http://localhost:3000/privacy-policy` - Privacy policy

### **Protected (Login Required)**
- `http://localhost:3000/dashboard` - User dashboard
- `http://localhost:3000/auth/change-password` - Change password

---

## 📦 PROJECT STRUCTURE

### **Root Level**
```
community-nextjs/
├── app/                      # Next.js pages
├── components/               # React components
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities & types
├── styles/                   # Global styles
├── middleware.ts             # Auth middleware
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .env.local               # CREATE THIS FILE!
```

### **App Routes**
```
app/
├── (auth)/                   # Auth pages group
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   ├── reset-password/
│   └── change-password/
├── (dashboard)/              # Dashboard pages group
│   └── dashboard/
├── page.tsx                  # Landing page
└── layout.tsx                # Root layout
```

### **Components**
```
components/
├── auth/
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
└── layout/
    └── AuthLayout.tsx
```

### **Hooks**
```
hooks/
└── useAuth.ts               # Auth logic (6 methods)
```

### **Lib**
```
lib/
├── supabase/
│   └── client.ts
├── types.ts                 # TypeScript types
└── utils.ts                 # Utility functions
```

---

## 🛠️ ENVIRONMENT SETUP

### **Create .env.local File**

1. Create file: `.env.local` in project root
2. Add these lines:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Get Supabase Credentials**

1. Go to: https://app.supabase.com
2. Select your project
3. Click "Settings" → "API"
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📝 GIT COMMANDS

### **Check Status**
```bash
git status
```

### **View Commits**
```bash
git log --oneline
# Shows all previous commits
```

### **Create Feature Branch**
```bash
git checkout -b feature/dashboard
# Work on feature
git add .
git commit -m "feat: add dashboard feature"
git push origin feature/dashboard
```

### **Push to GitHub** (after repo created)
```bash
git remote add origin https://github.com/vitalizzy/community-nextjs.git
git push -u origin main
```

---

## 🔐 AUTHENTICATION FLOW

### **Registration Process**
1. User → `/auth/register`
2. Fills form (Name, Email, Password, GDPR)
3. Clicks "Registrate"
4. Backend creates auth user in Supabase
5. Confirmation email sent
6. User confirms email
7. ✅ Account ready

### **Login Process**
1. User → `/auth/login`
2. Enters email & password
3. Clicks "Iniciar Sesión"
4. Backend validates credentials
5. Session created
6. Redirect to `/dashboard`
7. ✅ Logged in

### **Logout Process**
1. Click "Cerrar Sesión" button
2. Session cleared
3. Redirect to `/auth/login`

---

## 🔍 DEBUGGING

### **Check npm Installation**
```powershell
npm list
# Shows all installed packages
```

### **Clear npm Cache**
```powershell
npm cache clean --force
```

### **Reinstall Dependencies**
```powershell
rm -r node_modules
npm install
```

### **TypeScript Check**
```powershell
npm run type-check
```

### **Build Check**
```powershell
npm run build
# Shows any build errors
```

---

## 📚 DOCUMENTATION FILES

| File | Purpose | Read When |
|------|---------|-----------|
| **QUICKSTART.md** | Quick setup guide | First time setup |
| **PROJECT-REORGANIZATION.md** | Project reorganization details | Understanding the structure |
| **REORGANIZATION-COMPLETE.md** | Completion summary | Verification needed |
| **README.md** | Project overview | General information |
| **PROJECT-REFERENCE.md** | This file! | Need quick commands |

---

## 🚀 NEXT STEPS

### **Immediate**
1. ✅ `code "c:\...\community-nextjs"`
2. ✅ Create `.env.local` with credentials
3. ✅ `npm run dev`
4. ✅ Test routes

### **Phase 3**
- [ ] Create dashboard components
- [ ] Implement onboarding
- [ ] Add API routes

### **Production**
- [ ] Create GitHub repo
- [ ] Deploy to Vercel

---

## ✅ QUICK CHECKLIST

Before starting development:
- [ ] Opened project in VS Code
- [ ] Created `.env.local` file
- [ ] Added Supabase credentials
- [ ] Ran `npm run dev`
- [ ] Can access `http://localhost:3000`
- [ ] Can access `/auth/login`
- [ ] Can access `/auth/register`

---

## 📞 IMPORTANT NOTES

⚠️ **Always work from the NEW location:**
```
c:\Users\Jesus Vita\Documents\NextJS-Projects\community-nextjs
```

❌ **Do NOT use the old location anymore:**
```
c:\Users\Jesus Vita\Documents\Proyecto Charts Web Lomas\community-nextjs
```

✅ **Keep the HTML project reference:**
```
c:\Users\Jesus Vita\Documents\Proyecto Charts Web Lomas\Migracion Web a Supabase
```

---

**Status:** 🟢 Ready to Start  
**Last Updated:** November 11, 2025
