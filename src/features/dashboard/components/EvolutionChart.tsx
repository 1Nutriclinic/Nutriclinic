import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { evolutionData } from '../data/mockData'
import { ChartTooltip } from './ChartTooltip'

export function EvolutionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={evolutionData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="gActivos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gNuevos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="activos"
          name="Activos"
          stroke="#2563eb"
          strokeWidth={2.5}
          fill="url(#gActivos)"
        />
        <Area
          type="monotone"
          dataKey="nuevos"
          name="Nuevos"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#gNuevos)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
