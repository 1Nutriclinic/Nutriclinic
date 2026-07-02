export interface PortalPatient {
  id: string
  patientId: string
  name: string
  email: string
  phone: string
  lastLogin?: string
  portalEnabled: boolean
  dietAccess: boolean
  appointmentsAccess: boolean
  evolutionAccess: boolean
  messagesAccess: boolean
}

export interface PortalActivity {
  id: string
  patientId: string
  patientName: string
  type: 'weight_log' | 'water_log' | 'meal_log' | 'login' | 'message' | 'file_download'
  description: string
  timestamp: string
}

export interface PatientWeightLog {
  date: string
  weight: number
}

export interface PatientWaterLog {
  date: string
  ml: number
  target: number
}
