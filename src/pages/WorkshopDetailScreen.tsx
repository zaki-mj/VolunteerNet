import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

export const WorkshopDetailScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('screens.workshop_detail.title')}
      description={t('screens.workshop_detail.description')}
      screenCode="تفاصيل الورشة (b72fe372)"
      showBackButton
      relatedLinks={[
        { label: t('nav.workshops'), to: '/workshops' },
        { label: t('nav.certificates'), to: '/certificates', badge: 'عرض الشهادة المكتسبة' },
        { label: t('nav.home'), to: '/' },
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
            <span className="block text-xs text-[var(--color-text-muted)]">المدة</span>
            <span className="font-bold text-sm text-[var(--color-text)]">16 ساعة (يومان)</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
            <span className="block text-xs text-[var(--color-text-muted)]">الشهادة</span>
            <span className="font-bold text-sm text-[var(--color-primary)]">موثقة برمز QR</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
            <span className="block text-xs text-[var(--color-text-muted)]">المقاعد</span>
            <span className="font-bold text-sm text-[var(--color-text)]">25 مقعد</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
            <span className="block text-xs text-[var(--color-text-muted)]">التكلفة</span>
            <span className="font-bold text-sm text-[var(--color-secondary)]">مجاني للشباب</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            to="/certificates/CERT-DZ-2026-891"
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-colors inline-flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>معاينة نموذج الشهادة المكتسبة</span>
          </Link>
        </div>
      </div>
    </ScreenPlaceholder>
  );
};
