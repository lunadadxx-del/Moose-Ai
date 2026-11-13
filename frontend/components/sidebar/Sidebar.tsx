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
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col h-full bg-[#F8FAFC] border-r border-slate-200 transition-all duration-200 select-none ${
          isOpen ? 'w-64' : 'w-16'
        } ${
          isMobile
            ? isOpen
              ? 'translate-x-0 shadow-2xl'
              : '-translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* Top Header / Official MOOSE AI Branding & Collapse Button */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-slate-200 bg-[#F8FAFC] shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <MooseLogo
              size="sm"
              showText={isOpen}
              className="cursor-pointer"
            />
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
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
            } rounded-xl bg-white hover:bg-blue-50/60 text-[#1646D8] font-semibold border border-blue-200/80 hover:border-blue-300 shadow-xs transition-all duration-150 group cursor-pointer`}
          >
            <div className="flex items-center gap-2 text-xs">
              <Plus className="w-4 h-4 text-[#1646D8] group-hover:rotate-90 transition-transform duration-200" />
              {isOpen && <span>New Chat</span>}
            </div>
            {isOpen && (
              <kbd className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
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
        <div className="p-3 space-y-2 border-t border-slate-200 bg-[#F8FAFC] shrink-0">
          {/* Major Project Info Card when expanded */}
          {isOpen && (
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#1646D8] font-semibold">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#16A5F5]" />
                <span>CS Major Project 2026</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Phase 1: Architecture & Frontend Foundation
              </p>
            </div>
          )}

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className={`w-full flex items-center ${
              isOpen ? 'justify-start gap-2.5 px-2.5' : 'justify-center p-2'
            } py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer`}
            title="Settings"
          >
            <Settings className="w-4 h-4 shrink-0 text-slate-500" />
            {isOpen && <span className="font-medium">Settings</span>}
          </button>

          {/* User Profile */}
          <UserProfile collapsed={!isOpen} onOpenSettings={onOpenSettings} />
        </div>
      </aside>
    </>
  );
};
