import { TrendingDown, TrendingUp } from 'lucide-react'
import { Avatar } from '@/components/ui'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { recentConsults } from '../data/mockData'
import { cn } from '@/utils/cn'

export function RecentConsultations() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-2 py-2.5 font-medium">Paciente</th>
            <th className="px-2 py-2.5 font-medium">Programa</th>
            <th className="hidden px-2 py-2.5 font-medium md:table-cell">Fecha</th>
            <th className="px-2 py-2.5 text-right font-medium">Δ Peso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {recentConsults.map((c) => {
            const isLoss = c.weightChange < 0
            return (
              <tr key={c.id} className="transition-colors hover:bg-muted/50">
                <td className="px-2 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={c.patient} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{c.patient}</p>
                      <p className="truncate text-xs text-muted-foreground">{c.nutritionist}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3">
                  <ProgramBadge program={c.program} />
                </td>
                <td className="hidden px-2 py-3 text-muted-foreground md:table-cell">{c.date}</td>
                <td className="px-2 py-3 text-right">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 font-semibold',
                      isLoss ? 'text-success' : 'text-warning',
                    )}
                  >
                    {isLoss ? (
                      <TrendingDown className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingUp className="h-3.5 w-3.5" />
                    )}
                    {c.weightChange > 0 ? '+' : ''}
                    {c.weightChange} kg
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
