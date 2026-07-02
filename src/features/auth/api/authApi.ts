import type { User, UserRole } from '@/types'
import { getSupabaseOrNull } from '@/lib/supabase'
import { isSupabaseConfigured } from '@/lib/supabaseConfig'
import type { LoginFormValues } from '../schemas/authSchemas'

type ProfileRow = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
  job_title: string | null
  company_id: string | null
  branch_id: string | null
  phone: string | null
  avatar_url: string | null
  is_demo: boolean
}

const DEMO_USER: User = {
  id: 'usr_demo_001',
  firstName: 'Dra. Ana',
  lastName: 'Martínez',
  email: 'demo@nutriclinic.pro',
  role: 'nutritionist',
  jobTitle: 'Nutricionista Clínica',
  branchId: 'br_001',
  companyId: 'co_001',
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

function mapProfile(row: ProfileRow): User {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    role: row.role as UserRole,
    jobTitle: row.job_title ?? undefined,
    branchId: row.branch_id ?? undefined,
    companyId: row.company_id ?? undefined,
    phone: row.phone ?? undefined,
    avatarUrl: row.avatar_url ?? undefined,
  }
}

export interface LoginResponse {
  user: User
  accessToken: string
}

export interface SignUpInput {
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
  isDemo?: boolean
  phone?: string
}

async function fetchProfile(userId: string): Promise<User> {
  const sb = getSupabaseOrNull()
  if (!sb) throw new Error('Supabase no configurado')
  const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single()
  if (error || !data) throw new Error('No se pudo cargar el perfil del usuario')
  return mapProfile(data as ProfileRow)
}

export async function login(values: LoginFormValues): Promise<LoginResponse> {
  const sb = getSupabaseOrNull()
  if (sb) {
    const { data, error } = await sb.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    if (error) throw new Error(error.message)
    if (!data.session?.access_token || !data.user) throw new Error('Sesión inválida')
    const user = await fetchProfile(data.user.id)
    return { user, accessToken: data.session.access_token }
  }

  await delay(900)
  if (values.email && values.password.length >= 6) {
    return {
      user: { ...DEMO_USER, email: values.email },
      accessToken: `demo.${btoa(values.email)}.${Date.now()}`,
    }
  }
  throw new Error('Credenciales inválidas')
}

export async function logout(): Promise<void> {
  const sb = getSupabaseOrNull()
  if (sb) await sb.auth.signOut()
}

export async function restoreSession(): Promise<LoginResponse | null> {
  const sb = getSupabaseOrNull()
  if (!sb) return null
  const { data } = await sb.auth.getSession()
  if (!data.session?.user || !data.session.access_token) return null
  try {
    const user = await fetchProfile(data.session.user.id)
    return { user, accessToken: data.session.access_token }
  } catch {
    return null
  }
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  const sb = getSupabaseOrNull()
  if (sb) {
    const redirectTo = `${window.location.origin}/login`
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) throw new Error(error.message)
    return { message: `Enviamos un enlace de recuperación a ${email}.` }
  }
  await delay(1000)
  return { message: `Enviamos un enlace de recuperación a ${email}.` }
}

export async function signUpUser(input: SignUpInput): Promise<{ user: User; message: string }> {
  const sb = getSupabaseOrNull()
  if (!sb) throw new Error('Supabase requerido para crear usuarios')

  const { data, error } = await sb.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        first_name: input.firstName,
        last_name: input.lastName,
        role: input.role,
        is_demo: input.isDemo ?? false,
        portal_enabled: input.role === 'patient',
      },
    },
  })
  if (error) throw new Error(error.message)
  if (!data.user) throw new Error('No se creó el usuario')

  // Profile created by trigger; fetch it
  await delay(500)
  const user = await fetchProfile(data.user.id)

  if (input.role === 'patient') {
    await sb.from('patients').insert({
      user_id: data.user.id,
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      phone: input.phone ?? null,
      portal_enabled: true,
      is_demo: input.isDemo ?? false,
    } as never)
  }

  return {
    user,
    message: data.session
      ? 'Usuario creado e iniciado sesión.'
      : 'Usuario creado. Revisa el correo de confirmación si está activado en Supabase.',
  }
}

export async function cleanupDemoData(): Promise<string> {
  const sb = getSupabaseOrNull()
  if (!sb) throw new Error('Supabase requerido')
  const { data, error } = await sb.rpc('cleanup_demo_data' as never)
  if (error) throw new Error(error.message)
  const result = data as { message?: string } | null
  return result?.message ?? 'Limpieza demo completada.'
}

export function usingSupabaseAuth(): boolean {
  return isSupabaseConfigured()
}
