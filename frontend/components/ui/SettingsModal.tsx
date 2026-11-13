'use client';

import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
import { X, Cpu, Palette, Database, ShieldCheck, ExternalLink } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#121622] border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0F121A]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Moose AI Settings
              </h2>
              <p className="text-[11px] text-slate-400">
                Configuration & System Status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1A1F2D] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar text-xs">
          {/* Section 1: Model Information */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
              Model Specification
            </span>
            <div className="p-3 rounded-xl bg-[#171C28] border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Architecture</span>
                <span className="text-sky-300 font-mono font-medium">
                  Qwen 2.5 / LLaMA 3 (7B)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Backend Framework</span>
                <span className="text-slate-200 font-mono">
                  Python + FastAPI (Phase 2)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Fine-Tuning Method</span>
                <span className="text-slate-200 font-mono">LoRA / PEFT (4-bit QLoRA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Database & RAG</span>
                <span className="text-slate-200 font-mono">
                  PostgreSQL + pgvector
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Appearance & Preferences */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
              UI Appearance
            </span>
            <div className="p-3 rounded-xl bg-[#171C28] border border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-slate-200 font-medium">Dark Charcoal Theme</div>
                <div className="text-slate-400 text-[11px]">
                  Custom theme tuned for reduced eye fatigue
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold text-[10px]">
                Active
              </span>
            </div>
          </div>

          {/* Section 3: Project Information */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-sky-950/30 to-indigo-950/30 border border-sky-900/40 text-[11px] text-slate-300 space-y-1">
            <div className="font-semibold text-sky-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Third-Year CS Major Project</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Phase 1 establishes the modular frontend architecture with Next.js App Router, Lucide icons, and Tailwind styling. AI backend integration will occur in subsequent phases.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0F121A] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-400 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
