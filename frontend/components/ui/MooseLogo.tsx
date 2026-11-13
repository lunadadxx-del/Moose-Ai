'use client';

import React from 'react';
import Image from 'next/image';

interface MooseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  useAvatar?: boolean;
  className?: string;
}

export const MooseLogo: React.FC<MooseLogoProps> = ({
  size = 'md',
  showText = true,
  useAvatar = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', img: 28, text: 'text-sm', badge: 'text-[9px]' },
    md: { box: 'w-9 h-9', img: 36, text: 'text-base', badge: 'text-[10px]' },
    lg: { box: 'w-12 h-12', img: 48, text: 'text-xl', badge: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon / Avatar Container */}
      <div
        className={`relative ${currentSize.box} rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1E2333] to-[#12151F] border border-cyan-500/20 shadow-sm shadow-cyan-950/40 shrink-0`}
      >
        {useAvatar ? (
          <Image
            src="/moose-avatar.png"
            alt="Moose AI Mascot"
            width={currentSize.img}
            height={currentSize.img}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <svg
            className="w-full h-full p-1"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="mooseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            {/* Antlers */}
            <path
              d="M16 16L12 11M16 16L19 11M16 16L17 21M12 11L9 12M19 11L21 8"
              stroke="url(#mooseGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 16L36 11M32 16L29 11M32 16L31 21M36 11L39 12M29 11L27 8"
              stroke="url(#mooseGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Moose Face Polygonal Shield */}
            <path
              d="M17 21C20 23 28 23 31 21L27 28L24 33L21 28L17 21Z"
              fill="#181D29"
              stroke="url(#mooseGrad)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Nodes */}
            <circle cx="9" cy="12" r="1.5" fill="#38BDF8" />
            <circle cx="21" cy="8" r="1.5" fill="#38BDF8" />
            <circle cx="39" cy="12" r="1.5" fill="#38BDF8" />
            <circle cx="27" cy="8" r="1.5" fill="#38BDF8" />
            <circle cx="24" cy="27" r="2" fill="#38BDF8" />
          </svg>
        )}
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold tracking-wider text-slate-100 ${currentSize.text}`}>
              MOOSE
            </span>
            <span className={`font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 ${currentSize.text}`}>
              AI
            </span>
          </div>
          <span className={`font-medium tracking-wide text-slate-400 ${currentSize.badge}`}>
            Major Project
          </span>
        </div>
      )}
    </div>
  );
};
