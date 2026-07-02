import { useMemo } from 'react'
import { Megaphone, Plus, TrendingUp, UserPlus, Users, UserX } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Button, Card, CardContent } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { formatCurrency } from '@/utils/format'
import { CrmPipelineBoard } from '../components/CrmPipelineBoard'
import { CrmCampaignsPanel } from '../components/CrmCampaignsPanel'
import { useCrmStore, getCrmStats } from '../store/crmStore'

export function CrmPage() {
  const contacts = useCrmStore((s) => s.contacts)
  const campaigns = useCrmStore((s) => s.campaigns)
  const moveContact = useCrmStore((s) => s.moveContact)

  const stats = useMemo(() => getCrmStats(contacts), [contacts])

  return (
    <div>
      <PageHeader
        title="CRM"
        description="Embudo de pacientes, seguimiento comercial, campañas WhatsApp y email."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'CRM' }]}
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Nuevo prospecto
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Prospectos" value={String(stats.leads)} icon={UserPlus} accent="primary" index={0} />
        <StatCard label="En seguimiento" value={String(stats.followUp)} icon={TrendingUp} accent="warning" index={1} />
        <StatCard label="Activos" value={String(stats.active)} icon={Users} accent="success" index={2} />
        <StatCard label="Abandono" value={String(stats.abandoned)} icon={UserX} accent="warning" index={3} />
        <StatCard label="Valor pipeline" value={formatCurrency(stats.totalValue)} icon={TrendingUp} accent="primary" index={4} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="pipeline">
          <TabsList className="mb-4">
            <TabsTrigger value="pipeline" icon={<Users className="h-4 w-4" />}>
              Embudo comercial
            </TabsTrigger>
            <TabsTrigger value="campaigns" icon={<Megaphone className="h-4 w-4" />}>
              Campañas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <Card>
              <CardContent className="p-5">
                <p className="mb-4 text-sm text-muted-foreground">
                  Arrastra las tarjetas entre columnas para actualizar el estado del paciente.
                </p>
                <CrmPipelineBoard contacts={contacts} onMove={moveContact} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <CrmCampaignsPanel campaigns={campaigns} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
