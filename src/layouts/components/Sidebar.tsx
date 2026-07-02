import { NavLink } from 'react-router-dom'
import { ChevronLeft, PanelLeftClose } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from '@/components/common/Logo'
import { Tooltip } from '@/components/ui'
import { NAVIGATION } from '@/constants/navigation'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

interface SidebarProps {
  collapsed: boolean
  isMobile?: boolean
  onNavigate?: () => void
}

export function Sidebar({ collapsed, isMobile = false, onNavigate }: SidebarProps) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const role = useAuthStore((s) => s.user?.role)

  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-sidebar text-sidebar-foreground',
        collapsed && !isMobile ? 'w-[76px]' : 'w-64',
        'transition-[width] duration-300 ease-in-out',
      )}
    >
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
        <Logo collapsed={collapsed && !isMobile} variant="light" />
        {!isMobile && (
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-white/10 hover:text-white',
              collapsed && 'hidden',
            )}
            aria-label="Colapsar menú"
          >
            <PanelLeftClose className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {NAVIGATION.map((group) => {
          const items = group.items.filter(
            (item) => !item.roles || (role && item.roles.includes(role)),
          )
          if (items.length === 0) return null

          return (
            <div key={group.label}>
              <AnimatePresence initial={false}>
                {(!collapsed || isMobile) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40"
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon
                  const link = (
                    <NavLink
                      to={item.path}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                          collapsed && !isMobile && 'justify-center',
                          isActive
                            ? 'bg-sidebar-accent text-white shadow-sm shadow-primary/30'
                            : 'text-sidebar-foreground/75 hover:bg-white/10 hover:text-white',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.span
                              layoutId="sidebar-active"
                              className="absolute inset-0 rounded-lg bg-sidebar-accent"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                          <Icon className="relative z-10 h-[18px] w-[18px] shrink-0" />
                          {(!collapsed || isMobile) && (
                            <span className="relative z-10 flex-1 truncate">{item.title}</span>
                          )}
                          {item.badge && (!collapsed || isMobile) && (
                            <span className="relative z-10 rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )

                  return (
                    <li key={item.path}>
                      {collapsed && !isMobile ? (
                        <Tooltip content={item.title} side="right">
                          {link}
                        </Tooltip>
                      ) : (
                        link
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>

      {/* Collapse handle (collapsed state) */}
      {!isMobile && collapsed && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="mx-3 mb-4 flex h-9 items-center justify-center rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Expandir menú"
        >
          <ChevronLeft className="h-4.5 w-4.5 rotate-180" />
        </button>
      )}
    </aside>
  )
}
