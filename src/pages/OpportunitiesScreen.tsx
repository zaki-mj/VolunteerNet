import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, MapPin } from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

export const OpportunitiesScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('screens.opportunities.title')}
      description={t('screens.opportunities.description')}
      screenCode="قائمة الفرص (e1c17eb0)"
      showBackButton
      relatedLinks={[
        { label: t('nav.workshops'), to: '/workshops' },
        { label: t('nav.activity'), to: '/activity' },
        { label: t('nav.home'), to: '/' },
      ]}
    >
      <div className="space-y-4">
        {/* Mock Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Filter className="w-4 h-4 text-[var(--color-primary)]" />
            <span>فلترة حسب الولاية والمجال</span>
          </div>
          <span className="text-xs px-2 py-1 rounded bg-[var(--color-primary-container)] text-[var(--color-primary)] font-medium">
            3 فرصة تجريبية
          </span>
        </div>

        {/* Mock Opportunity Cards leading to Detail Screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: '1', title: 'حملة تشجير السد الأخضر 2026', org: 'جمعية البيئة الجزائرية', wilaya: 'الجلفة', hours: '8 ساعات' },
            { id: '2', title: 'تنظيم قوافل الإغاثة الشتوية', org: 'الهلال الأحمر الجزائري', wilaya: 'البليدة', hours: '12 ساعة' },
            { id: '3', title: 'تأطير ورشات البرمجة للأطفال', org: 'نادي الابتكار التقني', wilaya: 'الجزائر العاصمة', hours: '6 ساعات' },
          ].map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] mb-1">
                  <span>{item.org}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.wilaya}</span>
                </div>
                <h4 className="font-semibold text-[var(--color-text)]">{item.title}</h4>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                <span className="text-xs font-mono text-[var(--color-primary)]">{item.hours}</span>
                <Link
                  to={`/opportunities/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline"
                >
                  <span>{t('common.view_details')}</span>
                  <ArrowLeft className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenPlaceholder>
  );
};
