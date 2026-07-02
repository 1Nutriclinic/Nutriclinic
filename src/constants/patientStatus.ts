import type { PatientStatus } from '@/types'

export interface StatusMeta {
  label: string
  variant: 'success' | 'secondary' | 'warning' | 'danger' | 'default'
}

export const PATIENT_STATUS: Record<PatientStatus, StatusMeta> = {
  active: { label: 'Activo', variant: 'success' },
  inactive: { label: 'Inactivo', variant: 'secondary' },
  lead: { label: 'Prospecto', variant: 'default' },
  discharged: { label: 'Alta', variant: 'warning' },
  abandoned: { label: 'Abandono', variant: 'danger' },
}

export const PATIENT_STATUS_LIST = Object.entries(PATIENT_STATUS).map(([key, meta]) => ({
  value: key as PatientStatus,
  ...meta,
}))
