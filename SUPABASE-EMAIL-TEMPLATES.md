# 📧 Templates de Email para Supabase - L2H Community

Aquí están todos los templates HTML profesionales para configurar los emails transaccionales en Supabase.

## 📁 Archivos Disponibles

### 1. **Confirmación de Registro** (`confirm-signup.html`)
- **Caso de uso:** Cuando un nuevo usuario se registra
- **Variables disponibles:** `{{ .Email }}`, `{{ .ConfirmationURL }}`
- **Color principal:** Azul (#2563eb)
- **Propósito:** Solicitar confirmación del email antes de activar la cuenta

### 2. **Invitación a la Plataforma** (`invite.html`)
- **Caso de uso:** Cuando se invita a un nuevo usuario
- **Variables disponibles:** `{{ .ConfirmationURL }}`, `{{ .SiteURL }}`
- **Color principal:** Púrpura (#7c3aed)
- **Propósito:** Invitar a crear una cuenta en la plataforma

### 3. **Cambio de Correo Electrónico** (`change-email.html`)
- **Caso de uso:** Cuando un usuario solicita cambiar su email
- **Variables disponibles:** `{{ .Email }}`, `{{ .NewEmail }}`, `{{ .ConfirmationURL }}`
- **Color principal:** Azul (#3b82f6)
- **Propósito:** Verificar el nuevo email del usuario

### 4. **Recuperación de Contraseña** (`reset-password.html`)
- **Caso de uso:** Cuando un usuario olvida su contraseña
- **Variables disponibles:** `{{ .ConfirmationURL }}`, `{{ .Email }}`
- **Color principal:** Ámbar (#f59e0b)
- **Propósito:** Permitir al usuario restablecer su contraseña

### 5. **Re-autenticación** (`reauthentication.html`)
- **Caso de uso:** Cuando se necesita verificar identidad adicional
- **Variables disponibles:** `{{ .Token }}`, `{{ .Email }}`
- **Color principal:** Verde (#10b981)
- **Propósito:** Enviar código de verificación temporal

---

## 🔧 Cómo Configurar en Supabase

### Paso 1: Ir a Configuración de Email

1. Ve a tu proyecto en Supabase
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, selecciona **Email Templates**

### Paso 2: Configurar Cada Template

Para cada template:

1. **Copia el contenido HTML** del archivo correspondiente
2. **Selecciona el tipo de email** (Confirm signup, Invite, Change email, Reset password, etc.)
3. **Reemplaza el HTML por defecto** con el código copiado
4. **Guarda los cambios**

### Paso 3: Variables Disponibles

Todos los templates usan variables de Supabase. Las variables comunes son:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `{{ .ConfirmationURL }}` | URL del enlace de confirmación | https://app.example.com/auth/callback?token=xxx |
| `{{ .Email }}` | Email del usuario | user@example.com |
| `{{ .NewEmail }}` | Nuevo email (cambio de email) | newemail@example.com |
| `{{ .SiteURL }}` | URL base del sitio | https://app.example.com |
| `{{ .Token }}` | Código de verificación temporal | 123456 |

---

## 📧 Tipos de Email en Supabase

### 1. **Confirm Signup** (Confirmación de Registro)
- Archivo: `confirm-signup.html`
- Cuándo se envía: Inmediatamente después de registrarse
- Variables clave: `{{ .ConfirmationURL }}`, `{{ .Email }}`
- Acción del usuario: Hacer clic en "Confirmar correo"

### 2. **Invite** (Invitación)
- Archivo: `invite.html`
- Cuándo se envía: Cuando alguien invita a otro usuario
- Variables clave: `{{ .ConfirmationURL }}`, `{{ .SiteURL }}`
- Acción del usuario: Hacer clic en "Aceptar invitación"

### 3. **Change Email** (Cambio de Email)
- Archivo: `change-email.html`
- Cuándo se envía: Cuando se solicita cambiar el email
- Variables clave: `{{ .Email }}`, `{{ .NewEmail }}`, `{{ .ConfirmationURL }}`
- Acción del usuario: Hacer clic en "Confirmar cambio"

### 4. **Reset Password** (Recuperación de Contraseña)
- Archivo: `reset-password.html`
- Cuándo se envía: Cuando se solicita recuperar contraseña
- Variables clave: `{{ .ConfirmationURL }}`, `{{ .Email }}`
- Acción del usuario: Hacer clic en "Cambiar contraseña"

### 5. **Reauthentication** (Re-autenticación)
- Archivo: `reauthentication.html`
- Cuándo se envía: Para verificación de seguridad adicional
- Variables clave: `{{ .Token }}`, `{{ .Email }}`
- Acción del usuario: Copiar el código y pegarlo

---

## 🎨 Características de los Templates

### Diseño Responsive
- ✅ Optimizados para dispositivos móviles
- ✅ Adaptación automática de tamaño
- ✅ Funcionan en todos los clientes de email

### Accesibilidad
- ✅ Colores de contraste suficiente
- ✅ Textos descriptivos y claros
- ✅ Botones grandes y fáciles de hacer clic
- ✅ Estructura HTML semántica

### Seguridad
- ✅ Mensajes de advertencia claros
- ✅ Indicación de enlaces temporales
- ✅ Instrucciones de acciones no solicitadas
- ✅ Contacto de soporte visible

### Branding
- ✅ Logo de L2H Community
- ✅ Colores corporativos consistentes
- ✅ Footer con información de la empresa
- ✅ Enlaces a políticas y términos

---

## 💡 Mejores Prácticas

### ✅ DO'S (Hacer)

1. **Probar antes de producción**
   ```
   Envía un email de prueba a tu propia dirección
   Verifica que todos los enlaces funcionan
   Comprueba en diferentes clientes de email
   ```

2. **Actualizar información de contacto**
   - Reemplaza `support@l2h.community` con tu email real
   - Actualiza `l2h.community` con tu dominio

3. **Mantener consistencia visual**
   - Usa los colores corporativos
   - Mantén el mismo tono de voz
   - Alinea con tu brand identity

4. **Verificar variables**
   - Asegúrate de usar las variables correctas
   - Prueba con datos reales
   - Verifica que los enlaces redirigen correctamente

### ❌ DON'Ts (No Hacer)

1. **No remover elementos de seguridad**
   - Mantén las advertencias visibles
   - No suprimas los avisos de expiración
   - No ocultes información importante

2. **No cambiar URLs prematuramente**
   - Las variables `{{ .ConfirmationURL }}` deben estar intactas
   - No hardcodees URLs locales
   - Supabase genera estos dinámicamente

3. **No ignorar el responsive design**
   - Los emails se ven en celulares
   - Prueba en diferentes tamaños
   - Asegúrate de que sea legible

4. **No sobrecargar con información**
   - Mantén el mensaje claro y conciso
   - Una acción principal por email
   - Evita demasiados colores o fuentes

---

## 🚀 Configuración Rápida en Supabase

### Pasos Simplificados:

1. **Supabase Dashboard** → **Settings** → **Email Templates**

2. **Para cada tipo de email:**
   ```
   1. Copia el contenido del archivo HTML
   2. Reemplaza el template por defecto
   3. Haz clic en "Save"
   4. Envía un email de prueba
   ```

3. **Verifica funcionamiento:**
   - Test confirmar registro
   - Test recuperación contraseña
   - Test cambio de email
   - Test re-autenticación

---

## 📱 Personalización

### Cambiar Colores

Busca en el CSS las variables de color:

```css
/* Azul (Confirm Signup, Change Email) */
background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);

/* Púrpura (Invite) */
background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);

/* Ámbar (Reset Password) */
background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);

/* Verde (Reauthentication) */
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

### Cambiar Información de Contacto

```html
<!-- Búsqueda y reemplazo -->
support@l2h.community  → Tu email real
l2h.community          → Tu dominio
L2H Community          → Tu nombre de empresa
```

---

## ✅ Checklist de Implementación

- [ ] Copié todos los archivos HTML
- [ ] Configuré Email Templates en Supabase
- [ ] Actualicé email de soporte a `support@l2h.community` o el real
- [ ] Cambié URLs de dominio si es necesario
- [ ] Envié emails de prueba para cada tipo
- [ ] Verifiqué que los enlaces funcionan
- [ ] Probé en dispositivos móviles
- [ ] Probé en diferentes clientes de email (Gmail, Outlook, etc.)
- [ ] Confirmé que variables se reemplazan correctamente
- [ ] Documenté cualquier cambio personalizado

---

## 🔗 URLs Útiles

- **Supabase Email Templates:** https://app.supabase.com/project/[PROJECT_ID]/settings/email
- **Documentación Supabase:** https://supabase.com/docs/reference/self-hosting-auth/config#email_templates
- **Prueba de Email:** https://mailtrap.io/ o similar

---

## 📞 Soporte

Si necesitas ajustar los templates:

1. **Contacta al equipo:** support@l2h.community
2. **Revisa la documentación:** Cada archivo HTML está comentado
3. **Prueba en desarrollo:** Antes de poner en producción

---

**Última actualización:** Noviembre 11, 2024
**Versión:** 1.0
**Estado:** Listo para producción ✅
