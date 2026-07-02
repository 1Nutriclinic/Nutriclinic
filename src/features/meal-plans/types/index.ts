export type MealTime =
  | 'desayuno'
  | 'media_manana'
  | 'almuerzo'
  | 'merienda'
  | 'cena'
  | 'colaciones'

export const MEAL_TIMES: { key: MealTime; label: string; icon: string }[] = [
  { key: 'desayuno', label: 'Desayuno', icon: '🌅' },
  { key: 'media_manana', label: 'Media mañana', icon: '☕' },
  { key: 'almuerzo', label: 'Almuerzo', icon: '🍽️' },
  { key: 'merienda', label: 'Merienda', icon: '🥤' },
  { key: 'cena', label: 'Cena', icon: '🌙' },
  { key: 'colaciones', label: 'Colaciones', icon: '🍎' },
]

export interface FoodItem {
  id: string
  name: string
  category: string
  serving: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface MealEntry {
  id: string
  foodId: string
  quantity: number
  notes?: string
}

export interface MealPlan {
  id: string
  name: string
  patientId?: string
  patientName?: string
  caloriesTarget: number
  proteinTarget: number
  carbsTarget: number
  fatTarget: number
  status: 'draft' | 'active' | 'archived'
  meals: Record<MealTime, MealEntry[]>
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface MacroTotals {
  calories: number
  protein: number
  carbs: number
  fat: number
}
