import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Building2,
  Download,
  LineChart,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatCurrency, formatCompactNumber, formatPercent } from '@/utils/format'
import {
  BRANCH_PERFORMANCE,
  EXECUTIVE_KPIS,
  PROGRAM_PROFITABILITY,
  REVENUE_PROJECTION,
  STRATEGIC_GOALS,
} from '../data/mockExecutive'
import type { StrategicGoal } from '../types'

const GOAL_CATEGORY_LABEL: Record<StrategicGoal['category'], string> = {
  financial: 'Financiero',
  clinical: 'Clínico',
  operational: 'Operacional',
}

function GoalProgressBar({ goal }: { goal: StrategicGoal }) {
  const pct = Math.min(100, Math.round((goal.current / goal.target) * 100))
  const isInverse = goal.title.toLowerCase().includes('abandono')
  const displayPct = isInverse ? Math.max(0, 100 - pct) : pct

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{goal.title}</p>
          <p className="text-xs text-muted-foreground">
            Meta: {goal.unit === 'S/' ? formatCurrency(goal.target) : `${goal.target}${goal.unit === '%' ? '%' : ` ${goal.unit}`}`}
            {' · '}
            {new Date(goal.deadline).toLocaleDateString('es-PE', { month: 'short', year: 'numeric' })}
          </p>
        </div>
        <Badge variant="secondary">{GOAL_CATEGORY_LABEL[goal.category]}</Badge>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full transition-all', displayPct >= 80 ? 'bg-success' : displayPct >= 50 ? 'bg-primary' : 'bg-warning')}
          style={{ width: `${displayPct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Actual: {goal.unit === 'S/' ? formatCurrency(goal.current) : `${goal.current}${goal.unit === '%' ? '%' : ` ${goal.unit}`}`}
        {' '}({displayPct}%)
      </p>
    </div>
  )
}

export function ExecutivePage() {
  return (
    <div>
      <PageHeader
        title="Dashboard Ejecutivo"
        description="Visión estratégica multi-sucursal con KPIs financieros, clínicos y proyecciones."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Dashboard Ejecutivo' }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button size="sm">
              <Target className="h-4 w-4" />
              Configurar metas
            </Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {EXECUTIVE_KPIS.map((kpi, i) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            icon={i < 2 ? TrendingUp : i < 4 ? Users : LineChart}
            trend={kpi.trend}
            delta={kpi.delta}
            hint={`Meta: ${kpi.target}`}
            accent={kpi.progress >= 95 ? 'success' : 'primary'}
            index={i}
          />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Proyección de ingresos 2026</CardTitle>
              <CardDescription>Actual vs. proyectado vs. meta mensual (consolidado)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={REVENUE_PROJECTION}>
                  <defs>
                    <linearGradient id="projFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                  <Legend />
                  <Area type="monotone" dataKey="projected" name="Proyectado" stroke="#2563EB" fill="url(#projFill)" strokeWidth={2} />
                  <Line type="monotone" dataKey="actual" name="Real" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="target" name="Meta" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metas estratégicas</CardTitle>
              <CardDescription>Progreso hacia objetivos Q3–Q4 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {STRATEGIC_GOALS.map((g) => (
                <GoalProgressBar key={g.id} goal={g} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por sucursal</CardTitle>
              <CardDescription>Comparativa de ingresos, margen y satisfacción</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={BRANCH_PERFORMANCE} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="branch" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v, name) => (String(name) === 'Ingresos' ? formatCurrency(Number(v)) : v)} />
                  <Legend />
                  <Bar dataKey="revenue" name="Ingresos" fill="#2563EB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {BRANCH_PERFORMANCE.map((b) => (
                  <div key={b.branch} className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">{b.branch}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{formatCompactNumber(b.patients)} pacientes</p>
                    <p className="text-xs">Margen: {formatPercent(b.margin, 0)}</p>
                    <p className="text-xs">Satisfacción: {b.satisfaction}/5</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${b.goalProgress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rentabilidad por programa</CardTitle>
              <CardDescription>Ingresos, costos y margen clínico</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={PROGRAM_PROFITABILITY}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="program" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                  <Legend />
                  <Bar dataKey="revenue" name="Ingresos" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cost" name="Costos" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap gap-2">
                {PROGRAM_PROFITABILITY.map((p) => (
                  <Badge key={p.program} variant="outline">
                    {p.program}: {formatPercent(p.margin, 0)} margen
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
