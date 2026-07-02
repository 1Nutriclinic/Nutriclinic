import { CheckCircle2, Circle, Clock, Loader2 } from 'lucide-react'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { todayAppointments, type Appointment } from '../data/mockData'
import { cn } from '@/utils/cn'

const statusConfig: Record<
  Appointment['status'],
  { label: string; icon: typeof Circle; className: string }
> = {
  done: { label: 'Atendido', icon: CheckCircle2, className: 'text-success' },
  in_progress: { label: 'En consulta', icon: Loader2, className: 'text-primary' },
  confirmed: { label: 'Confirmado', icon: Circle, className: 'text-muted-foreground' },
  pending: { label: 'Pendiente', icon: Clock, className: 'text-warning' },
}

export function TodayAgenda() {
  return (
    <ul className="space-y-1">
      {todayAppointments.map((appt) => {
        const cfg = statusConfig[appt.status]
        const Icon = cfg.icon
        return (
          <li
            key={appt.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
          >
            <div className="flex w-12 shrink-0 flex-col items-center">
              <span className="font-mono text-sm font-semibold text-foreground">{appt.time}</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{appt.patient}</p>
              <p className="truncate text-xs text-muted-foreground">{appt.type}</p>
            </div>
            <ProgramBadge program={appt.program} className="hidden sm:inline-flex" />
            <span className={cn('flex items-center gap-1 text-xs font-medium', cfg.className)}>
              <Icon className={cn('h-3.5 w-3.5', appt.status === 'in_progress' && 'animate-spin')} />
              <span className="hidden md:inline">{cfg.label}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
