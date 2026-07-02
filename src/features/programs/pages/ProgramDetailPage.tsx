import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { EmptyState } from '@/components/common/EmptyState'
import { Avatar, Card, CardContent, Input } from '@/components/ui'
import { PROGRAMS } from '@/constants/programs'
import { usePatientsStore } from '@/features/patients/store/patientsStore'
import type { ClinicalProgram } from '@/types'
import { useState } from 'react'
import { Users } from 'lucide-react'

export function ProgramDetailPage() {
  const { programKey } = useParams<{ programKey: string }>()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const patients = usePatientsStore((s) => s.patients)

  const program = programKey as ClinicalProgram
  const meta = PROGRAMS[program]

  const filtered = useMemo(() => {
    const inProgram = patients.filter((p) => p.programs.includes(program))
    const q = search.trim().toLowerCase()
    if (!q) return inProgram
    return inProgram.filter((p) =>
      `${p.firstName} ${p.lastName} ${p.documentId}`.toLowerCase().includes(q),
    )
  }, [patients, program, search])

  if (!meta) {
    return (
      <EmptyState icon={Users} title="Programa no encontrado" description="El programa solicitado no existe." />
    )
  }

  return (
    <div>
      <PageHeader
        title={meta.label}
        description={`Pacientes inscritos en el programa de ${meta.label.toLowerCase()}.`}
        breadcrumbs={[
          { label: 'Inicio', to: '/dashboard' },
          { label: 'Programas', to: '/programs' },
          { label: meta.label },
        ]}
      />

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <ProgramBadge program={program} className="text-sm px-3 py-1" />
            <span className="text-sm text-muted-foreground">{filtered.length} pacientes</span>
          </div>
          <div className="mb-5 max-w-md">
            <Input
              placeholder="Buscar paciente…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={Users} title="Sin pacientes" description={`No hay pacientes inscritos en ${meta.label}.`} />
          ) : (
            <div className="space-y-2">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => navigate(`/programs/${program}/${p.id}`)}
                  className="flex w-full items-center gap-4 rounded-xl border border-border p-4 text-left transition-all hover:border-primary/30 hover:bg-muted/30"
                >
                  <Avatar name={`${p.firstName} ${p.lastName}`} src={p.avatarUrl} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{p.firstName} {p.lastName}</p>
                    <p className="text-xs text-muted-foreground">DNI {p.documentId} · {p.nutritionistName}</p>
                  </div>
                  <div className="hidden flex-wrap gap-1 sm:flex">
                    {p.programs.filter((pr) => pr !== program).slice(0, 2).map((pr) => (
                      <ProgramBadge key={pr} program={pr} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
