import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Building2, TrendingDown, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { formatCurrency, formatCompactNumber } from '@/utils/format'

const REVENUE_TREND = [
  { month: 'Ene', ingresos: 62000, costos: 38000, utilidad: 24000 },
  { month: 'Feb', ingresos: 68500, costos: 41000, utilidad: 27500 },
  { month: 'Mar', ingresos: 71200, costos: 42500, utilidad: 28700 },
  { month: 'Abr', ingresos: 74800, costos: 44000, utilidad: 30800 },
  { month: 'May', ingresos: 80300, costos: 46200, utilidad: 34100 },
  { month: 'Jun', ingresos: 84200, costos: 48000, utilidad: 36200 },
  { month: 'Jul', ingresos: 89400, costos: 49500, utilidad: 39900 },
]

const BRANCH_COMPARISON = [
  { branch: 'Miraflores', pacientes: 412, ingresos: 38400, retencion: 88 },
  { branch: 'San Isidro', pacientes: 328, ingresos: 31200, retencion: 82 },
  { branch: 'Surco', pacientes: 184, ingresos: 19800, retencion: 79 },
]

const PROGRAM_REVENUE = [
  { name: 'Obesidad', value: 32, fill: '#ef4444' },
  { name: 'Diabetes', value: 18, fill: '#8b5cf6' },
  { name: 'Deportistas', value: 15, fill: '#10b981' },
  { name: 'Gestantes', value: 12, fill: '#ec4899' },
  { name: 'Pediatría', value: 10, fill: '#06b6d4' },
  { name: 'Otros', value: 13, fill: '#94a3b8' },
]

const RETENTION = [
  { month: 'Ene', retencion: 78, abandono: 8 },
  { month: 'Feb', retencion: 80, abandono: 7 },
  { month: 'Mar', retencion: 81, abandono: 6 },
  { month: 'Abr', retencion: 83, abandono: 5 },
  { month: 'May', retencion: 84, abandono: 5 },
  { month: 'Jun', retencion: 85, abandono: 4 },
  { month: 'Jul', retencion: 86, abandono: 4 },
]

export function BiPage() {
  return (
    <div>
      <PageHeader
        title="Business Intelligence"
        description="Analítica avanzada, cohortes y tableros personalizables multiempresa."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Business Intelligence' }]}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Ingresos Jul" value={formatCurrency(89400)} icon={TrendingUp} trend="up" delta="+6.2%" accent="success" index={0} />
        <StatCard label="Utilidad" value={formatCurrency(39900)} icon={TrendingUp} trend="up" delta="+10.2%" accent="primary" index={1} />
        <StatCard label="Pacientes activos" value={formatCompactNumber(924)} icon={Users} trend="up" delta="+7.3%" accent="primary" index={2} />
        <StatCard label="Retención" value="86%" icon={TrendingDown} trend="up" delta="+1%" accent="success" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos vs. costos vs. utilidad</CardTitle>
            <CardDescription>Tendencia mensual consolidada — 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={REVENUE_TREND}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} className="text-xs" />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Legend />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="utilidad" name="Utilidad" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />Comparativa por sucursal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={BRANCH_COMPARISON} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tickFormatter={(v) => `${v / 1000}k`} className="text-xs" />
                  <YAxis type="category" dataKey="branch" width={80} className="text-xs" />
                  <Tooltip formatter={(v, name) => [name === 'ingresos' ? formatCurrency(Number(v)) : v, name === 'ingresos' ? 'Ingresos' : 'Pacientes']} />
                  <Bar dataKey="ingresos" name="Ingresos" fill="#2563eb" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                {BRANCH_COMPARISON.map((b) => (
                  <div key={b.branch} className="rounded-lg bg-muted/40 p-2">
                    <p className="font-medium">{b.branch}</p>
                    <p className="text-muted-foreground">{b.pacientes} pac. · {b.retencion}% ret.</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rentabilidad por programa</CardTitle>
              <CardDescription>Distribución de ingresos (%)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={PROGRAM_REVENUE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    {PROGRAM_REVENUE.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, 'Participación']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Retención vs. abandono</CardTitle>
            <CardDescription>Tasa mensual de retención de pacientes activos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={RETENTION}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Bar dataKey="retencion" name="Retención %" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="abandono" name="Abandono %" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
