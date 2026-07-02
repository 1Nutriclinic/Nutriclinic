import type { User } from '@/types'
import type { LoginFormValues } from '../schemas/authSchemas'

/**
 * Phase 1 uses a mock authentication layer so the full UX can be exercised
 * without the Laravel API. Swap these implementations for `apiClient` calls
 * (POST /auth/login, POST /auth/forgot-password) once the backend is live.
 */

const DEMO_USER: User = {
  id: 'usr_demo_001',
  firstName: 'Dra. Ana',
  lastName: 'Martínez',
  email: 'demo@nutriclinic.pro',
  role: 'nutritionist',
  jobTitle: 'Nutricionista Clínica',
  avatarUrl: undefined,
  branchId: 'br_001',
  companyId: 'co_001',
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface LoginResponse {
  user: User
  accessToken: string
}

export async function login(values: LoginFormValues): Promise<LoginResponse> {
  await delay(900)
  // Demo credentials — accepts the seeded account or any valid-looking input.
  if (values.email && values.password.length >= 6) {
    return {
      user: { ...DEMO_USER, email: values.email },
      accessToken: `demo.${btoa(values.email)}.${Date.now()}`,
    }
  }
  throw new Error('Credenciales inválidas')
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  await delay(1000)
  return { message: `Enviamos un enlace de recuperación a ${email}.` }
}
