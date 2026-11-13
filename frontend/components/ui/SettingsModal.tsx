'use client';

import React from 'react';
import { X, Cpu, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E5E7EB] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#2563EB]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Moose AI Settings
              </h2>
              <p className="text-[11px] text-[#64748B]">
                Configuration & System Status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar text-xs">
          {/* Section 1: Model Information */}
          <div className="space-y-1.5">
            <span className="font-semibold text-[#64748B] uppercase tracking-wider text-[10px]">
              Model Specification
            </span>
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#64748B]">Target Architecture</span>
                <span className="text-[#2563EB] font-mono font-semibold">
                  Qwen 2.5 / LLaMA 3 (7B)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B]">Backend Framework</span>
                <span className="text-[#111827] font-mono">
                  Python + FastAPI (Phase 2)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B]">Fine-Tuning Method</span>
                <span className="text-[#111827] font-mono">LoRA / PEFT (4-bit QLoRA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B]">Database & RAG</span>
                <span className="text-[#111827] font-mono">
                  PostgreSQL + pgvector
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Appearance & Preferences */}
          <div className="space-y-1.5">
            <span className="font-semibold text-[#64748B] uppercase tracking-wider text-[10px]">
              UI Appearance
            </span>
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex justify-between items-center">
              <div>
                <div className="text-[#111827] font-medium">Clean White Theme</div>
                <div className="text-[#64748B] text-[11px]">
                  Minimalist light interface with blue accents
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 font-semibold text-[10px]">
                Active
              </span>
            </div>
          </div>

          {/* Section 3: Project Information */}
          <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-[11px] text-[#374151] space-y-1">
            <div className="font-semibold text-[#2563EB] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Third-Year Computer Science Major Project</span>
            </div>
            <p className="text-[#64748B] text-[10px] leading-relaxed">
              Phase 1 establishes the modular frontend architecture with Next.js App Router, Lucide icons, and Tailwind styling. AI backend integration will occur in subsequent phases.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E5E7EB] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2563EB] text-white font-medium hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
