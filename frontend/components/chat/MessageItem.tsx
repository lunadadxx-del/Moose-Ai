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

  // Helper function to render formatted text and clean light-theme code blocks
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
        const code = language ? lines.slice(1).join('\n') : lines.join('\n');

        return <CodeBlock key={index} code={code} language={language || 'text'} />;
      }

      // Render regular paragraphs, bolding, and numbered items
      return (
        <div key={index} className="space-y-2 leading-relaxed text-[#111827]">
          {part
            .trim()
            .split('\n\n')
            .map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={pIdx} className="text-sm font-bold text-[#111827] mt-3 mb-1">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return (
                  <div key={pIdx} className="text-sm text-[#374151] pl-2">
                    {paragraph}
                  </div>
                );
              }
              return (
                <p key={pIdx} className="text-sm text-[#111827] whitespace-pre-wrap">
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
        isAssistant ? 'bg-[#F8FAFC]/60 border-y border-[#E5E7EB]/50' : 'bg-white'
      }`}
    >
      <div className="max-w-3xl mx-auto flex items-start gap-3.5">
        {/* Avatar */}
        <div className="shrink-0 pt-0.5">
          <Avatar role={isAssistant ? 'assistant' : 'user'} size="sm" />
        </div>

        {/* Message Content Container */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Header info */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#111827]">
              {isAssistant ? 'MOOSE AI' : 'You'}
            </span>
            {isAssistant && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-[#2563EB] border border-blue-100">
                Moose-7B
              </span>
            )}
            <span className="text-[11px] text-[#64748B]">{message.createdAt}</span>
          </div>

          {/* Body */}
          <div className="text-sm text-[#111827] break-words leading-relaxed space-y-2.5">
            {renderFormattedContent(message.content)}
          </div>

          {/* Action Bar for Assistant Message */}
          {isAssistant && (
            <div className="pt-2 flex items-center gap-1.5 select-none">
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#111827] px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Copied</span>
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
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  liked === true
                    ? 'text-[#2563EB] bg-blue-50'
                    : 'text-[#64748B] hover:text-[#111827] hover:bg-slate-100'
                }`}
                title="Good response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setLiked(liked === false ? null : false)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  liked === false
                    ? 'text-red-500 bg-red-50'
                    : 'text-[#64748B] hover:text-[#111827] hover:bg-slate-100'
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

// Clean Light-Theme CodeBlock component
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
    <div className="my-3 rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F9FAFB] shadow-2xs">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#F3F4F6] border-b border-[#E5E7EB] text-xs text-[#4B5563] select-none">
        <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#4B5563]">
          {language}
        </span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#111827] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 text-[11px] font-medium">Copied!</span>
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
      <pre className="p-3.5 overflow-x-auto text-xs font-mono text-[#111827] leading-relaxed bg-[#F9FAFB] custom-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};
