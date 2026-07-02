import type { NotificationPref, RolePermission } from '../types'

export const MOCK_ROLES: RolePermission[] = [
  { role: 'super_admin', label: 'Super Admin', users: 1, permissions: ['*'] },
  { role: 'admin', label: 'Administrador', users: 3, permissions: ['patients', 'billing', 'inventory', 'reports', 'settings', 'companies', 'branches', 'audit'] },
  { role: 'director', label: 'Director clínico', users: 2, permissions: ['patients', 'clinical_records', 'programs', 'reports', 'bi', 'executive'] },
  { role: 'nutritionist', label: 'Nutricionista', users: 12, permissions: ['patients', 'clinical_records', 'programs', 'meal_plans', 'agenda', 'telehealth'] },
  { role: 'assistant', label: 'Asistente', users: 4, permissions: ['patients:read', 'agenda', 'messaging'] },
  { role: 'receptionist', label: 'Recepción', users: 6, permissions: ['patients', 'agenda', 'billing', 'crm', 'inventory'] },
]

export const MOCK_NOTIFICATIONS: NotificationPref[] = [
  { id: 'n1', label: 'Nueva cita agendada', description: 'Cuando se registra una cita en tu agenda.', email: true, push: true, whatsapp: false },
  { id: 'n2', label: 'Paciente sin seguimiento', description: 'Alerta cuando un paciente supera 30 días sin consulta.', email: true, push: true, whatsapp: true },
  { id: 'n3', label: 'Stock bajo', description: 'Productos de inventario bajo el mínimo.', email: true, push: false, whatsapp: false },
  { id: 'n4', label: 'Pago recibido', description: 'Confirmación de pagos en facturación.', email: true, push: true, whatsapp: false },
  { id: 'n5', label: 'Mensaje de paciente', description: 'Nuevo mensaje en bandeja unificada.', email: false, push: true, whatsapp: true },
  { id: 'n6', label: 'Evento de auditoría crítico', description: 'Accesos sospechosos o cambios sensibles.', email: true, push: true, whatsapp: false },
]

export const BRAND_COLORS = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#0F172A'] as const
