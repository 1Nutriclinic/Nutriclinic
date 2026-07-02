import type { ProgramPatientData } from '../types'

export const MOCK_PROGRAM_DATA: Record<string, ProgramPatientData> = {
  'p-001': {
    patientId: 'p-001',
    obesity: {
      initialWeight: 85.2,
      currentWeight: 78.4,
      targetWeight: 68,
      waist: 92,
      imc: 29.9,
      fatPercent: 38.2,
      muscleMass: 24.1,
      visceralFat: 12,
      metabolicAge: 42,
      activityLevel: 'Ligera (1-2 días/semana)',
      adherence: 82,
      anxietyScore: 4,
      sleepHours: 6.5,
      weightHistory: [
        { date: '2026-04-28', weight: 81.2 },
        { date: '2026-05-28', weight: 79.6 },
        { date: '2026-06-28', weight: 78.4 },
      ],
    },
    lastUpdated: '2026-06-28T09:30:00Z',
  },
  'p-003': {
    patientId: 'p-003',
    pregnant: {
      gestationalWeek: 28,
      prePregnancyWeight: 62,
      currentWeight: 69.5,
      glucoseReadings: [
        { date: '2026-06-15', value: 98, fasting: true },
        { date: '2026-06-28', value: 112, fasting: false },
      ],
      bloodPressure: [
        { date: '2026-06-15', systolic: 118, diastolic: 76 },
        { date: '2026-06-28', systolic: 122, diastolic: 80 },
      ],
      edema: 'mild',
      supplementation: ['Ácido fólico 400mcg', 'Hierro 60mg', 'Calcio 500mg', 'DHA 200mg'],
      lactationPlanning: 'Planifica lactancia exclusiva 6 meses. Curso prenatal programado.',
      weightHistory: [
        { week: 12, weight: 63.2 },
        { week: 20, weight: 66.8 },
        { week: 28, weight: 69.5 },
      ],
    },
    lastUpdated: '2026-07-01T10:00:00Z',
  },
  'p-004': {
    patientId: 'p-004',
    pediatrics: {
      ageMonths: 134,
      weight: 42,
      height: 148,
      headCircumference: 52,
      weightZScore: 0.8,
      heightZScore: 0.5,
      weightPercentile: 72,
      heightPercentile: 65,
      developmentMilestones: ['Desarrollo motor normal', 'Lenguaje acorde a edad', 'Socialización adecuada'],
      breastfeeding: 'No aplica (edad escolar)',
      complementaryFeeding: 'Alimentación variada. Preferencia por ultraprocesados — en intervención.',
    },
    lastUpdated: '2026-06-25T15:30:00Z',
  },
  'p-005': {
    patientId: 'p-005',
    elderly: {
      mnaScore: 19,
      sarcopeniaRisk: 'moderate',
      fragilityScore: 4,
      hydrationMl: 1200,
      chewingDifficulty: true,
      swallowingDifficulty: false,
      nutritionalRisk: 'moderate',
      notes: 'Dificultad para masticar carnes rojas. Texturas blandas recomendadas. Suplemento proteico 15g/día.',
    },
    lastUpdated: '2026-06-29T08:00:00Z',
  },
}

export function getProgramPatientData(patientId: string): ProgramPatientData {
  return (
    MOCK_PROGRAM_DATA[patientId] ?? {
      patientId,
      lastUpdated: new Date().toISOString(),
    }
  )
}
