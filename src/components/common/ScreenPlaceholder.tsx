import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Link2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface RelatedLink {
  label: string;
  to: string;
  icon?: LucideIcon;
  badge?: string;
}

interface ScreenPlaceholderProps {
  title: string;
  description: string;
  screenCode?: string;
  relatedLinks?: RelatedLink[];
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export const ScreenPlaceholder: React.FC<ScreenPlaceholderProps> = ({
  title,
  description,
  screenCode,
  relatedLinks = [],
  showBackButton = false,
  children,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors"
                aria-label={t('common.back')}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{t('common.back')}</span>
              </button>
            )}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              {title}
            </h1>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-3xl">
            {description}
          </p>
        </div>

        {screenCode && (
          <div className="self-start sm:self-center text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
            Stitch Screen: {screenCode}
          </div>
        )}
      </div>

      {/* Main Content Area / Interactive Controls */}
      {children && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 shadow-xs">
          {children}
        </div>
      )}

      {/* Navigation Relationships & Cross-Screen Links */}
      {relatedLinks.length > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 space-y-3 shadow-xs">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            {t('common.related_links')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={idx}
                  to={link.to}
                  className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {Icon && (
                      <div className="p-1.5 rounded-md bg-[var(--color-primary-container)] text-[var(--color-primary)] group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-[var(--color-text)] truncate">
                      {link.label}
                    </span>
                  </div>
                  {link.badge ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]">
                      {link.badge}
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      ←
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
