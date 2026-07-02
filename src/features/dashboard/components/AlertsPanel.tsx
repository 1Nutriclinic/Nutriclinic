import { AlertTriangle, Info, ShieldAlert } from 'lucide-react'
import { alerts, type AlertItem } from '../data/mockData'
import { cn } from '@/utils/cn'

const levelConfig: Record<
  AlertItem['level'],
  { icon: typeof Info; wrap: string; icon_c: string }
> = {
  danger: { icon: ShieldAlert, wrap: 'bg-danger/10 border-danger/20', icon_c: 'text-danger' },
  warning: { icon: AlertTriangle, wrap: 'bg-warning/10 border-warning/20', icon_c: 'text-warning' },
  info: { icon: Info, wrap: 'bg-primary/10 border-primary/20', icon_c: 'text-primary' },
}

export function AlertsPanel() {
  return (
    <ul className="space-y-2.5">
      {alerts.map((alert) => {
        const cfg = levelConfig[alert.level]
        const Icon = cfg.icon
        return (
          <li
            key={alert.id}
            className={cn('flex items-start gap-3 rounded-lg border p-3', cfg.wrap)}
          >
            <Icon className={cn('mt-0.5 h-4.5 w-4.5 shrink-0', cfg.icon_c)} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{alert.title}</p>
              <p className="text-xs text-muted-foreground">{alert.detail}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
