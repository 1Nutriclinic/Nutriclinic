import { Search, X } from 'lucide-react'
import { Input, Select } from '@/components/ui'
import { PATIENT_STATUS_LIST } from '@/constants/patientStatus'
import { PROGRAM_LIST } from '@/constants/programs'
import { BRANCHES, NUTRITIONISTS } from '../data/mockPatients'
import type { PatientFilters } from '../hooks/usePatientFilters'

interface PatientFiltersBarProps {
  filters: PatientFilters
  onChange: (filters: PatientFilters) => void
  resultCount: number
}

export function PatientFiltersBar({ filters, onChange, resultCount }: PatientFiltersBarProps) {
  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.program !== 'all' ||
    filters.nutritionistId !== 'all' ||
    filters.branchId !== 'all' ||
    filters.search.length > 0

  const clear = () =>
    onChange({
      search: '',
      status: 'all',
      program: 'all',
      nutritionistId: 'all',
      branchId: 'all',
    })

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nombre, documento, teléfono…"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-auto lg:grid-cols-4">
          <Select
            value={filters.status}
            onChange={(e) =>
              onChange({ ...filters, status: e.target.value as PatientFilters['status'] })
            }
          >
            <option value="all">Todos los estados</option>
            {PATIENT_STATUS_LIST.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
          <Select
            value={filters.program}
            onChange={(e) =>
              onChange({ ...filters, program: e.target.value as PatientFilters['program'] })
            }
          >
            <option value="all">Todos los programas</option>
            {PROGRAM_LIST.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </Select>
          <Select
            value={filters.nutritionistId}
            onChange={(e) => onChange({ ...filters, nutritionistId: e.target.value })}
          >
            <option value="all">Nutricionista</option>
            {NUTRITIONISTS.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </Select>
          <Select
            value={filters.branchId}
            onChange={(e) => onChange({ ...filters, branchId: e.target.value })}
          >
            <option value="all">Sucursal</option>
            {BRANCHES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {resultCount} paciente{resultCount !== 1 ? 's' : ''} encontrado
          {resultCount !== 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
