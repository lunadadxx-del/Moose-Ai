'use client';

import React from 'react';
import { DEFAULT_USER } from '@/lib/constants';
import { MoreHorizontal } from 'lucide-react';

interface UserProfileProps {
  collapsed?: boolean;
  onOpenSettings?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  collapsed = false,
  onOpenSettings,
}) => {
  return (
    <div className="pt-2 border-t border-slate-200">
      <button
        onClick={onOpenSettings}
        className={`w-full flex items-center ${
          collapsed ? 'justify-center px-1' : 'justify-between px-2.5'
        } py-2 rounded-xl text-left hover:bg-slate-100 transition-colors group cursor-pointer`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar with status indicator */}
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1646D8] to-[#16A5F5] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              {DEFAULT_USER.name.charAt(0)}
            </div>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
              title="Online"
            />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[#0F172A] truncate">
                {DEFAULT_USER.name}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {DEFAULT_USER.role}
              </div>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </div>
        )}
      </button>
    </div>
  );
};
