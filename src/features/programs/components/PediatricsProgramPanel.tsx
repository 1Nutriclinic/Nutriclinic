import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import type { PediatricsProgramData } from '../types'

const PERCENTILE_BANDS = [
  { label: 'P3', value: -2 },
  { label: 'P15', value: -1 },
  { label: 'P50', value: 0 },
  { label: 'P85', value: 1 },
  { label: 'P97', value: 2 },
]

export function PediatricsProgramPanel({ data }: { data: PediatricsProgramData }) {
  const chartData = PERCENTILE_BANDS.map((b) => ({
    percentile: b.label,
    z: b.value,
    patient: b.label === 'P50' ? data.weightZScore : null,
  }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Edad" value={`${Math.floor(data.ageMonths / 12)}a ${data.ageMonths % 12}m`} />
        <Kpi label="Peso" value={`${data.weight} kg`} sub={`Percentil ${data.weightPercentile}`} />
        <Kpi label="Talla" value={`${data.height} cm`} sub={`Percentil ${data.heightPercentile}`} />
        <Kpi label="PC" value={`${data.headCircumference} cm`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Percentiles OMS — Peso para la edad (Z-score)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="percentile" className="text-xs" />
              <YAxis domain={[-3, 3]} className="text-xs" />
              <Tooltip />
              <ReferenceLine y={data.weightZScore} stroke="#06b6d4" strokeDasharray="4 4" label={{ value: `Paciente Z=${data.weightZScore}`, position: 'right', fill: '#06b6d4', fontSize: 11 }} />
              <Bar dataKey="z" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant={data.weightPercentile >= 85 ? 'warning' : data.weightPercentile <= 15 ? 'warning' : 'success'}>
              Peso: P{data.weightPercentile} (Z={data.weightZScore})
            </Badge>
            <Badge variant={data.heightPercentile >= 85 || data.heightPercentile <= 15 ? 'warning' : 'success'}>
              Talla: P{data.heightPercentile} (Z={data.heightZScore})
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Desarrollo</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.developmentMilestones.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />{m}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Lactancia</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{data.breastfeeding}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Alimentación complementaria</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{data.complementaryFeeding}</p></CardContent>
        </Card>
      </div>
    </div>
  )
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}
