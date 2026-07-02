import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { Avatar, Button, Card, CardContent } from '@/components/ui'
import { PROGRAMS } from '@/constants/programs'
import { usePatientById } from '@/features/patients/hooks/usePatientFilters'
import { ProgramFormRenderer } from '../components/ProgramFormRenderer'
import type { ClinicalProgram } from '@/types'
import { Link } from 'react-router-dom'

export function ProgramPatientPage() {
  const { programKey, patientId } = useParams<{ programKey: string; patientId: string }>()
  const patient = usePatientById(patientId)

  const program = programKey as ClinicalProgram
  const meta = PROGRAMS[program]

  if (!patientId || !programKey) return <Navigate to="/programs" replace />
  if (!patient || !meta) return <Navigate to="/programs" replace />

  const fullName = `${patient.firstName} ${patient.lastName}`

  return (
    <div>
      <PageHeader
        title={`${meta.label} — ${fullName}`}
        description="Formulario especializado del programa clínico."
        breadcrumbs={[
          { label: 'Inicio', to: '/dashboard' },
          { label: 'Programas', to: '/programs' },
          { label: meta.label, to: `/programs/${program}` },
          { label: fullName },
        ]}
        actions={
          <>
            <Link to={`/clinical-records/${patientId}`}>
              <Button variant="outline" size="sm">Historia clínica</Button>
            </Link>
            <Button size="sm">Guardar evaluación</Button>
          </>
        }
      />

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Avatar name={fullName} src={patient.avatarUrl} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-bold">{fullName}</h2>
                <ProgramBadge program={program} />
              </div>
              <p className="text-sm text-muted-foreground">
                DNI {patient.documentId} · {patient.nutritionistName} · {patient.branchName}
              </p>
            </div>
          </CardContent>
        </Card>

        <ProgramFormRenderer patientId={patientId} program={program} />
      </motion.div>
    </div>
  )
}
