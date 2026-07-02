import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  Calendar,
  Droplets,
  ExternalLink,
  FileText,
  MessageSquare,
  Scale,
  Settings,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { formatDate, formatTime } from '@/utils/format'
import {
  DEMO_WATER_LOG,
  DEMO_WEIGHT_LOGS,
  MOCK_PORTAL_ACTIVITY,
  MOCK_PORTAL_PATIENTS,
} from '../data/mockPortalData'

export function PatientPortalPage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('pp-001')

  const enabled = MOCK_PORTAL_PATIENTS.filter((p) => p.portalEnabled)
  const selected = MOCK_PORTAL_PATIENTS.find((p) => p.id === selectedId)

  const stats = useMemo(() => ({
    enabled: enabled.length,
    activeToday: MOCK_PORTAL_ACTIVITY.filter((a) => a.timestamp.startsWith('2026-07-02')).length,
    weightLogs: MOCK_PORTAL_ACTIVITY.filter((a) => a.type === 'weight_log').length,
    messages: MOCK_PORTAL_ACTIVITY.filter((a) => a.type === 'message').length,
  }), [])

  return (
    <div>
      <PageHeader
        title="Portal del Paciente"
        description="Gestión del portal: dieta, citas, evolución, autorregistro y mensajes."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Portal del Paciente' }]}
        actions={
          <Button size="sm"><Settings className="h-4 w-4" />Configurar portal</Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Portales activos" value={String(stats.enabled)} icon={Users} accent="primary" index={0} />
        <StatCard label="Actividad hoy" value={String(stats.activeToday)} icon={Activity} accent="success" index={1} />
        <StatCard label="Registros de peso" value={String(stats.weightLogs)} icon={Scale} accent="primary" index={2} />
        <StatCard label="Mensajes" value={String(stats.messages)} icon={MessageSquare} accent="primary" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="patients">
          <TabsList className="mb-4">
            <TabsTrigger value="patients" icon={<Users className="h-4 w-4" />}>Pacientes</TabsTrigger>
            <TabsTrigger value="preview" icon={<ExternalLink className="h-4 w-4" />}>Vista previa</TabsTrigger>
            <TabsTrigger value="activity" icon={<Activity className="h-4 w-4" />}>Actividad</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <Card><CardContent className="p-5">
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      {['Paciente', 'Portal', 'Dieta', 'Citas', 'Evolución', 'Mensajes', 'Último acceso'].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_PORTAL_PATIENTS.map((p) => (
                      <tr key={p.id} className="cursor-pointer hover:bg-muted/20" onClick={() => setSelectedId(p.id)}>
                        <td className="px-4 py-3 font-medium">{p.name}</td>
                        <td className="px-4 py-3"><AccessBadge enabled={p.portalEnabled} /></td>
                        <td className="px-4 py-3"><AccessBadge enabled={p.dietAccess} /></td>
                        <td className="px-4 py-3"><AccessBadge enabled={p.appointmentsAccess} /></td>
                        <td className="px-4 py-3"><AccessBadge enabled={p.evolutionAccess} /></td>
                        <td className="px-4 py-3"><AccessBadge enabled={p.messagesAccess} /></td>
                        <td className="px-4 py-3 text-muted-foreground">{p.lastLogin ? formatDate(p.lastLogin) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="preview">
            {selected && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <Card className="overflow-hidden border-primary/20">
                    <div className="border-b border-border bg-gradient-to-r from-primary/10 to-transparent px-6 py-4">
                      <p className="text-xs font-medium text-primary">Vista del paciente</p>
                      <h2 className="font-display text-xl font-bold">Hola, {selected.name.split(' ')[0]}</h2>
                      <p className="text-sm text-muted-foreground">Tu espacio personal de nutrición</p>
                    </div>
                    <CardContent className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                      <PortalTile icon={UtensilsCrossed} label="Mi dieta" enabled={selected.dietAccess} onClick={() => navigate('/meal-plans/mp-001')} />
                      <PortalTile icon={Calendar} label="Mis citas" enabled={selected.appointmentsAccess} onClick={() => navigate('/agenda')} />
                      <PortalTile icon={Activity} label="Mi evolución" enabled={selected.evolutionAccess} />
                      <PortalTile icon={MessageSquare} label="Mensajes" enabled={selected.messagesAccess} onClick={() => navigate('/messaging')} />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-sm font-medium"><Scale className="h-4 w-4 text-primary" />Registrar peso</div>
                        <p className="mt-2 font-display text-3xl font-bold">{DEMO_WEIGHT_LOGS.at(-1)!.weight} kg</p>
                        <ResponsiveContainer width="100%" height={100}>
                          <LineChart data={DEMO_WEIGHT_LOGS}>
                            <XAxis dataKey="date" hide />
                            <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                            <Tooltip formatter={(v) => [`${v} kg`, 'Peso']} />
                            <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-sm font-medium"><Droplets className="h-4 w-4 text-primary" />Agua hoy</div>
                        <p className="mt-2 font-display text-3xl font-bold">{DEMO_WATER_LOG.ml} <span className="text-base font-normal text-muted-foreground">/ {DEMO_WATER_LOG.target} ml</span></p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${(DEMO_WATER_LOG.ml / DEMO_WATER_LOG.target) * 100}%` }} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold">Próxima cita</h3>
                    <p className="mt-2 text-sm">Control mensual</p>
                    <p className="text-xs text-muted-foreground">Jue 3 Jul · 10:00 · Dra. Ana Ruiz</p>
                    <Button className="mt-4 w-full" size="sm" variant="outline">Ver todas mis citas</Button>
                    <div className="mt-6">
                      <h3 className="flex items-center gap-2 font-display font-semibold"><FileText className="h-4 w-4" />Archivos</h3>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>Plan alimenticio v2.pdf</li>
                        <li>Resultados laboratorio.pdf</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <Card><CardContent className="p-5">
              <div className="space-y-2">
                {MOCK_PORTAL_ACTIVITY.map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{a.patientName}</p>
                      <p className="text-xs text-muted-foreground">{a.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(a.timestamp)} {formatTime(a.timestamp)}</span>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function AccessBadge({ enabled }: { enabled: boolean }) {
  return <Badge variant={enabled ? 'success' : 'secondary'}>{enabled ? 'Sí' : 'No'}</Badge>
}

function PortalTile({ icon: Icon, label, enabled, onClick }: { icon: typeof Users; label: string; enabled: boolean; onClick?: () => void }) {
  return (
    <button type="button" disabled={!enabled} onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${enabled ? 'border-border hover:border-primary/30 hover:bg-primary/5' : 'cursor-not-allowed border-dashed opacity-40'}`}>
      <Icon className="h-6 w-6 text-primary" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
