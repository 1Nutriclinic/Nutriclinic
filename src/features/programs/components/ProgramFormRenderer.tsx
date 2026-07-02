import type { ClinicalProgram } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { PROGRAMS } from '@/constants/programs'
import { isSpecializedProgram } from '../utils/programUtils'
import { PregnantProgramPanel } from './PregnantProgramPanel'
import { ObesityProgramPanel } from './ObesityProgramPanel'
import { PediatricsProgramPanel } from './PediatricsProgramPanel'
import { ElderlyProgramPanel } from './ElderlyProgramPanel'
import { getProgramPatientData } from '../data/mockProgramData'

interface ProgramFormRendererProps {
  patientId: string
  program: ClinicalProgram
}

export function ProgramFormRenderer({ patientId, program }: ProgramFormRendererProps) {
  const data = getProgramPatientData(patientId)
  const meta = PROGRAMS[program]

  if (program === 'pregnant' && data.pregnant) {
    return <PregnantProgramPanel data={data.pregnant} />
  }
  if ((program === 'obesity' || program === 'overweight' || program === 'bariatric') && data.obesity) {
    return <ObesityProgramPanel data={data.obesity} />
  }
  if ((program === 'child' || program === 'adolescent' || program === 'infant') && data.pediatrics) {
    return <PediatricsProgramPanel data={data.pediatrics} />
  }
  if (program === 'elderly' && data.elderly) {
    return <ElderlyProgramPanel data={data.elderly} />
  }

  if (isSpecializedProgram(program)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Formulario — {meta.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No hay datos registrados para este programa. Inicia una evaluación para cargar el formulario especializado.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Programa — {meta.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Formulario estándar de seguimiento para el programa {meta.label}. Registra antropometría, hábitos alimentarios y objetivos terapéuticos desde la Historia Clínica.
        </p>
      </CardContent>
    </Card>
  )
}
