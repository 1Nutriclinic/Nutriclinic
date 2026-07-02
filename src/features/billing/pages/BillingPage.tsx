import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  Banknote,
  CreditCard,
  FileText,
  Plus,
  Receipt,
  Wallet,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import { useBillingStore, getBillingStats, getTodayCash } from '../store/billingStore'
import { INVOICE_STATUS, PAYMENT_METHODS, type InvoiceStatus } from '../types'

export function BillingPage() {
  const invoices = useBillingStore((s) => s.invoices)
  const payments = useBillingStore((s) => s.payments)
  const cashEntries = useBillingStore((s) => s.cashEntries)
  const commissions = useBillingStore((s) => s.commissions)
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all')

  const stats = useMemo(() => getBillingStats(invoices), [invoices])
  const cash = useMemo(() => getTodayCash(cashEntries), [cashEntries])

  const filtered = useMemo(
    () => (statusFilter === 'all' ? invoices : invoices.filter((i) => i.status === statusFilter)),
    [invoices, statusFilter],
  )

  return (
    <div>
      <PageHeader
        title="Facturación"
        description="Caja, facturas, boletas, pagos, deudas y comisiones por profesional."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Facturación' }]}
        actions={
          <Button size="sm"><Plus className="h-4 w-4" />Nueva factura</Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Facturado mes" value={formatCurrency(stats.total)} icon={Receipt} accent="primary" index={0} />
        <StatCard label="Cobrado" value={formatCurrency(stats.collected)} icon={Wallet} accent="success" index={1} />
        <StatCard label="Por cobrar" value={formatCurrency(stats.pending)} icon={CreditCard} accent="warning" index={2} />
        <StatCard label="Vencido" value={formatCurrency(stats.overdue)} icon={AlertTriangle} accent="warning" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="invoices">
          <TabsList className="mb-4">
            <TabsTrigger value="invoices" icon={<FileText className="h-4 w-4" />}>Facturas</TabsTrigger>
            <TabsTrigger value="payments" icon={<CreditCard className="h-4 w-4" />}>Pagos</TabsTrigger>
            <TabsTrigger value="cash" icon={<Banknote className="h-4 w-4" />}>Caja</TabsTrigger>
            <TabsTrigger value="commissions" icon={<Wallet className="h-4 w-4" />}>Comisiones</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  {(['all', 'paid', 'pending', 'partial', 'overdue'] as const).map((s) => (
                    <button key={s} type="button" onClick={() => setStatusFilter(s)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {s === 'all' ? 'Todas' : INVOICE_STATUS[s].label}
                    </button>
                  ))}
                </div>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="border-b border-border bg-muted/40">
                      <tr>
                        {['Número', 'Paciente', 'Tipo', 'Total', 'Pagado', 'Saldo', 'Estado', 'Emisión'].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((inv) => {
                        const st = INVOICE_STATUS[inv.status]
                        return (
                          <tr key={inv.id} className="hover:bg-muted/20">
                            <td className="px-4 py-3 font-mono text-xs font-medium">{inv.number}</td>
                            <td className="px-4 py-3">{inv.patientName}</td>
                            <td className="px-4 py-3 capitalize">{inv.type}</td>
                            <td className="px-4 py-3 font-medium">{formatCurrency(inv.total)}</td>
                            <td className="px-4 py-3 text-success">{formatCurrency(inv.paid)}</td>
                            <td className="px-4 py-3 text-warning">{inv.balance > 0 ? formatCurrency(inv.balance) : '—'}</td>
                            <td className="px-4 py-3"><Badge variant={st.variant}>{st.label}</Badge></td>
                            <td className="px-4 py-3 text-muted-foreground">{formatDate(inv.issuedAt)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card><CardContent className="p-5">
              <div className="space-y-2">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{p.patientName}</p>
                      <p className="text-xs text-muted-foreground">{p.invoiceNumber} · {PAYMENT_METHODS[p.method]}{p.reference ? ` · ${p.reference}` : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-success">{formatCurrency(p.amount)}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(p.paidAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="cash">
            <div className="mb-4 grid grid-cols-3 gap-4">
              <Card><CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground">Ingresos hoy</p>
                <p className="font-display text-2xl font-bold text-success">{formatCurrency(cash.income)}</p>
              </CardContent></Card>
              <Card><CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground">Egresos hoy</p>
                <p className="font-display text-2xl font-bold text-danger">{formatCurrency(cash.expense)}</p>
              </CardContent></Card>
              <Card><CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground">Neto</p>
                <p className="font-display text-2xl font-bold text-primary">{formatCurrency(cash.net)}</p>
              </CardContent></Card>
            </div>
            <Card><CardContent className="p-5">
              <div className="space-y-2">
                {cashEntries.map((e) => (
                  <div key={e.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{e.concept}</p>
                      <p className="text-xs text-muted-foreground">{PAYMENT_METHODS[e.method]} · {e.user}</p>
                    </div>
                    <p className={`font-display text-lg font-bold ${e.type === 'income' ? 'text-success' : 'text-danger'}`}>
                      {e.type === 'income' ? '+' : '-'}{formatCurrency(e.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="commissions">
            <Card><CardContent className="p-5">
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      {['Profesional', 'Periodo', 'Consultas', 'Ingresos', 'Tasa', 'Comisión', 'Estado'].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {commissions.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium">{c.nutritionistName}</td>
                        <td className="px-4 py-3">{c.period}</td>
                        <td className="px-4 py-3">{c.consultations}</td>
                        <td className="px-4 py-3">{formatCurrency(c.revenue)}</td>
                        <td className="px-4 py-3">{(c.rate * 100).toFixed(0)}%</td>
                        <td className="px-4 py-3 font-bold text-primary">{formatCurrency(c.commission)}</td>
                        <td className="px-4 py-3"><Badge variant={c.status === 'paid' ? 'success' : 'warning'}>{c.status === 'paid' ? 'Pagada' : 'Pendiente'}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
