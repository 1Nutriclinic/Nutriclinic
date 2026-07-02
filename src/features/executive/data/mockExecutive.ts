import type { BranchPerformance, ExecutiveKpi, ExecutiveProjection, StrategicGoal } from '../types'

export const EXECUTIVE_KPIS: ExecutiveKpi[] = [
  { label: 'Ingresos consolidados', value: 'S/ 894,200', target: 'S/ 950,000', progress: 94, trend: 'up', delta: '+6.2%' },
  { label: 'EBITDA clínico', value: 'S/ 312,400', target: 'S/ 340,000', progress: 92, trend: 'up', delta: '+8.1%' },
  { label: 'Pacientes activos', value: '2,847', target: '3,000', progress: 95, trend: 'up', delta: '+7.3%' },
  { label: 'Tasa de retención', value: '86.4%', target: '88%', progress: 98, trend: 'up', delta: '+1.2pp' },
  { label: 'Consultas / mes', value: '4,218', target: '4,500', progress: 94, trend: 'up', delta: '+5.8%' },
  { label: 'NPS pacientes', value: '72', target: '75', progress: 96, trend: 'flat', delta: '0' },
]

export const BRANCH_PERFORMANCE: BranchPerformance[] = [
  { branch: 'Miraflores', patients: 412, revenue: 384200, margin: 38, satisfaction: 4.6, goalProgress: 96 },
  { branch: 'San Isidro', patients: 328, revenue: 312800, margin: 35, satisfaction: 4.4, goalProgress: 88 },
  { branch: 'Surco', patients: 184, revenue: 197200, margin: 32, satisfaction: 4.2, goalProgress: 79 },
]

export const STRATEGIC_GOALS: StrategicGoal[] = [
  { id: 'g1', title: 'Facturación anual', category: 'financial', current: 894200, target: 9500000, unit: 'S/', deadline: '2026-12-31' },
  { id: 'g2', title: 'Nuevos pacientes Q3', category: 'clinical', current: 312, target: 400, unit: 'pac.', deadline: '2026-09-30' },
  { id: 'g3', title: 'Adherencia media global', category: 'clinical', current: 82, target: 88, unit: '%', deadline: '2026-12-31' },
  { id: 'g4', title: 'Reducir abandono', category: 'operational', current: 4.2, target: 3.0, unit: '%', deadline: '2026-10-31' },
  { id: 'g5', title: 'Automatizar recordatorios', category: 'operational', current: 68, target: 95, unit: '%', deadline: '2026-08-31' },
]

export const REVENUE_PROJECTION: ExecutiveProjection[] = [
  { month: 'Ene', projected: 62000, actual: 61800, target: 60000 },
  { month: 'Feb', projected: 68500, actual: 69200, target: 65000 },
  { month: 'Mar', projected: 71200, actual: 70800, target: 70000 },
  { month: 'Abr', projected: 74800, actual: 75100, target: 72000 },
  { month: 'May', projected: 80300, actual: 81200, target: 78000 },
  { month: 'Jun', projected: 84200, actual: 83900, target: 82000 },
  { month: 'Jul', projected: 89400, actual: 89400, target: 85000 },
  { month: 'Ago', projected: 92800, target: 88000 },
  { month: 'Sep', projected: 96200, target: 91000 },
  { month: 'Oct', projected: 99800, target: 94000 },
  { month: 'Nov', projected: 103200, target: 97000 },
  { month: 'Dic', projected: 108500, target: 100000 },
]

export const PROGRAM_PROFITABILITY = [
  { program: 'Obesidad', revenue: 286400, cost: 142800, margin: 50 },
  { program: 'Diabetes', revenue: 168200, cost: 92400, margin: 45 },
  { program: 'Deportistas', revenue: 124800, cost: 62400, margin: 50 },
  { program: 'Gestantes', revenue: 98200, cost: 58900, margin: 40 },
  { program: 'Pediatría', revenue: 86400, cost: 51800, margin: 40 },
  { program: 'Adulto mayor', revenue: 72200, cost: 43300, margin: 40 },
]
