import { create } from 'zustand'
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../data/mockMessaging'
import type { Conversation, Message } from '../types'

interface MessagingState {
  conversations: Conversation[]
  messages: Record<string, Message[]>
  sendMessage: (conversationId: string, content: string) => void
  markRead: (conversationId: string) => void
}

export const useMessagingStore = create<MessagingState>((set) => ({
  conversations: MOCK_CONVERSATIONS,
  messages: MOCK_MESSAGES,
  sendMessage: (conversationId, content) =>
    set((s) => {
      const msg: Message = {
        id: `m-${Date.now()}`,
        conversationId,
        channel: s.conversations.find((c) => c.id === conversationId)?.channel ?? 'whatsapp',
        direction: 'outbound',
        content,
        sentAt: new Date().toISOString(),
        read: true,
      }
      return {
        messages: { ...s.messages, [conversationId]: [...(s.messages[conversationId] ?? []), msg] },
        conversations: s.conversations.map((c) =>
          c.id === conversationId ? { ...c, lastMessage: content, lastMessageAt: msg.sentAt, unreadCount: 0 } : c,
        ),
      }
    }),
  markRead: (conversationId) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c,
      ),
      messages: {
        ...s.messages,
        [conversationId]: (s.messages[conversationId] ?? []).map((m) => ({ ...m, read: true })),
      },
    })),
}))
