import {
  LayoutDashboard,
  Users,
  FileHeart,
  Stethoscope,
  UtensilsCrossed,
  CalendarDays,
  Contact,
  Receipt,
  Boxes,
  UserRound,
  Video,
  MessageCircle,
  Sparkles,
  BarChart3,
  LineChart,
  Building2,
  MapPin,
  ShieldCheck,
  Plug,
  Store,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import type { UserRole } from '@/types'

export interface NavItem {
  title: string
  path: string
  icon: LucideIcon
  badge?: string
  roles?: UserRole[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const NAVIGATION: NavGroup[] = [
  {
    label: 'Principal',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { title: 'Dashboard Ejecutivo', path: '/executive', icon: LineChart },
    ],
  },
  {
    label: 'Clínico',
    items: [
      { title: 'Pacientes', path: '/patients', icon: Users },
      { title: 'Historia Clínica', path: '/clinical-records', icon: FileHeart },
      { title: 'Programas Clínicos', path: '/programs', icon: Stethoscope },
      { title: 'Plan Alimenticio', path: '/meal-plans', icon: UtensilsCrossed },
      { title: 'Agenda', path: '/agenda', icon: CalendarDays },
    ],
  },
  {
    label: 'Comercial',
    items: [
      { title: 'CRM', path: '/crm', icon: Contact },
      { title: 'Facturación', path: '/billing', icon: Receipt },
      { title: 'Inventario', path: '/inventory', icon: Boxes },
    ],
  },
  {
    label: 'Comunicación',
    items: [
      { title: 'Portal del Paciente', path: '/patient-portal', icon: UserRound },
      { title: 'Videoconsulta', path: '/telehealth', icon: Video },
      { title: 'Mensajería', path: '/messaging', icon: MessageCircle },
    ],
  },
  {
    label: 'Inteligencia',
    items: [
      { title: 'Asistente IA', path: '/assistant', icon: Sparkles, badge: 'AI' },
      { title: 'Reportes', path: '/reports', icon: BarChart3 },
      { title: 'Business Intelligence', path: '/bi', icon: LineChart },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { title: 'Empresas', path: '/companies', icon: Building2, roles: ['super_admin', 'admin'] },
      { title: 'Sucursales', path: '/branches', icon: MapPin, roles: ['super_admin', 'admin'] },
      { title: 'Auditoría', path: '/audit', icon: ShieldCheck, roles: ['super_admin', 'admin'] },
      { title: 'Integraciones', path: '/integrations', icon: Plug },
      { title: 'Marketplace', path: '/marketplace', icon: Store },
      { title: 'Configuración', path: '/settings', icon: Settings },
    ],
  },
]
