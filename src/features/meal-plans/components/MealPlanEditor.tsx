import { Trash2 } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { getFoodById } from '../data/foodLibrary'
import { calcMealMacros } from '../store/mealPlansStore'
import { MEAL_TIMES, type MealPlan, type MealTime } from '../types'

interface MealPlanEditorProps {
  plan: MealPlan
  activeMeal: MealTime
  onMealChange: (meal: MealTime) => void
  onRemoveEntry: (mealTime: MealTime, entryId: string) => void
}

export function MealPlanEditor({ plan, activeMeal, onMealChange, onRemoveEntry }: MealPlanEditorProps) {
  const entries = plan.meals[activeMeal]
  const macros = calcMealMacros(entries)
  const mealMeta = MEAL_TIMES.find((m) => m.key === activeMeal)!

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1 overflow-x-auto border-b border-border p-2">
        {MEAL_TIMES.map((m) => {
          const count = plan.meals[m.key].length
          const isActive = m.key === activeMeal
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => onMealChange(m.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <span>{m.icon}</span>
              {m.label}
              {count > 0 && (
                <span className={`rounded-full px-1.5 text-[10px] ${isActive ? 'bg-white/20' : 'bg-muted-foreground/15'}`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="border-b border-border bg-muted/20 px-4 py-2">
        <div className="flex flex-wrap gap-3 text-xs">
          <Macro label="Calorías" value={`${macros.calories}`} unit="kcal" />
          <Macro label="Proteína" value={`${macros.protein}`} unit="g" />
          <Macro label="Carbos" value={`${macros.carbs}`} unit="g" />
          <Macro label="Grasa" value={`${macros.fat}`} unit="g" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mb-3 font-display text-sm font-semibold">
          {mealMeta.icon} {mealMeta.label}
        </h3>
        {entries.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            Selecciona alimentos de la biblioteca para agregar a este tiempo de comida.
          </p>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => {
              const food = getFoodById(entry.foodId)
              if (!food) return null
              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{food.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.quantity}x {food.serving} · {Math.round(food.calories * entry.quantity)} kcal
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{food.category}</Badge>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onRemoveEntry(activeMeal, entry.id)}
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-danger" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function Macro({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <span className="text-muted-foreground">
      <span className="font-medium text-foreground">{value}</span>{unit} {label}
    </span>
  )
}
