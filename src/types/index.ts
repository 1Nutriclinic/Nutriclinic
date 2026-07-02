/* ------------------------------------------------------------------ *
 * Core domain types shared across the whole platform.
 * Feature-specific types live inside each feature folder.
 * ------------------------------------------------------------------ */

export type UUID = string

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'director'
  | 'nutritionist'
  | 'assistant'
  | 'receptionist'
  | 'patient'

export interface User {
  id: UUID
  firstName: string
  lastName: string
  email: string
  role: UserRole
  avatarUrl?: string
  jobTitle?: string
  branchId?: UUID
  companyId?: UUID
  phone?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface Company {
  id: UUID
  name: string
  taxId: string
  country: string
  logoUrl?: string
}

export interface Branch {
  id: UUID
  companyId: UUID
  name: string
  city: string
  country: string
  address?: string
}

/** Clinical program classification driving the specialized clinical forms. */
export type ClinicalProgram =
  | 'newborn'
  | 'infant'
  | 'child'
  | 'adolescent'
  | 'adult'
  | 'elderly'
  | 'pregnant'
  | 'lactation'
  | 'obesity'
  | 'overweight'
  | 'diabetes'
  | 'hypertension'
  | 'renal'
  | 'oncology'
  | 'sports'
  | 'bariatric'
  | 'eating_disorder'

export type PatientStatus = 'active' | 'inactive' | 'lead' | 'discharged' | 'abandoned'

export interface Patient {
  id: UUID
  firstName: string
  lastName: string
  documentId: string
  birthDate: string
  gender: 'male' | 'female' | 'other'
  email?: string
  phone?: string
  avatarUrl?: string
  status: PatientStatus
  programs: ClinicalProgram[]
  nutritionistId: UUID
  nutritionistName: string
  branchId: UUID
  branchName: string
  createdAt: string
  lastVisitAt?: string
}

/** Generic API list envelope used by paginated endpoints. */
export interface Paginated<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
}

export interface ApiError {
  message: string
  code?: string
  fields?: Record<string, string[]>
}

export type Trend = 'up' | 'down' | 'flat'
