'use client';

import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
import {
  Menu,
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
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen,
  onResetChat,
  isDemoActive,
  onToggleDemo,
  onOpenSettings,
}) => {
  return (
    <header className="h-14 px-4 flex items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 select-none">
      {/* Left: Sidebar Toggle & Model Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors md:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Model Selector Pill / Badge */}
        <div className="relative group">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-xs text-slate-800 font-medium transition-all shadow-2xs cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-[#16A5F5] animate-pulse" />
            <span className="font-bold text-[#0F172A]">MOOSE AI</span>
            <span className="text-slate-500 font-normal hidden sm:inline">
              {APP_CONFIG.modelName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Demo Mode Toggle */}
        <button
          onClick={onToggleDemo}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
            isDemoActive
              ? 'bg-blue-50 text-[#1646D8] border-blue-200 shadow-2xs'
              : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
          }`}
          title="Toggle sample conversation"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1646D8]" />
          <span className="hidden sm:inline">
            {isDemoActive ? 'Viewing Sample Chat' : 'Preview Sample Chat'}
          </span>
          <span className="sm:hidden">Sample</span>
        </button>

        {/* Share Button (Placeholder) */}
        <button
          onClick={() => alert('Share link generation will be connected in Phase 2!')}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Share conversation"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Model Parameters & Settings"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
