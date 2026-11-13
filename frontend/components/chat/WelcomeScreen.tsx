'use client';

import React from 'react';
import Image from 'next/image';
import { APP_CONFIG } from '@/lib/constants';
import { SuggestedPrompts } from './SuggestedPrompts';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectPrompt,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 text-center max-w-4xl mx-auto w-full select-none animate-fadeIn">
      {/* 3D Mascot Character Display */}
      <div className="relative mb-6 group">
        {/* Soft glowing ambient backdrop */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-cyan-400/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-sky-400/30 bg-gradient-to-b from-[#182032] to-[#0E131F] shadow-2xl shadow-sky-950/60 p-1 flex items-center justify-center">
          <Image
            src="/moose-avatar.png"
            alt="Moose AI Mascot"
            width={128}
            height={128}
            className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        {/* Status Pill Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#10141F] border border-cyan-500/30 text-[10px] font-semibold text-cyan-300 tracking-wide flex items-center gap-1 shadow-lg whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Online & Ready</span>
        </div>
      </div>

      {/* Main Greeting & Subtitle */}
      <div className="space-y-2 mb-8 max-w-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          {APP_CONFIG.welcomeGreeting}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-normal">
          {APP_CONFIG.tagline}
        </p>
      </div>

      {/* Suggested Prompt Cards */}
      <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
    </div>
  );
};
