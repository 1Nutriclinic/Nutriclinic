import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  Download,
  Eye,
  LogIn,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Input, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatDate, formatTime } from '@/utils/format'
import { MOCK_AUDIT_LOGS, getAuditStats } from '../data/mockAudit'
import {
  AUDIT_ACTIONS,
  AUDIT_MODULES,
  AUDIT_SEVERITY,
  type AuditAction,
  type AuditModule,
  type AuditSeverity,
} from '../types'

const ACTION_ICONS: Partial<Record<AuditAction, typeof LogIn>> = {
  login: LogIn,
  logout: LogIn,
  delete: Trash2,
  access: Eye,
}

export function AuditPage() {
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState<AuditAction | 'all'>('all')
  const [moduleFilter, setModuleFilter] = useState<AuditModule | 'all'>('all')
  const [severityFilter, setSeverityFilter] = useState<AuditSeverity | 'all'>('all')

  const stats = useMemo(() => getAuditStats(MOCK_AUDIT_LOGS), [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return MOCK_AUDIT_LOGS.filter((l) => {
      if (actionFilter !== 'all' && l.action !== actionFilter) return false
      if (moduleFilter !== 'all' && l.module !== moduleFilter) return false
      if (severityFilter !== 'all' && l.severity !== severityFilter) return false
      if (q && !`${l.description} ${l.userName} ${l.entity} ${l.ip}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [search, actionFilter, moduleFilter, severityFilter])

  return (
    <div>
      <PageHeader
        title="Auditoría"
        description="Registro inmutable de actividad, accesos y cambios para cumplimiento normativo."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Auditoría' }]}
        actions={
          <Button variant="outline" size="sm"><Download className="h-4 w-4" />Exportar log</Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Eventos totales" value={String(stats.total)} icon={ShieldCheck} accent="primary" index={0} />
        <StatCard label="Hoy" value={String(stats.today)} icon={Eye} accent="primary" index={1} />
        <StatCard label="Advertencias" value={String(stats.warning)} icon={AlertTriangle} accent="warning" index={2} />
        <StatCard label="Críticos" value={String(stats.critical)} icon={AlertTriangle} accent="danger" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="timeline">
          <TabsList className="mb-4">
            <TabsTrigger value="timeline" icon={<ShieldCheck className="h-4 w-4" />}>Timeline</TabsTrigger>
            <TabsTrigger value="table" icon={<Eye className="h-4 w-4" />}>Tabla</TabsTrigger>
          </TabsList>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              placeholder="Buscar por usuario, descripción, IP…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex flex-wrap gap-2">
              <FilterChip active={severityFilter === 'all'} onClick={() => setSeverityFilter('all')}>Todas</FilterChip>
              {(Object.entries(AUDIT_SEVERITY) as [AuditSeverity, { label: string }][]).map(([k, v]) => (
                <FilterChip key={k} active={severityFilter === k} onClick={() => setSeverityFilter(k)}>{v.label}</FilterChip>
              ))}
            </div>
          </div>

          <TabsContent value="timeline">
            <Card>
              <CardContent className="p-5">
                <div className="space-y-0">
                  {filtered.map((log, i) => {
                    const Icon = ACTION_ICONS[log.action] ?? ShieldCheck
                    return (
                      <div key={log.id} className="relative flex gap-4 pb-6">
                        {i < filtered.length - 1 && (
                          <div className="absolute left-[19px] top-10 h-full w-px bg-border" />
                        )}
                        <div className={cn(
                          'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-card',
                          log.severity === 'critical' ? 'border-danger text-danger' :
                          log.severity === 'warning' ? 'border-warning text-warning' :
                          'border-primary/30 text-primary',
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1 rounded-xl border border-border p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <p className="font-medium">{log.description}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {log.userName} ({log.userRole})
                                {log.branchName ? ` · ${log.branchName}` : ''}
                                {' · '}{log.ip}
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-1">
                              <Badge variant={AUDIT_SEVERITY[log.severity].variant}>{AUDIT_SEVERITY[log.severity].label}</Badge>
                              <Badge variant="outline">{AUDIT_ACTIONS[log.action]}</Badge>
                              <Badge variant="secondary">{AUDIT_MODULES[log.module]}</Badge>
                            </div>
                          </div>
                          {log.metadata && (
                            <div className="mt-2 rounded-lg bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
                              {Object.entries(log.metadata).map(([k, v]) => (
                                <span key={k} className="mr-3">{k}: {v}</span>
                              ))}
                            </div>
                          )}
                          <p className="mt-2 text-xs text-muted-foreground">
                            {formatDate(log.createdAt)} · {formatTime(log.createdAt)} · {log.userAgent}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  {filtered.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">No hay eventos que coincidan con los filtros.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  <FilterChip active={actionFilter === 'all'} onClick={() => setActionFilter('all')}>Todas las acciones</FilterChip>
                  {(Object.entries(AUDIT_ACTIONS) as [AuditAction, string][]).slice(0, 6).map(([k, v]) => (
                    <FilterChip key={k} active={actionFilter === k} onClick={() => setActionFilter(k)}>{v}</FilterChip>
                  ))}
                  <span className="mx-1 w-px bg-border" />
                  <FilterChip active={moduleFilter === 'all'} onClick={() => setModuleFilter('all')}>Todos los módulos</FilterChip>
                  {(Object.entries(AUDIT_MODULES) as [AuditModule, string][]).slice(0, 5).map(([k, v]) => (
                    <FilterChip key={k} active={moduleFilter === k} onClick={() => setModuleFilter(k)}>{v}</FilterChip>
                  ))}
                </div>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="border-b border-border bg-muted/40">
                      <tr>
                        {['Fecha/Hora', 'Severidad', 'Acción', 'Módulo', 'Descripción', 'Usuario', 'IP'].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((log) => (
                        <tr key={log.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3 text-xs whitespace-nowrap">
                            {formatDate(log.createdAt)}<br />{formatTime(log.createdAt)}
                          </td>
                          <td className="px-4 py-3"><Badge variant={AUDIT_SEVERITY[log.severity].variant}>{AUDIT_SEVERITY[log.severity].label}</Badge></td>
                          <td className="px-4 py-3"><Badge variant="outline">{AUDIT_ACTIONS[log.action]}</Badge></td>
                          <td className="px-4 py-3 text-muted-foreground">{AUDIT_MODULES[log.module]}</td>
                          <td className="px-4 py-3 max-w-xs truncate">{log.description}</td>
                          <td className="px-4 py-3">{log.userName}</td>
                          <td className="px-4 py-3 font-mono text-xs">{log.ip}</td>
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
