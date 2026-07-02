import type { LucideIcon } from 'lucide-react'
import { Construction } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader, type Crumb } from '@/components/common/PageHeader'
import { Badge, Card } from '@/components/ui'

interface ModulePlaceholderProps {
  title: string
  description: string
  icon: LucideIcon
  phase?: string
  features?: string[]
  breadcrumbs?: Crumb[]
}

export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
  phase = 'Próxima fase',
  features = [],
  breadcrumbs,
}: ModulePlaceholderProps) {
  return (
    <div>
      <PageHeader title={title} description={description} breadcrumbs={breadcrumbs} />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden">
          <div className="relative border-b border-border bg-gradient-to-br from-primary/5 to-transparent p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
                  <Badge variant="warning">
                    <Construction className="h-3 w-3" />
                    {phase}
                  </Badge>
                </div>
                <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>

          {features.length > 0 && (
            <div className="p-8">
              <p className="mb-4 text-sm font-semibold text-foreground">
                Funcionalidades planificadas
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/30 px-3.5 py-2.5 text-sm text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}
