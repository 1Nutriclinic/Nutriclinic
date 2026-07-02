import { useMemo, useState } from 'react'
import { Building2, Download, Globe, Plus, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge, Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatCurrency, formatDate, formatCompactNumber } from '@/utils/format'
import { MOCK_COMPANIES, getCompanyStats } from '../data/mockCompanies'
import {
  COMPANY_PLANS,
  COMPANY_STATUS,
  COUNTRIES,
  type CompanyPlan,
  type CompanyStatus,
} from '../types'

export function CompaniesPage() {
  const [statusFilter, setStatusFilter] = useState<CompanyStatus | 'all'>('all')
  const [planFilter, setPlanFilter] = useState<CompanyPlan | 'all'>('all')
  const [countryFilter, setCountryFilter] = useState<string>('all')

  const stats = useMemo(() => getCompanyStats(MOCK_COMPANIES), [])

  const filtered = useMemo(() => {
    return MOCK_COMPANIES.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false
      if (planFilter !== 'all' && c.plan !== planFilter) return false
      if (countryFilter !== 'all' && c.country !== countryFilter) return false
      return true
    })
  }, [statusFilter, planFilter, countryFilter])

  return (
    <div>
      <PageHeader
        title="Empresas"
        description="Administración multiempresa con configuración fiscal, planes y facturación SaaS."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Empresas' }]}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" />Exportar</Button>
            <Button size="sm"><Plus className="h-4 w-4" />Nueva empresa</Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Empresas" value={String(stats.total)} icon={Building2} accent="primary" index={0} />
        <StatCard label="Activas" value={String(stats.active)} icon={Globe} accent="success" index={1} />
        <StatCard label="En prueba" value={String(stats.trial)} icon={Users} accent="warning" index={2} />
        <StatCard label="MRR consolidado" value={formatCurrency(stats.mrr)} icon={Building2} accent="primary" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list" icon={<Building2 className="h-4 w-4" />}>Listado</TabsTrigger>
            <TabsTrigger value="cards" icon={<Globe className="h-4 w-4" />}>Tarjetas</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>Todos</FilterChip>
                  {(Object.entries(COMPANY_STATUS) as [CompanyStatus, { label: string }][]).map(([k, v]) => (
                    <FilterChip key={k} active={statusFilter === k} onClick={() => setStatusFilter(k)}>{v.label}</FilterChip>
                  ))}
                  <span className="mx-1 w-px bg-border" />
                  {(Object.entries(COMPANY_PLANS) as [CompanyPlan, string][]).map(([k, v]) => (
                    <FilterChip key={k} active={planFilter === k} onClick={() => setPlanFilter(k)}>{v}</FilterChip>
                  ))}
                  <span className="mx-1 w-px bg-border" />
                  <FilterChip active={countryFilter === 'all'} onClick={() => setCountryFilter('all')}>Todos los países</FilterChip>
                  {COUNTRIES.map((c) => (
                    <FilterChip key={c} active={countryFilter === c} onClick={() => setCountryFilter(c)}>{c}</FilterChip>
                  ))}
                </div>

                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[1000px] text-left text-sm">
                    <thead className="border-b border-border bg-muted/40">
                      <tr>
                        {['Empresa', 'RUC/NIT', 'País', 'Plan', 'Estado', 'Sucursales', 'Usuarios', 'Pacientes', 'MRR', 'Alta'].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((c) => (
                        <tr key={c.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
                                style={{ backgroundColor: c.brandColor }}
                              >
                                {c.logoInitials}
                              </div>
                              <div>
                                <p className="font-medium">{c.name}</p>
                                <p className="text-xs text-muted-foreground">{c.legalName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">{c.taxId}</td>
                          <td className="px-4 py-3">{c.country}</td>
                          <td className="px-4 py-3"><Badge variant="outline">{COMPANY_PLANS[c.plan]}</Badge></td>
                          <td className="px-4 py-3"><Badge variant={COMPANY_STATUS[c.status].variant}>{COMPANY_STATUS[c.status].label}</Badge></td>
                          <td className="px-4 py-3">{c.branchCount}</td>
                          <td className="px-4 py-3">{c.userCount}</td>
                          <td className="px-4 py-3">{formatCompactNumber(c.patientCount)}</td>
                          <td className="px-4 py-3 font-medium">{c.monthlyFee > 0 ? formatCurrency(c.monthlyFee) : '—'}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(c.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <Card key={c.id} className="overflow-hidden">
                  <div className="h-1.5" style={{ backgroundColor: c.brandColor }} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
                          style={{ backgroundColor: c.brandColor }}
                        >
                          {c.logoInitials}
                        </div>
                        <div>
                          <p className="font-semibold">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.country} · {c.currency}</p>
                        </div>
                      </div>
                      <Badge variant={COMPANY_STATUS[c.status].variant}>{COMPANY_STATUS[c.status].label}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-muted/40 p-2">
                        <p className="text-lg font-bold">{c.branchCount}</p>
                        <p className="text-[10px] text-muted-foreground">Sucursales</p>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-2">
                        <p className="text-lg font-bold">{c.userCount}</p>
                        <p className="text-[10px] text-muted-foreground">Usuarios</p>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-2">
                        <p className="text-lg font-bold">{formatCompactNumber(c.patientCount)}</p>
                        <p className="text-[10px] text-muted-foreground">Pacientes</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{COMPANY_PLANS[c.plan]}</span>
                      <span>{c.monthlyFee > 0 ? `${formatCurrency(c.monthlyFee)}/mes` : 'Prueba gratuita'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        active ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted/60',
      )}
    >
      {children}
    </button>
  )
}
