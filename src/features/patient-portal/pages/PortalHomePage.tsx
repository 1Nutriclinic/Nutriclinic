import { useCallback, useEffect, useState } from 'react'
import { Activity, Camera, Droplets, MessageSquare, Scale, UtensilsCrossed } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button, Card, CardContent, Input, Textarea } from '@/components/ui'
import { useAuthStore } from '@/store/authStore'
import { isSupabaseConfigured } from '@/lib/supabaseConfig'
import {
  DEMO_WATER_LOG,
  DEMO_WEIGHT_LOGS,
} from '../data/mockPortalData'
import {
  addWeightLog,
  getMealPlans,
  getMessages,
  getPatientByUserId,
  getProgressPhotos,
  getTodayWater,
  getWeightLogs,
  sendPatientMessage,
  uploadProgressPhoto,
  upsertWater,
  type PortalMealPlan,
  type PortalMessage,
  type ProgressPhoto,
  type WeightLog,
} from '../api/portalApi'

export function PortalHomePage() {
  const user = useAuthStore((s) => s.user)
  const [patientId, setPatientId] = useState<string | null>(null)
  const [weights, setWeights] = useState<WeightLog[]>([])
  const [water, setWater] = useState({ ml: 0, targetMl: 2000 })
  const [messages, setMessages] = useState<PortalMessage[]>([])
  const [mealPlans, setMealPlans] = useState<PortalMealPlan[]>([])
  const [photos, setPhotos] = useState<ProgressPhoto[]>([])
  const [weightInput, setWeightInput] = useState('')
  const [messageDraft, setMessageDraft] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    if (isSupabaseConfigured()) {
      const patient = await getPatientByUserId(user.id)
      if (patient) {
        setPatientId(patient.id)
        const [w, wa, m, mp, ph] = await Promise.all([
          getWeightLogs(patient.id),
          getTodayWater(patient.id),
          getMessages(patient.id),
          getMealPlans(patient.id),
          getProgressPhotos(patient.id),
        ])
        setWeights(w)
        if (wa) setWater({ ml: wa.ml, targetMl: wa.targetMl })
        setMessages(m)
        setMealPlans(mp)
        setPhotos(ph)
      }
    } else {
      setWeights(DEMO_WEIGHT_LOGS.map((d, i) => ({
        id: `demo-${i}`,
        weightKg: d.weight,
        loggedAt: d.date,
        notes: null,
      })))
      setWater({ ml: DEMO_WATER_LOG.ml, targetMl: DEMO_WATER_LOG.target })
      setMealPlans([{ id: '1', title: 'Plan hipocalórico v2', description: '1800 kcal — asignado por tu nutricionista', caloriesTarget: 1800 }])
    }
    setLoading(false)
  }, [user])

  useEffect(() => { load() }, [load])

  const handleWeight = async () => {
    const val = parseFloat(weightInput)
    if (!val || !patientId) return
    await addWeightLog(patientId, val, false)
    setWeightInput('')
    await load()
  }

  const handleWater = async (add: number) => {
    if (!patientId) {
      setWater((w) => ({ ...w, ml: Math.min(w.targetMl, w.ml + add) }))
      return
    }
    await upsertWater(patientId, Math.min(water.targetMl, water.ml + add), false)
    await load()
  }

  const handleMessage = async () => {
    if (!messageDraft.trim() || !patientId) return
    await sendPatientMessage(patientId, messageDraft.trim(), false)
    setMessageDraft('')
    await load()
  }

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !patientId || !user) return
    await uploadProgressPhoto(user.id, patientId, file, 'Foto de progreso', false)
    await load()
  }

  const chartData = weights.map((w) => ({
    date: new Date(w.loggedAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
    weight: w.weightKg,
  }))

  if (loading) {
    return <div className="py-12 text-center text-muted-foreground">Cargando tu portal…</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Hola, {user?.firstName}</h1>
        <p className="text-sm text-muted-foreground">Tu espacio personal de nutrición</p>
      </div>

      {/* Meal plans */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2 font-medium">
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            Mi plan alimenticio
          </div>
          {mealPlans.length > 0 ? mealPlans.map((p) => (
            <div key={p.id} className="rounded-lg bg-muted/40 p-3">
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              {p.caloriesTarget && <p className="mt-1 text-xs text-primary">{p.caloriesTarget} kcal/día</p>}
            </div>
          )) : (
            <p className="text-sm text-muted-foreground">Tu nutricionista aún no ha asignado un plan.</p>
          )}
        </CardContent>
      </Card>

      {/* Weight + water */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium"><Scale className="h-4 w-4 text-primary" />Mi peso</div>
            {chartData.length > 0 && (
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={chartData}>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip formatter={(v) => [`${v} kg`, 'Peso']} />
                  <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
            <div className="mt-2 flex gap-2">
              <Input type="number" step="0.1" placeholder="kg" value={weightInput} onChange={(e) => setWeightInput(e.target.value)} />
              <Button size="sm" onClick={handleWeight} disabled={!patientId && isSupabaseConfigured()}>Registrar</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium"><Droplets className="h-4 w-4 text-primary" />Agua hoy</div>
            <p className="mt-2 text-2xl font-bold">{water.ml} <span className="text-sm font-normal text-muted-foreground">/ {water.targetMl} ml</span></p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (water.ml / water.targetMl) * 100)}%` }} />
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleWater(250)}>+250 ml</Button>
              <Button size="sm" variant="outline" onClick={() => handleWater(500)}>+500 ml</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress photos */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium"><Camera className="h-4 w-4 text-primary" />Fotos de progreso</div>
            <label className="cursor-pointer">
              <span className="text-sm font-medium text-primary">Subir foto</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} disabled={!patientId && isSupabaseConfigured()} />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((p) => (
              p.url ? (
                <img key={p.id} src={p.url} alt={p.caption ?? 'Progreso'} className="aspect-square rounded-lg object-cover" />
              ) : null
            ))}
            {photos.length === 0 && <p className="col-span-3 text-sm text-muted-foreground">Aún no hay fotos. Sube tu primera foto de avance.</p>}
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2 font-medium"><MessageSquare className="h-4 w-4 text-primary" />Mensajes con tu clínica</div>
          <div className="mb-3 max-h-48 space-y-2 overflow-y-auto">
            {messages.length > 0 ? messages.map((m) => (
              <div
                key={m.id}
                className={`rounded-lg px-3 py-2 text-sm ${m.direction === 'inbound' ? 'ml-4 bg-primary/10' : 'mr-4 bg-muted'}`}
              >
                {m.content}
                <p className="mt-1 text-[10px] text-muted-foreground">{m.channel}</p>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground">Sin mensajes aún.</p>
            )}
          </div>
          <div className="flex gap-2">
            <Textarea rows={2} placeholder="Escribe a tu nutricionista…" value={messageDraft} onChange={(e) => setMessageDraft(e.target.value)} />
            <Button size="sm" onClick={handleMessage} disabled={!patientId && isSupabaseConfigured()}>Enviar</Button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Los mensajes se guardan en el sistema. Email y WhatsApp se activarán en la siguiente fase de integraciones.
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4 text-sm">
          <Activity className="h-5 w-5 text-primary" />
          <span>Tu nutricionista ve tu evolución en tiempo real desde el panel clínico.</span>
        </CardContent>
      </Card>
    </div>
  )
}
