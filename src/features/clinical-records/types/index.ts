export interface PersonalInfo {
  bloodType?: string
  allergies: string[]
  emergencyContact?: string
  emergencyPhone?: string
  address?: string
  occupation?: string
  maritalStatus?: string
  insurance?: string
}

export interface Antecedents {
  personal: string[]
  family: string[]
  surgical: string[]
  medications: string[]
  habits: string
}

export interface ConsultationEntry {
  id: string
  date: string
  type: string
  reason: string
  notes: string
  nutritionist: string
}

export interface DiagnosisEntry {
  code?: string
  description: string
  date: string
  status: 'active' | 'resolved'
  notes?: string
}

export interface LabResult {
  id: string
  date: string
  test: string
  value: string
  unit: string
  reference: string
  status: 'normal' | 'high' | 'low'
}

export interface AnthropometryEntry {
  id: string
  date: string
  weight: number
  height: number
  imc: number
  waist?: number
  hip?: number
  arm?: number
}

export interface BioimpedanceEntry {
  id: string
  date: string
  fatPercent: number
  muscleMass: number
  visceralFat: number
  waterPercent: number
  metabolicAge: number
  bmr: number
}

export interface ClinicalPhoto {
  id: string
  date: string
  label: string
  type: 'front' | 'side' | 'progress'
}

export interface DietPlanEntry {
  id: string
  date: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  status: 'active' | 'archived'
}

export interface RecipeEntry {
  id: string
  name: string
  category: string
  calories: number
  prepTime: string
}

export interface FollowUpEntry {
  id: string
  date: string
  type: string
  adherence: number
  notes: string
  nextDate?: string
}

export interface ClinicalFile {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
}

export interface ConsentEntry {
  id: string
  title: string
  signedAt?: string
  status: 'signed' | 'pending'
}

export interface ClinicalNote {
  id: string
  date: string
  author: string
  content: string
  pinned?: boolean
}

export interface ClinicalRecord {
  patientId: string
  personalInfo: PersonalInfo
  antecedents: Antecedents
  consultations: ConsultationEntry[]
  diagnoses: DiagnosisEntry[]
  labResults: LabResult[]
  anthropometry: AnthropometryEntry[]
  bioimpedance: BioimpedanceEntry[]
  photos: ClinicalPhoto[]
  dietPlans: DietPlanEntry[]
  recipes: RecipeEntry[]
  followUps: FollowUpEntry[]
  files: ClinicalFile[]
  consents: ConsentEntry[]
  notes: ClinicalNote[]
}

export type ClinicalRecordTab =
  | 'info'
  | 'antecedents'
  | 'consultation'
  | 'diagnosis'
  | 'laboratory'
  | 'anthropometry'
  | 'bioimpedance'
  | 'photos'
  | 'diet'
  | 'recipes'
  | 'followup'
  | 'files'
  | 'consents'
  | 'notes'

export const CLINICAL_TABS: { key: ClinicalRecordTab; label: string }[] = [
  { key: 'info', label: 'Información' },
  { key: 'antecedents', label: 'Antecedentes' },
  { key: 'consultation', label: 'Consulta' },
  { key: 'diagnosis', label: 'Diagnóstico' },
  { key: 'laboratory', label: 'Laboratorio' },
  { key: 'anthropometry', label: 'Antropometría' },
  { key: 'bioimpedance', label: 'Bioimpedancia' },
  { key: 'photos', label: 'Fotografías' },
  { key: 'diet', label: 'Dieta' },
  { key: 'recipes', label: 'Recetas' },
  { key: 'followup', label: 'Seguimiento' },
  { key: 'files', label: 'Archivos' },
  { key: 'consents', label: 'Consentimientos' },
  { key: 'notes', label: 'Notas' },
]
