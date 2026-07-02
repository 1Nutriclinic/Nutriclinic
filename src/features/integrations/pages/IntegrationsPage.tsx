import { useMemo, useState } from 'react'
import { Key, Link2, Plug, Plus, RefreshCw, Webhook } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatDate, formatTime } from '@/utils/format'
import { MOCK_API_KEYS, MOCK_WEBHOOKS, getIntegrationStats } from '../data/mockIntegrations'
import { useIntegrationsStore } from '../store/integrationsStore'
import {
  INTEGRATION_CATEGORIES,
  INTEGRATION_STATUS,
  type IntegrationCategory,
} from '../types'

export function IntegrationsPage() {
  const integrations = useIntegrationsStore((s) => s.integrations)
  const toggleIntegration = useIntegrationsStore((s) => s.toggleIntegration)
  const [categoryFilter, setCategoryFilter] = useState<IntegrationCategory | 'all'>('all')

  const stats = useMemo(() => getIntegrationStats(integrations), [integrations])
  const filtered = useMemo(
    () => (categoryFilter === 'all' ? integrations : integrations.filter((i) => i.category === categoryFilter)),
    [integrations, categoryFilter],
  )

  return (
    <div>
      <PageHeader
        title="Integraciones"
        description="Conecta APIs externas, laboratorios, pasarelas de pago y dispositivos médicos."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Integraciones' }]}
        actions={<Button size="sm"><Plus className="h-4 w-4" />Nueva integración</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Disponibles" value={String(stats.total)} icon={Plug} accent="primary" index={0} />
        <StatCard label="Conectadas" value={String(stats.connected)} icon={Link2} accent="success" index={1} />
        <StatCard label="Pendientes" value={String(stats.pending)} icon={RefreshCw} accent="warning" index={2} />
        <StatCard label="Webhooks" value={String(MOCK_WEBHOOKS.length)} icon={Webhook} accent="primary" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="catalog">
          <TabsList className="mb-4">
            <TabsTrigger value="catalog" icon={<Plug className="h-4 w-4" />}>Catálogo</TabsTrigger>
            <TabsTrigger value="webhooks" icon={<Webhook className="h-4 w-4" />}>Webhooks</TabsTrigger>
            <TabsTrigger value="apikeys" icon={<Key className="h-4 w-4" />}>API Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <div className="mb-4 flex flex-wrap gap-2">
              <FilterChip active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>Todas</FilterChip>
              {(Object.entries(INTEGRATION_CATEGORIES) as [IntegrationCategory, string][]).map(([k, v]) => (
                <FilterChip key={k} active={categoryFilter === k} onClick={() => setCategoryFilter(k)}>{v}</FilterChip>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.provider}</p>
                        </div>
                      </div>
                      <Badge variant={INTEGRATION_STATUS[item.status].variant}>
                        {INTEGRATION_STATUS[item.status].label}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="outline">{INTEGRATION_CATEGORIES[item.category]}</Badge>
                      {item.lastSync && (
                        <span className="text-[10px] text-muted-foreground">
                          Sync: {formatDate(item.lastSync)} {formatTime(item.lastSync)}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant={item.status === 'connected' ? 'outline' : 'default'}
                        className="flex-1"
                        disabled={item.status === 'pending'}
                        onClick={() => toggleIntegration(item.id)}
                      >
                        {item.status === 'connected' ? 'Desconectar' : item.status === 'pending' ? 'Configurando…' : 'Conectar'}
                      </Button>
                      <Button size="sm" variant="outline">Configurar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webhooks">
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Endpoints configurados para eventos del sistema.</p>
                  <Button size="sm"><Plus className="h-4 w-4" />Nuevo webhook</Button>
                </div>
                <div className="space-y-3">
                  {MOCK_WEBHOOKS.map((wh) => (
                    <div key={wh.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{wh.name}</p>
                          <Badge variant={wh.status === 'active' ? 'success' : 'secondary'}>
                            {wh.status === 'active' ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </div>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">{wh.url}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {wh.events.map((e) => (
                            <Badge key={e} variant="outline" className="text-[10px]">{e}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium text-success">{wh.successRate}% éxito</p>
                        {wh.lastTriggered && (
                          <p className="text-xs text-muted-foreground">Último: {formatTime(wh.lastTriggered)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apikeys">
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Claves de acceso a la API REST de NutriClinic Pro.</p>
                  <Button size="sm"><Plus className="h-4 w-4" />Generar clave</Button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="border-b border-border bg-muted/40">
                      <tr>
                        {['Nombre', 'Prefijo', 'Scopes', 'Creada', 'Último uso'].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {MOCK_API_KEYS.map((key) => (
                        <tr key={key.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3 font-medium">{key.name}</td>
                          <td className="px-4 py-3 font-mono text-xs">{key.prefix}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {key.scopes.map((s) => (
                                <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(key.createdAt)}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">
                            {key.lastUsed ? formatDate(key.lastUsed) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
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
