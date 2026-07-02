import { useState, useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Download, Save, ShoppingCart } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button, Card } from '@/components/ui'
import { FoodLibraryPanel } from '../components/FoodLibraryPanel'
import { MealPlanEditor } from '../components/MealPlanEditor'
import { MacroSummary } from '../components/MacroSummary'
import { useMealPlansStore, generateShoppingList } from '../store/mealPlansStore'
import { exportMealPlanPdf } from '../utils/exportMealPlan'
import type { FoodItem, MealTime } from '../types'
import { Dialog, DialogBody, DialogContent, DialogHeader } from '@/components/ui/Dialog'

export function MealPlanEditorPage() {
  const { planId } = useParams<{ planId: string }>()
  const plans = useMealPlansStore((s) => s.plans)
  const addFoodToMeal = useMealPlansStore((s) => s.addFoodToMeal)
  const removeFoodFromMeal = useMealPlansStore((s) => s.removeFoodFromMeal)

  const [activeMeal, setActiveMeal] = useState<MealTime>('desayuno')
  const [shoppingOpen, setShoppingOpen] = useState(false)

  const plan = useMemo(() => plans.find((p) => p.id === planId) ?? null, [plans, planId])

  if (!plan) return <Navigate to="/meal-plans" replace />

  const shoppingList = generateShoppingList(plan)

  const handleAddFood = (food: FoodItem) => {
    addFoodToMeal(plan.id, activeMeal, {
      id: `entry-${Date.now()}`,
      foodId: food.id,
      quantity: 1,
    })
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <PageHeader
        title={plan.name}
        description={plan.patientName ?? 'Editor de plan alimenticio'}
        breadcrumbs={[
          { label: 'Inicio', to: '/dashboard' },
          { label: 'Plan Alimenticio', to: '/meal-plans' },
          { label: plan.name },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setShoppingOpen(true)}>
              <ShoppingCart className="h-4 w-4" />
              Lista de compras
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportMealPlanPdf(plan)}>
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4" />
              Guardar
            </Button>
          </>
        }
      />

      <div className="mb-4">
        <MacroSummary plan={plan} />
      </div>

      <Card className="flex flex-1 overflow-hidden">
        <div className="flex w-full">
          <div className="w-72 shrink-0 border-r border-border">
            <FoodLibraryPanel onAddFood={handleAddFood} activeMeal={activeMeal} />
          </div>
          <div className="flex-1">
            <MealPlanEditor
              plan={plan}
              activeMeal={activeMeal}
              onMealChange={setActiveMeal}
              onRemoveEntry={(meal, id) => removeFoodFromMeal(plan.id, meal, id)}
            />
          </div>
        </div>
      </Card>

      <Dialog open={shoppingOpen} onOpenChange={setShoppingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader title="Lista de compras" onClose={() => setShoppingOpen(false)} />
          <DialogBody>
            {shoppingList.length === 0 ? (
              <p className="text-sm text-muted-foreground">Agrega alimentos al plan para generar la lista.</p>
            ) : (
              <ul className="space-y-2">
                {shoppingList.map((item) => (
                  <li key={item.name} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.quantity}x {item.serving}</span>
                  </li>
                ))}
              </ul>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  )
}
