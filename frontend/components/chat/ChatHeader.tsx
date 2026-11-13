'use client';

import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
import { MooseLogo } from '../ui/MooseLogo';
import {
  PanelLeft,
  ChevronDown,
  Sparkles,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onResetChat: () => void;
  isDemoActive: boolean;
  onToggleDemo: () => void;
  onOpenSettings: () => void;
  isMobile?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen,
  onResetChat,
  isDemoActive,
  onToggleDemo,
  onOpenSettings,
  isMobile = false,
}) => {
  return (
    <header className="h-14 px-4 flex items-center justify-between border-b border-[#E5E7EB] bg-white sticky top-0 z-30 select-none">
      {/* Left: Sidebar Toggle Button & Mobile Brand */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button (Desktop & Mobile) */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
          title={isSidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {/* When sidebar is closed on desktop or on mobile, show the logo and brand */}
        {(!isSidebarOpen || isMobile) && (
          <div className="flex items-center pl-1">
            <MooseLogo size="sm" showText={true} />
          </div>
        )}

        {/* Model Selector Pill (when sidebar is open or on desktop) */}
        {isSidebarOpen && !isMobile && (
          <div className="relative">
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E5E7EB] text-xs text-[#111827] font-medium transition-all cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="font-semibold text-[#111827]">Moose AI</span>
              <span className="text-[#64748B] font-normal hidden lg:inline">
                {APP_CONFIG.modelName}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
            </button>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Demo Mode Toggle */}
        <button
          onClick={onToggleDemo}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
            isDemoActive
              ? 'bg-blue-50 text-[#2563EB] border-blue-200'
              : 'bg-white text-[#374151] hover:bg-slate-50 border-[#E5E7EB]'
          }`}
          title="Toggle sample conversation"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="hidden sm:inline">
            {isDemoActive ? 'Viewing Sample Chat' : 'Preview Sample Chat'}
          </span>
          <span className="sm:hidden">Sample</span>
        </button>

        {/* Share Button (Placeholder) */}
        <button
          onClick={() => alert('Share link generation will be connected in Phase 2!')}
          className="p-2 rounded-xl text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
          title="Share conversation"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
          title="Settings & Model Specs"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
