import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Award, ArrowLeft } from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

export const ActivityScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('screens.activity.title')}
      description={t('screens.activity.description')}
      screenCode="نشاطي (11bab2e7)"
      relatedLinks={[
        { label: t('nav.certificates'), to: '/certificates', badge: '3 شهادات' },
        { label: t('nav.opportunities'), to: '/opportunities' },
        { label: t('nav.verify'), to: '/verify' },
      ]}
    >
      <div className="space-y-4">
        {/* Metric summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
            <span className="text-2xl font-bold text-[var(--color-primary)]">38</span>
            <span className="block text-xs text-[var(--color-text-muted)]">ساعة تطوعية</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
            <span className="text-2xl font-bold text-[var(--color-text)]">4</span>
            <span className="block text-xs text-[var(--color-text-muted)]">مبادرات مكتملة</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
            <span className="text-2xl font-bold text-[var(--color-secondary)]">3</span>
            <span className="block text-xs text-[var(--color-text-muted)]">شهادات رسمية</span>
          </div>
        </div>

        {/* Link to view certificates */}
        <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm font-semibold">استعراض محفظة الشهادات الرقمية</span>
          </div>
          <Link
            to="/certificates"
            className="text-xs font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
          >
            <span>فتح الشهادات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </ScreenPlaceholder>
  );
};
