import type { ApiKey, Integration, WebhookEndpoint } from '../types'

export const MOCK_INTEGRATIONS: Integration[] = [
  { id: 'int1', name: 'Niubiz', provider: 'VisaNet Perú', category: 'payment', description: 'Pasarela de pagos con tarjeta, Yape y Plin.', status: 'connected', icon: '💳', lastSync: '2026-07-02T15:00:00.000Z', configFields: ['Merchant ID', 'API Key'] },
  { id: 'int2', name: 'Stripe', provider: 'Stripe Inc.', category: 'payment', description: 'Pagos internacionales y suscripciones SaaS.', status: 'disconnected', icon: '💰', configFields: ['Publishable Key', 'Secret Key'] },
  { id: 'int3', name: 'Roche Lab', provider: 'Roche Diagnostics', category: 'lab', description: 'Importación automática de resultados de laboratorio.', status: 'connected', icon: '🔬', lastSync: '2026-07-02T08:30:00.000Z', configFields: ['Lab ID', 'HL7 Endpoint'] },
  { id: 'int4', name: 'InBody', provider: 'InBody Co.', category: 'device', description: 'Sincronización de bioimpedancia InBody 270/570.', status: 'connected', icon: '⚖️', lastSync: '2026-07-02T14:45:00.000Z', configFields: ['Device Serial', 'Bluetooth MAC'] },
  { id: 'int5', name: 'Tanita', provider: 'Tanita Corp.', category: 'device', description: 'Básculas y analizadores de composición corporal.', status: 'disconnected', icon: '📊', configFields: ['Model', 'Connection Type'] },
  { id: 'int6', name: 'WhatsApp Business', provider: 'Meta', category: 'communication', description: 'API oficial para mensajería y campañas.', status: 'connected', icon: '💬', lastSync: '2026-07-02T15:42:00.000Z', configFields: ['Phone Number ID', 'Access Token'] },
  { id: 'int7', name: 'SendGrid', provider: 'Twilio', category: 'communication', description: 'Email transaccional y campañas de marketing.', status: 'connected', icon: '📧', lastSync: '2026-07-02T12:00:00.000Z', configFields: ['API Key', 'Sender Email'] },
  { id: 'int8', name: 'Apple Health', provider: 'Apple', category: 'device', description: 'Importación de pasos, calorías y peso desde wearables.', status: 'pending', icon: '⌚', configFields: ['Team ID', 'Bundle ID'] },
  { id: 'int9', name: 'Google Fit', provider: 'Google', category: 'device', description: 'Sincronización de actividad física y nutrición.', status: 'disconnected', icon: '🏃', configFields: ['OAuth Client ID'] },
  { id: 'int10', name: 'REST API', provider: 'NutriClinic Pro', category: 'api', description: 'API REST documentada para integraciones custom.', status: 'connected', icon: '🔗', lastSync: '2026-07-02T15:42:00.000Z' },
]

export const MOCK_WEBHOOKS: WebhookEndpoint[] = [
  { id: 'wh1', name: 'Nuevo paciente', url: 'https://api.miclínica.com/webhooks/patient', events: ['patient.created', 'patient.updated'], status: 'active', lastTriggered: '2026-07-02T14:30:00.000Z', successRate: 99.2 },
  { id: 'wh2', name: 'Pago recibido', url: 'https://api.miclínica.com/webhooks/payment', events: ['payment.received'], status: 'active', lastTriggered: '2026-07-02T11:15:00.000Z', successRate: 100 },
  { id: 'wh3', name: 'Cita confirmada', url: 'https://hooks.zapier.com/abc123', events: ['appointment.confirmed', 'appointment.cancelled'], status: 'inactive', successRate: 87.5 },
]

export const MOCK_API_KEYS: ApiKey[] = [
  { id: 'key1', name: 'Producción — ERP interno', prefix: 'ncp_live_****7f2a', createdAt: '2025-06-01T00:00:00.000Z', lastUsed: '2026-07-02T15:00:00.000Z', scopes: ['patients:read', 'patients:write', 'billing:read'] },
  { id: 'key2', name: 'Desarrollo — Testing', prefix: 'ncp_test_****9b1c', createdAt: '2026-01-15T00:00:00.000Z', lastUsed: '2026-07-01T10:00:00.000Z', scopes: ['patients:read', 'appointments:read'] },
]

export function getIntegrationStats(integrations: Integration[]) {
  return {
    total: integrations.length,
    connected: integrations.filter((i) => i.status === 'connected').length,
    errors: integrations.filter((i) => i.status === 'error').length,
    pending: integrations.filter((i) => i.status === 'pending').length,
  }
}
