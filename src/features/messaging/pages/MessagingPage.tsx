import { useEffect, useMemo, useState } from 'react'
import { Mail, MessageCircle, Plus, Search, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Avatar, Badge, Button, Card, Input } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatTime } from '@/utils/format'
import { useMessagingStore } from '../store/messagingStore'
import { CHANNEL_META, type Conversation, type MessageChannel } from '../types'

export function MessagingPage() {
  const conversations = useMessagingStore((s) => s.conversations)
  const messages = useMessagingStore((s) => s.messages)
  const sendMessage = useMessagingStore((s) => s.sendMessage)
  const markRead = useMessagingStore((s) => s.markRead)

  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? '')
  const [draft, setDraft] = useState('')
  const [search, setSearch] = useState('')
  const [channelFilter, setChannelFilter] = useState<MessageChannel | 'all'>('all')

  const selected = conversations.find((c) => c.id === selectedId)
  const thread = messages[selectedId] ?? []

  useEffect(() => {
    if (selectedId) markRead(selectedId)
  }, [selectedId, markRead])

  const filtered = useMemo(() => {
    let list = conversations
    if (channelFilter !== 'all') list = list.filter((c) => c.channel === channelFilter)
    const q = search.trim().toLowerCase()
    if (q) list = list.filter((c) => c.patientName.toLowerCase().includes(q))
    return list
  }, [conversations, channelFilter, search])

  const stats = useMemo(() => ({
    open: conversations.filter((c) => c.status === 'open').length,
    unread: conversations.reduce((s, c) => s + c.unreadCount, 0),
    whatsapp: conversations.filter((c) => c.channel === 'whatsapp').length,
  }), [conversations])

  const handleSend = () => {
    if (!draft.trim() || !selectedId) return
    sendMessage(selectedId, draft.trim())
    setDraft('')
  }

  return (
    <div>
      <PageHeader
        title="Mensajería"
        description="Bandeja unificada de WhatsApp, correo e historial de comunicación."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Mensajería' }]}
        actions={<Button size="sm"><Plus className="h-4 w-4" />Nueva conversación</Button>}
      />

      <div className="mb-6 grid grid-cols-3 gap-4">
        <StatCard label="Abiertas" value={String(stats.open)} icon={MessageCircle} accent="primary" index={0} />
        <StatCard label="Sin leer" value={String(stats.unread)} icon={Mail} accent="warning" index={1} />
        <StatCard label="WhatsApp" value={String(stats.whatsapp)} icon={MessageCircle} accent="success" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="flex h-[calc(100vh-18rem)] overflow-hidden">
          {/* Conversation list */}
          <div className="flex w-80 shrink-0 flex-col border-r border-border">
            <div className="border-b border-border p-3">
              <Input placeholder="Buscar conversación…" value={search} onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />} className="h-9" />
              <div className="mt-2 flex gap-1">
                {(['all', 'whatsapp', 'email'] as const).map((ch) => (
                  <button key={ch} type="button" onClick={() => setChannelFilter(ch)}
                    className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors',
                      channelFilter === ch ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                    {ch === 'all' ? 'Todos' : CHANNEL_META[ch].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map((conv) => (
                <ConversationItem key={conv.id} conv={conv} active={conv.id === selectedId} onClick={() => setSelectedId(conv.id)} />
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-1 flex-col">
            {selected ? (
              <>
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={selected.patientName} size="md" />
                    <div>
                      <p className="font-medium">{selected.patientName}</p>
                      <p className={cn('text-xs', CHANNEL_META[selected.channel].color)}>{CHANNEL_META[selected.channel].label}</p>
                    </div>
                  </div>
                  <Badge variant={selected.status === 'open' ? 'success' : selected.status === 'pending' ? 'warning' : 'secondary'}>
                    {selected.status === 'open' ? 'Abierta' : selected.status === 'pending' ? 'Pendiente' : 'Resuelta'}
                  </Badge>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {thread.map((msg) => (
                    <div key={msg.id} className={cn('flex', msg.direction === 'outbound' ? 'justify-end' : 'justify-start')}>
                      <div className={cn(
                        'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                        msg.direction === 'outbound' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
                      )}>
                        <p>{msg.content}</p>
                        <p className={cn('mt-1 text-[10px]', msg.direction === 'outbound' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                          {formatTime(msg.sentAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input placeholder="Escribe un mensaje…" value={draft} onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
                    <Button onClick={handleSend} disabled={!draft.trim()}><Send className="h-4 w-4" /></Button>
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">Plantillas y automatizaciones disponibles en configuración.</p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-muted-foreground">
                Selecciona una conversación
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

function ConversationItem({ conv, active, onClick }: { conv: Conversation; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={cn('flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/30', active && 'bg-primary/5')}>
      <Avatar name={conv.patientName} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{conv.patientName}</p>
          <span className="shrink-0 text-[10px] text-muted-foreground">{formatTime(conv.lastMessageAt)}</span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={cn('text-[10px] font-medium', CHANNEL_META[conv.channel].color)}>{CHANNEL_META[conv.channel].label}</span>
          {conv.unreadCount > 0 && (
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{conv.unreadCount}</span>
          )}
        </div>
      </div>
    </button>
  )
}
