import { useRef, useState } from 'react'

import { Download, Plus, Upload, Users } from 'lucide-react'

import { motion } from 'framer-motion'

import { PageHeader } from '@/components/common/PageHeader'

import { StatCard } from '@/components/common/StatCard'

import { Button, Card, CardContent } from '@/components/ui'

import type { Patient } from '@/types'

import type { ClinicalProgram } from '@/types'

import { PatientFiltersBar } from '../components/PatientFiltersBar'

import { PatientsTable } from '../components/PatientsTable'

import { PatientFormDialog } from '../components/PatientFormDialog'

import { DeletePatientDialog } from '../components/DeletePatientDialog'

import {

  DEFAULT_FILTERS,

  useFilteredPatients,

  usePatientStats,

  type PatientFilters,

} from '../hooks/usePatientFilters'

import { exportPatientsToCsv, parsePatientsCsv } from '../utils/exportPatients'

import { usePatientsStore } from '../store/patientsStore'

import { BRANCHES, NUTRITIONISTS } from '../data/mockPatients'



export function PatientsPage() {

  const [filters, setFilters] = useState<PatientFilters>(DEFAULT_FILTERS)

  const [formOpen, setFormOpen] = useState(false)

  const [deleteOpen, setDeleteOpen] = useState(false)

  const [editing, setEditing] = useState<Patient | null>(null)

  const [deleting, setDeleting] = useState<Patient | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)



  const filtered = useFilteredPatients(filters)

  const stats = usePatientStats()

  const importPatients = usePatientsStore((s) => s.importPatients)



  const handleExport = () => exportPatientsToCsv(filtered)



  const handleImport = async (file: File) => {

    const text = await file.text()

    const rows = parsePatientsCsv(text)

    const imported = rows.map((row, i) => ({

      id: `p-import-${Date.now()}-${i}`,

      firstName: row.firstName ?? 'Importado',

      lastName: row.lastName ?? '',

      documentId: row.documentId ?? '',

      birthDate: row.birthDate ?? '1990-01-01',

      gender: 'other' as const,

      email: row.email,

      phone: row.phone,

      status: 'lead' as const,

      programs: ['adult'] as ClinicalProgram[],

      nutritionistId: NUTRITIONISTS[0]!.id,

      nutritionistName: NUTRITIONISTS[0]!.name,

      branchId: BRANCHES[0]!.id,

      branchName: BRANCHES[0]!.name,

      createdAt: new Date().toISOString(),

    }))

    importPatients(imported)

  }



  return (

    <div>

      <PageHeader

        title="Gestión de Pacientes"

        description="Listado maestro con buscador, filtros avanzados, importación y exportación."

        breadcrumbs={[

          { label: 'Inicio', to: '/dashboard' },

          { label: 'Pacientes' },

        ]}

        actions={

          <>

            <input

              ref={fileRef}

              type="file"

              accept=".csv,.txt"

              className="hidden"

              onChange={(e) => {

                const file = e.target.files?.[0]

                if (file) void handleImport(file)

                e.target.value = ''

              }}

            />

            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>

              <Upload className="h-4 w-4" />

              Importar Excel

            </Button>

            <Button variant="outline" size="sm" onClick={handleExport}>

              <Download className="h-4 w-4" />

              Exportar

            </Button>

            <Button

              size="sm"

              onClick={() => {

                setEditing(null)

                setFormOpen(true)

              }}

            >

              <Plus className="h-4 w-4" />

              Nuevo paciente

            </Button>

          </>

        }

      />



      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard label="Total pacientes" value={String(stats.total)} icon={Users} accent="primary" index={0} />

        <StatCard label="Activos" value={String(stats.active)} icon={Users} accent="success" index={1} />

        <StatCard label="Prospectos" value={String(stats.leads)} icon={Users} accent="primary" index={2} />

        <StatCard label="Abandono" value={String(stats.abandoned)} icon={Users} accent="warning" index={3} />

      </div>



      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>

        <Card>

          <CardContent className="p-5">

            <PatientFiltersBar

              filters={filters}

              onChange={setFilters}

              resultCount={filtered.length}

            />

            <div className="mt-5">

              <PatientsTable

                data={filtered}

                onEdit={(p) => {

                  setEditing(p)

                  setFormOpen(true)

                }}

                onDelete={(p) => {

                  setDeleting(p)

                  setDeleteOpen(true)

                }}

              />

            </div>

          </CardContent>

        </Card>

      </motion.div>



      <PatientFormDialog open={formOpen} onOpenChange={setFormOpen} patient={editing} />

      <DeletePatientDialog open={deleteOpen} onOpenChange={setDeleteOpen} patient={deleting} />

    </div>

  )

}


