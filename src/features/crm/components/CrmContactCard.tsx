import { Mail, MessageCircle, Phone } from 'lucide-react'
import { ProgramBadge } from '@/components/common/ProgramBadge'
import { formatDate } from '@/utils/format'
import type { CrmContact } from '../types'
import { cn } from '@/utils/cn'

interface CrmContactCardProps {
  contact: CrmContact
  draggable?: boolean
  onClick?: () => void
}

export function CrmContactCard({ contact, draggable = false, onClick }: CrmContactCardProps) {
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => e.dataTransfer.setData('contactId', contact.id)}
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:shadow-card-hover',
        draggable && 'cursor-grab active:cursor-grabbing',
      )}
    >
      <p className="text-sm font-medium text-foreground">{contact.name}</p>
      {contact.program && (
        <div className="mt-1.5">
          <ProgramBadge program={contact.program} />
        </div>
      )}
      <p className="mt-2 text-[10px] text-muted-foreground">Fuente: {contact.source}</p>
      {contact.value && (
        <p className="mt-1 text-xs font-semibold text-primary">S/ {contact.value.toLocaleString()}</p>
      )}
      {contact.nextFollowUp && (
        <p className="mt-1 text-[10px] text-warning">Seguimiento: {formatDate(contact.nextFollowUp)}</p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{contact.assignedTo}</span>
        <div className="flex gap-1">
          {contact.phone && (
            <button type="button" className="rounded p-1 text-success hover:bg-success/10" title="WhatsApp">
              <MessageCircle className="h-3.5 w-3.5" />
            </button>
          )}
          {contact.email && (
            <button type="button" className="rounded p-1 text-primary hover:bg-primary/10" title="Email">
              <Mail className="h-3.5 w-3.5" />
            </button>
          )}
          {contact.phone && (
            <button type="button" className="rounded p-1 text-muted-foreground hover:bg-muted" title="Llamar">
              <Phone className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
      {contact.notes && (
        <p className="mt-2 truncate text-[10px] italic text-muted-foreground">{contact.notes}</p>
      )}
    </div>
  )
}
