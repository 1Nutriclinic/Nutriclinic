import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { cn } from '@/utils/cn'
import type { Trend } from '@/types'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend?: Trend
  delta?: string
  hint?: string
  accent?: 'primary' | 'success' | 'warning' | 'danger'
  index?: number
}

const accentMap = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/12 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/12 text-danger',
} as const

const trendConfig = {
  up: { icon: ArrowUpRight, className: 'text-success' },
  down: { icon: ArrowDownRight, className: 'text-danger' },
  flat: { icon: Minus, className: 'text-muted-foreground' },
} as const

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  delta,
  hint,
  accent = 'primary',
  index = 0,
}: StatCardProps) {
  const TrendIcon = trend ? trendConfig[trend].icon : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Card className="group relative overflow-hidden p-5 transition-shadow hover:shadow-card-hover">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="font-display text-2xl font-bold tracking-tight text-foreground">
              {value}
            </p>
          </div>
          <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', accentMap[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {(delta || hint) && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            {trend && TrendIcon && (
              <span className={cn('flex items-center gap-0.5 font-semibold', trendConfig[trend].className)}>
                <TrendIcon className="h-3.5 w-3.5" />
                {delta}
              </span>
            )}
            {hint && <span className="text-muted-foreground">{hint}</span>}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
