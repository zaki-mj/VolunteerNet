import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

export const WorkshopsScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('screens.workshops.title')}
      description={t('screens.workshops.description')}
      screenCode="تعلّم وشارك (cce4af0e)"
      showBackButton
      relatedLinks={[
        { label: t('nav.opportunities'), to: '/opportunities' },
        { label: t('nav.certificates'), to: '/certificates' },
        { label: t('nav.home'), to: '/' },
      ]}
    >
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-secondary-container)] text-[var(--color-secondary)]">
              ورشة مميزة معتمدة
            </span>
            <h3 className="text-base font-bold text-[var(--color-text)]">
              ورشة مبادئ الإسعافات الأولية والاستجابة للطوارئ
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              بالتنسيق مع الهلال الأحمر الجزائري - شهادة معتمدة بعد إتمام 16 ساعة تدريبية.
            </p>
          </div>
          <Link
            to="/workshops/first-aid"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-colors self-end sm:self-center"
          >
            <span>{t('common.view_details')}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </ScreenPlaceholder>
  );
};
