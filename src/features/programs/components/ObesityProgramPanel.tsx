import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { formatDate } from '@/utils/format'
import type { ObesityProgramData } from '../types'

export function ObesityProgramPanel({ data }: { data: ObesityProgramData }) {
  const lost = data.initialWeight - data.currentWeight
  const percentLost = +((lost / data.initialWeight) * 100).toFixed(1)
  const remaining = data.currentWeight - data.targetWeight

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="Peso inicial" value={`${data.initialWeight} kg`} />
        <Kpi label="Peso actual" value={`${data.currentWeight} kg`} accent="primary" />
        <Kpi label="Objetivo" value={`${data.targetWeight} kg`} />
        <Kpi label="% Perdido" value={`${percentLost}%`} accent="success" />
        <Kpi label="Faltan" value={`${remaining.toFixed(1)} kg`} />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Evolución de peso</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.weightHistory}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tickFormatter={(d) => formatDate(d, { day: '2-digit', month: 'short' })} className="text-xs" />
              <YAxis domain={['dataMin - 2', 'dataMax + 1']} className="text-xs" />
              <Tooltip formatter={(v) => [`${v ?? 0} kg`, 'Peso']} labelFormatter={(d) => formatDate(String(d))} />
              <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="IMC" value={data.imc.toFixed(1)} badge={data.imc >= 30 ? 'Obesidad' : data.imc >= 25 ? 'Sobrepeso' : 'Normal'} />
        <MetricCard label="Circunferencia cintura" value={`${data.waist} cm`} />
        <MetricCard label="Grasa corporal" value={`${data.fatPercent}%`} />
        <MetricCard label="Masa muscular" value={`${data.muscleMass} kg`} />
        <MetricCard label="Grasa visceral" value={String(data.visceralFat)} />
        <MetricCard label="Edad metabólica" value={`${data.metabolicAge} años`} />
        <MetricCard label="Adherencia" value={`${data.adherence}%`} badge={data.adherence >= 80 ? 'Buena' : 'Regular'} />
        <MetricCard label="Actividad física" value={data.activityLevel} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Fotos antes / después</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {['Antes', 'Actual'].map((label) => (
                <div key={label} className="overflow-hidden rounded-lg border border-border">
                  <div className="flex aspect-[3/4] items-center justify-center bg-muted/40 text-xs text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Ansiedad (escala 1-10)</CardTitle></CardHeader>
          <CardContent>
            <p className="font-display text-4xl font-bold text-foreground">{data.anxietyScore}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {data.anxietyScore <= 3 ? 'Baja' : data.anxietyScore <= 6 ? 'Moderada' : 'Alta'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Sueño</CardTitle></CardHeader>
          <CardContent>
            <p className="font-display text-4xl font-bold text-foreground">{data.sleepHours}h</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {data.sleepHours >= 7 ? 'Adecuado' : 'Insuficiente — recomendar higiene del sueño'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: 'primary' | 'success' }) {
  const color = accent === 'primary' ? 'text-primary' : accent === 'success' ? 'text-success' : 'text-foreground'
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function MetricCard({ label, value, badge }: { label: string; value: string; badge?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold text-foreground">{value}</p>
      {badge && <Badge variant="secondary" className="mt-2">{badge}</Badge>}
    </div>
  )
}
