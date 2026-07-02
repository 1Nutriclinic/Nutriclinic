export type SupportedLanguage = 'es' | 'en' | 'pt'

export interface RolePermission {
  role: string
  label: string
  users: number
  permissions: string[]
}

export interface NotificationPref {
  id: string
  label: string
  description: string
  email: boolean
  push: boolean
  whatsapp: boolean
}

export const LANGUAGES: Record<SupportedLanguage, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
}

export const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrador',
  director: 'Director clínico',
  nutritionist: 'Nutricionista',
  assistant: 'Asistente',
  receptionist: 'Recepción',
}
