import type { Invoice, Payment, CashRegisterEntry, Commission } from '../types'

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-001', number: 'F001-00001234', type: 'factura',
    patientId: 'p-001', patientName: 'María López García',
    nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-001', branchName: 'Sede Miraflores',
    lines: [
      { id: 'l1', description: 'Consulta nutricional', quantity: 1, unitPrice: 180, total: 180 },
      { id: 'l2', description: 'Plan alimenticio personalizado', quantity: 1, unitPrice: 250, total: 250 },
    ],
    subtotal: 430, tax: 77.4, total: 507.4, paid: 507.4, balance: 0,
    status: 'paid', issuedAt: '2026-06-28T10:00:00Z', dueAt: '2026-07-28T00:00:00Z',
  },
  {
    id: 'inv-002', number: 'B001-00005678', type: 'boleta',
    patientId: 'p-002', patientName: 'Carlos Mendoza Vega',
    nutritionistId: 'u-002', nutritionistName: 'Lic. Pedro Soto',
    branchId: 'b-002', branchName: 'Sede San Isidro',
    lines: [{ id: 'l3', description: 'Control mensual', quantity: 1, unitPrice: 150, total: 150 }],
    subtotal: 150, tax: 27, total: 177, paid: 177, balance: 0,
    status: 'paid', issuedAt: '2026-06-30T11:00:00Z', dueAt: '2026-07-30T00:00:00Z',
  },
  {
    id: 'inv-003', number: 'F001-00001235', type: 'factura',
    patientId: 'p-003', patientName: 'Lucía Ramírez Torres',
    nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-001', branchName: 'Sede Miraflores',
    lines: [
      { id: 'l4', description: 'Control gestante', quantity: 1, unitPrice: 200, total: 200 },
      { id: 'l5', description: 'Suplementación prenatal', quantity: 1, unitPrice: 120, total: 120 },
    ],
    subtotal: 320, tax: 57.6, total: 377.6, paid: 200, balance: 177.6,
    status: 'partial', issuedAt: '2026-07-01T09:00:00Z', dueAt: '2026-07-15T00:00:00Z',
  },
  {
    id: 'inv-004', number: 'B001-00005679', type: 'boleta',
    patientId: 'p-008', patientName: 'Patricia Gutiérrez Luna',
    nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-002', branchName: 'Sede San Isidro',
    lines: [{ id: 'l6', description: 'Consulta inicial', quantity: 1, unitPrice: 180, total: 180 }],
    subtotal: 180, tax: 32.4, total: 212.4, paid: 0, balance: 212.4,
    status: 'overdue', issuedAt: '2026-05-10T14:00:00Z', dueAt: '2026-06-10T00:00:00Z',
  },
  {
    id: 'inv-005', number: 'F001-00001236', type: 'factura',
    patientId: 'p-007', patientName: 'Jorge Silva Rojas',
    nutritionistId: 'u-003', nutritionistName: 'Lic. Sofía Herrera',
    branchId: 'b-001', branchName: 'Sede Miraflores',
    lines: [
      { id: 'l7', description: 'Programa bariátrico (3 meses)', quantity: 1, unitPrice: 2400, total: 2400 },
    ],
    subtotal: 2400, tax: 432, total: 2832, paid: 2832, balance: 0,
    status: 'paid', issuedAt: '2026-05-20T09:00:00Z', dueAt: '2026-06-20T00:00:00Z',
  },
  {
    id: 'inv-006', number: 'B001-00005680', type: 'boleta',
    patientId: 'p-006', patientName: 'Andrea Flores Díaz',
    nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-002', branchName: 'Sede San Isidro',
    lines: [{ id: 'l8', description: 'Evaluación deportiva', quantity: 1, unitPrice: 220, total: 220 }],
    subtotal: 220, tax: 39.6, total: 259.6, paid: 0, balance: 259.6,
    status: 'pending', issuedAt: '2026-07-02T08:00:00Z', dueAt: '2026-07-16T00:00:00Z',
  },
]

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay-001', invoiceId: 'inv-001', invoiceNumber: 'F001-00001234', patientName: 'María López García', amount: 507.4, method: 'yape', reference: 'YAPE-88234', paidAt: '2026-06-28T10:30:00Z', receivedBy: 'Recepción Miraflores' },
  { id: 'pay-002', invoiceId: 'inv-002', invoiceNumber: 'B001-00005678', patientName: 'Carlos Mendoza Vega', amount: 177, method: 'card', paidAt: '2026-06-30T11:15:00Z', receivedBy: 'Recepción San Isidro' },
  { id: 'pay-003', invoiceId: 'inv-003', invoiceNumber: 'F001-00001235', patientName: 'Lucía Ramírez Torres', amount: 200, method: 'transfer', reference: 'TRF-445566', paidAt: '2026-07-01T09:30:00Z', receivedBy: 'Recepción Miraflores' },
  { id: 'pay-004', invoiceId: 'inv-005', invoiceNumber: 'F001-00001236', patientName: 'Jorge Silva Rojas', amount: 2832, method: 'transfer', reference: 'TRF-778899', paidAt: '2026-05-20T10:00:00Z', receivedBy: 'Recepción Miraflores' },
]

export const MOCK_CASH: CashRegisterEntry[] = [
  { id: 'c-1', type: 'income', concept: 'Consulta María López', amount: 507.4, method: 'yape', date: '2026-07-02T10:30:00Z', user: 'Recepción' },
  { id: 'c-2', type: 'income', concept: 'Control Carlos Mendoza', amount: 177, method: 'card', date: '2026-07-02T11:15:00Z', user: 'Recepción' },
  { id: 'c-3', type: 'income', concept: 'Abono Lucía Ramírez', amount: 200, method: 'transfer', date: '2026-07-02T09:30:00Z', user: 'Recepción' },
  { id: 'c-4', type: 'expense', concept: 'Compra insumos clínicos', amount: 85, method: 'cash', date: '2026-07-02T08:00:00Z', user: 'Admin' },
  { id: 'c-5', type: 'expense', concept: 'Papelería y formularios', amount: 42, method: 'cash', date: '2026-07-01T17:00:00Z', user: 'Admin' },
]

export const MOCK_COMMISSIONS: Commission[] = [
  { id: 'com-1', nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz', period: 'Jun 2026', consultations: 48, revenue: 12400, rate: 0.15, commission: 1860, status: 'paid' },
  { id: 'com-2', nutritionistId: 'u-002', nutritionistName: 'Lic. Pedro Soto', period: 'Jun 2026', consultations: 36, revenue: 8900, rate: 0.12, commission: 1068, status: 'paid' },
  { id: 'com-3', nutritionistId: 'u-003', nutritionistName: 'Lic. Sofía Herrera', period: 'Jun 2026', consultations: 32, revenue: 10200, rate: 0.12, commission: 1224, status: 'pending' },
  { id: 'com-4', nutritionistId: 'u-001', nutritionistName: 'Dra. Ana Ruiz', period: 'Jul 2026', consultations: 22, revenue: 6800, rate: 0.15, commission: 1020, status: 'pending' },
]
