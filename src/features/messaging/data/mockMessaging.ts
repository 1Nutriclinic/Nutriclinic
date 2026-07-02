import type { Conversation, Message } from '../types'

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: 'conv-001', patientId: 'p-001', patientName: 'María López García', phone: '+51 987 654 321', channel: 'whatsapp', status: 'open', lastMessage: '¿Puedo cambiar la cena de hoy por ensalada?', lastMessageAt: '2026-07-02T12:30:00Z', unreadCount: 2, assignedTo: 'Dra. Ana Ruiz' },
  { id: 'conv-002', patientId: 'p-003', patientName: 'Lucía Ramírez Torres', phone: '+51 998 765 432', channel: 'whatsapp', status: 'pending', lastMessage: 'Confirmo cita del jueves a las 10am', lastMessageAt: '2026-07-02T09:15:00Z', unreadCount: 0, assignedTo: 'Dra. Ana Ruiz' },
  { id: 'conv-003', patientId: 'p-002', patientName: 'Carlos Mendoza Vega', email: 'carlos.mendoza@email.com', channel: 'email', status: 'resolved', lastMessage: 'Adjunto resultados de laboratorio', lastMessageAt: '2026-07-01T14:00:00Z', unreadCount: 0, assignedTo: 'Lic. Pedro Soto' },
  { id: 'conv-004', patientId: 'p-006', patientName: 'Andrea Flores Díaz', phone: '+51 956 789 012', channel: 'whatsapp', status: 'open', lastMessage: 'Hola, quisiera agendar evaluación deportiva', lastMessageAt: '2026-07-02T08:00:00Z', unreadCount: 1, assignedTo: 'Dra. Ana Ruiz' },
  { id: 'conv-005', patientId: 'p-005', patientName: 'Rosa Vargas Quispe', email: 'rosa.vargas@email.com', channel: 'email', status: 'open', lastMessage: 'Consulta sobre suplemento de calcio', lastMessageAt: '2026-06-30T11:00:00Z', unreadCount: 1, assignedTo: 'Lic. Pedro Soto' },
]

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv-001': [
    { id: 'm-1', conversationId: 'conv-001', channel: 'whatsapp', direction: 'inbound', content: 'Buenos días doctora, tengo una duda sobre mi plan', sentAt: '2026-07-02T12:00:00Z', read: true },
    { id: 'm-2', conversationId: 'conv-001', channel: 'whatsapp', direction: 'outbound', content: 'Buenos días María, claro. ¿En qué puedo ayudarte?', sentAt: '2026-07-02T12:05:00Z', read: true },
    { id: 'm-3', conversationId: 'conv-001', channel: 'whatsapp', direction: 'inbound', content: '¿Puedo cambiar la cena de hoy por ensalada?', sentAt: '2026-07-02T12:30:00Z', read: false },
  ],
  'conv-002': [
    { id: 'm-4', conversationId: 'conv-002', channel: 'whatsapp', direction: 'outbound', content: 'Hola Lucía, te confirmo tu cita para el jueves 3 de julio a las 10:00 AM.', sentAt: '2026-07-02T08:00:00Z', read: true },
    { id: 'm-5', conversationId: 'conv-002', channel: 'whatsapp', direction: 'inbound', content: 'Confirmo cita del jueves a las 10am', sentAt: '2026-07-02T09:15:00Z', read: true },
  ],
  'conv-004': [
    { id: 'm-6', conversationId: 'conv-004', channel: 'whatsapp', direction: 'inbound', content: 'Hola, quisiera agendar evaluación deportiva', sentAt: '2026-07-02T08:00:00Z', read: false },
  ],
}
