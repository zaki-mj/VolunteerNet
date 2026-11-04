import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Building2, MapPin, Clock } from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

export const OpportunityDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [applied, setApplied] = useState(false);

  return (
    <ScreenPlaceholder
      title={`${t('screens.opportunity_detail.title')} #${id || '1'}`}
      description={t('screens.opportunity_detail.description')}
      screenCode="تفاصيل الفرصة (bb623980)"
      showBackButton
      relatedLinks={[
        { label: t('nav.opportunities'), to: '/opportunities' },
        { label: t('nav.activity'), to: '/activity' },
        { label: t('nav.ngo_dashboard'), to: '/ngo/dashboard', badge: 'عرض إدارة الطلبات' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1"><Building2 className="w-4 h-4 text-[var(--color-primary)]" /> جمعية معتمدة #DZ-784</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[var(--color-primary)]" /> الجزائر</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[var(--color-primary)]" /> 8 ساعات تطوعية معتمدة</span>
        </div>

        <div className="p-4 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            {t('common.empty_placeholder')}
          </p>
        </div>

        {/* Action Button: Apply / Follow Status */}
        <div className="flex items-center gap-3">
          {applied ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary-container)] text-[var(--color-primary)] text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم إرسال طلب التطوع بنجاح (راجع صفحة نشاطي)</span>
            </div>
          ) : (
            <button
              onClick={() => setApplied(true)}
              className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold transition-all shadow-xs"
            >
              {t('common.apply_now')}
            </button>
          )}

          <Link
            to="/activity"
            className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-xs font-medium hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            الانتقال إلى نشاطي
          </Link>
        </div>
      </div>
    </ScreenPlaceholder>
  );
};
