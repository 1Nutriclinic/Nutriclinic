import { create } from 'zustand'
import type { MealPlan, MealTime, MealEntry, MacroTotals } from '../types'
import { getFoodById } from '../data/foodLibrary'

const emptyMeals = (): Record<MealTime, MealEntry[]> => ({
  desayuno: [],
  media_manana: [],
  almuerzo: [],
  merienda: [],
  cena: [],
  colaciones: [],
})

export const MOCK_MEAL_PLANS: MealPlan[] = [
  {
    id: 'mp-001',
    name: 'Plan hipocalórico 1500 kcal — María López',
    patientId: 'p-001',
    patientName: 'María López García',
    caloriesTarget: 1500,
    proteinTarget: 90,
    carbsTarget: 150,
    fatTarget: 50,
    status: 'active',
    meals: {
      desayuno: [
        { id: 'me-1', foodId: 'f-001', quantity: 1 },
        { id: 'me-2', foodId: 'f-002', quantity: 2 },
        { id: 'me-3', foodId: 'f-003', quantity: 0.5 },
      ],
      media_manana: [{ id: 'me-4', foodId: 'f-010', quantity: 1 }],
      almuerzo: [
        { id: 'me-5', foodId: 'f-004', quantity: 1.2 },
        { id: 'me-6', foodId: 'f-005', quantity: 1 },
        { id: 'me-7', foodId: 'f-006', quantity: 1.5 },
      ],
      merienda: [{ id: 'me-8', foodId: 'f-012', quantity: 1 }],
      cena: [
        { id: 'me-9', foodId: 'f-007', quantity: 1 },
        { id: 'me-10', foodId: 'f-008', quantity: 0.5 },
        { id: 'me-11', foodId: 'f-015', quantity: 2 },
      ],
      colaciones: [{ id: 'me-12', foodId: 'f-011', quantity: 1 }],
    },
    notes: 'Evitar mariscos y lactosa. Distribuir hidratos en desayuno y almuerzo.',
    createdAt: '2026-05-28T10:00:00Z',
    updatedAt: '2026-06-28T09:00:00Z',
  },
  {
    id: 'mp-002',
    name: 'Plan gestante 2200 kcal — Lucía Ramírez',
    patientId: 'p-003',
    patientName: 'Lucía Ramírez Torres',
    caloriesTarget: 2200,
    proteinTarget: 80,
    carbsTarget: 280,
    fatTarget: 70,
    status: 'active',
    meals: emptyMeals(),
    createdAt: '2026-06-01T08:00:00Z',
    updatedAt: '2026-06-01T08:00:00Z',
  },
]

interface MealPlansState {
  plans: MealPlan[]
  addPlan: (plan: MealPlan) => void
  updatePlan: (id: string, data: Partial<MealPlan>) => void
  deletePlan: (id: string) => void
  addFoodToMeal: (planId: string, mealTime: MealTime, entry: MealEntry) => void
  removeFoodFromMeal: (planId: string, mealTime: MealTime, entryId: string) => void
}

export const useMealPlansStore = create<MealPlansState>((set) => ({
  plans: MOCK_MEAL_PLANS,
  addPlan: (plan) => set((s) => ({ plans: [plan, ...s.plans] })),
  updatePlan: (id, data) =>
    set((s) => ({
      plans: s.plans.map((p) => (p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p)),
    })),
  deletePlan: (id) => set((s) => ({ plans: s.plans.filter((p) => p.id !== id) })),
  addFoodToMeal: (planId, mealTime, entry) =>
    set((s) => ({
      plans: s.plans.map((p) =>
        p.id === planId
          ? { ...p, meals: { ...p.meals, [mealTime]: [...p.meals[mealTime], entry] }, updatedAt: new Date().toISOString() }
          : p,
      ),
    })),
  removeFoodFromMeal: (planId, mealTime, entryId) =>
    set((s) => ({
      plans: s.plans.map((p) =>
        p.id === planId
          ? {
              ...p,
              meals: { ...p.meals, [mealTime]: p.meals[mealTime].filter((e) => e.id !== entryId) },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    })),
}))

export function calcMealMacros(entries: MealEntry[]): MacroTotals {
  let calories = 0, protein = 0, carbs = 0, fat = 0
  for (const entry of entries) {
    const food = getFoodById(entry.foodId)
    if (!food) continue
    calories += food.calories * entry.quantity
    protein += food.protein * entry.quantity
    carbs += food.carbs * entry.quantity
    fat += food.fat * entry.quantity
  }
  return { calories: Math.round(calories), protein: Math.round(protein), carbs: Math.round(carbs), fat: Math.round(fat) }
}

export function calcPlanTotals(plan: MealPlan): MacroTotals {
  const all = Object.values(plan.meals).flat()
  return calcMealMacros(all)
}

export function generateShoppingList(plan: MealPlan): { name: string; quantity: number; serving: string }[] {
  const map = new Map<string, { name: string; quantity: number; serving: string }>()
  for (const entries of Object.values(plan.meals)) {
    for (const entry of entries) {
      const food = getFoodById(entry.foodId)
      if (!food) continue
      const existing = map.get(food.id)
      if (existing) {
        existing.quantity += entry.quantity
      } else {
        map.set(food.id, { name: food.name, quantity: entry.quantity, serving: food.serving })
      }
    }
  }
  return Array.from(map.values())
}
