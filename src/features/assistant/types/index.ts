export type AssistantRole = 'user' | 'assistant' | 'system'

export interface AssistantMessage {
  id: string
  threadId: string
  role: AssistantRole
  content: string
  createdAt: string
  pending?: boolean
}

export interface AssistantThread {
  id: string
  title: string
  patientName?: string
  updatedAt: string
  preview: string
}

export interface PromptSuggestion {
  id: string
  label: string
  prompt: string
  category: 'clinical' | 'calculation' | 'communication' | 'risk'
}

export const PROMPT_CATEGORIES: Record<PromptSuggestion['category'], string> = {
  clinical: 'Clínico',
  calculation: 'Cálculos',
  communication: 'Comunicación',
  risk: 'Riesgos',
}
