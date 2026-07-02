import type { AgendaAppointment } from '../types'

function appt(
  id: string,
  patientId: string,
  patientName: string,
  date: string,
  hour: number,
  minute: number,
  durationMin: number,
  type: string,
  program: AgendaAppointment['program'],
  status: AgendaAppointment['status'],
  nutritionistId = 'u-001',
  nutritionistName = 'Dra. Ana Ruiz',
): AgendaAppointment {
  const start = new Date(`${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`)
  const end = new Date(start.getTime() + durationMin * 60_000)
  return {
    id,
    patientId,
    patientName,
    nutritionistId,
    nutritionistName,
    branchId: 'b-001',
    branchName: 'Sede Miraflores',
    type,
    program,
    startAt: start.toISOString(),
    endAt: end.toISOString(),
    status,
    reminderSent: status !== 'scheduled',
  }
}

/** Base date: today in demo (Jul 2, 2026) */
const TODAY = '2026-07-02'
const MON = '2026-06-30'
const TUE = '2026-07-01'
const WED = '2026-07-02'
const THU = '2026-07-03'
const FRI = '2026-07-04'

export const MOCK_APPOINTMENTS: AgendaAppointment[] = [
  // Today
  appt('a-001', 'p-001', 'María López García', WED, 8, 30, 45, 'Primera consulta', 'obesity', 'completed'),
  appt('a-002', 'p-002', 'Carlos Mendoza Vega', WED, 9, 15, 30, 'Seguimiento', 'hypertension', 'in_progress'),
  appt('a-003', 'p-003', 'Lucía Ramírez Torres', WED, 10, 0, 45, 'Control gestante', 'pregnant', 'confirmed'),
  appt('a-004', 'p-004', 'Diego Castillo Paredes', WED, 11, 30, 30, 'Control pediátrico', 'child', 'confirmed'),
  appt('a-005', 'p-006', 'Andrea Flores Díaz', WED, 12, 15, 30, 'Plan alimenticio', 'sports', 'scheduled'),
  appt('a-006', 'p-007', 'Jorge Silva Rojas', WED, 16, 0, 45, 'Bioimpedancia', 'bariatric', 'confirmed'),
  appt('a-007', 'p-005', 'Rosa Vargas Quispe', WED, 17, 0, 30, 'Seguimiento', 'elderly', 'scheduled'),
  // Tomorrow
  appt('a-008', 'p-009', 'Miguel Torres Arias', THU, 9, 0, 45, 'Seguimiento', 'renal', 'scheduled'),
  appt('a-009', 'p-010', 'Elena Morales Castro', THU, 10, 30, 30, 'Antropometría', 'adolescent', 'confirmed'),
  appt('a-010', 'p-008', 'Patricia Gutiérrez Luna', THU, 14, 0, 45, 'Primera consulta', 'eating_disorder', 'scheduled'),
  // Yesterday
  appt('a-011', 'p-001', 'María López García', TUE, 9, 0, 30, 'Seguimiento', 'obesity', 'completed'),
  appt('a-012', 'p-012', 'Camila Núñez Salas', TUE, 11, 0, 30, 'Control pediátrico', 'newborn', 'completed'),
  // Week
  appt('a-013', 'p-002', 'Carlos Mendoza Vega', MON, 10, 0, 30, 'Seguimiento', 'overweight', 'completed'),
  appt('a-014', 'p-003', 'Lucía Ramírez Torres', FRI, 9, 30, 45, 'Control gestante', 'pregnant', 'scheduled'),
  appt('a-015', 'p-004', 'Diego Castillo Paredes', FRI, 15, 0, 30, 'Antropometría', 'child', 'scheduled'),
  // Next week
  appt('a-016', 'p-005', 'Rosa Vargas Quispe', '2026-07-09', 8, 0, 30, 'Seguimiento', 'elderly', 'scheduled'),
  appt('a-017', 'p-006', 'Andrea Flores Díaz', '2026-07-10', 11, 0, 45, 'Primera consulta', 'sports', 'scheduled'),
]

export { TODAY as AGENDA_TODAY }
