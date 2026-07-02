import { CRM_STAGES, type CrmContact, type CrmStage } from '../types'
import { getContactsByStage } from '../store/crmStore'
import { CrmContactCard } from './CrmContactCard'
import { cn } from '@/utils/cn'

interface CrmPipelineBoardProps {
  contacts: CrmContact[]
  onMove: (contactId: string, stage: CrmStage) => void
}

export function CrmPipelineBoard({ contacts, onMove }: CrmPipelineBoardProps) {
  const handleDrop = (e: React.DragEvent, stage: CrmStage) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('contactId')
    if (id) onMove(id, stage)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {CRM_STAGES.map((stage) => {
        const stageContacts = getContactsByStage(contacts, stage.key)
        return (
          <div
            key={stage.key}
            className={cn(
              'flex w-72 shrink-0 flex-col rounded-xl border border-border border-t-4 bg-muted/20',
              stage.color,
            )}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, stage.key)}
          >
            <div className="border-b border-border px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{stage.label}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {stageContacts.length}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{stage.description}</p>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-3" style={{ maxHeight: '520px' }}>
              {stageContacts.map((contact) => (
                <CrmContactCard key={contact.id} contact={contact} draggable />
              ))}
              {stageContacts.length === 0 && (
                <p className="py-8 text-center text-xs text-muted-foreground">
                  Arrastra contactos aquí
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
