import { useMemo } from 'react'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { cn } from '@/utils/cn'
import { getAppointmentsForDay } from '../store/agendaStore'
import type { AgendaAppointment } from '../types'
import { formatAgendaTime, getWeekDays, HOUR_SLOTS } from '../utils/calendarUtils'
import { isToday, formatAgendaDate } from '../utils/calendarUtils'

interface AgendaWeekViewProps {
  date: Date
  appointments: AgendaAppointment[]
  onSelect: (appt: AgendaAppointment) => void
  onDrop: (appointmentId: string, day: Date, hour: number) => void
}

export function AgendaWeekView({ date, appointments, onSelect, onDrop }: AgendaWeekViewProps) {
  const weekDays = useMemo(() => getWeekDays(date), [date])

  const handleDrop = (e: React.DragEvent, day: Date, hour: number) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('appointmentId')
    if (id) onDrop(id, day, hour)
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
          <div />
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                'border-l border-border px-2 py-3 text-center',
                isToday(day) && 'bg-primary/5',
              )}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {formatAgendaDate(day, 'EEE')}
              </p>
              <p className={cn(
                'mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold',
                isToday(day) ? 'bg-primary text-primary-foreground' : 'text-foreground',
              )}>
                {day.getDate()}
              </p>
            </div>
          ))}
        </div>

        {/* Time grid */}
        {HOUR_SLOTS.map((hour) => (
          <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border/50">
            <div className="py-3 pr-2 text-right text-[10px] font-mono text-muted-foreground">
              {String(hour).padStart(2, '0')}:00
            </div>
            {weekDays.map((day) => {
              const slotAppts = getAppointmentsForDay(appointments, day).filter((a) => {
                const h = new Date(a.startAt).getHours()
                return h === hour
              })
              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={cn(
                    'min-h-[64px] border-l border-border p-1 transition-colors',
                    isToday(day) && 'bg-primary/[0.02]',
                    'hover:bg-muted/30',
                  )}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, day, hour)}
                >
                  {slotAppts.map((appt) => (
                    <div
                      key={appt.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('appointmentId', appt.id)}
                      onClick={() => onSelect(appt)}
                      className="mb-1 cursor-grab rounded-md border border-border bg-card px-1.5 py-1 text-[10px] shadow-sm active:cursor-grabbing hover:shadow-card"
                    >
                      <span className="font-mono font-semibold text-primary">
                        {formatAgendaTime(appt.startAt)}
                      </span>
                      <p className="truncate font-medium text-foreground">{appt.patientName}</p>
                      <ProgramBadge program={appt.program} className="mt-0.5 scale-90 origin-left" />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
