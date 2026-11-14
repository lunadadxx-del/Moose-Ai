'use client';

import { useState } from 'react';
import { ChatMessage, ChatSession } from '@/types/chat';
import { DEMO_MESSAGES } from '@/lib/constants';
import { formatTimestamp } from '@/lib/utils';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('chat-1');
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Send message to local backend bridge -> Kaggle GPU
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsgId = `msg-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content,
      createdAt: formatTimestamp(),
    };

    const assistantMsgId = `msg-assistant-${Date.now() + 1}`;
    const placeholderAssistant: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: 'Thinking...',
      createdAt: formatTimestamp(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages([...updatedMessages, placeholderAssistant]);
    setIsLoading(true);

    try {
      const historyPayload = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: historyPayload,
          max_new_tokens: 350,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, content: data.reply || 'No response generated.' }
            : msg
        )
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: `⚠️ **GPU Bridge Notice**: ${err.message}`,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to new clean chat (shows Welcome Screen)
  const resetChat = () => {
    setMessages([]);
    setIsDemoActive(false);
  };

  // Toggle or load demo messages
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
          content: `This is a preserved chat transcript for **${session.title}**.`,
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
    isLoading,
    sendMessage,
    resetChat,
    toggleDemo,
    selectChat,
  };
}
