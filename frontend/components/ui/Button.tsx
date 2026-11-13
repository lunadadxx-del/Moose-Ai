'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed select-none outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30';

  const variantStyles = {
    primary:
      'bg-[#2563EB] text-white hover:bg-blue-700 shadow-2xs active:scale-[0.98]',
    secondary:
      'bg-white text-[#111827] border border-[#E5E7EB] hover:bg-slate-50 hover:border-slate-300 shadow-2xs active:scale-[0.98]',
    outline:
      'border border-[#E5E7EB] text-[#374151] hover:bg-slate-50 hover:text-[#111827] active:scale-[0.98]',
    ghost:
      'text-[#64748B] hover:text-[#111827] hover:bg-slate-100 active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'p-2 w-9 h-9',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
