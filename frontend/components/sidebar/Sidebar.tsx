'use client';

import React from 'react';
import { MooseLogo } from '../ui/MooseLogo';
import { ChatHistoryList } from './ChatHistoryList';
import { UserProfile } from './UserProfile';
import { ChatSession } from '@/types/chat';
import {
  Plus,
  PanelLeftClose,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedChatId?: string;
  onSelectChat?: (session: ChatSession) => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  selectedChatId,
  onSelectChat,
  onNewChat,
  onOpenSettings,
  isMobile = false,
}) => {
  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isMobile && isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col h-full bg-[#F8FAFC] border-r border-[#E5E7EB] transition-all duration-200 select-none overflow-hidden ${
          isMobile
            ? isOpen
              ? 'w-72 translate-x-0 shadow-2xl'
              : 'w-72 -translate-x-full'
            : isOpen
            ? 'w-64 min-w-[16rem]'
            : 'w-0 min-w-0 border-r-0'
        }`}
      >
        {/* Top-Left Official MOOSE AI Branding & Collapse Button */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#E5E7EB] bg-[#F8FAFC] shrink-0">
          <MooseLogo size="sm" showText={true} />

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3 shrink-0">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#111827] font-medium text-xs border border-[#E5E7EB] hover:border-slate-300 shadow-2xs transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#2563EB] group-hover:rotate-90 transition-transform duration-200" />
              <span>New chat</span>
            </div>
            <kbd className="text-[10px] bg-slate-100 text-[#64748B] px-1.5 py-0.5 rounded border border-[#E5E7EB] font-mono">
              ⌘N
            </kbd>
          </button>
        </div>

        {/* Chat History List */}
        <ChatHistoryList
          selectedId={selectedChatId}
          onSelectChat={onSelectChat}
        />

        {/* Bottom Section: Major Project Info & User Profile */}
        <div className="p-3 space-y-2 border-t border-[#E5E7EB] bg-[#F8FAFC] shrink-0">
          {/* Subtle Project Info Badge */}
          <div className="p-2.5 rounded-xl bg-white border border-[#E5E7EB] text-[11px] space-y-0.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[#2563EB] font-semibold">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#2563EB]" />
              <span>CS Major Project</span>
            </div>
            <p className="text-[#64748B] text-[10px] leading-relaxed">
              Open-Source LLM Architecture (Phase 1)
            </p>
          </div>

          {/* User Profile */}
          <UserProfile onOpenSettings={onOpenSettings} />
        </div>
      </aside>
    </>
  );
};
