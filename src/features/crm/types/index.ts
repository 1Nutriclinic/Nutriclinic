import type { ClinicalProgram } from '@/types'

export type CrmStage = 'lead' | 'contacted' | 'follow_up' | 'active' | 'discharged' | 'abandoned'

export type CampaignChannel = 'whatsapp' | 'email' | 'sms'

export interface CrmContact {
  id: string
  patientId?: string
  name: string
  email?: string
  phone?: string
  stage: CrmStage
  source: string
  program?: ClinicalProgram
  lastContactAt?: string
  nextFollowUp?: string
  assignedTo: string
  notes?: string
  value?: number
}

export interface CrmCampaign {
  id: string
  name: string
  channel: CampaignChannel
  status: 'draft' | 'active' | 'completed' | 'paused'
  audience: string
  sent: number
  opened: number
  clicked: number
  converted: number
  scheduledAt?: string
  createdAt: string
}

export const CRM_STAGES: { key: CrmStage; label: string; color: string; description: string }[] = [
  { key: 'lead', label: 'Nuevos', color: 'border-t-primary', description: 'Prospectos sin contactar' },
  { key: 'contacted', label: 'Contactados', color: 'border-t-sky-500', description: 'Primer contacto realizado' },
  { key: 'follow_up', label: 'Seguimiento', color: 'border-t-warning', description: 'En proceso de conversión' },
  { key: 'active', label: 'Activos', color: 'border-t-success', description: 'Pacientes en tratamiento' },
  { key: 'discharged', label: 'Alta', color: 'border-t-emerald-500', description: 'Objetivo cumplido' },
  { key: 'abandoned', label: 'Abandono', color: 'border-t-danger', description: 'Sin continuidad' },
]

export const CAMPAIGN_CHANNELS: Record<CampaignChannel, { label: string; icon: string }> = {
  whatsapp: { label: 'WhatsApp', icon: '💬' },
  email: { label: 'Email', icon: '📧' },
  sms: { label: 'SMS', icon: '📱' },
}
