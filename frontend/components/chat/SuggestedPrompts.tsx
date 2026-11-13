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
        return <Lightbulb className="w-5 h-5 text-amber-500" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-[#1646D8]" />;
      case 'file-text':
        return <FileText className="w-5 h-5 text-indigo-500" />;
      case 'compass':
        return <Compass className="w-5 h-5 text-emerald-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-[#1646D8]" />;
    }
  };

  return (
    <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 px-4">
      {SUGGESTED_PROMPTS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectPrompt(item.prompt)}
          className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-blue-300 text-left transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            <div className="p-2 rounded-xl bg-slate-100/80 border border-slate-200/60 group-hover:bg-white group-hover:border-blue-200 transition-colors">
              {getIcon(item.icon)}
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1646D8] transition-colors opacity-0 group-hover:opacity-100" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#1646D8] transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
