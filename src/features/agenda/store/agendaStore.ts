import { create } from 'zustand'
import type { AgendaAppointment } from '../types'
import { MOCK_APPOINTMENTS } from '../data/mockAppointments'

interface AgendaState {
  appointments: AgendaAppointment[]
  addAppointment: (appt: AgendaAppointment) => void
  updateAppointment: (id: string, data: Partial<AgendaAppointment>) => void
  deleteAppointment: (id: string) => void
  rescheduleAppointment: (id: string, startAt: string, endAt: string) => void
}

export const useAgendaStore = create<AgendaState>((set) => ({
  appointments: MOCK_APPOINTMENTS,
  addAppointment: (appt) => set((s) => ({ appointments: [...s.appointments, appt] })),
  updateAppointment: (id, data) =>
    set((s) => ({
      appointments: s.appointments.map((a) => (a.id === id ? { ...a, ...data } : a)),
    })),
  deleteAppointment: (id) =>
    set((s) => ({ appointments: s.appointments.filter((a) => a.id !== id) })),
  rescheduleAppointment: (id, startAt, endAt) =>
    set((s) => ({
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, startAt, endAt } : a,
      ),
    })),
}))

export function getAppointmentsForDay(appointments: AgendaAppointment[], day: Date): AgendaAppointment[] {
  return appointments
    .filter((a) => {
      const d = new Date(a.startAt)
      return (
        d.getFullYear() === day.getFullYear() &&
        d.getMonth() === day.getMonth() &&
        d.getDate() === day.getDate()
      )
    })
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
}

export function getAppointmentsForRange(
  appointments: AgendaAppointment[],
  start: Date,
  end: Date,
): AgendaAppointment[] {
  return appointments.filter((a) => {
    const d = new Date(a.startAt)
    return d >= start && d <= end
  })
}
