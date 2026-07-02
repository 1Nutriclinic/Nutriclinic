import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { imcData } from '../data/mockData'
import { ChartTooltip } from './ChartTooltip'

export function ImcChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={imcData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
        <XAxis
          dataKey="range"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
        <Bar dataKey="pacientes" name="Pacientes" radius={[6, 6, 0, 0]} maxBarSize={56}>
          {imcData.map((entry) => (
            <Cell key={entry.range} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
