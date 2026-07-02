import { useEffect, useRef, useState } from 'react'
import {
  Bot,
  Calculator,
  HeartPulse,
  MessageSquareQuote,
  Plus,
  Send,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { Button, Card, Textarea } from '@/components/ui'
import { cn } from '@/utils/cn'
import { formatTime } from '@/utils/format'
import { PROMPT_SUGGESTIONS } from '../data/mockAssistant'
import { useAssistantStore } from '../store/assistantStore'
import { PROMPT_CATEGORIES, type PromptSuggestion } from '../types'

const CATEGORY_ICONS: Record<PromptSuggestion['category'], typeof Sparkles> = {
  clinical: HeartPulse,
  calculation: Calculator,
  communication: MessageSquareQuote,
  risk: TriangleAlert,
}

function renderMarkdownLite(text: string) {
  return text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    if (line.startsWith('|')) {
      return (
        <span key={i} className="block font-mono text-xs text-muted-foreground">
          {line}
        </span>
      )
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="ml-4 list-disc text-sm" dangerouslySetInnerHTML={{ __html: bold.slice(2) }} />
      )
    }
    if (line.match(/^\d+\./)) {
      return (
        <li key={i} className="ml-4 list-decimal text-sm" dangerouslySetInnerHTML={{ __html: bold.replace(/^\d+\.\s*/, '') }} />
      )
    }
    return (
      <p
        key={i}
        className={cn('text-sm leading-relaxed', line === '' && 'h-2')}
        dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }}
      />
    )
  })
}

export function AssistantPage() {
  const threads = useAssistantStore((s) => s.threads)
  const messages = useAssistantStore((s) => s.messages)
  const activeThreadId = useAssistantStore((s) => s.activeThreadId)
  const isTyping = useAssistantStore((s) => s.isTyping)
  const setActiveThread = useAssistantStore((s) => s.setActiveThread)
  const createThread = useAssistantStore((s) => s.createThread)
  const sendMessage = useAssistantStore((s) => s.sendMessage)

  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const thread = activeThreadId ? (messages[activeThreadId] ?? []) : []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread, isTyping])

  const handleSend = async (text?: string) => {
    const content = (text ?? draft).trim()
    if (!content || isTyping) return
    setDraft('')
    await sendMessage(content)
  }

  const showWelcome = thread.length === 0 && !isTyping

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <PageHeader
        title="Asistente IA"
        description="Copiloto clínico para resúmenes, cálculos, diagnósticos y planes nutricionales."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Asistente IA' }]}
        actions={
          <Button size="sm" onClick={() => createThread()}>
            <Plus className="h-4 w-4" />
            Nueva conversación
          </Button>
        }
      />

      <div className="flex min-h-0 flex-1 gap-4">
        {/* Thread sidebar */}
        <Card className="hidden w-64 shrink-0 flex-col overflow-hidden md:flex">
          <div className="border-b border-border p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Historial</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {threads.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveThread(t.id)}
                className={cn(
                  'mb-1 w-full rounded-lg px-3 py-2 text-left transition-colors',
                  activeThreadId === t.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted/60',
                )}
              >
                <p className="truncate text-sm font-medium">{t.title}</p>
                <p className="truncate text-xs text-muted-foreground">{t.preview}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat area */}
        <Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {showWelcome ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-2xl pt-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">¿En qué puedo ayudarte hoy?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selecciona un prompt rápido o escribe tu consulta clínica.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {PROMPT_SUGGESTIONS.map((ps) => {
                    const Icon = CATEGORY_ICONS[ps.category]
                    return (
                      <button
                        key={ps.id}
                        type="button"
                        onClick={() => handleSend(ps.prompt)}
                        className="rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {PROMPT_CATEGORIES[ps.category]}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{ps.label}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{ps.prompt}</p>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-4">
                {thread.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-3',
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border bg-muted/30',
                      )}
                    >
                      {msg.role === 'user' ? (
                        <p className="text-sm">{msg.content}</p>
                      ) : (
                        <div className="space-y-1">{renderMarkdownLite(msg.content)}</div>
                      )}
                      <p className={cn('mt-2 text-[10px] opacity-60', msg.role === 'user' && 'text-right')}>
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:0ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-border p-4">
            <div className="mx-auto flex max-w-3xl gap-2">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Escribe tu consulta clínica… (Enter para enviar, Shift+Enter nueva línea)"
                rows={2}
                className="min-h-[52px] resize-none"
              />
              <Button
                size="icon"
                className="h-[52px] w-[52px] shrink-0"
                disabled={!draft.trim() || isTyping}
                onClick={() => handleSend()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-muted-foreground">
              IA de demostración — las respuestas no sustituyen criterio clínico profesional.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
