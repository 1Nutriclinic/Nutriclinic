export type MarketplaceCategory = 'extension' | 'template' | 'module' | 'theme'
export type MarketplacePricing = 'free' | 'paid' | 'subscription'

export interface MarketplaceItem {
  id: string
  name: string
  author: string
  category: MarketplaceCategory
  description: string
  longDescription: string
  price: number
  pricing: MarketplacePricing
  rating: number
  reviewCount: number
  installCount: number
  icon: string
  tags: string[]
  featured: boolean
  installed: boolean
  version: string
}

export const MARKETPLACE_CATEGORIES: Record<MarketplaceCategory, string> = {
  extension: 'Extensiones',
  template: 'Plantillas de dietas',
  module: 'Módulos',
  theme: 'Temas',
}

export const PRICING_LABELS: Record<MarketplacePricing, string> = {
  free: 'Gratis',
  paid: 'Pago único',
  subscription: 'Suscripción',
}
