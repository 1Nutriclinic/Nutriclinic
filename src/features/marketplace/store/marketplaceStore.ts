import { create } from 'zustand'
import { MOCK_MARKETPLACE } from '../data/mockMarketplace'
import type { MarketplaceItem } from '../types'

interface MarketplaceState {
  items: MarketplaceItem[]
  toggleInstall: (id: string) => void
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  items: MOCK_MARKETPLACE,
  toggleInstall: (id) =>
    set((s) => ({
      items: s.items.map((i) =>
        i.id === id ? { ...i, installed: !i.installed, installCount: i.installed ? i.installCount - 1 : i.installCount + 1 } : i,
      ),
    })),
}))
