import { useMemo, useState } from 'react'
import {
  Clock,
  Mic,
  MicOff,
  Monitor,
  PhoneOff,
  Plus,
  Video,
  VideoOff,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Avatar, Badge, Button, Card, CardContent } from '@/components/ui'
import { formatDate, formatTime } from '@/utils/format'
import { MOCK_TELEHEALTH } from '../data/mockTelehealth'
import { TELEHEALTH_STATUS, type TelehealthSession } from '../types'

export function TelehealthPage() {
  const [activeSession, setActiveSession] = useState<TelehealthSession | null>(
    MOCK_TELEHEALTH.find((s) => s.status === 'waiting') ?? null,
  )
  const [inCall, setInCall] = useState(false)
  const [muted, setMuted] = useState(false)
  const [videoOff, setVideoOff] = useState(false)

  const stats = useMemo(() => ({
    waiting: MOCK_TELEHEALTH.filter((s) => s.status === 'waiting').length,
    today: MOCK_TELEHEALTH.filter((s) => s.scheduledAt.startsWith('2026-07-02')).length,
    completed: MOCK_TELEHEALTH.filter((s) => s.status === 'completed').length,
  }), [])

  const startCall = () => setInCall(true)
  const endCall = () => { setInCall(false); setActiveSession(null) }

  return (
    <div>
      <PageHeader
        title="Videoconsulta"
        description="Consultas remotas con sala de espera virtual, video HD y notas en vivo."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Videoconsulta' }]}
        actions={<Button size="sm"><Plus className="h-4 w-4" />Programar videoconsulta</Button>}
      />

      <div className="mb-6 grid grid-cols-3 gap-4">
        <StatCard label="En espera" value={String(stats.waiting)} icon={Clock} accent="warning" index={0} />
        <StatCard label="Hoy" value={String(stats.today)} icon={Video} accent="primary" index={1} />
        <StatCard label="Completadas" value={String(stats.completed)} icon={Video} accent="success" index={2} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
              {inCall && activeSession ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Avatar name={activeSession.patientName} size="xl" className="mx-auto" />
                      <p className="mt-4 font-display text-xl font-bold">{activeSession.patientName}</p>
                      <p className="text-sm text-white/70">Consulta en curso · {activeSession.nutritionistName}</p>
                      <p className="mt-2 flex items-center justify-center gap-2 text-xs text-white/60">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> En vivo
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
                    <Button size="icon" variant={muted ? 'destructive' : 'secondary'} onClick={() => setMuted(!muted)}>
                      {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant={videoOff ? 'destructive' : 'secondary'} onClick={() => setVideoOff(!videoOff)}>
                      {videoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="secondary"><Monitor className="h-4 w-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={endCall}><PhoneOff className="h-4 w-4" /></Button>
                  </div>
                </>
              ) : activeSession ? (
                <div className="flex h-full flex-col items-center justify-center text-white">
                  <Avatar name={activeSession.patientName} size="xl" />
                  <p className="mt-4 font-display text-xl font-bold">{activeSession.patientName}</p>
                  <p className="text-sm text-white/70">Sala de espera · Programada {formatTime(activeSession.scheduledAt)}</p>
                  <Button className="mt-6" onClick={startCall}><Video className="h-4 w-4" />Iniciar consulta</Button>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-white/60">
                  <div className="text-center">
                    <Video className="mx-auto h-12 w-12" />
                    <p className="mt-2">Selecciona una sesión de la lista</p>
                  </div>
                </div>
              )}
            </div>
            {activeSession && (
              <CardContent className="border-t border-border p-4">
                <p className="text-sm font-medium">Notas de consulta</p>
                <textarea className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm" rows={3}
                  placeholder="Escribe notas clínicas durante la videoconsulta…"
                  defaultValue={activeSession.notes} />
              </CardContent>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 font-display font-semibold">Sala de espera</h3>
              <div className="space-y-2">
                {MOCK_TELEHEALTH.filter((s) => s.status === 'waiting' || s.status === 'scheduled').map((s) => (
                  <button key={s.id} type="button" onClick={() => { setActiveSession(s); setInCall(false) }}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all ${activeSession?.id === s.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/30'}`}>
                    <Avatar name={s.patientName} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{s.patientName}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(s.scheduledAt)}</p>
                    </div>
                    <Badge variant={TELEHEALTH_STATUS[s.status].variant}>{TELEHEALTH_STATUS[s.status].label}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 font-display font-semibold">Historial reciente</h3>
              <div className="space-y-2">
                {MOCK_TELEHEALTH.filter((s) => s.status === 'completed' || s.status === 'cancelled').map((s) => (
                  <div key={s.id} className="rounded-lg border border-border px-3 py-2">
                    <p className="text-sm font-medium">{s.patientName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(s.scheduledAt)} · {s.duration ? `${s.duration} min` : TELEHEALTH_STATUS[s.status].label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
