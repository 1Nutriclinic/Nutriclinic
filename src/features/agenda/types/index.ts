import type { ClinicalProgram } from '@/types'

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'

export type AgendaView = 'day' | 'week' | 'month'

export interface AgendaAppointment {
  id: string
  patientId: string
  patientName: string
  nutritionistId: string
  nutritionistName: string
  branchId: string
  branchName: string
  type: string
  program: ClinicalProgram
  startAt: string
  endAt: string
  status: AppointmentStatus
  notes?: string
  reminderSent: boolean
}

export const APPOINTMENT_STATUS: Record<
  AppointmentStatus,
  { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'secondary' }
> = {
  scheduled: { label: 'Programada', variant: 'secondary' },
  confirmed: { label: 'Confirmada', variant: 'default' },
  in_progress: { label: 'En consulta', variant: 'warning' },
  completed: { label: 'Completada', variant: 'success' },
  cancelled: { label: 'Cancelada', variant: 'danger' },
  no_show: { label: 'No asistió', variant: 'danger' },
}

export const APPOINTMENT_TYPES = [
  'Primera consulta',
  'Seguimiento',
  'Control gestante',
  'Antropometría',
  'Bioimpedancia',
  'Plan alimenticio',
  'Videoconsulta',
  'Control pediátrico',
]
