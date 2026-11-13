'use client';

import React from 'react';
import { SUGGESTED_PROMPTS } from '@/lib/constants';
import { SuggestedPrompt } from '@/types/chat';
import { Lightbulb, Code2, FileText, Compass, ArrowUpRight } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  onSelectPrompt,
}) => {
  const getIcon = (type: SuggestedPrompt['icon']) => {
    switch (type) {
      case 'lightbulb':
        return <Lightbulb className="w-4 h-4 text-[#2563EB]" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-[#2563EB]" />;
      case 'file-text':
        return <FileText className="w-4 h-4 text-[#2563EB]" />;
      case 'compass':
        return <Compass className="w-4 h-4 text-[#2563EB]" />;
      default:
        return <Lightbulb className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
      {SUGGESTED_PROMPTS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectPrompt(item.prompt)}
          className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white hover:bg-slate-50/70 border border-[#E5E7EB] hover:border-blue-200 transition-all duration-150 shadow-2xs hover:shadow-xs cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            <div className="p-2 rounded-xl bg-blue-50/70 text-[#2563EB] group-hover:bg-blue-100/60 transition-colors">
              {getIcon(item.icon)}
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors opacity-0 group-hover:opacity-100" />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">
              {item.title}
            </h3>
            <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
