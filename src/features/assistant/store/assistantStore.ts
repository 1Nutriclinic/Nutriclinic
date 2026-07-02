import { create } from 'zustand'
import { MOCK_MESSAGES, MOCK_THREADS, generateMockResponse } from '../data/mockAssistant'
import type { AssistantMessage, AssistantThread } from '../types'

interface AssistantState {
  threads: AssistantThread[]
  messages: Record<string, AssistantMessage[]>
  activeThreadId: string | null
  isTyping: boolean
  setActiveThread: (id: string) => void
  createThread: (title?: string) => string
  sendMessage: (content: string) => Promise<void>
}

function threadTitleFromPrompt(prompt: string): string {
  const trimmed = prompt.trim()
  if (trimmed.length <= 42) return trimmed
  return `${trimmed.slice(0, 42)}…`
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  threads: MOCK_THREADS,
  messages: MOCK_MESSAGES,
  activeThreadId: MOCK_THREADS[0]?.id ?? null,
  isTyping: false,

  setActiveThread: (id) => set({ activeThreadId: id }),

  createThread: (title = 'Nueva conversación') => {
    const id = `t-${Date.now()}`
    const thread: AssistantThread = {
      id,
      title,
      updatedAt: new Date().toISOString(),
      preview: 'Sin mensajes aún',
    }
    set((s) => ({
      threads: [thread, ...s.threads],
      messages: { ...s.messages, [id]: [] },
      activeThreadId: id,
    }))
    return id
  },

  sendMessage: async (content) => {
    const { activeThreadId, createThread } = get()
    let threadId = activeThreadId
    if (!threadId) threadId = createThread(threadTitleFromPrompt(content))

    const userMsg: AssistantMessage = {
      id: `m-${Date.now()}`,
      threadId,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    }

    set((s) => ({
      messages: {
        ...s.messages,
        [threadId!]: [...(s.messages[threadId!] ?? []), userMsg],
      },
      threads: s.threads.map((t) =>
        t.id === threadId
          ? { ...t, title: t.title === 'Nueva conversación' ? threadTitleFromPrompt(content) : t.title, preview: content, updatedAt: userMsg.createdAt }
          : t,
      ),
      isTyping: true,
    }))

    await new Promise((r) => setTimeout(r, 900 + Math.random() * 800))

    const assistantMsg: AssistantMessage = {
      id: `m-${Date.now()}-ai`,
      threadId: threadId!,
      role: 'assistant',
      content: generateMockResponse(content),
      createdAt: new Date().toISOString(),
    }

    set((s) => ({
      messages: {
        ...s.messages,
        [threadId!]: [...(s.messages[threadId!] ?? []), assistantMsg],
      },
      threads: s.threads.map((t) =>
        t.id === threadId
          ? { ...t, preview: assistantMsg.content.slice(0, 60), updatedAt: assistantMsg.createdAt }
          : t,
      ),
      isTyping: false,
    }))
  },
}))
