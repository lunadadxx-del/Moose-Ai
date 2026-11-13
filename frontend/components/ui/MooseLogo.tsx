'use client';

import React from 'react';
import Image from 'next/image';

interface MooseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const MooseLogo: React.FC<MooseLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  // Original image is 1024x682 (Aspect ratio: 1.50)
  const sizeMap = {
    sm: { width: 33, height: 22, text: 'text-base' },
    md: { width: 39, height: 26, text: 'text-lg' },
    lg: { width: 48, height: 32, text: 'text-xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official MOOSE AI Logo with uncompromised aspect ratio and clean rendering */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/moose-logo.png"
          alt="MOOSE AI Logo"
          width={currentSize.width}
          height={currentSize.height}
          style={{ width: `${currentSize.width}px`, height: `${currentSize.height}px` }}
          className="object-contain"
          priority
        />
      </div>

      {/* Brand Typography horizontally aligned */}
      {showText && (
        <div className="flex items-center gap-1 font-bold tracking-tight leading-none">
          <span className={`text-[#111827] ${currentSize.text}`}>MOOSE</span>
          <span className={`text-[#2563EB] ${currentSize.text}`}>AI</span>
        </div>
      )}
    </div>
  );
};
