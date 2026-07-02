import type { TelehealthSession } from '../types'

export const MOCK_TELEHEALTH: TelehealthSession[] = [
  { id: 'th-001', patientId: 'p-006', patientName: 'Andrea Flores Díaz', nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz', scheduledAt: '2026-07-02T14:00:00Z', status: 'waiting', recordingEnabled: true },
  { id: 'th-002', patientId: 'p-009', patientName: 'Miguel Torres Arias', nutritionistId: 'u-002', nutritionistName: 'Lic. Pedro Soto', scheduledAt: '2026-07-02T15:30:00Z', status: 'scheduled', recordingEnabled: false },
  { id: 'th-003', patientId: 'p-001', patientName: 'María López García', nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz', scheduledAt: '2026-07-02T11:00:00Z', startedAt: '2026-07-02T11:02:00Z', endedAt: '2026-07-02T11:35:00Z', status: 'completed', duration: 33, notes: 'Control mensual. Buena adherencia.', recordingEnabled: true },
  { id: 'th-004', patientId: 'p-008', patientName: 'Patricia Gutiérrez Luna', nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz', scheduledAt: '2026-07-03T10:00:00Z', status: 'scheduled', recordingEnabled: true },
  { id: 'th-005', patientId: 'p-010', patientName: 'Elena Morales Castro', nutritionistId: 'u-003', nutritionistName: 'Lic. Sofía Herrera', scheduledAt: '2026-07-01T16:00:00Z', status: 'cancelled', recordingEnabled: false },
]
