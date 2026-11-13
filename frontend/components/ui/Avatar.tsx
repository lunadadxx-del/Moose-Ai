'use client';

import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface AvatarProps {
  role: 'assistant' | 'user';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  role,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: { container: 'w-7 h-7 text-xs', px: 28 },
    md: { container: 'w-8 h-8 text-sm', px: 32 },
    lg: { container: 'w-10 h-10 text-base', px: 40 },
    xl: { container: 'w-24 h-24 text-3xl', px: 96 },
  };

  const currentSize = sizeMap[size];

  if (role === 'assistant') {
    return (
      <div
        className={`relative ${currentSize.container} rounded-full overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center p-0.5 shrink-0 ${className}`}
      >
        <Image
          src="/moose-logo.png"
          alt="Moose AI Assistant"
          width={currentSize.px}
          height={currentSize.px}
          className="w-full h-full object-contain"
          priority={size === 'xl'}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${currentSize.container} rounded-full flex items-center justify-center font-medium bg-gradient-to-tr from-[#1646D8] to-[#16A5F5] text-white shadow-sm shrink-0 ${className}`}
    >
      <User className="w-1/2 h-1/2 text-white" />
    </div>
  );
};
