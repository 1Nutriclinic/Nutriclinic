import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { programsData } from '../data/mockData'
import { ChartTooltip } from './ChartTooltip'

export function ProgramsChart() {
  const total = programsData.reduce((sum, p) => sum + p.value, 0)

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-[220px] w-full max-w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltip />} />
            <Pie
              data={programsData}
              dataKey="value"
              nameKey="label"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
              stroke="none"
            >
              {programsData.map((entry) => (
                <Cell key={entry.program} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-foreground">{total}</span>
          <span className="text-xs text-muted-foreground">pacientes</span>
        </div>
      </div>

      <ul className="flex-1 space-y-2">
        {programsData.map((p) => (
          <li key={p.program} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.fill }} />
              <span className="text-muted-foreground">{p.label}</span>
            </span>
            <span className="font-semibold text-foreground">{p.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
