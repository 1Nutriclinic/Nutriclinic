import type { ClinicalProgram } from '@/types'

export interface EvolutionPoint {
  month: string
  activos: number
  nuevos: number
  altas: number
}

export const evolutionData: EvolutionPoint[] = [
  { month: 'Ene', activos: 620, nuevos: 48, altas: 12 },
  { month: 'Feb', activos: 665, nuevos: 62, altas: 17 },
  { month: 'Mar', activos: 712, nuevos: 71, altas: 24 },
  { month: 'Abr', activos: 748, nuevos: 58, altas: 22 },
  { month: 'May', activos: 803, nuevos: 82, altas: 27 },
  { month: 'Jun', activos: 861, nuevos: 91, altas: 33 },
  { month: 'Jul', activos: 924, nuevos: 104, altas: 41 },
]

export interface ImcBucket {
  range: string
  pacientes: number
  fill: string
}

export const imcData: ImcBucket[] = [
  { range: 'Bajo peso', pacientes: 62, fill: '#60a5fa' },
  { range: 'Normal', pacientes: 318, fill: '#10b981' },
  { range: 'Sobrepeso', pacientes: 274, fill: '#f59e0b' },
  { range: 'Obesidad I', pacientes: 168, fill: '#f97316' },
  { range: 'Obesidad II+', pacientes: 102, fill: '#ef4444' },
]

export interface ProgramSlice {
  program: ClinicalProgram
  label: string
  value: number
  fill: string
}

export const programsData: ProgramSlice[] = [
  { program: 'obesity', label: 'Obesidad', value: 268, fill: '#ef4444' },
  { program: 'overweight', label: 'Sobrepeso', value: 214, fill: '#f59e0b' },
  { program: 'diabetes', label: 'Diabetes', value: 156, fill: '#8b5cf6' },
  { program: 'sports', label: 'Deportistas', value: 132, fill: '#10b981' },
  { program: 'pregnant', label: 'Gestantes', value: 98, fill: '#ec4899' },
  { program: 'child', label: 'Pediatría', value: 86, fill: '#06b6d4' },
]

export interface Appointment {
  id: string
  time: string
  patient: string
  type: string
  program: ClinicalProgram
  status: 'confirmed' | 'pending' | 'in_progress' | 'done'
}

export const todayAppointments: Appointment[] = [
  { id: 'a1', time: '08:30', patient: 'María López', type: 'Primera consulta', program: 'obesity', status: 'done' },
  { id: 'a2', time: '09:15', patient: 'Carlos Ruiz', type: 'Seguimiento', program: 'diabetes', status: 'in_progress' },
  { id: 'a3', time: '10:00', patient: 'Lucía Fernández', type: 'Control gestante', program: 'pregnant', status: 'confirmed' },
  { id: 'a4', time: '11:30', patient: 'Diego Salazar', type: 'Antropometría', program: 'sports', status: 'confirmed' },
  { id: 'a5', time: '12:15', patient: 'Sofía Ramírez', type: 'Plan alimenticio', program: 'overweight', status: 'pending' },
  { id: 'a6', time: '16:00', patient: 'Andrés Peña', type: 'Bioimpedancia', program: 'bariatric', status: 'confirmed' },
]

export interface AlertItem {
  id: string
  level: 'danger' | 'warning' | 'info'
  title: string
  detail: string
}

export const alerts: AlertItem[] = [
  { id: 'al1', level: 'danger', title: '3 pacientes en riesgo nutricional', detail: 'MNA < 17 · requieren evaluación urgente' },
  { id: 'al2', level: 'warning', title: '12 seguimientos vencidos', detail: 'Sin control por más de 30 días' },
  { id: 'al3', level: 'warning', title: 'Stock bajo: Proteína Whey', detail: 'Quedan 8 unidades en Sucursal Central' },
  { id: 'al4', level: 'info', title: '5 consentimientos pendientes', detail: 'Firmas digitales por completar' },
]

export interface RecentConsult {
  id: string
  patient: string
  program: ClinicalProgram
  date: string
  weightChange: number
  nutritionist: string
}

export const recentConsults: RecentConsult[] = [
  { id: 'r1', patient: 'María López', program: 'obesity', date: 'Hoy, 08:30', weightChange: -1.8, nutritionist: 'Dra. Ana Martínez' },
  { id: 'r2', patient: 'Carlos Ruiz', program: 'diabetes', date: 'Hoy, 09:15', weightChange: -0.6, nutritionist: 'Dra. Ana Martínez' },
  { id: 'r3', patient: 'Elena Torres', program: 'bariatric', date: 'Ayer, 17:40', weightChange: -3.2, nutritionist: 'Lic. Jorge Díaz' },
  { id: 'r4', patient: 'Pedro Gómez', program: 'sports', date: 'Ayer, 16:10', weightChange: 0.9, nutritionist: 'Lic. Jorge Díaz' },
  { id: 'r5', patient: 'Rosa Medina', program: 'renal', date: 'Ayer, 11:00', weightChange: -0.3, nutritionist: 'Dra. Ana Martínez' },
]
