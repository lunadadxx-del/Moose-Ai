'use client';

import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
import { SuggestedPrompts } from './SuggestedPrompts';

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectPrompt,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center max-w-2xl mx-auto w-full select-none animate-fadeIn">
      {/* Clean, minimal greeting without clutter or random badges */}
      <div className="space-y-1.5 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827]">
          {APP_CONFIG.welcomeGreeting}
        </h1>
        <p className="text-sm sm:text-base text-[#64748B]">
          {APP_CONFIG.tagline}
        </p>
      </div>

      {/* Suggested Prompt Cards */}
      <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
    </div>
  );
};
