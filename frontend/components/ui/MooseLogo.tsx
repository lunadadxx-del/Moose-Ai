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
  const sizeMap = {
    sm: { box: 'w-8 h-8', imgWidth: 32, imgHeight: 22, text: 'text-sm', badge: 'text-[10px]' },
    md: { box: 'w-10 h-10', imgWidth: 40, imgHeight: 27, text: 'text-base', badge: 'text-[11px]' },
    lg: { box: 'w-14 h-14', imgWidth: 56, imgHeight: 38, text: 'text-xl', badge: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official MOOSE AI Logo with uncompromised aspect ratio */}
      <div
        className={`relative ${currentSize.box} rounded-xl overflow-hidden flex items-center justify-center bg-white border border-slate-200 shadow-sm shrink-0 p-0.5`}
      >
        <Image
          src="/moose-logo.png"
          alt="MOOSE AI Official Logo"
          width={currentSize.imgWidth}
          height={currentSize.imgHeight}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-[#0F172A] ${currentSize.text}`}>
              MOOSE
            </span>
            <span className={`font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#1646D8] to-[#16A5F5] ${currentSize.text}`}>
              AI
            </span>
          </div>
          <span className={`font-medium tracking-wide text-slate-500 ${currentSize.badge}`}>
            Major Project
          </span>
        </div>
      )}
    </div>
  );
};
