import { useMemo } from 'react'
import { EmptyState } from '@/components/common/EmptyState'
import { CalendarDays } from 'lucide-react'
import { AppointmentCard } from './AppointmentCard'
import { getAppointmentsForDay } from '../store/agendaStore'
import type { AgendaAppointment } from '../types'
import { formatAgendaDate } from '../utils/calendarUtils'

interface AgendaDayViewProps {
  date: Date
  appointments: AgendaAppointment[]
  onSelect: (appt: AgendaAppointment) => void
}

export function AgendaDayView({ date, appointments, onSelect }: AgendaDayViewProps) {
  const dayAppts = useMemo(() => getAppointmentsForDay(appointments, date), [appointments, date])

  return (
    <div>
      <p className="mb-4 text-sm font-medium text-muted-foreground">
        {formatAgendaDate(date, "EEEE, d 'de' MMMM yyyy")}
      </p>
      {dayAppts.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="Sin citas programadas"
          description="No hay citas para este día. Crea una nueva cita."
        />
      ) : (
        <div className="space-y-3">
          {dayAppts.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} onClick={() => onSelect(appt)} />
          ))}
        </div>
      )}
    </div>
  )
}
