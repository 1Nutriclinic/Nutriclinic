import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Boxes,
  Building2,
  CalendarDays,
  Contact,
  FileHeart,
  LineChart,
  MapPin,
  MessageCircle,
  Plug,
  Receipt,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  UserRound,
  Users,
  UtensilsCrossed,
  Video,
} from 'lucide-react'
import { ModulePlaceholder } from '@/pages/ModulePlaceholder'

interface ModuleDef {
  path: string
  title: string
  description: string
  icon: LucideIcon
  phase: string
  features: string[]
}

/** Roadmap of every ERP module. Dashboard is implemented separately. */
export const MODULES: ModuleDef[] = [
  {
    path: 'executive',
    title: 'Dashboard Ejecutivo',
    description: 'Visión estratégica multiempresa con KPIs financieros y clínicos consolidados.',
    icon: LineChart,
    phase: 'Fase 5 · BI',
    features: ['KPIs consolidados', 'Comparativa de sucursales', 'Proyecciones', 'Metas y objetivos', 'Rentabilidad por programa', 'Exportación ejecutiva'],
  },
  {
    path: 'patients',
    title: 'Gestión de Pacientes',
    description: 'Listado maestro con buscador, filtros avanzados, import/export y ficha 360°.',
    icon: Users,
    phase: 'Fase 2',
    features: ['Listado con TanStack Table', 'Buscador y filtros', 'Foto y estado', 'Programa y nutricionista', 'Importar Excel', 'Exportar / Nuevo / Editar'],
  },
  {
    path: 'clinical-records',
    title: 'Historia Clínica',
    description: 'Expediente clínico completo por tabs: antropometría, bioimpedancia, dieta y más.',
    icon: FileHeart,
    phase: 'Fase 2',
    features: ['Información y antecedentes', 'Consulta y diagnóstico', 'Laboratorio', 'Antropometría y bioimpedancia', 'Fotografías y archivos', 'Consentimientos y notas'],
  },
  {
    path: 'programs',
    title: 'Programas Clínicos',
    description: 'Clasificación automática de pacientes con formularios específicos por programa.',
    icon: Stethoscope,
    phase: 'Fase 3',
    features: ['Clasificación por ciclo vital', 'Gestantes por trimestre', 'Obesidad especializada', 'Pediatría (percentiles OMS)', 'Adulto mayor (MNA)', 'Formularios dinámicos'],
  },
  {
    path: 'meal-plans',
    title: 'Plan Alimenticio',
    description: 'Editor profesional de dietas con biblioteca de alimentos, recetas y PDF.',
    icon: UtensilsCrossed,
    phase: 'Fase 3',
    features: ['Editor por tiempos de comida', 'Biblioteca de alimentos', 'Recetas', 'Lista de compras', 'Cálculo de macros', 'Exportar PDF'],
  },
  {
    path: 'agenda',
    title: 'Agenda',
    description: 'Calendario con vistas diaria, semanal y mensual, drag & drop y recordatorios.',
    icon: CalendarDays,
    phase: 'Fase 4',
    features: ['Vista diaria / semanal / mensual', 'Drag & Drop', 'Recordatorios', 'Multi-nutricionista', 'Estados de cita', 'Sincronización'],
  },
  {
    path: 'crm',
    title: 'CRM',
    description: 'Embudo de pacientes: nuevos, seguimiento, abandono, alta y campañas.',
    icon: Contact,
    phase: 'Fase 4',
    features: ['Pacientes nuevos', 'Seguimiento y abandono', 'Altas', 'Campañas', 'WhatsApp', 'Email marketing'],
  },
  {
    path: 'billing',
    title: 'Facturación',
    description: 'Caja, facturas, boletas, pagos, deudas y comisiones por profesional.',
    icon: Receipt,
    phase: 'Fase 4',
    features: ['Caja diaria', 'Facturas y boletas', 'Pagos', 'Deudas', 'Comisiones', 'Reportes financieros'],
  },
  {
    path: 'inventory',
    title: 'Inventario',
    description: 'Control de suplementos, vitaminas y proteínas con compras y ventas.',
    icon: Boxes,
    phase: 'Fase 5',
    features: ['Suplementos y vitaminas', 'Proteínas', 'Control de stock', 'Compras', 'Ventas', 'Alertas de stock bajo'],
  },
  {
    path: 'patient-portal',
    title: 'Portal del Paciente',
    description: 'Espacio del paciente para su dieta, citas, evolución y autorregistro.',
    icon: UserRound,
    phase: 'Fase 6',
    features: ['Mi dieta', 'Mis citas', 'Mi evolución', 'Registrar peso / agua / comidas', 'Mensajes', 'Archivos compartidos'],
  },
  {
    path: 'telehealth',
    title: 'Videoconsulta',
    description: 'Consultas remotas integradas con sala de espera virtual y grabación.',
    icon: Video,
    phase: 'Fase 6',
    features: ['Sala de espera virtual', 'Video HD', 'Compartir pantalla', 'Chat en consulta', 'Notas en vivo', 'Grabación'],
  },
  {
    path: 'messaging',
    title: 'Mensajería',
    description: 'Centro unificado de comunicación con pacientes vía WhatsApp y correo.',
    icon: MessageCircle,
    phase: 'Fase 6',
    features: ['WhatsApp Business', 'Correo', 'Plantillas', 'Automatizaciones', 'Bandeja unificada', 'Historial'],
  },
  {
    path: 'assistant',
    title: 'Asistente IA',
    description: 'Copiloto clínico estilo ChatGPT para resúmenes, diagnósticos y planes.',
    icon: Sparkles,
    phase: 'Fase 7 · IA',
    features: ['Resumir consultas', 'Recomendaciones', 'Diagnóstico nutricional', 'Cálculo de requerimientos', 'Sugerir dieta', 'Detectar riesgos'],
  },
  {
    path: 'reports',
    title: 'Reportes',
    description: 'Reportes de evolución (peso, IMC, grasa, músculo) con comparativas y export.',
    icon: BarChart3,
    phase: 'Fase 5',
    features: ['Peso e IMC', 'Grasa y músculo', 'Agua', 'Circunferencias', 'Comparativas', 'PDF / Excel'],
  },
  {
    path: 'bi',
    title: 'Business Intelligence',
    description: 'Analítica avanzada, cohortes y tableros personalizables multiempresa.',
    icon: LineChart,
    phase: 'Fase 7',
    features: ['Tableros personalizables', 'Análisis de cohortes', 'Retención', 'Predicción de abandono', 'Data warehouse', 'API de datos'],
  },
  {
    path: 'companies',
    title: 'Empresas',
    description: 'Administración multiempresa con configuración fiscal por país.',
    icon: Building2,
    phase: 'Fase 8',
    features: ['Multiempresa', 'Configuración fiscal', 'Multipaís', 'Marcas', 'Planes', 'Facturación SaaS'],
  },
  {
    path: 'branches',
    title: 'Sucursales',
    description: 'Gestión multisucursal con recursos, horarios y personal por sede.',
    icon: MapPin,
    phase: 'Fase 8',
    features: ['Multisucursal', 'Horarios', 'Personal por sede', 'Recursos', 'Consultorios', 'Geolocalización'],
  },
  {
    path: 'audit',
    title: 'Auditoría',
    description: 'Registro inmutable de actividad, accesos y cambios para cumplimiento.',
    icon: ShieldCheck,
    phase: 'Fase 8',
    features: ['Log de actividad', 'Accesos', 'Cambios de datos', 'Cumplimiento', 'Exportación', 'Retención'],
  },
  {
    path: 'integrations',
    title: 'Integraciones',
    description: 'Conecta APIs externas, laboratorios, pasarelas de pago y dispositivos.',
    icon: Plug,
    phase: 'Fase 9',
    features: ['API REST', 'Webhooks', 'Laboratorios', 'Pasarelas de pago', 'Básculas y bioimpedancia', 'Wearables'],
  },
  {
    path: 'marketplace',
    title: 'Marketplace',
    description: 'Tienda de extensiones, plantillas de dietas y módulos de terceros.',
    icon: Store,
    phase: 'Fase 9',
    features: ['Extensiones', 'Plantillas de dietas', 'Módulos de terceros', 'Facturación', 'Reseñas', 'Publicación'],
  },
  {
    path: 'settings',
    title: 'Configuración',
    description: 'Preferencias del sistema, roles, permisos, idioma y personalización.',
    icon: Settings,
    phase: 'Fase 2',
    features: ['Perfil y cuenta', 'Roles y permisos', 'Idioma (multiidioma)', 'Tema y marca', 'Notificaciones', 'Seguridad'],
  },
]

export function renderModuleElement(mod: ModuleDef) {
  return (
    <ModulePlaceholder
      title={mod.title}
      description={mod.description}
      icon={mod.icon}
      phase={mod.phase}
      features={mod.features}
      breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: mod.title }]}
    />
  )
}
