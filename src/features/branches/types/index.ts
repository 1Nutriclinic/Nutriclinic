export type BranchStatus = 'active' | 'maintenance' | 'inactive'

export interface BranchRecord {
  id: string
  companyId: string
  companyName: string
  name: string
  code: string
  city: string
  country: string
  address: string
  phone: string
  email: string
  status: BranchStatus
  staffCount: number
  roomCount: number
  patientCount: number
  schedule: string
  manager: string
  lat: number
  lng: number
  createdAt: string
}

export interface BranchStaff {
  id: string
  branchId: string
  name: string
  role: string
  email: string
  schedule: string
}

export interface BranchRoom {
  id: string
  branchId: string
  name: string
  type: 'consultation' | 'group' | 'lab' | 'retail'
  capacity: number
  equipment: string[]
}

export const BRANCH_STATUS: Record<BranchStatus, { label: string; variant: 'success' | 'warning' | 'secondary' }> = {
  active: { label: 'Activa', variant: 'success' },
  maintenance: { label: 'Mantenimiento', variant: 'warning' },
  inactive: { label: 'Inactiva', variant: 'secondary' },
}

export const ROOM_TYPES: Record<BranchRoom['type'], string> = {
  consultation: 'Consultorio',
  group: 'Sala grupal',
  lab: 'Laboratorio',
  retail: 'Tienda',
}
