import { Activity } from 'lucide-react'
import { cn } from '@/utils/cn'
import { APP } from '@/constants/app'

interface LogoProps {
  collapsed?: boolean
  className?: string
  variant?: 'light' | 'dark' | 'auto'
}

export function Logo({ collapsed = false, className, variant = 'auto' }: LogoProps) {
  const textColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
        ? 'text-secondary'
        : 'text-foreground'

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-800 shadow-lg shadow-primary/25">
        <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-display text-base font-bold tracking-tight', textColor)}>
            {APP.name}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            {APP.suite}
          </span>
        </div>
      )}
    </div>
  )
}
