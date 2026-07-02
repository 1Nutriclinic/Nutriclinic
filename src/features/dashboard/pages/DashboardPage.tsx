import {
  CalendarCheck,
  ClipboardList,
  Download,
  Plus,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { useAuthStore } from '@/store/authStore'
import { EvolutionChart } from '../components/EvolutionChart'
import { ImcChart } from '../components/ImcChart'
import { ProgramsChart } from '../components/ProgramsChart'
import { TodayAgenda } from '../components/TodayAgenda'
import { AlertsPanel } from '../components/AlertsPanel'
import { RecentConsultations } from '../components/RecentConsultations'

const KPIS = [
  { label: 'Pacientes activos', value: '924', icon: Users, trend: 'up' as const, delta: '+7.3%', hint: 'vs. mes anterior', accent: 'primary' as const },
  { label: 'Pacientes nuevos', value: '104', icon: UserPlus, trend: 'up' as const, delta: '+14%', hint: 'este mes', accent: 'success' as const },
  { label: 'Citas hoy', value: '18', icon: CalendarCheck, trend: 'flat' as const, delta: '0%', hint: '6 pendientes', accent: 'primary' as const },
  { label: 'Seguimientos', value: '47', icon: ClipboardList, trend: 'down' as const, delta: '-3', hint: '12 vencidos', accent: 'warning' as const },
  { label: 'Facturación mes', value: 'S/ 84.2k', icon: Wallet, trend: 'up' as const, delta: '+9.1%', hint: 'vs. objetivo', accent: 'success' as const },
  { label: 'Adherencia media', value: '82%', icon: TrendingUp, trend: 'up' as const, delta: '+2.4%', hint: 'planes activos', accent: 'primary' as const },
]

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const firstName = user?.firstName ?? 'Doctora'

  return (
    <div>
      <PageHeader
        title={`Buen día, ${firstName}`}
        description="Resumen ejecutivo de tu clínica — datos actualizados en tiempo real."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Dashboard' }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Nueva consulta
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((kpi, i) => (
          <StatCard key={kpi.label} index={i} {...kpi} />
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolución de pacientes</CardTitle>
            <CardDescription>Activos vs. nuevos ingresos en los últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <EvolutionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pacientes por programa</CardTitle>
            <CardDescription>Distribución clínica actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgramsChart />
          </CardContent>
        </Card>
      </div>

      {/* Second row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por IMC</CardTitle>
            <CardDescription>Clasificación nutricional de la población</CardDescription>
          </CardHeader>
          <CardContent>
            <ImcChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Agenda del día</CardTitle>
              <CardDescription>18 citas programadas</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver agenda
            </Button>
          </CardHeader>
          <CardContent>
            <TodayAgenda />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas clínicas</CardTitle>
            <CardDescription>Requieren tu atención</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsPanel />
          </CardContent>
        </Card>
      </div>

      {/* Recent consultations */}
      <div className="mt-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Últimas consultas</CardTitle>
              <CardDescription>Registro reciente de atenciones</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver historial
            </Button>
          </CardHeader>
          <CardContent>
            <RecentConsultations />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
