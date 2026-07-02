# Supabase — NutriClinic Pro

Proyecto: **Nutricion** (`gcqkmbclgjikxnsolhmb`)

## 1. Ejecutar migración (obligatorio una vez)

1. Abre [Supabase Dashboard](https://supabase.com/dashboard) → proyecto **Nutricion**
2. **SQL Editor** → New query
3. Copia y ejecuta todo el contenido de:
   `supabase/migrations/20260702_initial_auth_portal.sql`

## 2. Auth — confirmación de email (recomendado para demo)

**Authentication → Providers → Email** → desactiva **Confirm email** en desarrollo.

## 3. Primer usuario admin (bootstrap)

En **Authentication → Users → Add user** crea:

- Email: `admin@nutriclinic.pro`
- Password: (tu elección, 6+ chars)
- User metadata (JSON):
```json
{
  "first_name": "Admin",
  "last_name": "NutriClinic",
  "role": "admin",
  "is_demo": false
}
```

El trigger crea el perfil en `profiles` automáticamente.

## 4. Crear más usuarios

Desde la app: **Configuración → Usuarios → Crear usuario**

- **Sin** marcar "Usuario demo" → se conserva al limpiar demos
- **Paciente** → accede en `/portal/login`
- **Staff** → accede en `/login`

## 5. Limpiar demos

**Configuración → Usuarios → Limpiar datos demo**

Solo borra registros con `is_demo = true`.

## 6. Storage

Bucket `progress-photos` se crea con la migración. Fotos de progreso del paciente se suben desde `/portal`.
