import { Badge } from '@/components/ui'
import { PATIENT_STATUS } from '@/constants/patientStatus'
import type { PatientStatus } from '@/types'

export function PatientStatusBadge({ status }: { status: PatientStatus }) {
  const meta = PATIENT_STATUS[status]
  return <Badge variant={meta.variant}>{meta.label}</Badge>
}
