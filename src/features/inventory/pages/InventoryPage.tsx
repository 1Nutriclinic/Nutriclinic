import { useMemo, useState } from 'react'
import { AlertTriangle, Boxes, Download, Plus, ShoppingCart, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import { MOCK_PRODUCTS, MOCK_MOVEMENTS, getLowStockProducts, getInventoryValue } from '../data/mockInventory'
import { PRODUCT_CATEGORIES, MOVEMENT_TYPES, type ProductCategory } from '../types'

export function InventoryPage() {
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')
  const products = MOCK_PRODUCTS
  const movements = MOCK_MOVEMENTS
  const lowStock = useMemo(() => getLowStockProducts(products), [products])
  const totalValue = useMemo(() => getInventoryValue(products), [products])

  const filtered = useMemo(
    () => (category === 'all' ? products : products.filter((p) => p.category === category)),
    [products, category],
  )

  return (
    <div>
      <PageHeader
        title="Inventario"
        description="Control de suplementos, vitaminas y proteínas con compras y ventas."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Inventario' }]}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" />Exportar</Button>
            <Button size="sm"><Plus className="h-4 w-4" />Nuevo producto</Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Productos" value={String(products.length)} icon={Boxes} accent="primary" index={0} />
        <StatCard label="Valor inventario" value={formatCurrency(totalValue)} icon={ShoppingCart} accent="success" index={1} />
        <StatCard label="Stock bajo" value={String(lowStock.length)} icon={AlertTriangle} accent="warning" index={2} />
        <StatCard label="Movimientos mes" value={String(movements.length)} icon={TrendingDown} accent="primary" index={3} />
      </div>

      {lowStock.length > 0 && (
        <div className="mb-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-medium text-warning">
            <AlertTriangle className="h-4 w-4" />
            {lowStock.length} producto{lowStock.length !== 1 ? 's' : ''} con stock bajo: {lowStock.map((p) => p.name).join(', ')}
          </p>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="stock">
          <TabsList className="mb-4">
            <TabsTrigger value="stock" icon={<Boxes className="h-4 w-4" />}>Stock</TabsTrigger>
            <TabsTrigger value="movements" icon={<TrendingDown className="h-4 w-4" />}>Movimientos</TabsTrigger>
          </TabsList>

          <TabsContent value="stock">
            <Card><CardContent className="p-5">
              <div className="mb-4 flex flex-wrap gap-2">
                <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>Todos</FilterChip>
                {(Object.entries(PRODUCT_CATEGORIES) as [ProductCategory, string][]).map(([k, v]) => (
                  <FilterChip key={k} active={category === k} onClick={() => setCategory(k)}>{v}</FilterChip>
                ))}
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      {['SKU', 'Producto', 'Categoría', 'Marca', 'Stock', 'Mín.', 'Costo', 'Precio', 'Sucursal'].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/20">
                        <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                        <td className="px-4 py-3 font-medium">{p.name}</td>
                        <td className="px-4 py-3"><Badge variant="secondary">{PRODUCT_CATEGORIES[p.category]}</Badge></td>
                        <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                        <td className="px-4 py-3">
                          <Badge variant={p.stock <= p.minStock ? 'danger' : p.stock <= p.minStock * 1.5 ? 'warning' : 'success'}>
                            {p.stock} {p.unit}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{p.minStock}</td>
                        <td className="px-4 py-3">{formatCurrency(p.costPrice)}</td>
                        <td className="px-4 py-3 font-medium">{p.salePrice > 0 ? formatCurrency(p.salePrice) : '—'}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{p.branchName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="movements">
            <Card><CardContent className="p-5">
              <div className="space-y-2">
                {movements.map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{m.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {MOVEMENT_TYPES[m.type].label} · {m.quantity} uds · {m.user}
                        {m.reference ? ` · ${m.reference}` : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-display text-lg font-bold ${m.type === 'sale' ? 'text-success' : 'text-foreground'}`}>
                        {formatCurrency(m.total)}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(m.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
      {children}
    </button>
  )
}
