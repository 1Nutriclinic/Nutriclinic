export type TelehealthStatus = 'waiting' | 'in_call' | 'completed' | 'cancelled' | 'scheduled'

export interface TelehealthSession {
  id: string
  patientId: string
  patientName: string
  nutritionistId: string
  nutritionistName: string
  scheduledAt: string
  startedAt?: string
  endedAt?: string
  status: TelehealthStatus
  duration?: number
  notes?: string
  recordingEnabled: boolean
}

export const TELEHEALTH_STATUS: Record<TelehealthStatus, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'secondary' }> = {
  scheduled: { label: 'Programada', variant: 'secondary' },
  waiting: { label: 'En espera', variant: 'warning' },
  in_call: { label: 'En consulta', variant: 'default' },
  completed: { label: 'Completada', variant: 'success' },
  cancelled: { label: 'Cancelada', variant: 'danger' },
}
