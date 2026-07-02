import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { mnaInterpretation } from '../utils/programUtils'
import type { ElderlyProgramData } from '../types'

export function ElderlyProgramPanel({ data }: { data: ElderlyProgramData }) {
  const mna = mnaInterpretation(data.mnaScore)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-amber-200 dark:border-amber-500/30">
          <CardContent className="p-5 text-center">
            <p className="text-xs font-medium text-muted-foreground">MNA (Mini Nutritional Assessment)</p>
            <p className="mt-2 font-display text-4xl font-bold text-foreground">{data.mnaScore}</p>
            <Badge variant={mna.variant} className="mt-2">{mna.label}</Badge>
          </CardContent>
        </Card>
        <Kpi label="Riesgo sarcopenia" value={data.sarcopeniaRisk === 'low' ? 'Bajo' : data.sarcopeniaRisk === 'moderate' ? 'Moderado' : 'Alto'} variant={data.sarcopeniaRisk === 'low' ? 'success' : 'warning'} />
        <Kpi label="Índice de fragilidad" value={String(data.fragilityScore)} sub={data.fragilityScore <= 3 ? 'No frágil' : 'Frágil'} />
        <Kpi label="Hidratación diaria" value={`${data.hydrationMl} ml`} variant={data.hydrationMl >= 1500 ? 'success' : 'warning'} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Masticación</CardTitle></CardHeader>
          <CardContent>
            <Badge variant={data.chewingDifficulty ? 'warning' : 'success'}>
              {data.chewingDifficulty ? 'Dificultad reportada' : 'Normal'}
            </Badge>
            {data.chewingDifficulty && (
              <p className="mt-2 text-sm text-muted-foreground">Recomendar texturas blandas y trozos pequeños.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Deglución</CardTitle></CardHeader>
          <CardContent>
            <Badge variant={data.swallowingDifficulty ? 'danger' : 'success'}>
              {data.swallowingDifficulty ? 'Disfagia — derivar' : 'Normal'}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Riesgo nutricional</CardTitle></CardHeader>
          <CardContent>
            <Badge variant={data.nutritionalRisk === 'low' ? 'success' : data.nutritionalRisk === 'moderate' ? 'warning' : 'danger'}>
              {data.nutritionalRisk === 'low' ? 'Bajo' : data.nutritionalRisk === 'moderate' ? 'Moderado' : 'Alto'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Notas clínicas</CardTitle></CardHeader>
        <CardContent><p className="text-sm leading-relaxed">{data.notes}</p></CardContent>
      </Card>
    </div>
  )
}

function Kpi({ label, value, sub, variant }: { label: string; value: string; sub?: string; variant?: 'success' | 'warning' }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-xl font-bold ${variant === 'success' ? 'text-success' : variant === 'warning' ? 'text-warning' : 'text-foreground'}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}
