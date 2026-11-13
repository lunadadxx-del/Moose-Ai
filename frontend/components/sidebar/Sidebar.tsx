'use client';

import React from 'react';
import { MooseLogo } from '../ui/MooseLogo';
import { ChatHistoryList } from './ChatHistoryList';
import { UserProfile } from './UserProfile';
import { ChatSession } from '@/types/chat';
import {
  Plus,
  PanelLeftClose,
  PanelLeft,
  Settings,
  Sparkles,
  ExternalLink,
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col h-full bg-[#0D1017] border-r border-slate-800/80 transition-all duration-200 select-none ${
          isOpen ? 'w-64' : 'w-16'
        } ${
          isMobile
            ? isOpen
              ? 'translate-x-0 shadow-2xl'
              : '-translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* Top Header / Branding & Collapse Button */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <MooseLogo
              size="sm"
              showText={isOpen}
              useAvatar={false}
              className="cursor-pointer"
            />
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1C2130] transition-colors"
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3 shrink-0">
          <button
            onClick={onNewChat}
            className={`w-full flex items-center ${
              isOpen ? 'justify-between px-3.5 py-2.5' : 'justify-center p-2.5'
            } rounded-xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 hover:from-sky-500/20 hover:via-indigo-500/20 hover:to-purple-500/20 text-sky-300 hover:text-white border border-sky-500/25 hover:border-sky-400/40 transition-all duration-150 group shadow-sm shadow-sky-950/20 cursor-pointer`}
          >
            <div className="flex items-center gap-2 font-medium text-xs">
              <Plus className="w-4 h-4 text-sky-400 group-hover:rotate-90 transition-transform duration-200" />
              {isOpen && <span>New Chat</span>}
            </div>
            {isOpen && (
              <kbd className="text-[10px] bg-[#141824] text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/60 font-mono">
                ⌘N
              </kbd>
            )}
          </button>
        </div>

        {/* Chat History List */}
        <ChatHistoryList
          collapsed={!isOpen}
          selectedId={selectedChatId}
          onSelectChat={onSelectChat}
        />

        {/* Bottom Section: Model Info, Settings, Profile */}
        <div className="p-3 space-y-2 border-t border-slate-800/80 bg-[#0B0E14] shrink-0">
          {/* Major Project Info Card when expanded */}
          {isOpen && (
            <div className="p-2.5 rounded-xl bg-[#141824] border border-slate-800/80 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-sky-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>CS Major Project 2026</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Phase 1: Architecture & Frontend Foundation
              </p>
            </div>
          )}

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className={`w-full flex items-center ${
              isOpen ? 'justify-start gap-2.5 px-2.5' : 'justify-center p-2'
            } py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-[#1C202E] transition-colors cursor-pointer`}
            title="Settings"
          >
            <Settings className="w-4 h-4 shrink-0" />
            {isOpen && <span>Settings</span>}
          </button>

          {/* User Profile */}
          <UserProfile collapsed={!isOpen} onOpenSettings={onOpenSettings} />
        </div>
      </aside>
    </>
  );
};
