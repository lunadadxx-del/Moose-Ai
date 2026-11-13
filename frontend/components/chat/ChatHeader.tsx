'use client';

import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
import {
  Menu,
  ChevronDown,
  Sparkles,
  Share2,
  RotateCcw,
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
    <header className="h-14 px-4 flex items-center justify-between border-b border-slate-800/80 bg-[#0F121A]/80 backdrop-blur-md sticky top-0 z-30 select-none">
      {/* Left: Sidebar Toggle & Model Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1C2130] transition-colors md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Model Selector Pill / Badge */}
        <div className="relative group">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#171B26] hover:bg-[#1E2333] border border-slate-800 hover:border-slate-700 text-xs text-slate-200 font-medium transition-all shadow-sm cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold text-slate-100">MOOSE AI</span>
            <span className="text-slate-400 font-normal hidden sm:inline">
              {APP_CONFIG.modelName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Demo Mode Toggle */}
        <button
          onClick={onToggleDemo}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all border ${
            isDemoActive
              ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
              : 'bg-[#171B26] text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
          }`}
          title="Toggle sample conversation"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">
            {isDemoActive ? 'Viewing Sample Chat' : 'Preview Sample Chat'}
          </span>
          <span className="sm:hidden">Sample</span>
        </button>

        {/* Share Button (Placeholder) */}
        <button
          onClick={() => alert('Share link generation will be connected in Phase 2!')}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#1C2130] transition-colors"
          title="Share conversation"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#1C2130] transition-colors"
          title="Model Parameters & Settings"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
