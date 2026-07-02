export type AuditAction =
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'export'
  | 'import'
  | 'access'
  | 'permission_change'

export type AuditSeverity = 'info' | 'warning' | 'critical'

export type AuditModule =
  | 'auth'
  | 'patients'
  | 'clinical_records'
  | 'billing'
  | 'inventory'
  | 'companies'
  | 'branches'
  | 'settings'
  | 'crm'

export interface AuditLogEntry {
  id: string
  action: AuditAction
  module: AuditModule
  entity: string
  entityId?: string
  description: string
  userId: string
  userName: string
  userRole: string
  ip: string
  userAgent: string
  branchName?: string
  severity: AuditSeverity
  metadata?: Record<string, string>
  createdAt: string
}

export const AUDIT_ACTIONS: Record<AuditAction, string> = {
  login: 'Inicio de sesión',
  logout: 'Cierre de sesión',
  create: 'Creación',
  update: 'Actualización',
  delete: 'Eliminación',
  export: 'Exportación',
  import: 'Importación',
  access: 'Acceso',
  permission_change: 'Cambio de permisos',
}

export const AUDIT_MODULES: Record<AuditModule, string> = {
  auth: 'Autenticación',
  patients: 'Pacientes',
  clinical_records: 'Historia Clínica',
  billing: 'Facturación',
  inventory: 'Inventario',
  companies: 'Empresas',
  branches: 'Sucursales',
  settings: 'Configuración',
  crm: 'CRM',
}

export const AUDIT_SEVERITY: Record<AuditSeverity, { label: string; variant: 'secondary' | 'warning' | 'danger' }> = {
  info: { label: 'Info', variant: 'secondary' },
  warning: { label: 'Advertencia', variant: 'warning' },
  critical: { label: 'Crítico', variant: 'danger' },
}
