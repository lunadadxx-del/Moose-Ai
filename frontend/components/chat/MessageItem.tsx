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

  // Helper function to render text containing code blocks in a clean light theme
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
        <div key={index} className="space-y-2 leading-relaxed text-[#0F172A]">
          {part
            .trim()
            .split('\n\n')
            .map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={pIdx} className="text-sm font-bold text-[#0F172A] mt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return (
                  <div key={pIdx} className="text-sm text-slate-700 pl-2">
                    {paragraph}
                  </div>
                );
              }
              return (
                <p key={pIdx} className="text-sm text-[#0F172A] whitespace-pre-wrap">
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
        isAssistant ? 'bg-[#F8FAFC]/70 border-y border-slate-100' : 'bg-white'
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
            <span className="text-xs font-bold text-[#0F172A]">
              {isAssistant ? 'MOOSE AI' : 'You'}
            </span>
            {isAssistant && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#1646D8] border border-blue-200">
                Moose-7B
              </span>
            )}
            <span className="text-[11px] text-slate-400">{message.createdAt}</span>
          </div>

          {/* Body */}
          <div className="text-sm text-[#0F172A] break-words leading-relaxed space-y-3">
            {renderFormattedContent(message.content)}
          </div>

          {/* Action Bar for Assistant Message */}
          {isAssistant && (
            <div className="pt-2 flex items-center gap-2 select-none">
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
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
                    ? 'text-[#1646D8] bg-blue-50 border border-blue-200'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
                title="Good response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setLiked(liked === false ? null : false)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  liked === false
                    ? 'text-red-500 bg-red-50 border border-red-200'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
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

// Clean, high-readability Light-Theme CodeBlock component
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
    <div className="my-3 rounded-xl overflow-hidden border border-slate-200 bg-[#F8FAFC] shadow-xs">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#F1F5F9] border-b border-slate-200 text-xs text-slate-600 select-none">
        <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-slate-700">
          {language}
        </span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
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

      {/* Code Area: Light grey background with dark navy text and clean spacing */}
      <pre className="p-3.5 overflow-x-auto text-xs font-mono text-[#0F172A] leading-relaxed bg-[#F8FAFC] custom-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};
