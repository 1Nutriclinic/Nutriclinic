import { getSupabaseOrNull } from '@/lib/supabase'

export interface PortalPatient {
  id: string
  firstName: string
  lastName: string
  email: string | null
  phone: string | null
}

export interface WeightLog {
  id: string
  weightKg: number
  loggedAt: string
  notes: string | null
}

export interface WaterLog {
  ml: number
  targetMl: number
  logDate: string
}

export interface PortalMessage {
  id: string
  direction: 'inbound' | 'outbound'
  channel: string
  content: string
  createdAt: string
}

export interface PortalMealPlan {
  id: string
  title: string
  description: string | null
  caloriesTarget: number | null
}

export interface ProgressPhoto {
  id: string
  storagePath: string
  caption: string | null
  takenAt: string
  url?: string
}

export async function getPatientByUserId(userId: string): Promise<PortalPatient | null> {
  const sb = getSupabaseOrNull()
  if (!sb) return null
  const { data } = await sb
    .from('patients')
    .select('id, first_name, last_name, email, phone')
    .eq('user_id', userId)
    .maybeSingle()
  if (!data) return null
  const row = data as { id: string; first_name: string; last_name: string; email: string | null; phone: string | null }
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
  }
}

export async function getWeightLogs(patientId: string): Promise<WeightLog[]> {
  const sb = getSupabaseOrNull()
  if (!sb) return []
  const { data } = await sb
    .from('patient_weight_logs')
    .select('id, weight_kg, logged_at, notes')
    .eq('patient_id', patientId)
    .order('logged_at', { ascending: true })
  return (data ?? []).map((r) => {
    const row = r as { id: string; weight_kg: number; logged_at: string; notes: string | null }
    return { id: row.id, weightKg: Number(row.weight_kg), loggedAt: row.logged_at, notes: row.notes }
  })
}

export async function addWeightLog(patientId: string, weightKg: number, isDemo = false): Promise<void> {
  const sb = getSupabaseOrNull()
  if (!sb) throw new Error('Supabase requerido')
  const { error } = await sb.from('patient_weight_logs').insert({
    patient_id: patientId,
    weight_kg: weightKg,
    is_demo: isDemo,
  } as never)
  if (error) throw error
}

export async function getTodayWater(patientId: string): Promise<WaterLog | null> {
  const sb = getSupabaseOrNull()
  if (!sb) return null
  const today = new Date().toISOString().slice(0, 10)
  const { data } = await sb
    .from('patient_water_logs')
    .select('ml, target_ml, log_date')
    .eq('patient_id', patientId)
    .eq('log_date', today)
    .maybeSingle()
  if (!data) return { ml: 0, targetMl: 2000, logDate: today }
  const row = data as { ml: number; target_ml: number; log_date: string }
  return { ml: row.ml, targetMl: row.target_ml, logDate: row.log_date }
}

export async function upsertWater(patientId: string, ml: number, isDemo = false): Promise<void> {
  const sb = getSupabaseOrNull()
  if (!sb) throw new Error('Supabase requerido')
  const today = new Date().toISOString().slice(0, 10)
  const { error } = await sb.from('patient_water_logs').upsert(
    { patient_id: patientId, ml, target_ml: 2000, log_date: today, is_demo: isDemo } as never,
    { onConflict: 'patient_id,log_date' },
  )
  if (error) throw error
}

export async function getMessages(patientId: string): Promise<PortalMessage[]> {
  const sb = getSupabaseOrNull()
  if (!sb) return []
  const { data } = await sb
    .from('patient_messages')
    .select('id, direction, channel, content, created_at')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: true })
  return (data ?? []).map((r) => {
    const row = r as { id: string; direction: string; channel: string; content: string; created_at: string }
    return {
      id: row.id,
      direction: row.direction as 'inbound' | 'outbound',
      channel: row.channel,
      content: row.content,
      createdAt: row.created_at,
    }
  })
}

export async function sendPatientMessage(patientId: string, content: string, isDemo = false): Promise<void> {
  const sb = getSupabaseOrNull()
  if (!sb) throw new Error('Supabase requerido')
  const { error } = await sb.from('patient_messages').insert({
    patient_id: patientId,
    direction: 'inbound',
    channel: 'in_app',
    content,
    is_demo: isDemo,
  } as never)
  if (error) throw error
}

export async function getMealPlans(patientId: string): Promise<PortalMealPlan[]> {
  const sb = getSupabaseOrNull()
  if (!sb) return []
  const { data } = await sb
    .from('patient_meal_plans')
    .select('id, title, description, calories_target')
    .eq('patient_id', patientId)
    .eq('active', true)
  return (data ?? []).map((r) => {
    const row = r as { id: string; title: string; description: string | null; calories_target: number | null }
    return { id: row.id, title: row.title, description: row.description, caloriesTarget: row.calories_target }
  })
}

export async function getProgressPhotos(patientId: string): Promise<ProgressPhoto[]> {
  const sb = getSupabaseOrNull()
  if (!sb) return []
  const { data } = await sb
    .from('patient_progress_photos')
    .select('id, storage_path, caption, taken_at')
    .eq('patient_id', patientId)
    .order('taken_at', { ascending: false })
  const photos: ProgressPhoto[] = []
  for (const r of data ?? []) {
    const row = r as { id: string; storage_path: string; caption: string | null; taken_at: string }
    const { data: signed } = await sb.storage.from('progress-photos').createSignedUrl(row.storage_path, 3600)
    photos.push({
      id: row.id,
      storagePath: row.storage_path,
      caption: row.caption,
      takenAt: row.taken_at,
      url: signed?.signedUrl,
    })
  }
  return photos
}

export async function uploadProgressPhoto(
  userId: string,
  patientId: string,
  file: File,
  caption: string,
  isDemo = false,
): Promise<void> {
  const sb = getSupabaseOrNull()
  if (!sb) throw new Error('Supabase requerido')
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${userId}/${Date.now()}.${ext}`
  const { error: uploadError } = await sb.storage.from('progress-photos').upload(path, file, { upsert: false })
  if (uploadError) throw uploadError
  const { error } = await sb.from('patient_progress_photos').insert({
    patient_id: patientId,
    storage_path: path,
    caption: caption || null,
    is_demo: isDemo,
  } as never)
  if (error) throw error
}
