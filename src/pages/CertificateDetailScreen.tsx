import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { OfficialCertificate } from '../components/certificate/OfficialCertificate';
import { MOCK_CERTIFICATES } from '../mock/data';

export const CertificateDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const certificate =
    MOCK_CERTIFICATES.find((c) => c.id === id) ||
    MOCK_CERTIFICATES[0];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Nav */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)] print:hidden">
        <div className="flex items-center gap-3">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لمحفظة الشهادات</span>
          </Link>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {certificate.serialNumber}
          </span>
        </div>

        <Link
          to={`/verify?id=${certificate.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>فتح التحقق العام المباشر</span>
        </Link>
      </div>

      {/* Render the high-fidelity official certificate document */}
      <OfficialCertificate certificate={certificate} />
    </div>
  );
};
