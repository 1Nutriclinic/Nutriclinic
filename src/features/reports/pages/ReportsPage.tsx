import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Download, FileSpreadsheet } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
const WEIGHT_DATA = [
  { date: 'Ene', peso: 85.2, imc: 32.4, grasa: 39.1 },
  { date: 'Feb', peso: 83.8, imc: 31.9, grasa: 38.5 },
  { date: 'Mar', peso: 82.1, imc: 31.3, grasa: 37.8 },
  { date: 'Abr', peso: 81.2, imc: 30.9, grasa: 37.2 },
  { date: 'May', peso: 79.6, imc: 30.3, grasa: 36.5 },
  { date: 'Jun', peso: 78.4, imc: 29.9, grasa: 35.8 },
]

const COMPARATIVE = [
  { metric: 'Peso (kg)', inicial: 85.2, actual: 78.4, objetivo: 68, unidad: 'kg' },
  { metric: 'IMC', inicial: 32.4, actual: 29.9, objetivo: 25.8, unidad: '' },
  { metric: 'Grasa (%)', inicial: 39.1, actual: 35.8, objetivo: 28, unidad: '%' },
  { metric: 'Músculo (kg)', inicial: 23.2, actual: 24.1, objetivo: 26, unidad: 'kg' },
  { metric: 'Cintura (cm)', inicial: 96, actual: 92, objetivo: 82, unidad: 'cm' },
]

const REPORT_TYPES = [
  { key: 'weight', label: 'Evolución de peso' },
  { key: 'imc', label: 'Evolución IMC' },
  { key: 'body', label: 'Composición corporal' },
  { key: 'comparative', label: 'Comparativa' },
]

export function ReportsPage() {
  const [reportType, setReportType] = useState('weight')

  return (
    <div>
      <PageHeader
        title="Reportes"
        description="Reportes de evolución con comparativas y exportación PDF / Excel."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Reportes' }]}
        actions={
          <>
            <Button variant="outline" size="sm"><FileSpreadsheet className="h-4 w-4" />Exportar Excel</Button>
            <Button size="sm"><Download className="h-4 w-4" />Exportar PDF</Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {REPORT_TYPES.map((r) => (
          <button key={r.key} type="button" onClick={() => setReportType(r.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${reportType === r.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
            {r.label}
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {(reportType === 'weight' || reportType === 'imc') && (
          <Card>
            <CardHeader>
              <CardTitle>{reportType === 'weight' ? 'Evolución de peso' : 'Evolución IMC'} — María López García</CardTitle>
              <CardDescription>Programa Obesidad · Ene–Jun 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={WEIGHT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  {reportType === 'weight' ? (
                    <Line type="monotone" dataKey="peso" name="Peso (kg)" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                  ) : (
                    <Line type="monotone" dataKey="imc" name="IMC" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {reportType === 'body' && (
          <Card>
            <CardHeader>
              <CardTitle>Composición corporal</CardTitle>
              <CardDescription>Peso, grasa corporal e IMC — 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={WEIGHT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="peso" name="Peso (kg)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="grasa" name="Grasa (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {reportType === 'comparative' && (
          <Card>
            <CardHeader>
              <CardTitle>Comparativa inicial vs. actual vs. objetivo</CardTitle>
              <CardDescription>María López García — Programa Obesidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      {['Métrica', 'Inicial', 'Actual', 'Objetivo', 'Progreso'].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {COMPARATIVE.map((row) => {
                      const progress = Math.round(((row.inicial - row.actual) / (row.inicial - row.objetivo)) * 100)
                      return (
                        <tr key={row.metric} className="hover:bg-muted/20">
                          <td className="px-4 py-3 font-medium">{row.metric}</td>
                          <td className="px-4 py-3">{row.inicial}{row.unidad}</td>
                          <td className="px-4 py-3 font-bold text-primary">{row.actual}{row.unidad}</td>
                          <td className="px-4 py-3 text-muted-foreground">{row.objetivo}{row.unidad}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                                <div className="h-full rounded-full bg-success" style={{ width: `${Math.min(progress, 100)}%` }} />
                              </div>
                              <span className="text-xs font-medium">{Math.min(progress, 100)}%</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
