export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'm-4.0',
    description: 'Pour les tâches quotidiennes, plus rapide.',
  },
  {
    id: 'chat-model-reasoning',
    name: 'm-4.7o',
    description: 'Uses advanced reasoning',
  },
];
