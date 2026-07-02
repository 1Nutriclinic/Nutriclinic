import type { FoodItem } from '../types'

export const FOOD_LIBRARY: FoodItem[] = [
  { id: 'f-001', name: 'Avena en hojuelas', category: 'Cereales', serving: '1/2 taza (40g)', calories: 150, protein: 5, carbs: 27, fat: 3 },
  { id: 'f-002', name: 'Huevo entero', category: 'Proteínas', serving: '1 unidad (50g)', calories: 72, protein: 6, carbs: 0.4, fat: 5 },
  { id: 'f-003', name: 'Plátano', category: 'Frutas', serving: '1 unidad mediana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { id: 'f-004', name: 'Pechuga de pollo', category: 'Proteínas', serving: '100g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'f-005', name: 'Arroz integral cocido', category: 'Cereales', serving: '1/2 taza (100g)', calories: 112, protein: 2.6, carbs: 24, fat: 0.9 },
  { id: 'f-006', name: 'Brócoli al vapor', category: 'Verduras', serving: '1 taza (90g)', calories: 31, protein: 2.5, carbs: 6, fat: 0.3 },
  { id: 'f-007', name: 'Salmón a la plancha', category: 'Proteínas', serving: '100g', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 'f-008', name: 'Quinoa cocida', category: 'Cereales', serving: '1/2 taza (100g)', calories: 111, protein: 4, carbs: 20, fat: 1.8 },
  { id: 'f-009', name: 'Aguacate', category: 'Grasas', serving: '1/4 unidad (30g)', calories: 48, protein: 0.6, carbs: 2.5, fat: 4.4 },
  { id: 'f-010', name: 'Yogurt griego natural', category: 'Lácteos', serving: '1/2 taza (125g)', calories: 100, protein: 17, carbs: 6, fat: 0.7 },
  { id: 'f-011', name: 'Almendras', category: 'Grasas', serving: '10 unidades (12g)', calories: 70, protein: 2.5, carbs: 2.5, fat: 6 },
  { id: 'f-012', name: 'Manzana', category: 'Frutas', serving: '1 unidad mediana', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 'f-013', name: 'Atún en agua', category: 'Proteínas', serving: '1/2 lata (80g)', calories: 90, protein: 20, carbs: 0, fat: 1 },
  { id: 'f-014', name: 'Pan integral', category: 'Cereales', serving: '1 rebanada (30g)', calories: 80, protein: 4, carbs: 14, fat: 1 },
  { id: 'f-015', name: 'Espinaca cruda', category: 'Verduras', serving: '1 taza (30g)', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1 },
  { id: 'f-016', name: 'Papa cocida', category: 'Tubérculos', serving: '1 unidad mediana (150g)', calories: 130, protein: 3, carbs: 30, fat: 0.2 },
  { id: 'f-017', name: 'Aceite de oliva', category: 'Grasas', serving: '1 cucharada (15ml)', calories: 120, protein: 0, carbs: 0, fat: 14 },
  { id: 'f-018', name: 'Lentejas cocidas', category: 'Legumbres', serving: '1/2 taza (100g)', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
]

export const FOOD_CATEGORIES = [...new Set(FOOD_LIBRARY.map((f) => f.category))]

export function getFoodById(id: string): FoodItem | undefined {
  return FOOD_LIBRARY.find((f) => f.id === id)
}
