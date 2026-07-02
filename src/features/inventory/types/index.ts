export type ProductCategory = 'supplement' | 'vitamin' | 'protein' | 'equipment' | 'other'
export type StockMovementType = 'purchase' | 'sale' | 'adjustment' | 'return'

export interface Product {
  id: string
  sku: string
  name: string
  category: ProductCategory
  brand: string
  stock: number
  minStock: number
  costPrice: number
  salePrice: number
  unit: string
  branchId: string
  branchName: string
}

export interface StockMovement {
  id: string
  productId: string
  productName: string
  type: StockMovementType
  quantity: number
  unitPrice: number
  total: number
  reference?: string
  date: string
  user: string
}

export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  supplement: 'Suplemento',
  vitamin: 'Vitamina',
  protein: 'Proteína',
  equipment: 'Equipo',
  other: 'Otro',
}

export const MOVEMENT_TYPES: Record<StockMovementType, { label: string; sign: 1 | -1 }> = {
  purchase: { label: 'Compra', sign: 1 },
  sale: { label: 'Venta', sign: -1 },
  adjustment: { label: 'Ajuste', sign: 1 },
  return: { label: 'Devolución', sign: 1 },
}
