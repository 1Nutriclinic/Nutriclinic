import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { formatDate } from '@/utils/format'
import { getGestationalTrimester, getRecommendedWeightGain } from '../utils/programUtils'
import type { PregnantProgramData } from '../types'

export function PregnantProgramPanel({ data }: { data: PregnantProgramData }) {
  const trimester = getGestationalTrimester(data.gestationalWeek)
  const gain = data.currentWeight - data.prePregnancyWeight
  const recommended = getRecommendedWeightGain(data.prePregnancyWeight, data.gestationalWeek)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Semana gestacional" value={`${data.gestationalWeek} sem`} />
        <Kpi label="Trimestre" value={`${trimester}° trimestre`} />
        <Kpi label="Ganancia de peso" value={`+${gain.toFixed(1)} kg`} accent={gain > recommended.max ? 'warning' : 'success'} />
        <Kpi label="Meta recomendada" value={`${recommended.min}–${recommended.max} kg`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Curva de ganancia de peso</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data.weightHistory}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="week" tickFormatter={(w) => `Sem ${w}`} className="text-xs" />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} className="text-xs" />
              <Tooltip formatter={(v) => [`${v ?? 0} kg`, 'Peso']} labelFormatter={(w) => `Semana ${w}`} />
              <Area type="monotone" dataKey="weight" stroke="#ec4899" fill="#ec4899" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Glucosa</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.glucoseReadings.map((g, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                <span>{formatDate(g.date)} · {g.fasting ? 'Ayunas' : 'Postprandial'}</span>
                <Badge variant={g.value > 100 && g.fasting ? 'danger' : g.value > 140 ? 'warning' : 'success'}>
                  {g.value} mg/dL
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Presión arterial</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.bloodPressure.map((bp, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                <span>{formatDate(bp.date)}</span>
                <Badge variant={bp.systolic >= 140 ? 'danger' : 'success'}>
                  {bp.systolic}/{bp.diastolic} mmHg
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Edema</CardTitle></CardHeader>
          <CardContent>
            <Badge variant={data.edema === 'none' ? 'success' : data.edema === 'mild' ? 'warning' : 'danger'}>
              {data.edema === 'none' ? 'Sin edema' : data.edema === 'mild' ? 'Leve' : data.edema === 'moderate' ? 'Moderado' : 'Severo'}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Suplementación</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {data.supplementation.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />{s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Lactancia</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">{data.lactationPlanning}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: 'success' | 'warning' }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-xl font-bold ${accent === 'warning' ? 'text-warning' : accent === 'success' ? 'text-success' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  )
}
