import { Outlet, Link } from 'react-router-dom'
import { LogOut, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui'
import { logout as apiLogout } from '@/features/auth/api/authApi'
import { useAuthStore } from '@/store/authStore'

export function PortalLayout() {
  const user = useAuthStore((s) => s.user)
  const logoutStore = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    await apiLogout()
    logoutStore()
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <Link to="/portal" className="flex items-center gap-2 font-display font-semibold text-primary">
          <Stethoscope className="h-5 w-5" />
          NutriClinic
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user?.firstName}
          </span>
          <Button variant="ghost" size="icon-sm" onClick={handleLogout} aria-label="Cerrar sesión">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
