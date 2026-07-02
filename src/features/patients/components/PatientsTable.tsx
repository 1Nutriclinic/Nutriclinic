import { useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import {

  createColumnHelper,

  flexRender,

  getCoreRowModel,

  getPaginationRowModel,

  getSortedRowModel,

  useReactTable,

  type SortingState,

} from '@tanstack/react-table'

import { useState } from 'react'

import {

  ArrowUpDown,

  ChevronLeft,

  ChevronRight,

  FileHeart,

  MapPin,

  MoreHorizontal,

  Pencil,

  Trash2,

  User,

} from 'lucide-react'

import { Avatar, Button, Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui'

import { ProgramBadge } from '@/components/common/ProgramBadge'

import { formatDate } from '@/utils/format'

import { formatAgeLabel } from '@/utils/date'

import type { Patient } from '@/types'

import { PatientStatusBadge } from './PatientStatusBadge'



const columnHelper = createColumnHelper<Patient>()



interface PatientsTableProps {

  data: Patient[]

  onEdit: (patient: Patient) => void

  onDelete: (patient: Patient) => void

}



export function PatientsTable({ data, onEdit, onDelete }: PatientsTableProps) {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])



  const columns = useMemo(

    () => [

      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {

        id: 'name',

        header: 'Paciente',

        cell: ({ row }) => {

          const p = row.original

          return (

            <div className="flex items-center gap-3">

              <Avatar name={`${p.firstName} ${p.lastName}`} src={p.avatarUrl} size="sm" />

              <div className="min-w-0">

                <p className="truncate font-medium text-foreground">

                  {p.firstName} {p.lastName}

                </p>

                <p className="truncate text-xs text-muted-foreground">{p.documentId}</p>

              </div>

            </div>

          )

        },

      }),

      columnHelper.accessor('status', {

        header: 'Estado',

        cell: ({ getValue }) => <PatientStatusBadge status={getValue()} />,

      }),

      columnHelper.accessor('birthDate', {

        header: 'Edad',

        cell: ({ getValue }) => (

          <span className="text-sm text-muted-foreground">{formatAgeLabel(getValue())}</span>

        ),

      }),

      columnHelper.accessor('programs', {

        header: 'Programa',

        cell: ({ getValue }) => (

          <div className="flex max-w-[180px] flex-wrap gap-1">

            {getValue()

              .slice(0, 2)

              .map((prog) => (

                <ProgramBadge key={prog} program={prog} />

              ))}

            {getValue().length > 2 && (

              <span className="text-xs text-muted-foreground">+{getValue().length - 2}</span>

            )}

          </div>

        ),

      }),

      columnHelper.accessor('nutritionistName', {

        header: 'Nutricionista',

        cell: ({ getValue }) => (

          <span className="flex items-center gap-1.5 text-sm">

            <User className="h-3.5 w-3.5 text-muted-foreground" />

            {getValue()}

          </span>

        ),

      }),

      columnHelper.accessor('branchName', {

        header: 'Sucursal',

        cell: ({ getValue }) => (

          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">

            <MapPin className="h-3.5 w-3.5" />

            {getValue()}

          </span>

        ),

      }),

      columnHelper.accessor('lastVisitAt', {

        header: 'Última visita',

        cell: ({ getValue }) => (

          <span className="text-sm text-muted-foreground">

            {getValue() ? formatDate(getValue()!) : '—'}

          </span>

        ),

      }),

      columnHelper.display({

        id: 'actions',

        header: '',

        cell: ({ row }) => {

          const p = row.original

          return (

            <Dropdown

              trigger={

                <Button variant="ghost" size="icon-sm" aria-label="Acciones">

                  <MoreHorizontal className="h-4 w-4" />

                </Button>

              }

            >

              <DropdownItem
                icon={<FileHeart />}
                onClick={() => navigate(`/clinical-records/${p.id}`)}
              >
                Historia clínica
              </DropdownItem>

              <DropdownItem icon={<Pencil />} onClick={() => onEdit(p)}>

                Editar

              </DropdownItem>

              <DropdownSeparator />

              <DropdownItem icon={<Trash2 />} destructive onClick={() => onDelete(p)}>

                Eliminar

              </DropdownItem>

            </Dropdown>

          )

        },

      }),

    ],

    [onEdit, onDelete, navigate],

  )



  const table = useReactTable({

    data,

    columns,

    state: { sorting },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    initialState: { pagination: { pageSize: 10 } },

  })



  return (

    <div>

      <div className="overflow-x-auto rounded-xl border border-border">

        <table className="w-full min-w-[960px] text-left text-sm">

          <thead className="border-b border-border bg-muted/40">

            {table.getHeaderGroups().map((hg) => (

              <tr key={hg.id}>

                {hg.headers.map((header) => (

                  <th

                    key={header.id}

                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"

                  >

                    {header.isPlaceholder ? null : header.column.getCanSort() ? (

                      <button

                        type="button"

                        className="inline-flex items-center gap-1 hover:text-foreground"

                        onClick={header.column.getToggleSortingHandler()}

                      >

                        {flexRender(header.column.columnDef.header, header.getContext())}

                        <ArrowUpDown className="h-3.5 w-3.5" />

                      </button>

                    ) : (

                      flexRender(header.column.columnDef.header, header.getContext())

                    )}

                  </th>

                ))}

              </tr>

            ))}

          </thead>

          <tbody className="divide-y divide-border bg-card">

            {table.getRowModel().rows.length === 0 ? (

              <tr>

                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">

                  No se encontraron pacientes con los filtros actuales.

                </td>

              </tr>

            ) : (

              table.getRowModel().rows.map((row) => (

                <tr key={row.id} className="transition-colors hover:bg-muted/30">

                  {row.getVisibleCells().map((cell) => (

                    <td key={cell.id} className="px-4 py-3 align-middle">

                      {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    </td>

                  ))}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>



      {/* Pagination */}

      <div className="mt-4 flex items-center justify-between">

        <p className="text-sm text-muted-foreground">

          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}

        </p>

        <div className="flex items-center gap-2">

          <Button

            variant="outline"

            size="sm"

            onClick={() => table.previousPage()}

            disabled={!table.getCanPreviousPage()}

          >

            <ChevronLeft className="h-4 w-4" />

            Anterior

          </Button>

          <Button

            variant="outline"

            size="sm"

            onClick={() => table.nextPage()}

            disabled={!table.getCanNextPage()}

          >

            Siguiente

            <ChevronRight className="h-4 w-4" />

          </Button>

        </div>

      </div>

    </div>

  )

}


