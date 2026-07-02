import type { MealPlan } from '../types'
import { MEAL_TIMES } from '../types'
import { getFoodById } from '../data/foodLibrary'
import { calcPlanTotals } from '../store/mealPlansStore'

export function exportMealPlanPdf(plan: MealPlan) {
  const totals = calcPlanTotals(plan)
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${plan.name}</title>
  <style>
    body { font-family: Inter, sans-serif; max-width: 800px; margin: 40px auto; color: #0f172a; }
    h1 { color: #2563eb; font-size: 24px; }
    h2 { font-size: 16px; margin-top: 24px; border-bottom: 2px solid #2563eb; padding-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    th { background: #f8fafc; font-weight: 600; }
    .macros { display: flex; gap: 16px; margin: 16px 0; }
    .macro { background: #eff6ff; padding: 12px 20px; border-radius: 8px; text-align: center; }
    .macro-value { font-size: 24px; font-weight: 700; color: #2563eb; }
    .footer { margin-top: 40px; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <h1>${plan.name}</h1>
  ${plan.patientName ? `<p><strong>Paciente:</strong> ${plan.patientName}</p>` : ''}
  <div class="macros">
    <div class="macro"><div class="macro-value">${totals.calories}</div>kcal</div>
    <div class="macro"><div class="macro-value">${totals.protein}g</div>Proteína</div>
    <div class="macro"><div class="macro-value">${totals.carbs}g</div>Carbos</div>
    <div class="macro"><div class="macro-value">${totals.fat}g</div>Grasa</div>
  </div>
  ${MEAL_TIMES.map(({ key, label }) => {
    const entries = plan.meals[key]
    if (entries.length === 0) return ''
    const rows = entries.map((e) => {
      const food = getFoodById(e.foodId)
      if (!food) return ''
      return `<tr><td>${food.name}</td><td>${e.quantity}x ${food.serving}</td><td>${Math.round(food.calories * e.quantity)} kcal</td></tr>`
    }).join('')
    return `<h2>${label}</h2><table><thead><tr><th>Alimento</th><th>Porción</th><th>Calorías</th></tr></thead><tbody>${rows}</tbody></table>`
  }).join('')}
  ${plan.notes ? `<p><strong>Notas:</strong> ${plan.notes}</p>` : ''}
  <div class="footer">Generado por NutriClinic Pro Enterprise · ${new Date().toLocaleDateString('es-PE')}</div>
</body>
</html>`

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.print()
}
