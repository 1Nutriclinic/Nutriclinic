import { create } from 'zustand'
import type { Invoice, Payment } from '../types'
import { MOCK_INVOICES, MOCK_PAYMENTS, MOCK_CASH, MOCK_COMMISSIONS } from '../data/mockBilling'

interface BillingState {
  invoices: Invoice[]
  payments: Payment[]
  cashEntries: typeof MOCK_CASH
  commissions: typeof MOCK_COMMISSIONS
  addPayment: (payment: Payment) => void
}

export const useBillingStore = create<BillingState>(() => ({
  invoices: MOCK_INVOICES,
  payments: MOCK_PAYMENTS,
  cashEntries: MOCK_CASH,
  commissions: MOCK_COMMISSIONS,
  addPayment: () => {},
}))

export function getBillingStats(invoices: Invoice[]) {
  const total = invoices.reduce((s, i) => s + i.total, 0)
  const collected = invoices.reduce((s, i) => s + i.paid, 0)
  const pending = invoices.reduce((s, i) => s + i.balance, 0)
  const overdue = invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.balance, 0)
  return { total, collected, pending, overdue, count: invoices.length }
}

export function getTodayCash(entries: typeof MOCK_CASH) {
  const income = entries.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0)
  const expense = entries.filter((e) => e.type === 'expense').reduce((s, e) => s + e.amount, 0)
  return { income, expense, net: income - expense }
}
