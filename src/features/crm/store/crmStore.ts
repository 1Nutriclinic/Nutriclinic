import { create } from 'zustand'
import type { CrmContact, CrmCampaign, CrmStage } from '../types'
import { MOCK_CRM_CONTACTS, MOCK_CAMPAIGNS } from '../data/mockCrmData'

interface CrmState {
  contacts: CrmContact[]
  campaigns: CrmCampaign[]
  moveContact: (id: string, stage: CrmStage) => void
  updateContact: (id: string, data: Partial<CrmContact>) => void
  addContact: (contact: CrmContact) => void
}

export const useCrmStore = create<CrmState>((set) => ({
  contacts: MOCK_CRM_CONTACTS,
  campaigns: MOCK_CAMPAIGNS,
  moveContact: (id, stage) =>
    set((s) => ({
      contacts: s.contacts.map((c) => (c.id === id ? { ...c, stage } : c)),
    })),
  updateContact: (id, data) =>
    set((s) => ({
      contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...data } : c)),
    })),
  addContact: (contact) => set((s) => ({ contacts: [contact, ...s.contacts] })),
}))

export function getContactsByStage(contacts: CrmContact[], stage: CrmStage): CrmContact[] {
  return contacts.filter((c) => c.stage === stage)
}

export function getCrmStats(contacts: CrmContact[]) {
  return {
    leads: contacts.filter((c) => c.stage === 'lead').length,
    followUp: contacts.filter((c) => c.stage === 'follow_up').length,
    active: contacts.filter((c) => c.stage === 'active').length,
    abandoned: contacts.filter((c) => c.stage === 'abandoned').length,
    totalValue: contacts.reduce((sum, c) => sum + (c.value ?? 0), 0),
  }
}
