import { useMemo, useState } from 'react'
import { Clock, Download, MapPin, Plus, Stethoscope, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatCompactNumber } from '@/utils/format'
import { MOCK_BRANCHES, MOCK_BRANCH_ROOMS, MOCK_BRANCH_STAFF, getBranchStats } from '../data/mockBranches'
import { BRANCH_STATUS, ROOM_TYPES, type BranchStatus } from '../types'

export function BranchesPage() {
  const [statusFilter, setStatusFilter] = useState<BranchStatus | 'all'>('all')
  const [selectedId, setSelectedId] = useState(MOCK_BRANCHES[0]?.id ?? '')

  const stats = useMemo(() => getBranchStats(MOCK_BRANCHES), [])
  const filtered = useMemo(
    () => (statusFilter === 'all' ? MOCK_BRANCHES : MOCK_BRANCHES.filter((b) => b.status === statusFilter)),
    [statusFilter],
  )
  const selected = MOCK_BRANCHES.find((b) => b.id === selectedId)
  const staff = MOCK_BRANCH_STAFF.filter((s) => s.branchId === selectedId)
  const rooms = MOCK_BRANCH_ROOMS.filter((r) => r.branchId === selectedId)

  return (
    <div>
      <PageHeader
        title="Sucursales"
        description="Gestión multisucursal con horarios, personal, consultorios y geolocalización."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Sucursales' }]}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" />Exportar</Button>
            <Button size="sm"><Plus className="h-4 w-4" />Nueva sucursal</Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Sucursales" value={String(stats.total)} icon={MapPin} accent="primary" index={0} />
        <StatCard label="Activas" value={String(stats.active)} icon={MapPin} accent="success" index={1} />
        <StatCard label="Personal" value={String(stats.staff)} icon={Users} accent="primary" index={2} />
        <StatCard label="Pacientes" value={formatCompactNumber(stats.patients)} icon={Stethoscope} accent="success" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="branches">
          <TabsList className="mb-4">
            <TabsTrigger value="branches" icon={<MapPin className="h-4 w-4" />}>Sucursales</TabsTrigger>
            <TabsTrigger value="detail" icon={<Users className="h-4 w-4" />}>Detalle sede</TabsTrigger>
            <TabsTrigger value="map" icon={<MapPin className="h-4 w-4" />}>Mapa</TabsTrigger>
          </TabsList>

          <TabsContent value="branches">
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>Todas</FilterChip>
                  {(Object.entries(BRANCH_STATUS) as [BranchStatus, { label: string }][]).map(([k, v]) => (
                    <FilterChip key={k} active={statusFilter === k} onClick={() => setStatusFilter(k)}>{v.label}</FilterChip>
                  ))}
                </div>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[960px] text-left text-sm">
                    <thead className="border-b border-border bg-muted/40">
                      <tr>
                        {['Código', 'Sucursal', 'Empresa', 'Ciudad', 'Estado', 'Personal', 'Consultorios', 'Pacientes', 'Horario', 'Director'].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((b) => (
                        <tr
                          key={b.id}
                          className={cn('cursor-pointer hover:bg-muted/20', selectedId === b.id && 'bg-primary/5')}
                          onClick={() => setSelectedId(b.id)}
                        >
                          <td className="px-4 py-3 font-mono text-xs font-medium">{b.code}</td>
                          <td className="px-4 py-3 font-medium">{b.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{b.companyName}</td>
                          <td className="px-4 py-3">{b.city}, {b.country}</td>
                          <td className="px-4 py-3"><Badge variant={BRANCH_STATUS[b.status].variant}>{BRANCH_STATUS[b.status].label}</Badge></td>
                          <td className="px-4 py-3">{b.staffCount}</td>
                          <td className="px-4 py-3">{b.roomCount}</td>
                          <td className="px-4 py-3">{formatCompactNumber(b.patientCount)}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{b.schedule}</td>
                          <td className="px-4 py-3 text-sm">{b.manager}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detail">
            {selected ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{selected.name}</h3>
                        <p className="text-sm text-muted-foreground">{selected.companyName} · {selected.code}</p>
                      </div>
                      <Badge variant={BRANCH_STATUS[selected.status].variant}>{BRANCH_STATUS[selected.status].label}</Badge>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <Row label="Dirección" value={selected.address} />
                      <Row label="Teléfono" value={selected.phone} />
                      <Row label="Email" value={selected.email} />
                      <Row label="Horario" value={selected.schedule} />
                      <Row label="Director" value={selected.manager} />
                      <Row label="Coordenadas" value={`${selected.lat.toFixed(4)}, ${selected.lng.toFixed(4)}`} />
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Users className="h-4 w-4 text-primary" />
                      Personal ({staff.length})
                    </h4>
                    <div className="space-y-2">
                      {staff.length > 0 ? staff.map((s) => (
                        <div key={s.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                          <div>
                            <p className="text-sm font-medium">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.role} · {s.email}</p>
                          </div>
                          <Badge variant="outline">{s.schedule}</Badge>
                        </div>
                      )) : (
                        <p className="text-sm text-muted-foreground">Sin personal registrado para esta sede.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardContent className="p-5">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      Consultorios y recursos ({rooms.length})
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {rooms.map((r) => (
                        <div key={r.id} className="rounded-xl border border-border p-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{r.name}</p>
                            <Badge variant="secondary">{ROOM_TYPES[r.type]}</Badge>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">Capacidad: {r.capacity} personas</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {r.equipment.map((eq) => (
                              <Badge key={eq} variant="outline" className="text-[10px]">{eq}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card><CardContent className="p-8 text-center text-muted-foreground">Selecciona una sucursal del listado.</CardContent></Card>
            )}
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardContent className="p-5">
                <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/30">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
                  {MOCK_BRANCHES.map((b, i) => (
                    <div
                      key={b.id}
                      className="absolute flex flex-col items-center"
                      style={{ left: `${15 + i * 16}%`, top: `${20 + (i % 3) * 22}%` }}
                    >
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border-2 bg-card shadow-md',
                        selectedId === b.id ? 'border-primary text-primary' : 'border-border',
                      )}>
                        <MapPin className="h-5 w-5" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedId(b.id)}
                        className="mt-1 rounded-md bg-card px-2 py-0.5 text-xs font-medium shadow-sm hover:bg-primary/10"
                      >
                        {b.name}
                      </button>
                    </div>
                  ))}
                  <p className="relative z-10 text-sm text-muted-foreground">
                    Vista de mapa demo · {MOCK_BRANCHES.length} sedes georreferenciadas
                  </p>
                </div>
                {selected && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {selected.name}: {selected.address} · {selected.schedule}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-28 shrink-0 text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        active ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted/60',
      )}
    >
      {children}
    </button>
  )
}
