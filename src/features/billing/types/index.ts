export type InvoiceType = 'factura' | 'boleta' | 'nota_credito'
export type InvoiceStatus = 'paid' | 'pending' | 'partial' | 'overdue' | 'cancelled'
export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'yape' | 'plin'

export interface InvoiceLine {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Invoice {
  id: string
  number: string
  type: InvoiceType
  patientId: string
  patientName: string
  nutritionistId: string
  nutritionistName: string
  branchId: string
  branchName: string
  lines: InvoiceLine[]
  subtotal: number
  tax: number
  total: number
  paid: number
  balance: number
  status: InvoiceStatus
  issuedAt: string
  dueAt: string
}

export interface Payment {
  id: string
  invoiceId: string
  invoiceNumber: string
  patientName: string
  amount: number
  method: PaymentMethod
  reference?: string
  paidAt: string
  receivedBy: string
}

export interface CashRegisterEntry {
  id: string
  type: 'income' | 'expense'
  concept: string
  amount: number
  method: PaymentMethod
  date: string
  user: string
}

export interface Commission {
  id: string
  nutritionistId: string
  nutritionistName: string
  period: string
  consultations: number
  revenue: number
  rate: number
  commission: number
  status: 'pending' | 'paid'
}

export const INVOICE_STATUS: Record<InvoiceStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'secondary' | 'default' }> = {
  paid: { label: 'Pagada', variant: 'success' },
  pending: { label: 'Pendiente', variant: 'warning' },
  partial: { label: 'Parcial', variant: 'default' },
  overdue: { label: 'Vencida', variant: 'danger' },
  cancelled: { label: 'Anulada', variant: 'secondary' },
}

export const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  cash: 'Efectivo',
  card: 'Tarjeta',
  transfer: 'Transferencia',
  yape: 'Yape',
  plin: 'Plin',
}
