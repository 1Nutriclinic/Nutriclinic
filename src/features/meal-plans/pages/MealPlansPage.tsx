import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge, Button, Card, CardContent } from '@/components/ui'
import { formatDate } from '@/utils/format'
import { useMealPlansStore, calcPlanTotals } from '../store/mealPlansStore'

export function MealPlansPage() {
  const navigate = useNavigate()
  const plans = useMealPlansStore((s) => s.plans)
  const addPlan = useMealPlansStore((s) => s.addPlan)

  const handleNewPlan = () => {
    const id = `mp-new-${Date.now()}`
    addPlan({
      id,
      name: 'Nuevo plan alimenticio',
      caloriesTarget: 1800,
      proteinTarget: 90,
      carbsTarget: 200,
      fatTarget: 60,
      status: 'draft',
      meals: { desayuno: [], media_manana: [], almuerzo: [], merienda: [], cena: [], colaciones: [] },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    navigate(`/meal-plans/${id}`)
  }

  return (
    <div>
      <PageHeader
        title="Plan Alimenticio"
        description="Editor profesional de dietas con biblioteca de alimentos, recetas y exportación PDF."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Plan Alimenticio' }]}
        actions={
          <Button size="sm" onClick={handleNewPlan}>
            <Plus className="h-4 w-4" />
            Nuevo plan
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {plans.map((plan, i) => {
          const totals = calcPlanTotals(plan)
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="cursor-pointer transition-all hover:border-primary/30 hover:shadow-card-hover"
                onClick={() => navigate(`/meal-plans/${plan.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display font-semibold text-foreground">{plan.name}</p>
                      {plan.patientName && (
                        <p className="mt-0.5 text-sm text-muted-foreground">{plan.patientName}</p>
                      )}
                    </div>
                    <Badge variant={plan.status === 'active' ? 'success' : plan.status === 'draft' ? 'warning' : 'secondary'}>
                      {plan.status === 'active' ? 'Activo' : plan.status === 'draft' ? 'Borrador' : 'Archivado'}
                    </Badge>
                  </div>
                  <div className="mt-4 flex gap-4 text-sm">
                    <span><strong className="text-foreground">{totals.calories}</strong> <span className="text-muted-foreground">/ {plan.caloriesTarget} kcal</span></span>
                    <span className="text-muted-foreground">P: {totals.protein}g · C: {totals.carbs}g · G: {totals.fat}g</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Actualizado: {formatDate(plan.updatedAt)}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
