import type { ClinicalProgram } from '@/types'

export interface ProgramMeta {
  key: ClinicalProgram
  label: string
  category: 'ciclo_vital' | 'metabolico' | 'clinico' | 'especializado'
  /** Tailwind classes for the badge look. */
  className: string
}

export const PROGRAMS: Record<ClinicalProgram, ProgramMeta> = {
  newborn: { key: 'newborn', label: 'Recién nacido', category: 'ciclo_vital', className: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' },
  infant: { key: 'infant', label: 'Lactante', category: 'ciclo_vital', className: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' },
  child: { key: 'child', label: 'Niño', category: 'ciclo_vital', className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300' },
  adolescent: { key: 'adolescent', label: 'Adolescente', category: 'ciclo_vital', className: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300' },
  adult: { key: 'adult', label: 'Adulto', category: 'ciclo_vital', className: 'bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300' },
  elderly: { key: 'elderly', label: 'Adulto Mayor', category: 'ciclo_vital', className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300' },
  pregnant: { key: 'pregnant', label: 'Gestante', category: 'ciclo_vital', className: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300' },
  lactation: { key: 'lactation', label: 'Lactancia', category: 'ciclo_vital', className: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300' },
  obesity: { key: 'obesity', label: 'Obesidad', category: 'metabolico', className: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300' },
  overweight: { key: 'overweight', label: 'Sobrepeso', category: 'metabolico', className: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300' },
  diabetes: { key: 'diabetes', label: 'Diabetes', category: 'metabolico', className: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300' },
  hypertension: { key: 'hypertension', label: 'Hipertensión', category: 'clinico', className: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300' },
  renal: { key: 'renal', label: 'Renal', category: 'clinico', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300' },
  oncology: { key: 'oncology', label: 'Oncológico', category: 'clinico', className: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300' },
  sports: { key: 'sports', label: 'Deportista', category: 'especializado', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' },
  bariatric: { key: 'bariatric', label: 'Bariátrico', category: 'especializado', className: 'bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300' },
  eating_disorder: { key: 'eating_disorder', label: 'T. Alimentario', category: 'especializado', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300' },
}

export const PROGRAM_LIST: ProgramMeta[] = Object.values(PROGRAMS)
