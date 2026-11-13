export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  codeBlocks?: {
    language: string;
    code: string;
  }[];
}

export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  category: 'Today' | 'Yesterday' | 'Previous 7 Days';
  active?: boolean;
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  description: string;
  icon: 'lightbulb' | 'code' | 'file-text' | 'compass';
  prompt: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  status: 'Online' | 'Idle' | 'Offline';
}
