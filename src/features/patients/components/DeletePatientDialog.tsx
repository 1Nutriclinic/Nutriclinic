import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui'
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/Dialog'
import type { Patient } from '@/types'
import { usePatientsStore } from '../store/patientsStore'

interface DeletePatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patient: Patient | null
}

export function DeletePatientDialog({ open, onOpenChange, patient }: DeletePatientDialogProps) {
  const deletePatient = usePatientsStore((s) => s.deletePatient)

  const handleDelete = () => {
    if (!patient) return
    deletePatient(patient.id)
    onOpenChange(false)
  }

  if (!patient) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader
          title="Eliminar paciente"
          description="Esta acción no se puede deshacer."
          onClose={() => onOpenChange(false)}
        />
        <DialogBody>
          <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                ¿Eliminar a {patient.firstName} {patient.lastName}?
              </p>
              <p className="mt-1 text-muted-foreground">
                Se eliminará el registro del paciente y su acceso al portal. La historia clínica
                quedará archivada según políticas de retención.
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar paciente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
