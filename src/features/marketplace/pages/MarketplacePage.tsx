import { useMemo, useState } from 'react'
import { Download, Search, Star, Store } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Input, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatCurrency, formatCompactNumber } from '@/utils/format'
import { getMarketplaceStats } from '../data/mockMarketplace'
import { useMarketplaceStore } from '../store/marketplaceStore'
import {
  MARKETPLACE_CATEGORIES,
  PRICING_LABELS,
  type MarketplaceCategory,
} from '../types'

export function MarketplacePage() {
  const items = useMarketplaceStore((s) => s.items)
  const toggleInstall = useMarketplaceStore((s) => s.toggleInstall)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<MarketplaceCategory | 'all'>('all')

  const stats = useMemo(() => getMarketplaceStats(items), [items])

  const filtered = useMemo(() => {
    let list = items
    if (category !== 'all') list = list.filter((i) => i.category === category)
    const q = search.trim().toLowerCase()
    if (q) list = list.filter((i) => `${i.name} ${i.author} ${i.tags.join(' ')}`.toLowerCase().includes(q))
    return list
  }, [items, category, search])

  const featured = items.filter((i) => i.featured)

  return (
    <div>
      <PageHeader
        title="Marketplace"
        description="Tienda de extensiones, plantillas de dietas y módulos de terceros."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Marketplace' }]}
        actions={<Button variant="outline" size="sm"><Download className="h-4 w-4" />Mis instalaciones</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Productos" value={String(stats.total)} icon={Store} accent="primary" index={0} />
        <StatCard label="Instalados" value={String(stats.installed)} icon={Download} accent="success" index={1} />
        <StatCard label="Destacados" value={String(stats.featured)} icon={Star} accent="warning" index={2} />
        <StatCard label="Gratis" value={String(stats.free)} icon={Store} accent="primary" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="browse">
          <TabsList className="mb-4">
            <TabsTrigger value="browse" icon={<Store className="h-4 w-4" />}>Explorar</TabsTrigger>
            <TabsTrigger value="featured" icon={<Star className="h-4 w-4" />}>Destacados</TabsTrigger>
            <TabsTrigger value="installed" icon={<Download className="h-4 w-4" />}>Instalados</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar plantillas, extensiones…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>Todos</FilterChip>
                {(Object.entries(MARKETPLACE_CATEGORIES) as [MarketplaceCategory, string][]).map(([k, v]) => (
                  <FilterChip key={k} active={category === k} onClick={() => setCategory(k)}>{v}</FilterChip>
                ))}
              </div>
            </div>
            <ItemGrid items={filtered} onToggle={toggleInstall} />
          </TabsContent>

          <TabsContent value="featured">
            <ItemGrid items={featured} onToggle={toggleInstall} />
          </TabsContent>

          <TabsContent value="installed">
            <ItemGrid items={items.filter((i) => i.installed)} onToggle={toggleInstall} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function ItemGrid({ items, onToggle }: { items: ReturnType<typeof useMarketplaceStore.getState>['items']; onToggle: (id: string) => void }) {
  if (items.length === 0) {
    return <Card><CardContent className="p-8 text-center text-muted-foreground">No hay productos en esta categoría.</CardContent></Card>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className={cn('overflow-hidden', item.featured && 'ring-1 ring-primary/30')}>
          {item.featured && <div className="bg-primary/10 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-primary">Destacado</div>}
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">{item.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">por {item.author} · v{item.version}</p>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="text-muted-foreground">({item.reviewCount})</span>
                  <span className="text-muted-foreground">· {formatCompactNumber(item.installCount)} instalaciones</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline">{MARKETPLACE_CATEGORIES[item.category]}</Badge>
              {item.tags.slice(0, 2).map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                {item.pricing === 'free' ? (
                  <span className="font-semibold text-success">Gratis</span>
                ) : (
                  <span className="font-semibold">
                    {formatCurrency(item.price)}
                    {item.pricing === 'subscription' && <span className="text-xs font-normal text-muted-foreground">/mes</span>}
                  </span>
                )}
                <p className="text-[10px] text-muted-foreground">{PRICING_LABELS[item.pricing]}</p>
              </div>
              <Button
                size="sm"
                variant={item.installed ? 'outline' : 'default'}
                onClick={() => onToggle(item.id)}
              >
                {item.installed ? 'Desinstalar' : 'Instalar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        active ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted/60',
      )}
    >
      {children}
    </button>
  )
}
