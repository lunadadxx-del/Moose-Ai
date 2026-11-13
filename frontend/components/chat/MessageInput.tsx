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

  // Auto-resize textarea height as text grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
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
    alert('File attachment & multimodal ingestion will be enabled in Phase 2 (RAG & FastApi backend).');
  };

  const handleVoiceClick = () => {
    alert('Voice input and audio transcription module will be integrated in Phase 2.');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 select-none bg-white">
      {/* Floating Light-Theme Input Box */}
      <div className="relative rounded-2xl bg-white border border-slate-200 hover:border-slate-300 focus-within:border-[#1646D8] focus-within:ring-3 focus-within:ring-[#1646D8]/15 shadow-sm transition-all duration-200">
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
            className="w-full bg-transparent px-4 pt-3.5 pb-2 text-sm text-[#0F172A] placeholder-slate-400 resize-none outline-none max-h-48 custom-scrollbar leading-relaxed"
          />

          {/* Action Row: Left Icons + Right Send Button */}
          <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
            {/* Left Icons: Attachment + Voice input */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleAttachmentClick}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Attach document or image (Phase 2 RAG)"
                aria-label="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleVoiceClick}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Voice input (Phase 2)"
                aria-label="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Send Button */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {input.length > 0 ? `${input.length} chars` : 'Shift + Enter for new line'}
              </span>

              <button
                type="submit"
                disabled={!input.trim() || disabled}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 ${
                  input.trim() && !disabled
                    ? 'bg-gradient-to-r from-[#1646D8] to-[#16A5F5] text-white shadow-sm shadow-blue-500/25 hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Subtle Bottom Disclaimer */}
      <div className="text-center mt-2.5">
        <p className="text-[11px] text-slate-400 tracking-wide">
          {APP_CONFIG.disclaimer}
        </p>
      </div>
    </div>
  );
};
