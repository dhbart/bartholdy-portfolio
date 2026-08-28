export type AssistantMessageRole = 'user' | 'assistant';

export interface AssistantMessage {
  id: number;
  role: AssistantMessageRole;
  content: string;
  createdAt: Date;
}

export interface AssistantChatResponse {
  response?: string;
  message?: string;
  content?: string;
}
