# NutriClinic Pro Enterprise

ERP clínico nutricional — frontend MVP (React 19 + Vite + TypeScript).

**Repositorio independiente.** No está vinculado a ActNow ni a `creatingenterprise`.

## Requisitos

- Node.js 20+
- npm 10+

## Desarrollo local

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev
```

Abre `http://localhost:5173`

**Login demo:** cualquier email + contraseña de 6+ caracteres (p. ej. `demo@nutriclinic.pro`)

## Build

```bash
npm run build
npm run preview
```

## Variables de entorno

Ver `.env.example`. En producción configúralas en **Vercel** (no commitear `.env`).

| Variable | Descripción |
|----------|-------------|
| `VITE_APP_NAME` | Nombre de la app |
| `VITE_API_URL` | API REST (futuro Laravel) |
| `VITE_SUPABASE_URL` | URL del proyecto Supabase **nuevo** |
| `VITE_SUPABASE_ANON_KEY` | Clave anon pública de Supabase |

## Deploy (Vercel)

- **Root Directory:** `.` (raíz de este repo)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- `vercel.json` incluido para rutas SPA (React Router)

## Módulos incluidos

23 módulos: Dashboard, Pacientes, Historia Clínica, Programas, Plan Alimenticio, Agenda, CRM, Facturación, Inventario, Reportes, BI, Portal Paciente, Videoconsulta, Mensajería, Asistente IA, Dashboard Ejecutivo, Empresas, Sucursales, Auditoría, Integraciones, Marketplace, Configuración.

## Estado actual

- ✅ Frontend completo con datos mock
- ⏳ Supabase Auth + DB (pendiente — cuentas nuevas)
- ⏳ Backend Laravel API (arquitectura preparada)

## Licencia

Privado — uso comercial.
