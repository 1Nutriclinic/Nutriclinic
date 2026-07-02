import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileHeart, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { EmptyState } from '@/components/common/EmptyState'
import { Avatar, Card, CardContent, Input } from '@/components/ui'
import { PatientStatusBadge } from '@/features/patients/components/PatientStatusBadge'
import { usePatientsStore } from '@/features/patients/store/patientsStore'
import { formatDate } from '@/utils/format'

export function ClinicalRecordsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const patients = usePatientsStore((s) => s.patients)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) =>
      `${p.firstName} ${p.lastName} ${p.documentId}`.toLowerCase().includes(q),
    )
  }, [patients, search])

  return (
    <div>
      <PageHeader
        title="Historia Clínica"
        description="Selecciona un paciente para abrir su expediente clínico completo."
        breadcrumbs={[
          { label: 'Inicio', to: '/dashboard' },
          { label: 'Historia Clínica' },
        ]}
      />

      <Card>
        <CardContent className="p-5">
          <div className="mb-5 max-w-md">
            <Input
              placeholder="Buscar paciente por nombre o documento…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={FileHeart}
              title="No se encontraron pacientes"
              description="Ajusta la búsqueda o registra un nuevo paciente."
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.button
                  key={p.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => navigate(`/clinical-records/${p.id}`)}
                  className="flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-card-hover"
                >
                  <Avatar name={`${p.firstName} ${p.lastName}`} src={p.avatarUrl} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">
                        {p.firstName} {p.lastName}
                      </p>
                      <PatientStatusBadge status={p.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">DNI {p.documentId}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.programs.slice(0, 2).map((prog) => (
                        <ProgramBadge key={prog} program={prog} />
                      ))}
                    </div>
                    {p.lastVisitAt && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Última visita: {formatDate(p.lastVisitAt)}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
