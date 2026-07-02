import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { Card, CardContent } from '@/components/ui'
import { PROGRAM_LIST } from '@/constants/programs'
import { usePatientsStore } from '@/features/patients/store/patientsStore'
import { PROGRAM_CATEGORIES } from '../types'
import type { ClinicalProgram } from '@/types'

export function ProgramsPage() {
  const navigate = useNavigate()
  const patients = usePatientsStore((s) => s.patients)

  const programCounts = useMemo(() => {
    const counts: Record<ClinicalProgram, number> = {} as Record<ClinicalProgram, number>
    for (const p of PROGRAM_LIST) counts[p.key] = 0
    for (const patient of patients) {
      for (const prog of patient.programs) {
        counts[prog] = (counts[prog] ?? 0) + 1
      }
    }
    return counts
  }, [patients])

  const totalEnrolled = useMemo(
    () => patients.filter((p) => p.programs.length > 0).length,
    [patients],
  )

  return (
    <div>
      <PageHeader
        title="Programas Clínicos"
        description="Clasificación automática de pacientes con formularios especializados por programa."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Programas Clínicos' }]}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard icon={Users} label="Pacientes inscritos" value={String(totalEnrolled)} />
        <StatCard icon={Stethoscope} label="Programas activos" value={String(PROGRAM_LIST.length)} />
        <StatCard icon={Stethoscope} label="Especializados" value="4" sub="Gestante, Obesidad, Pediatría, Adulto Mayor" />
      </div>

      {PROGRAM_CATEGORIES.map((cat, ci) => (
        <motion.div
          key={cat.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.05 }}
          className="mb-6"
        >
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">{cat.label}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cat.programs.map((prog) => {
              const count = programCounts[prog] ?? 0
              return (
                <button
                  key={prog}
                  type="button"
                  onClick={() => navigate(`/programs/${prog}`)}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div>
                    <ProgramBadge program={prog} />
                    <p className="mt-2 text-xs text-muted-foreground">{count} paciente{count !== 1 ? 's' : ''}</p>
                  </div>
                  <span className="font-display text-2xl font-bold text-muted-foreground/40">{count}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub }: { icon: typeof Users; label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-bold text-foreground">{value}</p>
          {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
