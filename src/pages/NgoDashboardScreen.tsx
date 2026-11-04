import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

export const NgoDashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'أمين بن علي', opportunity: 'حملة تشجير السد الأخضر 2026', status: 'قيد الانتظار', hours: 8 },
    { id: 2, name: 'سارة مراد', opportunity: 'ورشة مبادئ الإسعافات الأولية', status: 'مقبول', hours: 16 },
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <ScreenPlaceholder
      title={t('screens.ngo_dashboard.title')}
      description={t('screens.ngo_dashboard.description')}
      screenCode="لوحة تحكم الجمعية (fecf895f)"
      relatedLinks={[
        { label: t('nav.opportunities'), to: '/opportunities' },
        { label: t('nav.verify'), to: '/verify' },
        { label: t('nav.home'), to: '/' },
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-sm font-bold text-[var(--color-text)]">
              قائمة المترشحين الجدد للمبادرات
            </h3>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            مساحة إدارة المتطوعين والاعتمادات
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                <th className="py-2.5 px-3">اسم المترشح</th>
                <th className="py-2.5 px-3">المبادرة</th>
                <th className="py-2.5 px-3">الساعات</th>
                <th className="py-2.5 px-3">الحالة</th>
                <th className="py-2.5 px-3 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {applicants.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--color-surface-hover)]">
                  <td className="py-3 px-3 font-semibold text-[var(--color-text)]">
                    {item.name}
                  </td>
                  <td className="py-3 px-3 text-[var(--color-text-muted)]">
                    {item.opportunity}
                  </td>
                  <td className="py-3 px-3 font-mono">{item.hours} س</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        item.status === 'مقبول'
                          ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                          : item.status === 'مرفوض'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleStatusChange(item.id, 'مقبول')}
                        className="p-1 rounded hover:bg-[var(--color-primary-container)] text-[var(--color-primary)]"
                        title="قبول"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id, 'مرفوض')}
                        className="p-1 rounded hover:bg-rose-100 text-rose-600 dark:hover:bg-rose-950/40"
                        title="رفض"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScreenPlaceholder>
  );
};
