import React from 'react';

interface LiveProjectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ children = "Live Project", className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`
        rounded-full border-2 border-[#D7E2EA] 
        text-[#D7E2EA] font-medium uppercase tracking-widest
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        hover:bg-[#D7E2EA]/10
        transition-colors duration-300
        ${className}
      `}
    >
      {children}
    </button>
  );
};
