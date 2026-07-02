import { Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Badge, Input } from '@/components/ui'
import { FOOD_LIBRARY, FOOD_CATEGORIES } from '../data/foodLibrary'
import type { FoodItem, MealTime } from '../types'

interface FoodLibraryPanelProps {
  onAddFood: (food: FoodItem) => void
  activeMeal: MealTime
}

export function FoodLibraryPanel({ onAddFood, activeMeal }: FoodLibraryPanelProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return FOOD_LIBRARY.filter((f) => {
      if (category !== 'all' && f.category !== category) return false
      if (q && !f.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [search, category])

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <h3 className="font-display text-sm font-semibold text-foreground">Biblioteca de alimentos</h3>
        <p className="text-xs text-muted-foreground">Agregar a: {activeMeal}</p>
        <div className="mt-3">
          <Input
            placeholder="Buscar alimento…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-3.5 w-3.5" />}
            className="h-9 text-xs"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>Todos</FilterChip>
          {FOOD_CATEGORIES.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</FilterChip>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map((food) => (
          <button
            key={food.id}
            type="button"
            onClick={() => onAddFood(food)}
            className="mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/60"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{food.name}</p>
              <p className="text-xs text-muted-foreground">{food.serving}</p>
            </div>
            <Badge variant="secondary" className="ml-2 shrink-0">{food.calories} kcal</Badge>
          </button>
        ))}
      </div>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
        active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
      }`}
    >
      {children}
    </button>
  )
}
