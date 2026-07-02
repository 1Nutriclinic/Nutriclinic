import { useMemo } from 'react'
import type { ClinicalProgram, Patient, PatientStatus } from '@/types'
import { usePatientsStore } from '../store/patientsStore'

export interface PatientFilters {
  search: string
  status: PatientStatus | 'all'
  program: ClinicalProgram | 'all'
  nutritionistId: string | 'all'
  branchId: string | 'all'
}

export const DEFAULT_FILTERS: PatientFilters = {
  search: '',
  status: 'all',
  program: 'all',
  nutritionistId: 'all',
  branchId: 'all',
}

export function useFilteredPatients(filters: PatientFilters) {
  const patients = usePatientsStore((s) => s.patients)

  return useMemo(() => {
    const q = filters.search.trim().toLowerCase()

    return patients.filter((p) => {
      if (filters.status !== 'all' && p.status !== filters.status) return false
      if (filters.program !== 'all' && !p.programs.includes(filters.program)) return false
      if (filters.nutritionistId !== 'all' && p.nutritionistId !== filters.nutritionistId)
        return false
      if (filters.branchId !== 'all' && p.branchId !== filters.branchId) return false

      if (q) {
        const haystack = [
          p.firstName,
          p.lastName,
          `${p.firstName} ${p.lastName}`,
          p.documentId,
          p.email ?? '',
          p.phone ?? '',
          p.nutritionistName,
          p.branchName,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }

      return true
    })
  }, [patients, filters])
}

export function usePatientById(id: string | undefined): Patient | undefined {
  const patients = usePatientsStore((s) => s.patients)
  return useMemo(() => patients.find((p) => p.id === id), [patients, id])
}

export function usePatientStats() {
  const patients = usePatientsStore((s) => s.patients)

  return useMemo(
    () => ({
      total: patients.length,
      active: patients.filter((p) => p.status === 'active').length,
      leads: patients.filter((p) => p.status === 'lead').length,
      abandoned: patients.filter((p) => p.status === 'abandoned').length,
    }),
    [patients],
  )
}
