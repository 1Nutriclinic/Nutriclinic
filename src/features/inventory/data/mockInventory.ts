import type { Product, StockMovement } from '../types'

export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod-001', sku: 'SUP-001', name: 'Whey Protein Isolate 900g', category: 'protein', brand: 'Optimum Nutrition', stock: 8, minStock: 10, costPrice: 145, salePrice: 189, unit: 'unidad', branchId: 'b-001', branchName: 'Sede Miraflores' },
  { id: 'prod-002', sku: 'VIT-001', name: 'Vitamina D3 2000 UI', category: 'vitamin', brand: 'Nature Made', stock: 45, minStock: 20, costPrice: 28, salePrice: 42, unit: 'frasco', branchId: 'b-001', branchName: 'Sede Miraflores' },
  { id: 'prod-003', sku: 'VIT-002', name: 'Omega 3 1000mg', category: 'vitamin', brand: 'Nordic Naturals', stock: 32, minStock: 15, costPrice: 55, salePrice: 78, unit: 'frasco', branchId: 'b-001', branchName: 'Sede Miraflores' },
  { id: 'prod-004', sku: 'SUP-002', name: 'Creatina Monohidrato 300g', category: 'supplement', brand: 'MuscleTech', stock: 22, minStock: 10, costPrice: 48, salePrice: 65, unit: 'unidad', branchId: 'b-002', branchName: 'Sede San Isidro' },
  { id: 'prod-005', sku: 'SUP-003', name: 'Colágeno Hidrolizado 300g', category: 'supplement', brand: 'Vital Proteins', stock: 5, minStock: 8, costPrice: 72, salePrice: 95, unit: 'unidad', branchId: 'b-001', branchName: 'Sede Miraflores' },
  { id: 'prod-006', sku: 'VIT-003', name: 'Complejo B', category: 'vitamin', brand: 'Solgar', stock: 28, minStock: 12, costPrice: 35, salePrice: 52, unit: 'frasco', branchId: 'b-002', branchName: 'Sede San Isidro' },
  { id: 'prod-007', sku: 'SUP-004', name: 'Proteína Vegetal 750g', category: 'protein', brand: 'Garden of Life', stock: 14, minStock: 8, costPrice: 98, salePrice: 135, unit: 'unidad', branchId: 'b-003', branchName: 'Sede Surco' },
  { id: 'prod-008', sku: 'SUP-005', name: 'Magnesio Citrato 200mg', category: 'supplement', brand: 'Now Foods', stock: 3, minStock: 10, costPrice: 22, salePrice: 35, unit: 'frasco', branchId: 'b-003', branchName: 'Sede Surco' },
  { id: 'prod-009', sku: 'EQP-001', name: 'Báscula bioimpedancia', category: 'equipment', brand: 'Tanita', stock: 2, minStock: 1, costPrice: 1200, salePrice: 0, unit: 'unidad', branchId: 'b-001', branchName: 'Sede Miraflores' },
  { id: 'prod-010', sku: 'VIT-004', name: 'Ácido Fólico 400mcg', category: 'vitamin', brand: 'Nature\'s Bounty', stock: 18, minStock: 10, costPrice: 15, salePrice: 25, unit: 'frasco', branchId: 'b-001', branchName: 'Sede Miraflores' },
]

export const MOCK_MOVEMENTS: StockMovement[] = [
  { id: 'mov-001', productId: 'prod-001', productName: 'Whey Protein Isolate 900g', type: 'purchase', quantity: 20, unitPrice: 145, total: 2900, reference: 'OC-2026-045', date: '2026-06-25T10:00:00Z', user: 'Admin' },
  { id: 'mov-002', productId: 'prod-001', productName: 'Whey Protein Isolate 900g', type: 'sale', quantity: 12, unitPrice: 189, total: 2268, date: '2026-06-28T14:00:00Z', user: 'Recepción' },
  { id: 'mov-003', productId: 'prod-005', productName: 'Colágeno Hidrolizado 300g', type: 'sale', quantity: 3, unitPrice: 95, total: 285, date: '2026-07-01T11:00:00Z', user: 'Recepción' },
  { id: 'mov-004', productId: 'prod-002', productName: 'Vitamina D3 2000 UI', type: 'purchase', quantity: 30, unitPrice: 28, total: 840, reference: 'OC-2026-048', date: '2026-07-01T09:00:00Z', user: 'Admin' },
  { id: 'mov-005', productId: 'prod-008', productName: 'Magnesio Citrato 200mg', type: 'sale', quantity: 7, unitPrice: 35, total: 245, date: '2026-06-30T16:00:00Z', user: 'Recepción' },
]

export function getLowStockProducts(products: Product[]): Product[] {
  return products.filter((p) => p.stock <= p.minStock)
}

export function getInventoryValue(products: Product[]): number {
  return products.reduce((s, p) => s + p.stock * p.costPrice, 0)
}
