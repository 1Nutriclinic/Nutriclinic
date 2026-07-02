import type { ClinicalProgram } from '@/types'
import { calculateAge } from '@/utils/date'

/** Suggested programs based on age, gender and existing tags. */
export function suggestPrograms(input: {
  birthDate: string
  gender: 'male' | 'female' | 'other'
  existing?: ClinicalProgram[]
}): ClinicalProgram[] {
  const age = calculateAge(input.birthDate)
  const suggested: ClinicalProgram[] = [...(input.existing ?? [])]

  const add = (p: ClinicalProgram) => {
    if (!suggested.includes(p)) suggested.push(p)
  }

  if (age < 1) add('newborn')
  else if (age < 2) add('infant')
  else if (age < 12) add('child')
  else if (age < 18) add('adolescent')
  else if (age >= 65) add('elderly')
  else add('adult')

  return suggested
}

export const SPECIALIZED_PROGRAMS: ClinicalProgram[] = [
  'pregnant',
  'obesity',
  'child',
  'elderly',
]

export function isSpecializedProgram(program: ClinicalProgram): boolean {
  return SPECIALIZED_PROGRAMS.includes(program)
}

export function getGestationalTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1
  if (week <= 27) return 2
  return 3
}

export function getRecommendedWeightGain(preWeight: number, week: number): { min: number; max: number } {
  const bmi = preWeight / (1.65 * 1.65) // simplified; real calc uses height
  let base: { min: number; max: number }
  if (bmi < 18.5) base = { min: 12.5, max: 18 }
  else if (bmi < 25) base = { min: 11.5, max: 16 }
  else if (bmi < 30) base = { min: 7, max: 11.5 }
  else base = { min: 5, max: 9 }
  const factor = Math.min(week / 40, 1)
  return { min: +(base.min * factor).toFixed(1), max: +(base.max * factor).toFixed(1) }
}

export function calcMnaScore(answers: {
  foodIntake: number
  weightLoss: number
  mobility: number
  stress: number
  neuropsych: number
  bmi: number
}): number {
  return (
    answers.foodIntake +
    answers.weightLoss +
    answers.mobility +
    answers.stress +
    answers.neuropsych +
    (answers.bmi >= 23 ? 2 : answers.bmi >= 21 ? 1 : 0)
  )
}

export function mnaInterpretation(score: number): { label: string; variant: 'success' | 'warning' | 'danger' } {
  if (score >= 24) return { label: 'Estado nutricional normal', variant: 'success' }
  if (score >= 17) return { label: 'Riesgo de malnutrición', variant: 'warning' }
  return { label: 'Malnutrición', variant: 'danger' }
}

export function calcPercentileZScore(value: number, ageMonths: number, metric: 'weight' | 'height'): number {
  // Simplified WHO approximation for demo visualization
  const baseline = metric === 'weight' ? 3 + ageMonths * 0.15 : 50 + ageMonths * 0.8
  return +(((value - baseline) / (baseline * 0.12)).toFixed(2))
}

export function percentileFromZ(z: number): number {
  const p = 50 * (1 + Math.tanh(z * 0.7978845608))
  return Math.max(1, Math.min(99, Math.round(p)))
}
