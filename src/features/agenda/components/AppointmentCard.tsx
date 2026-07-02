import { Bell, GripVertical, MapPin, User } from 'lucide-react'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { Badge } from '@/components/ui'
import { APPOINTMENT_STATUS, type AgendaAppointment } from '../types'
import { formatAgendaTime } from '../utils/calendarUtils'
import { cn } from '@/utils/cn'

interface AppointmentCardProps {
  appointment: AgendaAppointment
  compact?: boolean
  draggable?: boolean
  onDragStart?: () => void
  onClick?: () => void
}

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'border-l-muted-foreground',
  confirmed: 'border-l-primary',
  in_progress: 'border-l-warning',
  completed: 'border-l-success',
  cancelled: 'border-l-danger',
  no_show: 'border-l-danger',
}

export function AppointmentCard({
  appointment,
  compact = false,
  draggable = false,
  onDragStart,
  onClick,
}: AppointmentCardProps) {
  const status = APPOINTMENT_STATUS[appointment.status]

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData('appointmentId', appointment.id)
        onDragStart?.()
      }}
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-lg border border-border border-l-4 bg-card p-3 shadow-sm transition-all hover:shadow-card-hover',
        STATUS_COLORS[appointment.status],
        compact && 'p-2',
      )}
    >
      <div className="flex items-start gap-2">
        {draggable && (
          <GripVertical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 opacity-0 group-hover:opacity-100" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-semibold text-primary">
              {formatAgendaTime(appointment.startAt)}
            </span>
            <Badge variant={status.variant} className="text-[10px]">
              {status.label}
            </Badge>
          </div>
          <p className={cn('mt-0.5 font-medium text-foreground', compact ? 'text-xs' : 'text-sm')}>
            {appointment.patientName}
          </p>
          {!compact && (
            <>
              <p className="text-xs text-muted-foreground">{appointment.type}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <ProgramBadge program={appointment.program} />
                {appointment.reminderSent && (
                  <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <Bell className="h-3 w-3" /> Recordatorio
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{appointment.nutritionistName}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{appointment.branchName}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
