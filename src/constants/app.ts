export const APP = {
  name: 'NutriClinic Pro',
  suite: 'Enterprise',
  fullName: 'NutriClinic Pro Enterprise',
  version: '1.0.0',
  tagline: 'ERP Clínico Nutricional',
  description:
    'Plataforma integral para la gestión de clínicas nutricionales, consultorios y centros de obesidad.',
  copyright: `© ${new Date().getFullYear()} NutriClinic Pro. Todos los derechos reservados.`,
} as const

export const STORAGE_KEYS = {
  theme: 'ncp.theme',
  auth: 'ncp.auth',
  sidebar: 'ncp.sidebar.collapsed',
} as const
