import { Link } from 'react-router-dom'

import { Calendar, Mail, MapPin, Phone, User } from 'lucide-react'

import { Avatar, Button, Card, CardContent } from '@/components/ui'

import { ProgramBadge } from '@/components/common/ProgramBadge'

import { PatientStatusBadge } from '@/features/patients/components/PatientStatusBadge'

import { formatDate } from '@/utils/format'

import { formatAgeLabel } from '@/utils/date'

import type { Patient } from '@/types'



interface ClinicalRecordHeaderProps {

  patient: Patient

}



export function ClinicalRecordHeader({ patient }: ClinicalRecordHeaderProps) {

  const fullName = `${patient.firstName} ${patient.lastName}`



  return (

    <Card className="overflow-hidden">

      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-transparent px-6 py-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-start gap-4">

            <Avatar name={fullName} src={patient.avatarUrl} size="xl" />

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="font-display text-xl font-bold text-foreground">{fullName}</h2>

                <PatientStatusBadge status={patient.status} />

              </div>

              <p className="mt-0.5 text-sm text-muted-foreground">

                DNI {patient.documentId} · {formatAgeLabel(patient.birthDate)} ·{' '}

                {patient.gender === 'female' ? 'Femenino' : patient.gender === 'male' ? 'Masculino' : 'Otro'}

              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">

                {patient.programs.map((prog) => (

                  <ProgramBadge key={prog} program={prog} />

                ))}

              </div>

            </div>

          </div>

          <div className="flex shrink-0 gap-2">
            <Link to="/patients">
              <Button variant="outline" size="sm">
                Volver al listado
              </Button>
            </Link>
            <Button size="sm">Nueva consulta</Button>
          </div>

        </div>

      </div>

      <CardContent className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 lg:grid-cols-6">

        <InfoItem icon={User} label="Nutricionista" value={patient.nutritionistName} />

        <InfoItem icon={MapPin} label="Sucursal" value={patient.branchName} />

        {patient.email && <InfoItem icon={Mail} label="Email" value={patient.email} />}

        {patient.phone && <InfoItem icon={Phone} label="Teléfono" value={patient.phone} />}

        <InfoItem

          icon={Calendar}

          label="Última visita"

          value={patient.lastVisitAt ? formatDate(patient.lastVisitAt) : 'Sin visitas'}

        />

        <InfoItem icon={Calendar} label="Registro" value={formatDate(patient.createdAt)} />

      </CardContent>

    </Card>

  )

}



function InfoItem({

  icon: Icon,

  label,

  value,

}: {

  icon: typeof User

  label: string

  value: string

}) {

  return (

    <div className="space-y-1">

      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">

        <Icon className="h-3.5 w-3.5" />

        {label}

      </p>

      <p className="truncate text-sm font-medium text-foreground">{value}</p>

    </div>

  )

}


