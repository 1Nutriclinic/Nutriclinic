import type { PortalPatient, PortalActivity, PatientWeightLog, PatientWaterLog } from '../types'

export const MOCK_PORTAL_PATIENTS: PortalPatient[] = [
  { id: 'pp-001', patientId: 'p-001', name: 'María López García', email: 'maria.lopez@email.com', phone: '+51 987 654 321', lastLogin: '2026-07-02T08:15:00Z', portalEnabled: true, dietAccess: true, appointmentsAccess: true, evolutionAccess: true, messagesAccess: true },
  { id: 'pp-002', patientId: 'p-002', name: 'Carlos Mendoza Vega', email: 'carlos.mendoza@email.com', phone: '+51 912 345 678', lastLogin: '2026-07-01T19:30:00Z', portalEnabled: true, dietAccess: true, appointmentsAccess: true, evolutionAccess: true, messagesAccess: false },
  { id: 'pp-003', patientId: 'p-003', name: 'Lucía Ramírez Torres', email: 'lucia.ramirez@email.com', phone: '+51 998 765 432', lastLogin: '2026-07-02T07:00:00Z', portalEnabled: true, dietAccess: true, appointmentsAccess: true, evolutionAccess: true, messagesAccess: true },
  { id: 'pp-004', patientId: 'p-004', name: 'Diego Castillo Paredes', email: 'diego.castillo@email.com', phone: '+51 945 678 901', portalEnabled: false, dietAccess: false, appointmentsAccess: false, evolutionAccess: false, messagesAccess: false },
  { id: 'pp-005', patientId: 'p-005', name: 'Rosa Vargas Quispe', email: 'rosa.vargas@email.com', phone: '+51 923 456 789', lastLogin: '2026-06-28T10:00:00Z', portalEnabled: true, dietAccess: true, appointmentsAccess: true, evolutionAccess: true, messagesAccess: true },
]

export const MOCK_PORTAL_ACTIVITY: PortalActivity[] = [
  { id: 'pa-1', patientId: 'p-001', patientName: 'María López García', type: 'weight_log', description: 'Registró peso: 78.4 kg', timestamp: '2026-07-02T08:15:00Z' },
  { id: 'pa-2', patientId: 'p-001', patientName: 'María López García', type: 'water_log', description: 'Registró 500 ml de agua', timestamp: '2026-07-02T10:30:00Z' },
  { id: 'pa-3', patientId: 'p-003', patientName: 'Lucía Ramírez Torres', type: 'meal_log', description: 'Registró almuerzo: ensalada + pollo', timestamp: '2026-07-02T13:45:00Z' },
  { id: 'pa-4', patientId: 'p-001', patientName: 'María López García', type: 'file_download', description: 'Descargó plan alimenticio PDF', timestamp: '2026-07-01T16:00:00Z' },
  { id: 'pa-5', patientId: 'p-005', patientName: 'Rosa Vargas Quispe', type: 'login', description: 'Inició sesión en el portal', timestamp: '2026-06-28T10:00:00Z' },
  { id: 'pa-6', patientId: 'p-002', patientName: 'Carlos Mendoza Vega', type: 'weight_log', description: 'Registró peso: 82.1 kg', timestamp: '2026-07-01T19:30:00Z' },
]

export const DEMO_WEIGHT_LOGS: PatientWeightLog[] = [
  { date: '2026-04-28', weight: 81.2 },
  { date: '2026-05-28', weight: 79.6 },
  { date: '2026-06-28', weight: 78.4 },
  { date: '2026-07-02', weight: 78.1 },
]

export const DEMO_WATER_LOG: PatientWaterLog = { date: '2026-07-02', ml: 1500, target: 2000 }
