import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

export const CertificatesScreen: React.FC = () => {
  const { t } = useTranslation();

  const certificates = [
    {
      id: 'CERT-DZ-2026-891',
      title: 'شهادة اجتياز ورشة الإسعافات الأولية',
      issuer: 'الهلال الأحمر الجزائري',
      date: 'أكتوبر 2026',
    },
    {
      id: 'CERT-DZ-2026-442',
      title: 'شهادة مشاركة في حملة السد الأخضر',
      issuer: 'المحافظة السامية للغابات',
      date: 'سبتمبر 2026',
    },
  ];

  return (
    <ScreenPlaceholder
      title={t('screens.certificates.title')}
      description={t('screens.certificates.description')}
      screenCode="شهاداتي (b8251b67)"
      relatedLinks={[
        { label: t('nav.verify'), to: '/verify', icon: ShieldCheck, badge: 'بوابة التحقق للجمهور' },
        { label: t('nav.activity'), to: '/activity' },
        { label: t('nav.home'), to: '/' },
      ]}
    >
      <div className="space-y-3">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[var(--color-primary)] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--color-primary-container)] text-[var(--color-primary)]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text)]">{cert.title}</h4>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mt-0.5">
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.date}</span>
                  <span>•</span>
                  <span className="font-mono text-[var(--color-primary)]">{cert.id}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                to={`/verify?id=${cert.id}`}
                className="px-3 py-1.5 rounded-md border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>تحقق</span>
              </Link>
              <Link
                to={`/certificates/${cert.id}`}
                className="px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-colors flex items-center gap-1"
              >
                <span>{t('common.view_details')}</span>
                <ArrowLeft className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </ScreenPlaceholder>
  );
};
