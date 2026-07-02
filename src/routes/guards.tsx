import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

function isPatient(user: { role?: string } | null) {
  return user?.role === 'patient'
}

/** Staff ERP routes — blocks patients and unauthenticated users. */
export function ProtectedRoute() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  if (isPatient(user)) {
    return <Navigate to="/portal" replace />
  }
  return <Outlet />
}

/** Staff login — redirects authenticated staff to dashboard, patients to portal. */
export function GuestRoute() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to={isPatient(user) ? '/portal' : '/dashboard'} replace />
  }
  return <Outlet />
}

/** Patient portal — requires patient role. */
export function PortalProtectedRoute() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/portal/login" replace state={{ from: location }} />
  }
  if (!isPatient(user)) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}

/** Patient login screen — redirect if already logged in as patient. */
export function PortalGuestRoute() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated && isPatient(user)) {
    return <Navigate to="/portal" replace />
  }
  if (isAuthenticated && !isPatient(user)) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
