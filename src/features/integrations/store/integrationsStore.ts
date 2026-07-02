import { create } from 'zustand'
import { MOCK_INTEGRATIONS } from '../data/mockIntegrations'
import type { Integration, IntegrationStatus } from '../types'

interface IntegrationsState {
  integrations: Integration[]
  toggleIntegration: (id: string) => void
  setStatus: (id: string, status: IntegrationStatus) => void
}

export const useIntegrationsStore = create<IntegrationsState>((set) => ({
  integrations: MOCK_INTEGRATIONS,
  toggleIntegration: (id) =>
    set((s) => ({
      integrations: s.integrations.map((i) =>
        i.id === id
          ? {
              ...i,
              status: i.status === 'connected' ? 'disconnected' : 'connected',
              lastSync: i.status !== 'connected' ? new Date().toISOString() : i.lastSync,
            }
          : i,
      ),
    })),
  setStatus: (id, status) =>
    set((s) => ({
      integrations: s.integrations.map((i) => (i.id === id ? { ...i, status } : i)),
    })),
}))
