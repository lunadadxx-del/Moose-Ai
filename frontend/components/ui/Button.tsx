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
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed select-none outline-none focus-visible:ring-2 focus-visible:ring-[#1646D8]/40';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#1646D8] to-[#16A5F5] text-white shadow-sm hover:opacity-95 active:scale-[0.98]',
    secondary:
      'bg-white text-[#0F172A] border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs active:scale-[0.98]',
    outline:
      'border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98]',
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
