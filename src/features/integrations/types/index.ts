export type IntegrationCategory = 'payment' | 'lab' | 'device' | 'communication' | 'api'
export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending'

export interface Integration {
  id: string
  name: string
  provider: string
  category: IntegrationCategory
  description: string
  status: IntegrationStatus
  icon: string
  lastSync?: string
  configFields?: string[]
}

export interface WebhookEndpoint {
  id: string
  name: string
  url: string
  events: string[]
  status: 'active' | 'inactive'
  lastTriggered?: string
  successRate: number
}

export interface ApiKey {
  id: string
  name: string
  prefix: string
  createdAt: string
  lastUsed?: string
  scopes: string[]
}

export const INTEGRATION_CATEGORIES: Record<IntegrationCategory, string> = {
  payment: 'Pasarelas de pago',
  lab: 'Laboratorios',
  device: 'Dispositivos',
  communication: 'Comunicación',
  api: 'API / Webhooks',
}

export const INTEGRATION_STATUS: Record<IntegrationStatus, { label: string; variant: 'success' | 'secondary' | 'danger' | 'warning' }> = {
  connected: { label: 'Conectado', variant: 'success' },
  disconnected: { label: 'Desconectado', variant: 'secondary' },
  error: { label: 'Error', variant: 'danger' },
  pending: { label: 'Pendiente', variant: 'warning' },
}
