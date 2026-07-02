import { calcPlanTotals } from '../store/mealPlansStore'
import type { MealPlan } from '../types'

interface MacroSummaryProps {
  plan: MealPlan
}

export function MacroSummary({ plan }: MacroSummaryProps) {
  const totals = calcPlanTotals(plan)

  const items = [
    { label: 'Calorías', current: totals.calories, target: plan.caloriesTarget, unit: 'kcal', color: 'bg-primary' },
    { label: 'Proteína', current: totals.protein, target: plan.proteinTarget, unit: 'g', color: 'bg-emerald-500' },
    { label: 'Carbos', current: totals.carbs, target: plan.carbsTarget, unit: 'g', color: 'bg-amber-500' },
    { label: 'Grasa', current: totals.fat, target: plan.fatTarget, unit: 'g', color: 'bg-rose-500' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => {
        const pct = Math.min((item.current / item.target) * 100, 100)
        return (
          <div key={item.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
              <span className="text-xs text-muted-foreground">
                {item.current}/{item.target}{item.unit}
              </span>
            </div>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">
              {item.current}
              <span className="ml-0.5 text-sm font-normal text-muted-foreground">{item.unit}</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
