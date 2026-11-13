'use client';

import React from 'react';
import Image from 'next/image';
import { APP_CONFIG } from '@/lib/constants';
import { SuggestedPrompts } from './SuggestedPrompts';

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectPrompt,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 text-center max-w-4xl mx-auto w-full select-none animate-fadeIn bg-white">
      {/* Official MOOSE AI Logo Hero Section */}
      <div className="relative mb-6 group">
        {/* Soft subtle blue/cyan ambient glow */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md p-2 flex items-center justify-center">
          <Image
            src="/moose-logo.png"
            alt="MOOSE AI Official Logo"
            width={120}
            height={80}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        {/* Status Pill Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[10px] font-semibold text-[#1646D8] tracking-wide flex items-center gap-1.5 shadow-xs whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A5F5] animate-ping" />
          <span>Online & Ready</span>
        </div>
      </div>

      {/* Main Greeting & Subtitle */}
      <div className="space-y-2 mb-8 max-w-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
          {APP_CONFIG.welcomeGreeting}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-normal">
          {APP_CONFIG.tagline}
        </p>
      </div>

      {/* Suggested Prompt Cards */}
      <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
    </div>
  );
};
