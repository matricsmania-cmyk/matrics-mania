import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textColor?: string;
  textClassName?: string;
}

export const LogoSymbol: React.FC<{ size?: number | string; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
  >
    {/* Rich Royal Blue Squircle */}
    <rect width="100" height="100" rx="28" fill="#0136BD" />

    {/* Exact White Emblem: Stylized M + Dual Metrics Bars */}
    <path
      d="M 31 63 V 36 L 43 51.5 L 51 43.5"
      stroke="#FFFFFF"
      strokeWidth="9.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 55.5 43.5 V 63"
      stroke="#FFFFFF"
      strokeWidth="9.5"
      strokeLinecap="round"
    />
    <path
      d="M 65.5 40.5 V 63"
      stroke="#FFFFFF"
      strokeWidth="9.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 40,
  showText = true,
  textColor,
  textClassName = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoSymbol size={size} />

      {showText && (
        <div className={`flex flex-col text-left ${textClassName}`}>
          <span
            className={`text-xl font-extrabold tracking-tight flex items-center gap-1 ${
              textColor || 'text-slate-900 dark:text-white'
            }`}
          >
            Matricsmania
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600" />
          </span>
          <span className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest -mt-1">
            Digital Marketing Agency
          </span>
        </div>
      )}
    </div>
  );
};
