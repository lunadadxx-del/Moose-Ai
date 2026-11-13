'use client';

import React from 'react';
import { DEFAULT_USER } from '@/lib/constants';
import { Settings } from 'lucide-react';

interface UserProfileProps {
  collapsed?: boolean;
  onOpenSettings?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  collapsed = false,
  onOpenSettings,
}) => {
  return (
    <div className="pt-2 border-t border-[#E5E7EB]">
      <button
        onClick={onOpenSettings}
        className={`w-full flex items-center ${
          collapsed ? 'justify-center px-1' : 'justify-between px-2.5'
        } py-2 rounded-xl text-left hover:bg-slate-200/50 transition-colors group cursor-pointer`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar with subtle status */}
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center font-semibold text-xs shadow-2xs">
              {DEFAULT_USER.name.charAt(0)}
            </div>
            <span
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#F8FAFC]"
              title="Online"
            />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[#111827] truncate leading-tight">
                {DEFAULT_USER.name}
              </div>
              <div className="text-[11px] text-[#64748B] truncate mt-0.5">
                {DEFAULT_USER.role}
              </div>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="text-[#64748B] group-hover:text-[#111827] transition-colors">
            <Settings className="w-4 h-4" />
          </div>
        )}
      </button>
    </div>
  );
};
