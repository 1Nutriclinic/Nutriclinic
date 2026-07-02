export interface ExecutiveKpi {
  label: string
  value: string
  target: string
  progress: number
  trend: 'up' | 'down' | 'flat'
  delta: string
}

export interface BranchPerformance {
  branch: string
  patients: number
  revenue: number
  margin: number
  satisfaction: number
  goalProgress: number
}

export interface StrategicGoal {
  id: string
  title: string
  category: 'financial' | 'clinical' | 'operational'
  current: number
  target: number
  unit: string
  deadline: string
}

export interface ExecutiveProjection {
  month: string
  projected: number
  actual?: number
  target: number
}
