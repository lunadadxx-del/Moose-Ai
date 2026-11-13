'use client';

import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface AvatarProps {
  role: 'assistant' | 'user';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  role,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: { container: 'w-7 h-7', logoW: 18, logoH: 12 },
    md: { container: 'w-8 h-8', logoW: 22, logoH: 15 },
    lg: { container: 'w-10 h-10', logoW: 28, logoH: 19 },
  };

  const currentSize = sizeMap[size];

  if (role === 'assistant') {
    return (
      <div
        className={`relative ${currentSize.container} rounded-full border border-blue-100 bg-blue-50/80 flex items-center justify-center shrink-0 shadow-2xs ${className}`}
      >
        <Image
          src="/moose-logo.png"
          alt="Moose AI Assistant"
          width={currentSize.logoW}
          height={currentSize.logoH}
          style={{ width: `${currentSize.logoW}px`, height: `${currentSize.logoH}px` }}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${currentSize.container} rounded-full flex items-center justify-center font-medium bg-[#111827] text-white shrink-0 shadow-2xs ${className}`}
    >
      <User className="w-4 h-4 text-slate-100" />
    </div>
  );
};
