'use client';

import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#1646D8]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">
                Moose AI Settings
              </h2>
              <p className="text-[11px] text-slate-500">
                Configuration & System Status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar text-xs">
          {/* Section 1: Model Information */}
          <div className="space-y-2">
            <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
              Model Specification
            </span>
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Target Architecture</span>
                <span className="text-[#1646D8] font-mono font-semibold">
                  Qwen 2.5 / LLaMA 3 (7B)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Backend Framework</span>
                <span className="text-slate-800 font-mono">
                  Python + FastAPI (Phase 2)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Fine-Tuning Method</span>
                <span className="text-slate-800 font-mono">LoRA / PEFT (4-bit QLoRA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Database & RAG</span>
                <span className="text-slate-800 font-mono">
                  PostgreSQL + pgvector
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Appearance & Preferences */}
          <div className="space-y-2">
            <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
              UI Appearance
            </span>
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex justify-between items-center">
              <div>
                <div className="text-slate-900 font-semibold">Clean White Theme</div>
                <div className="text-slate-500 text-[11px]">
                  Minimalist high-contrast light design with blue accents
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1646D8] border border-blue-200 font-bold text-[10px]">
                Active
              </span>
            </div>
          </div>

          {/* Section 3: Project Information */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-slate-700 space-y-1">
            <div className="font-bold text-[#1646D8] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A5F5]" />
              <span>Third-Year CS Major Project</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Phase 1 establishes the modular frontend architecture with Next.js App Router, Lucide icons, and Tailwind styling. AI backend integration will occur in subsequent phases.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1646D8] to-[#16A5F5] text-white font-semibold hover:opacity-95 transition-opacity shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
