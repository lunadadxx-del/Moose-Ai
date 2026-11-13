'use client';

import React from 'react';
import { DEFAULT_USER } from '@/lib/constants';
import { Settings, MoreHorizontal } from 'lucide-react';

interface UserProfileProps {
  collapsed?: boolean;
  onOpenSettings?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  collapsed = false,
  onOpenSettings,
}) => {
  return (
    <div className="pt-2 border-t border-slate-800/80">
      <button
        onClick={onOpenSettings}
        className={`w-full flex items-center ${
          collapsed ? 'justify-center px-1' : 'justify-between px-2.5'
        } py-2 rounded-xl text-left hover:bg-[#1C202E] transition-colors group cursor-pointer`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar with status indicator */}
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-semibold text-xs shadow-inner">
              {DEFAULT_USER.name.charAt(0)}
            </div>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0F121A]"
              title="Online"
            />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-slate-200 truncate group-hover:text-white">
                {DEFAULT_USER.name}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {DEFAULT_USER.role}
              </div>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="text-slate-500 group-hover:text-slate-300 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </div>
        )}
      </button>
    </div>
  );
};
