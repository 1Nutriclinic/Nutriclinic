import type { ClinicalProgram } from '@/types'

export interface PregnantProgramData {
  gestationalWeek: number
  prePregnancyWeight: number
  currentWeight: number
  glucoseReadings: { date: string; value: number; fasting: boolean }[]
  bloodPressure: { date: string; systolic: number; diastolic: number }[]
  edema: 'none' | 'mild' | 'moderate' | 'severe'
  supplementation: string[]
  lactationPlanning: string
  weightHistory: { week: number; weight: number }[]
}

export interface ObesityProgramData {
  initialWeight: number
  currentWeight: number
  targetWeight: number
  waist: number
  imc: number
  fatPercent: number
  muscleMass: number
  visceralFat: number
  metabolicAge: number
  activityLevel: string
  adherence: number
  anxietyScore: number
  sleepHours: number
  weightHistory: { date: string; weight: number }[]
}

export interface PediatricsProgramData {
  ageMonths: number
  weight: number
  height: number
  headCircumference: number
  weightZScore: number
  heightZScore: number
  weightPercentile: number
  heightPercentile: number
  developmentMilestones: string[]
  breastfeeding: string
  complementaryFeeding: string
}

export interface ElderlyProgramData {
  mnaScore: number
  sarcopeniaRisk: 'low' | 'moderate' | 'high'
  fragilityScore: number
  hydrationMl: number
  chewingDifficulty: boolean
  swallowingDifficulty: boolean
  nutritionalRisk: 'low' | 'moderate' | 'high'
  notes: string
}

export interface ProgramPatientData {
  patientId: string
  pregnant?: PregnantProgramData
  obesity?: ObesityProgramData
  pediatrics?: PediatricsProgramData
  elderly?: ElderlyProgramData
  lastUpdated: string
}

export const PROGRAM_CATEGORIES = [
  { key: 'ciclo_vital', label: 'Ciclo vital', programs: ['newborn', 'infant', 'child', 'adolescent', 'adult', 'elderly', 'pregnant', 'lactation'] as ClinicalProgram[] },
  { key: 'metabolico', label: 'Metabólico', programs: ['obesity', 'overweight', 'diabetes'] as ClinicalProgram[] },
  { key: 'clinico', label: 'Clínico', programs: ['hypertension', 'renal', 'oncology'] as ClinicalProgram[] },
  { key: 'especializado', label: 'Especializado', programs: ['sports', 'bariatric', 'eating_disorder'] as ClinicalProgram[] },
]
