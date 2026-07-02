import type { Patient } from '@/types'

import { formatDate } from '@/utils/format'



const CSV_HEADERS = [

  'ID',

  'Nombres',

  'Apellidos',

  'Documento',

  'Fecha Nacimiento',

  'Género',

  'Email',

  'Teléfono',

  'Estado',

  'Programas',

  'Nutricionista',

  'Sucursal',

  'Última visita',

  'Fecha registro',

] as const



function escapeCsv(value: string): string {

  if (value.includes(',') || value.includes('"') || value.includes('\n')) {

    return `"${value.replace(/"/g, '""')}"`

  }

  return value

}



export function exportPatientsToCsv(patients: Patient[], filename = 'pacientes-nutriclinic.csv') {

  const rows = patients.map((p) =>

    [

      p.id,

      p.firstName,

      p.lastName,

      p.documentId,

      p.birthDate,

      p.gender,

      p.email ?? '',

      p.phone ?? '',

      p.status,

      p.programs.join('; '),

      p.nutritionistName,

      p.branchName,

      p.lastVisitAt ? formatDate(p.lastVisitAt) : '',

      formatDate(p.createdAt),

    ]

      .map(String)

      .map(escapeCsv)

      .join(','),

  )



  const csv = [CSV_HEADERS.join(','), ...rows].join('\n')

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = url

  link.download = filename

  link.click()

  URL.revokeObjectURL(url)

}



export function parsePatientsCsv(text: string): Partial<Patient>[] {

  const lines = text.trim().split(/\r?\n/)

  if (lines.length < 2) return []



  const headers = lines[0]!.split(',').map((h) => h.trim().replace(/^"|"$/g, ''))

  const idx = (name: string) => headers.findIndex((h) => h.toLowerCase().includes(name))



  const iFirst = idx('nombres')

  const iLast = idx('apellidos')

  const iDoc = idx('documento')

  const iBirth = idx('nacimiento')

  const iEmail = idx('email')

  const iPhone = idx('tel')



  return lines.slice(1).map((line) => {

    const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''))

    return {

      firstName: cols[iFirst] ?? 'Importado',

      lastName: cols[iLast] ?? '',

      documentId: cols[iDoc] ?? '',

      birthDate: cols[iBirth] ?? '1990-01-01',

      email: cols[iEmail] || undefined,

      phone: cols[iPhone] || undefined,

    }

  })

}


