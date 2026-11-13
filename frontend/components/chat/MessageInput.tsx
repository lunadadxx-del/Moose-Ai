'use client';

import React, { useState, useRef, useEffect } from 'react';
import { APP_CONFIG } from '@/lib/constants';
import { Paperclip, Mic, ArrowUp } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Message Moose AI...',
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || disabled) return;

    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleAttachmentClick = () => {
    alert('File attachment will be enabled in Phase 2 with our FastAPI inference backend.');
  };

  const handleVoiceClick = () => {
    alert('Voice input will be integrated in Phase 2.');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-1 select-none bg-white">
      {/* Centered Input Box */}
      <div className="relative rounded-2xl bg-white border border-[#E5E7EB] hover:border-slate-300 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100 shadow-2xs transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent px-4 pt-3.5 pb-2 text-sm text-[#111827] placeholder:text-[#94A3B8] resize-none outline-none max-h-44 custom-scrollbar leading-relaxed"
          />

          {/* Action Row: Left Controls & Right Send Button */}
          <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
            {/* Left Controls: Attachment & Mic */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleAttachmentClick}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
                title="Attach file (Phase 2)"
                aria-label="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleVoiceClick}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
                title="Voice input (Phase 2)"
                aria-label="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Helper counter & Send Button */}
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={!input.trim() || disabled}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#2563EB] text-white hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Clean Disclaimer */}
      <div className="text-center mt-2">
        <p className="text-xs text-[#64748B] tracking-normal">
          {APP_CONFIG.disclaimer}
        </p>
      </div>
    </div>
  );
};
