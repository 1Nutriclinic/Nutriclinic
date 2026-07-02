export type MessageChannel = 'whatsapp' | 'email' | 'internal'
export type MessageDirection = 'inbound' | 'outbound'
export type ConversationStatus = 'open' | 'pending' | 'resolved'

export interface Message {
  id: string
  conversationId: string
  channel: MessageChannel
  direction: MessageDirection
  content: string
  sentAt: string
  read: boolean
}

export interface Conversation {
  id: string
  patientId: string
  patientName: string
  phone?: string
  email?: string
  channel: MessageChannel
  status: ConversationStatus
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  assignedTo: string
}

export const CHANNEL_META: Record<MessageChannel, { label: string; color: string }> = {
  whatsapp: { label: 'WhatsApp', color: 'text-success' },
  email: { label: 'Email', color: 'text-primary' },
  internal: { label: 'Interno', color: 'text-muted-foreground' },
}
