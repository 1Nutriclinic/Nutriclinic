import { Mail, MessageCircle, Pause, Play, Send } from 'lucide-react'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { formatDate } from '@/utils/format'
import { CAMPAIGN_CHANNELS, type CrmCampaign } from '../types'
import { cn } from '@/utils/cn'

interface CrmCampaignsPanelProps {
  campaigns: CrmCampaign[]
}

const STATUS_VARIANT: Record<CrmCampaign['status'], 'default' | 'success' | 'warning' | 'secondary'> = {
  draft: 'secondary',
  active: 'success',
  completed: 'default',
  paused: 'warning',
}

const STATUS_LABEL: Record<CrmCampaign['status'], string> = {
  draft: 'Borrador',
  active: 'Activa',
  completed: 'Completada',
  paused: 'Pausada',
}

export function CrmCampaignsPanel({ campaigns }: CrmCampaignsPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {campaigns.map((camp) => {
        const ch = CAMPAIGN_CHANNELS[camp.channel]
        const openRate = camp.sent > 0 ? Math.round((camp.opened / camp.sent) * 100) : 0
        const convRate = camp.sent > 0 ? Math.round((camp.converted / camp.sent) * 100) : 0

        return (
          <Card key={camp.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">{camp.name}</CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">{camp.audience}</p>
                </div>
                <Badge variant={STATUS_VARIANT[camp.status]}>{STATUS_LABEL[camp.status]}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">{ch.icon}</span>
                <span className="text-sm font-medium">{ch.label}</span>
                {camp.status === 'active' && <Play className="h-3.5 w-3.5 text-success" />}
                {camp.status === 'paused' && <Pause className="h-3.5 w-3.5 text-warning" />}
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <Metric label="Enviados" value={camp.sent} />
                <Metric label="Abiertos" value={`${openRate}%`} />
                <Metric label="Clicks" value={camp.clicked} />
                <Metric label="Conversión" value={`${convRate}%`} highlight />
              </div>

              {camp.scheduledAt && (
                <p className="mt-3 text-[10px] text-muted-foreground">
                  Programada: {formatDate(camp.scheduledAt)}
                </p>
              )}

              <div className="mt-3 flex gap-2">
                <button type="button" className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium transition-colors hover:bg-muted',
                  camp.channel === 'whatsapp' && 'hover:border-success hover:text-success',
                  camp.channel === 'email' && 'hover:border-primary hover:text-primary',
                )}>
                  {camp.channel === 'whatsapp' ? <MessageCircle className="h-3.5 w-3.5" /> : <Mail className="h-3.5 w-3.5" />}
                  {camp.status === 'draft' ? 'Programar' : 'Ver detalle'}
                </button>
                {camp.status === 'draft' && (
                  <button type="button" className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                    <Send className="h-3.5 w-3.5" />
                    Enviar
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function Metric({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/40 px-2 py-2">
      <p className={cn('font-display text-lg font-bold', highlight ? 'text-success' : 'text-foreground')}>{value}</p>
      <p className="text-[9px] text-muted-foreground">{label}</p>
    </div>
  )
}
