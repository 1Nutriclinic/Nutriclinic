import { create } from 'zustand'
import type { Patient } from '@/types'
import { MOCK_PATIENTS } from '../data/mockPatients'

interface PatientsState {
  patients: Patient[]
  setPatients: (patients: Patient[]) => void
  addPatient: (patient: Patient) => void
  updatePatient: (id: string, data: Partial<Patient>) => void
  deletePatient: (id: string) => void
  importPatients: (patients: Patient[]) => void
}

export const usePatientsStore = create<PatientsState>((set) => ({
  patients: MOCK_PATIENTS,
  setPatients: (patients) => set({ patients }),
  addPatient: (patient) => set((s) => ({ patients: [patient, ...s.patients] })),
  updatePatient: (id, data) =>
    set((s) => ({
      patients: s.patients.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),
  deletePatient: (id) => set((s) => ({ patients: s.patients.filter((p) => p.id !== id) })),
  importPatients: (patients) =>
    set((s) => ({ patients: [...patients, ...s.patients] })),
}))
