import { useMemo } from 'react'
import { cn } from '@/utils/cn'
import { getAppointmentsForDay } from '../store/agendaStore'
import type { AgendaAppointment } from '../types'
import { getMonthDays, isSameMonth, isToday, formatAgendaTime } from '../utils/calendarUtils'

interface AgendaMonthViewProps {
  date: Date
  appointments: AgendaAppointment[]
  onSelectDay: (day: Date) => void
}

export function AgendaMonthView({ date, appointments, onSelectDay }: AgendaMonthViewProps) {
  const days = useMemo(() => getMonthDays(date), [date])

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-px">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
          <div key={d} className="py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px rounded-xl border border-border bg-border overflow-hidden">
        {days.map((day) => {
          const dayAppts = getAppointmentsForDay(appointments, day)
          const inMonth = isSameMonth(day, date)
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDay(day)}
              className={cn(
                'min-h-[88px] bg-card p-2 text-left transition-colors hover:bg-muted/40',
                !inMonth && 'bg-muted/20 text-muted-foreground',
                isToday(day) && 'ring-2 ring-inset ring-primary',
              )}
            >
              <span className={cn(
                'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                isToday(day) ? 'bg-primary text-primary-foreground' : '',
              )}>
                {day.getDate()}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayAppts.slice(0, 3).map((a) => (
                  <div key={a.id} className="truncate rounded bg-primary/10 px-1 py-0.5 text-[9px] font-medium text-primary">
                    {formatAgendaTime(a.startAt)} {a.patientName.split(' ')[0]}
                  </div>
                ))}
                {dayAppts.length > 3 && (
                  <p className="text-[9px] text-muted-foreground">+{dayAppts.length - 3} más</p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
