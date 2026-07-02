import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { GuestRoute, PortalGuestRoute, PortalProtectedRoute, ProtectedRoute } from './guards'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { PatientsPage } from '@/features/patients/pages/PatientsPage'
import { ClinicalRecordsPage } from '@/features/clinical-records/pages/ClinicalRecordsPage'
import { ClinicalRecordDetailPage } from '@/features/clinical-records/pages/ClinicalRecordDetailPage'
import { ProgramsPage } from '@/features/programs/pages/ProgramsPage'
import { ProgramDetailPage } from '@/features/programs/pages/ProgramDetailPage'
import { ProgramPatientPage } from '@/features/programs/pages/ProgramPatientPage'
import { MealPlansPage } from '@/features/meal-plans/pages/MealPlansPage'
import { MealPlanEditorPage } from '@/features/meal-plans/pages/MealPlanEditorPage'
import { AgendaPage } from '@/features/agenda/pages/AgendaPage'
import { CrmPage } from '@/features/crm/pages/CrmPage'
import { BillingPage } from '@/features/billing/pages/BillingPage'
import { InventoryPage } from '@/features/inventory/pages/InventoryPage'
import { ReportsPage } from '@/features/reports/pages/ReportsPage'
import { BiPage } from '@/features/bi/pages/BiPage'
import { PatientPortalPage } from '@/features/patient-portal/pages/PatientPortalPage'
import { TelehealthPage } from '@/features/telehealth/pages/TelehealthPage'
import { MessagingPage } from '@/features/messaging/pages/MessagingPage'
import { AssistantPage } from '@/features/assistant/pages/AssistantPage'
import { ExecutivePage } from '@/features/executive/pages/ExecutivePage'
import { CompaniesPage } from '@/features/companies/pages/CompaniesPage'
import { BranchesPage } from '@/features/branches/pages/BranchesPage'
import { AuditPage } from '@/features/audit/pages/AuditPage'
import { IntegrationsPage } from '@/features/integrations/pages/IntegrationsPage'
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'
import { PortalLoginPage } from '@/features/patient-portal/pages/PortalLoginPage'
import { PortalHomePage } from '@/features/patient-portal/pages/PortalHomePage'
import { PortalLayout } from '@/layouts/PortalLayout'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { MODULES, renderModuleElement } from './moduleRoutes'

const IMPLEMENTED_PATHS = new Set([
  'patients', 'clinical-records', 'programs', 'meal-plans',
  'agenda', 'crm', 'billing', 'inventory', 'reports', 'bi',
  'patient-portal', 'telehealth', 'messaging',
  'assistant', 'executive',
  'companies', 'branches', 'audit',
  'integrations', 'marketplace', 'settings',
])

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      { element: <AuthLayout />, children: [
        { path: '/login', element: <LoginPage /> },
        { path: '/forgot-password', element: <ForgotPasswordPage /> },
      ]},
    ],
  },
  {
    element: <PortalGuestRoute />,
    children: [
      { path: '/portal/login', element: <PortalLoginPage /> },
    ],
  },
  {
    element: <PortalProtectedRoute />,
    children: [
      {
        element: <PortalLayout />,
        children: [
          { path: '/portal', element: <PortalHomePage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/patients', element: <PatientsPage /> },
          { path: '/clinical-records', element: <ClinicalRecordsPage /> },
          { path: '/clinical-records/:patientId', element: <ClinicalRecordDetailPage /> },
          { path: '/programs', element: <ProgramsPage /> },
          { path: '/programs/:programKey/:patientId', element: <ProgramPatientPage /> },
          { path: '/programs/:programKey', element: <ProgramDetailPage /> },
          { path: '/meal-plans', element: <MealPlansPage /> },
          { path: '/meal-plans/:planId', element: <MealPlanEditorPage /> },
          { path: '/agenda', element: <AgendaPage /> },
          { path: '/crm', element: <CrmPage /> },
          { path: '/billing', element: <BillingPage /> },
          { path: '/inventory', element: <InventoryPage /> },
          { path: '/reports', element: <ReportsPage /> },
          { path: '/bi', element: <BiPage /> },
          { path: '/patient-portal', element: <PatientPortalPage /> },
          { path: '/telehealth', element: <TelehealthPage /> },
          { path: '/messaging', element: <MessagingPage /> },
          { path: '/assistant', element: <AssistantPage /> },
          { path: '/executive', element: <ExecutivePage /> },
          { path: '/companies', element: <CompaniesPage /> },
          { path: '/branches', element: <BranchesPage /> },
          { path: '/audit', element: <AuditPage /> },
          { path: '/integrations', element: <IntegrationsPage /> },
          { path: '/marketplace', element: <MarketplacePage /> },
          { path: '/settings', element: <SettingsPage /> },
          ...MODULES.filter((mod) => !IMPLEMENTED_PATHS.has(mod.path)).map((mod) => ({
            path: `/${mod.path}`,
            element: renderModuleElement(mod),
          })),
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
