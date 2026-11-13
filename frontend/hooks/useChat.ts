'use client';

import { useState } from 'react';
import { ChatMessage, ChatSession } from '@/types/chat';
import { DEMO_MESSAGES, STATIC_CHAT_HISTORY } from '@/lib/constants';
import { formatTimestamp } from '@/lib/utils';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('chat-1');
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);

  // Send message from user
  const sendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      createdAt: formatTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
  };

  // Reset to new clean chat (shows Welcome Screen)
  const resetChat = () => {
    setMessages([]);
    setIsDemoActive(false);
  };

  // Toggle or load the demo messages (for layout verification)
  const toggleDemo = () => {
    if (isDemoActive) {
      resetChat();
    } else {
      setMessages(DEMO_MESSAGES);
      setIsDemoActive(true);
    }
  };

  const selectChat = (session: ChatSession) => {
    setActiveSessionId(session.id);
    if (session.id === 'chat-1') {
      setMessages(DEMO_MESSAGES);
      setIsDemoActive(true);
    } else {
      // In Phase 1, other past chats demonstrate initial placeholder selection
      setMessages([
        {
          id: `msg-${session.id}`,
          role: 'user',
          content: `Historical conversation: ${session.title}`,
          createdAt: session.timestamp,
        },
        {
          id: `msg-${session.id}-reply`,
          role: 'assistant',
          content: `This is a preserved chat transcript for **${session.title}**. In Phase 2, this will be retrieved dynamically from our PostgreSQL / Vector DB backend.`,
          createdAt: session.timestamp,
        },
      ]);
      setIsDemoActive(true);
    }
  };

  return {
    messages,
    activeSessionId,
    isDemoActive,
    sendMessage,
    resetChat,
    toggleDemo,
    selectChat,
  };
}
