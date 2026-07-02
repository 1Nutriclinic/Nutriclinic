import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Label, Select, Textarea } from '@/components/ui'
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/Dialog'
import { APPOINTMENT_TYPES, type AgendaAppointment, type AppointmentStatus } from '../types'
import { NUTRITIONISTS, BRANCHES } from '@/features/patients/data/mockPatients'
import { usePatientsStore } from '@/features/patients/store/patientsStore'
import type { ClinicalProgram } from '@/types'

const schema = z.object({
  patientId: z.string().min(1, 'Paciente requerido'),
  type: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  duration: z.number().min(15).max(120),
  nutritionistId: z.string().min(1),
  branchId: z.string().min(1),
  status: z.enum(['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show']),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface AppointmentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment?: AgendaAppointment | null
  defaultDate?: string
  onSave: (data: Omit<AgendaAppointment, 'id'> & { id?: string }) => void
}

export function AppointmentFormDialog({
  open,
  onOpenChange,
  appointment,
  defaultDate,
  onSave,
}: AppointmentFormDialogProps) {
  const patients = usePatientsStore((s) => s.patients)
  const isEdit = !!appointment

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: '',
      type: APPOINTMENT_TYPES[0],
      date: defaultDate ?? '2026-07-02',
      time: '09:00',
      duration: 30,
      nutritionistId: NUTRITIONISTS[0]!.id,
      branchId: BRANCHES[0]!.id,
      status: 'scheduled',
      notes: '',
    },
  })

  useEffect(() => {
    if (!open) return
    if (appointment) {
      const start = new Date(appointment.startAt)
      reset({
        patientId: appointment.patientId,
        type: appointment.type,
        date: start.toISOString().slice(0, 10),
        time: `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`,
        duration: Math.round((new Date(appointment.endAt).getTime() - start.getTime()) / 60_000),
        nutritionistId: appointment.nutritionistId,
        branchId: appointment.branchId,
        status: appointment.status,
        notes: appointment.notes ?? '',
      })
    } else {
      reset({
        patientId: '',
        type: APPOINTMENT_TYPES[0],
        date: defaultDate ?? '2026-07-02',
        time: '09:00',
        duration: 30,
        nutritionistId: NUTRITIONISTS[0]!.id,
        branchId: BRANCHES[0]!.id,
        status: 'scheduled',
        notes: '',
      })
    }
  }, [open, appointment, defaultDate, reset])

  const selectedPatientId = watch('patientId')
  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  const onSubmit = (values: FormValues) => {
    const patient = patients.find((p) => p.id === values.patientId)!
    const nutritionist = NUTRITIONISTS.find((n) => n.id === values.nutritionistId)!
    const branch = BRANCHES.find((b) => b.id === values.branchId)!
    const start = new Date(`${values.date}T${values.time}:00`)
    const end = new Date(start.getTime() + values.duration * 60_000)

    onSave({
      id: appointment?.id,
      patientId: values.patientId,
      patientName: `${patient.firstName} ${patient.lastName}`,
      nutritionistId: values.nutritionistId,
      nutritionistName: nutritionist.name,
      branchId: values.branchId,
      branchName: branch.name,
      type: values.type,
      program: (patient.programs[0] ?? 'adult') as ClinicalProgram,
      startAt: start.toISOString(),
      endAt: end.toISOString(),
      status: values.status as AppointmentStatus,
      notes: values.notes,
      reminderSent: false,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader
          title={isEdit ? 'Editar cita' : 'Nueva cita'}
          description="Programa una cita con recordatorio automático."
          onClose={() => onOpenChange(false)}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody className="space-y-4">
            <div className="space-y-1.5">
              <Label>Paciente</Label>
              <Select {...register('patientId')} error={!!errors.patientId}>
                <option value="">Seleccionar paciente…</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                ))}
              </Select>
              {selectedPatient && (
                <p className="text-xs text-muted-foreground">Programa: {selectedPatient.programs.join(', ')}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Tipo de cita</Label>
              <Select {...register('type')}>
                {APPOINTMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Fecha</Label>
                <Input type="date" {...register('date')} />
              </div>
              <div className="space-y-1.5">
                <Label>Hora</Label>
                <Input type="time" {...register('time')} />
              </div>
              <div className="space-y-1.5">
                <Label>Duración (min)</Label>
                <Input type="number" {...register('duration', { valueAsNumber: true })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Nutricionista</Label>
                <Select {...register('nutritionistId')}>
                  {NUTRITIONISTS.map((n) => <option key={n.id} value={n.id}>{n.name}</option>)}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Sucursal</Label>
                <Select {...register('branchId')}>
                  {BRANCHES.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select {...register('status')}>
                <option value="scheduled">Programada</option>
                <option value="confirmed">Confirmada</option>
                <option value="in_progress">En consulta</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
                <option value="no_show">No asistió</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Notas</Label>
              <Textarea {...register('notes')} placeholder="Indicaciones, recordatorios…" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">{isEdit ? 'Guardar' : 'Programar cita'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
