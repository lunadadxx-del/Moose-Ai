'use client';

import React from 'react';
import { STATIC_CHAT_HISTORY } from '@/lib/constants';
import { ChatSession } from '@/types/chat';
import { MessageSquare, Trash2 } from 'lucide-react';

interface ChatHistoryListProps {
  collapsed?: boolean;
  selectedId?: string;
  onSelectChat?: (session: ChatSession) => void;
}

export const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  collapsed = false,
  selectedId,
  onSelectChat,
}) => {
  const categories: Array<'Today' | 'Yesterday' | 'Previous 7 Days'> = [
    'Today',
    'Yesterday',
    'Previous 7 Days',
  ];

  if (collapsed) {
    return (
      <div className="flex-1 overflow-y-auto py-2 space-y-2 flex flex-col items-center custom-scrollbar">
        {STATIC_CHAT_HISTORY.slice(0, 5).map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat?.(chat)}
            title={chat.title}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              selectedId === chat.id
                ? 'bg-blue-50 text-[#1646D8] border border-blue-200'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4 custom-scrollbar">
      {categories.map((category) => {
        const chats = STATIC_CHAT_HISTORY.filter(
          (c) => c.category === category
        );
        if (chats.length === 0) return null;

        return (
          <div key={category} className="space-y-1">
            <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {category}
            </div>
            <div className="space-y-0.5">
              {chats.map((chat) => {
                const isActive = selectedId === chat.id;
                return (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat?.(chat)}
                    className={`w-full group flex items-center gap-2 px-2.5 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#1646D8] font-semibold border border-blue-200/80 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <MessageSquare
                      className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#1646D8]'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate flex-1">{chat.title}</span>

                    {/* Subtle action icons on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1 hover:text-red-500 rounded text-slate-400 transition-colors"
                        title="Delete chat placeholder"
                      >
                        <Trash2 className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
