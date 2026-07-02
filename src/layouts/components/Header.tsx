import { useNavigate } from 'react-router-dom'
import {
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  Settings,
  User as UserIcon,
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  Input,
} from '@/components/ui'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { useAuthStore } from '@/store/authStore'
import { logout as apiLogout } from '@/features/auth/api/authApi'
import { cn } from '@/utils/cn'

interface HeaderProps {
  onMenuClick: () => void
}

const NOTIFICATIONS = [
  { id: 1, title: 'Nueva cita agendada', desc: 'María López · 10:30 AM', unread: true },
  { id: 2, title: 'Resultado de laboratorio', desc: 'Carlos Ruiz · Perfil lipídico', unread: true },
  { id: 3, title: 'Recordatorio de seguimiento', desc: '3 pacientes sin control > 30 días', unread: false },
]

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logoutStore = useAuthStore((s) => s.logout)
  const unread = NOTIFICATIONS.filter((n) => n.unread).length

  const handleLogout = async () => {
    await apiLogout()
    logoutStore()
    navigate('/login', { replace: true })
  }

  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Invitado'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Global search */}
      <div className="hidden max-w-md flex-1 md:block">
        <Input
          placeholder="Buscar pacientes, citas, planes…"
          leftIcon={<Search className="h-4 w-4" />}
          className="h-10 bg-muted/50"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />

        {/* Notifications */}
        <Dropdown
          align="end"
          className="w-80"
          trigger={
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
          }
        >
          <div className="flex items-center justify-between px-3 py-2">
            <span className="font-display text-sm font-semibold">Notificaciones</span>
            <Badge variant="danger">{unread} nuevas</Badge>
          </div>
          <DropdownSeparator />
          {NOTIFICATIONS.map((n) => (
            <button
              key={n.id}
              type="button"
              className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
            >
              <span
                className={cn(
                  'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                  n.unread ? 'bg-primary' : 'bg-transparent',
                )}
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-foreground">{n.title}</span>
                <span className="block text-xs text-muted-foreground">{n.desc}</span>
              </span>
            </button>
          ))}
          <DropdownSeparator />
          <DropdownItem className="justify-center text-primary hover:bg-primary/5">
            Ver todas
          </DropdownItem>
        </Dropdown>

        {/* User menu */}
        <Dropdown
          align="end"
          trigger={
            <button
              type="button"
              className="ml-1 flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-muted"
            >
              <Avatar name={fullName} src={user?.avatarUrl} size="sm" status="online" />
              <span className="hidden text-left lg:block">
                <span className="block text-sm font-semibold leading-tight text-foreground">
                  {fullName}
                </span>
                <span className="block text-xs leading-tight text-muted-foreground">
                  {user?.jobTitle ?? 'Nutricionista'}
                </span>
              </span>
            </button>
          }
        >
          <DropdownLabel>{user?.email}</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem icon={<UserIcon />} onClick={() => navigate('/settings')}>
            Mi perfil
          </DropdownItem>
          <DropdownItem icon={<Settings />} onClick={() => navigate('/settings')}>
            Configuración
          </DropdownItem>
          <DropdownItem icon={<HelpCircle />}>Ayuda y soporte</DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<LogOut />} destructive onClick={handleLogout}>
            Cerrar sesión
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
