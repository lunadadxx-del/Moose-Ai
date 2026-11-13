'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/types/chat';
import { Avatar } from '../ui/Avatar';
import { copyToClipboard } from '@/lib/utils';
import {
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface MessageItemProps {
  message: ChatMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleCopyMessage = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper function to render text containing code blocks nicely
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
        const code = language ? lines.slice(1).join('\n') : lines.join('\n');

        return <CodeBlock key={index} code={code} language={language || 'text'} />;
      }

      // Render regular paragraphs, bolding, and headers
      return (
        <div key={index} className="space-y-2 leading-relaxed">
          {part
            .trim()
            .split('\n\n')
            .map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={pIdx} className="text-sm font-semibold text-slate-200 mt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return (
                  <div key={pIdx} className="text-sm text-slate-300 pl-2">
                    {paragraph}
                  </div>
                );
              }
              return (
                <p key={pIdx} className="text-sm text-slate-200 whitespace-pre-wrap">
                  {paragraph}
                </p>
              );
            })}
        </div>
      );
    });
  };

  return (
    <div
      className={`w-full py-4 px-4 sm:px-6 transition-colors ${
        isAssistant ? 'bg-[#10131C]/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-3xl mx-auto flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0 pt-0.5">
          <Avatar role={isAssistant ? 'assistant' : 'user'} size="md" />
        </div>

        {/* Message Content Container */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header info */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">
              {isAssistant ? 'MOOSE AI' : 'You'}
            </span>
            {isAssistant && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Moose-7B
              </span>
            )}
            <span className="text-[11px] text-slate-400">{message.createdAt}</span>
          </div>

          {/* Body */}
          <div className="text-sm text-slate-200 break-words leading-relaxed space-y-3">
            {renderFormattedContent(message.content)}
          </div>

          {/* Action Bar for Assistant Message */}
          {isAssistant && (
            <div className="pt-2 flex items-center gap-2 select-none">
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg hover:bg-[#1A1F2D] transition-colors"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setLiked(liked === true ? null : true)}
                className={`p-1.5 rounded-lg transition-colors ${
                  liked === true
                    ? 'text-sky-400 bg-sky-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1F2D]'
                }`}
                title="Good response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setLiked(liked === false ? null : false)}
                className={`p-1.5 rounded-lg transition-colors ${
                  liked === false
                    ? 'text-red-400 bg-red-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1F2D]'
                }`}
                title="Bad response"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable CodeBlock component with copy functionality
const CodeBlock: React.FC<{ code: string; language: string }> = ({
  code,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-slate-700/80 bg-[#0B0E14] shadow-md">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#141822] border-b border-slate-800 text-xs text-slate-400 select-none">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
          {language}
        </span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-3.5 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed bg-[#0B0E14]">
        <code>{code}</code>
      </pre>
    </div>
  );
};
