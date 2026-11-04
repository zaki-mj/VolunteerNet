import React from 'react';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const { t } = useTranslation();

  const dimensions = {
    sm: { icon: 28, text: 'text-sm' },
    md: { icon: 38, text: 'text-base' },
    lg: { icon: 48, text: 'text-xl' },
    xl: { icon: 64, text: 'text-2xl' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Algerian Civic Tech VolunteerNet SVG Icon */}
      <div
        className="relative flex items-center justify-center shrink-0 drop-shadow-xs"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Base Shield / Circle Container */}
          <circle cx="50" cy="50" r="48" fill="var(--color-primary)" />
          
          {/* Secondary Ring Accent */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Supportive Caring Hands / Intertwined Network V */}
          <path
            d="M26 62C26 62 34 76 50 76C66 76 74 62 74 62C74 62 64 68 50 68C36 68 26 62 26 62Z"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M32 50C32 50 40 64 50 64C60 64 68 50 68 50C68 50 59 56 50 56C41 56 32 50 32 50Z"
            fill="white"
          />

          {/* Connected Network Nodes */}
          <circle cx="28" cy="42" r="4" fill="#a1f5b7" />
          <circle cx="72" cy="42" r="4" fill="#a1f5b7" />
          <line x1="28" y1="42" x2="38" y2="48" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
          <line x1="72" y1="42" x2="62" y2="48" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

          {/* Stylized Red Algerian Crescent & Five-Point Star */}
          <path
            d="M50 20C41.7 20 35 26.7 35 35C35 43.3 41.7 50 50 50C54.2 50 58 48.3 60.7 45.5C54.5 45.5 49.5 40.5 49.5 34.3C49.5 28.5 53.8 23.7 59.4 22.8C56.7 21 53.5 20 50 20Z"
            fill="var(--color-secondary)"
          />
          <polygon
            points="58,30 59.8,35.5 65.5,35.5 60.9,38.8 62.6,44.2 58,40.8 53.4,44.2 55.1,38.8 50.5,35.5 56.2,35.5"
            fill="var(--color-secondary)"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <span
            className={`font-black tracking-tight leading-none text-[var(--color-text)] ${dimensions.text}`}
          >
            {t('app.name')}
          </span>
          <span className="text-[10px] tracking-wider text-[var(--color-text-muted)] font-mono font-medium uppercase mt-0.5">
            VolunteerNet DZ
          </span>
        </div>
      )}
    </div>
  );
};
