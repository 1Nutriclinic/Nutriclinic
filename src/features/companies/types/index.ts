export type CompanyPlan = 'starter' | 'professional' | 'enterprise'
export type CompanyStatus = 'active' | 'trial' | 'suspended' | 'inactive'

export interface CompanyRecord {
  id: string
  name: string
  legalName: string
  taxId: string
  country: string
  currency: string
  timezone: string
  plan: CompanyPlan
  status: CompanyStatus
  branchCount: number
  userCount: number
  patientCount: number
  logoInitials: string
  brandColor: string
  createdAt: string
  billingEmail: string
  monthlyFee: number
}

export const COMPANY_PLANS: Record<CompanyPlan, string> = {
  starter: 'Starter',
  professional: 'Professional',
  enterprise: 'Enterprise',
}

export const COMPANY_STATUS: Record<CompanyStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'secondary' }> = {
  active: { label: 'Activa', variant: 'success' },
  trial: { label: 'Prueba', variant: 'warning' },
  suspended: { label: 'Suspendida', variant: 'danger' },
  inactive: { label: 'Inactiva', variant: 'secondary' },
}

export const COUNTRIES = ['Perú', 'Colombia', 'México', 'Chile', 'Ecuador'] as const
