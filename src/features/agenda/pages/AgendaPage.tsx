import { useState, useMemo } from 'react'
import {
  Bell,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Button, Card, CardContent } from '@/components/ui'
import { cn } from '@/utils/cn'
import { AgendaDayView } from '../components/AgendaDayView'
import { AgendaWeekView } from '../components/AgendaWeekView'
import { AgendaMonthView } from '../components/AgendaMonthView'
import { AppointmentFormDialog } from '../components/AppointmentFormDialog'
import { useAgendaStore, getAppointmentsForDay } from '../store/agendaStore'
import type { AgendaAppointment, AgendaView } from '../types'
import {
  addDays,
  addMonths,
  addWeeks,
  formatAgendaDate,
  subMonths,
  subWeeks,
} from '../utils/calendarUtils'
import { AGENDA_TODAY } from '../data/mockAppointments'

const VIEWS: { key: AgendaView; label: string }[] = [
  { key: 'day', label: 'Día' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mes' },
]

export function AgendaPage() {
  const [view, setView] = useState<AgendaView>('week')
  const [currentDate, setCurrentDate] = useState(() => new Date(AGENDA_TODAY))
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<AgendaAppointment | null>(null)

  const appointments = useAgendaStore((s) => s.appointments)
  const addAppointment = useAgendaStore((s) => s.addAppointment)
  const updateAppointment = useAgendaStore((s) => s.updateAppointment)
  const rescheduleAppointment = useAgendaStore((s) => s.rescheduleAppointment)

  const todayAppts = useMemo(
    () => getAppointmentsForDay(appointments, new Date(AGENDA_TODAY)),
    [appointments],
  )

  const navigate = (dir: -1 | 1) => {
    if (view === 'day') setCurrentDate((d) => addDays(d, dir))
    else if (view === 'week') setCurrentDate((d) => (dir === 1 ? addWeeks(d, 1) : subWeeks(d, 1)))
    else setCurrentDate((d) => (dir === 1 ? addMonths(d, 1) : subMonths(d, 1)))
  }

  const headerLabel = useMemo(() => {
    if (view === 'day') return formatAgendaDate(currentDate, "EEEE, d 'de' MMMM yyyy")
    if (view === 'week') return `Semana del ${formatAgendaDate(currentDate, 'd MMM yyyy')}`
    return formatAgendaDate(currentDate, 'MMMM yyyy')
  }, [view, currentDate])

  const handleSave = (data: Omit<AgendaAppointment, 'id'> & { id?: string }) => {
    if (data.id) {
      updateAppointment(data.id, data)
    } else {
      addAppointment({ ...data, id: `a-${Date.now()}` } as AgendaAppointment)
    }
  }

  const handleDrop = (appointmentId: string, day: Date, hour: number) => {
    const appt = appointments.find((a) => a.id === appointmentId)
    if (!appt) return
    const start = new Date(appt.startAt)
    const duration = new Date(appt.endAt).getTime() - start.getTime()
    const newStart = new Date(day)
    newStart.setHours(hour, start.getMinutes(), 0, 0)
    const newEnd = new Date(newStart.getTime() + duration)
    rescheduleAppointment(appointmentId, newStart.toISOString(), newEnd.toISOString())
  }

  return (
    <div>
      <PageHeader
        title="Agenda"
        description="Calendario con vistas diaria, semanal y mensual. Arrastra citas para reprogramar."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Agenda' }]}
        actions={
          <Button size="sm" onClick={() => { setEditing(null); setFormOpen(true) }}>
            <Plus className="h-4 w-4" />
            Nueva cita
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Citas hoy" value={String(todayAppts.length)} icon={CalendarPlus} accent="primary" index={0} />
        <StatCard label="Confirmadas" value={String(todayAppts.filter((a) => a.status === 'confirmed').length)} icon={CalendarPlus} accent="success" index={1} />
        <StatCard label="En consulta" value={String(todayAppts.filter((a) => a.status === 'in_progress').length)} icon={CalendarPlus} accent="warning" index={2} />
        <StatCard label="Recordatorios" value={String(todayAppts.filter((a) => a.reminderSent).length)} icon={Bell} accent="primary" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-5">
            {/* Toolbar */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon-sm" onClick={() => navigate(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(AGENDA_TODAY))}>
                  Hoy
                </Button>
                <Button variant="outline" size="icon-sm" onClick={() => navigate(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="ml-2 font-display text-sm font-semibold capitalize text-foreground">
                  {headerLabel}
                </span>
              </div>
              <div className="flex rounded-lg border border-border bg-muted/40 p-1">
                {VIEWS.map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setView(v.key)}
                    className={cn(
                      'rounded-md px-4 py-1.5 text-sm font-medium transition-all',
                      view === v.key ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {view === 'day' && (
              <AgendaDayView
                date={currentDate}
                appointments={appointments}
                onSelect={(a) => { setEditing(a); setFormOpen(true) }}
              />
            )}
            {view === 'week' && (
              <AgendaWeekView
                date={currentDate}
                appointments={appointments}
                onSelect={(a) => { setEditing(a); setFormOpen(true) }}
                onDrop={handleDrop}
              />
            )}
            {view === 'month' && (
              <AgendaMonthView
                date={currentDate}
                appointments={appointments}
                onSelectDay={(day) => { setCurrentDate(day); setView('day') }}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      <AppointmentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        appointment={editing}
        defaultDate={currentDate.toISOString().slice(0, 10)}
        onSave={handleSave}
      />
    </div>
  )
}
