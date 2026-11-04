import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Printer, Share2 } from 'lucide-react';
import type { CertificateRecord } from '../../mock/data';

interface OfficialCertificateProps {
  certificate: CertificateRecord;
  showActions?: boolean;
}

export const OfficialCertificate: React.FC<OfficialCertificateProps> = ({
  certificate,
  showActions = true,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const isRevoked = certificate.status === 'revoked';

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar (hidden during print) */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs print:hidden">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isRevoked
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
              }`}
            >
              {isRevoked ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span>{isRevoked ? 'شهادة ملغاة / غير سارية' : 'شهادة موثقة رقمياً ومشفرة'}</span>
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              {certificate.serialNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الوثيقة الرسمية</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('تم نسخ رابط التحقق من الشهادة إلى الحافظة.');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] text-xs font-medium hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة الرابط</span>
            </button>
          </div>
        </div>
      )}

      {/* High-Fidelity Official Algerian Certificate Card */}
      <div
        id="printable-certificate"
        className={`relative mx-auto max-w-4xl w-full rounded-2xl border-4 p-6 sm:p-10 md:p-12 overflow-hidden shadow-xl transition-all ${
          isRevoked
            ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/10'
            : 'border-[#006233] bg-[#ffffff] text-[#142217]'
        }`}
        style={{
          boxShadow: '0 10px 40px -10px rgba(0, 98, 51, 0.15)',
        }}
      >
        {/* Decorative Golden Guilloche Outer Inset Frame */}
        <div className="absolute inset-2 sm:inset-3 border-2 border-[#d4af37]/60 pointer-events-none rounded-xl" />
        <div className="absolute inset-3 sm:inset-4 border border-[#006233]/20 pointer-events-none rounded-lg" />

        {/* Faint Background Algerian State Emblem Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
          <svg viewBox="0 0 200 200" className="w-[450px] h-[450px] fill-current">
            <circle cx="100" cy="100" r="90" />
            <path d="M100 30 C60 30 30 60 30 100 C30 140 60 170 100 170 C125 170 148 158 160 140 C125 140 95 110 95 75 C95 55 105 38 120 30 C114 30 107 30 100 30 Z" fill="#d21034" />
          </svg>
        </div>

        {/* Official Header */}
        <div className="relative text-center space-y-2 pb-6 border-b border-[#006233]/20">
          <div className="flex items-center justify-center gap-3">
            <div className="h-0.5 w-12 sm:w-20 bg-[#006233]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#006233] uppercase">
              الجمهورية الجزائرية الديمقراطية الشعبية
            </span>
            <div className="h-0.5 w-12 sm:w-20 bg-[#006233]" />
          </div>
          <p className="text-[11px] sm:text-xs text-[#526356] font-medium">
            المنصة الوطنية لتوثيق العمل التطوعي والمسؤولية المدنية • السجل الوطني المعتمد
          </p>
          <div className="pt-2">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-wider bg-[#e6f3ec] text-[#006233] border border-[#006233]/30">
              شهادة تطوع وإنجاز مدني رقمية معتمدة
            </span>
          </div>
        </div>

        {/* Revoked Warning Banner if applicable */}
        {isRevoked && (
          <div className="relative my-4 p-4 rounded-xl border border-rose-300 bg-rose-100/90 text-rose-900 text-center space-y-1">
            <p className="font-bold text-sm flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>تنبيه: هذه الوثيقة تم سحب اعتمادها رسمياً</span>
            </p>
            <p className="text-xs text-rose-800">
              {certificate.revocationReason || 'تم إلغاء الشهادة لمخالفتها معايير التوثيق الميداني.'}
            </p>
          </div>
        )}

        {/* Certificate Recipient & Body */}
        <div className="relative py-8 sm:py-10 text-center space-y-6">
          <p className="text-xs sm:text-sm text-[#526356] font-medium">
            تُشهد المنصة الوطنية للعمل التطوعي بالتنسيق مع الجهة المشرفة بأن:
          </p>

          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#006233] tracking-tight py-1 font-serif">
              {certificate.volunteerName}
            </h2>
            <div className="inline-flex items-center gap-2 mt-1 text-xs text-[#526356] font-mono">
              <span>المعرف الوطني للمتطوع:</span>
              <span className="font-bold text-[#142217]">{certificate.volunteerId}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-[#142217] px-2">
            قد أتم بنجاح وبكفاءة عالية المشاركة في:
            <div className="font-bold text-base sm:text-xl text-[#006233] my-2 p-2 rounded-lg bg-[#f8faf7] border border-[#006233]/15">
              « {certificate.opportunityTitle} »
            </div>
            حيث تم توثيق واعتماد رصيد قدره{' '}
            <span className="inline-block px-2.5 py-0.5 rounded-md font-extrabold text-[#d21034] bg-[#fee7eb] font-mono mx-1">
              {certificate.hoursAccredited} ساعة تطوعية
            </span>{' '}
            ميدانية موجهة لخدمة الصالح العام.
          </div>
        </div>

        {/* Certificate Meta Grid */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-2 rounded-xl bg-[#f8faf7] border border-[#e2e8e2] text-xs">
          <div className="p-2.5 text-center border-l border-[#e2e8e2] last:border-l-0">
            <span className="block text-[11px] text-[#526356] mb-0.5">الجهة المصدرة</span>
            <span className="font-bold text-[#142217] leading-tight block truncate">
              {certificate.issuingNgoName}
            </span>
          </div>
          <div className="p-2.5 text-center border-l border-[#e2e8e2] last:border-l-0">
            <span className="block text-[11px] text-[#526356] mb-0.5">رقم الاعتماد الرسمي</span>
            <span className="font-mono font-bold text-[#006233]">{certificate.issuingNgoLicense}</span>
          </div>
          <div className="p-2.5 text-center border-l border-[#e2e8e2] last:border-l-0">
            <span className="block text-[11px] text-[#526356] mb-0.5">تاريخ الإصدار</span>
            <span className="font-bold text-[#142217]">{certificate.issueDate}</span>
          </div>
          <div className="p-2.5 text-center">
            <span className="block text-[11px] text-[#526356] mb-0.5">الولاية المعتمدة</span>
            <span className="font-bold text-[#142217]">{certificate.wilaya}</span>
          </div>
        </div>

        {/* Dual Signatures & Verification Cryptography Block */}
        <div className="relative pt-6 mt-4 border-t border-[#006233]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Signer 1: Issuing NGO */}
          <div className="text-center sm:text-right space-y-1">
            <span className="text-[11px] text-[#526356] block">المشرف الميداني للجهة المصدرة:</span>
            <p className="font-bold text-sm text-[#142217]">{certificate.signerName}</p>
            <p className="text-[11px] text-[#006233]">{certificate.signerRole}</p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>ختم إلكتروني موثق</span>
              </span>
            </div>
          </div>

          {/* Central QR Code & Cryptographic Ledger Hash */}
          <div className="text-center space-y-1.5 p-3 rounded-xl bg-white border border-[#e2e8e2] shadow-xs">
            <div className="w-20 h-20 mx-auto bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#006233] fill-current">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 10h8v8H2v-8zm2 2v4h4v-4H4zm10-14h8v8h-8V2zm2 2v4h4V4h-4zm2 8h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-4h2v4h-2v-4zm-8-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
              </svg>
            </div>
            <span className="block text-[9px] font-mono text-[#526356] uppercase tracking-tighter">
              SCAN TO VERIFY
            </span>
          </div>

          {/* Signer 2: National Registry Seal */}
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[11px] text-[#526356] block">اعتماد المنصة الوطنية:</span>
            <p className="font-bold text-sm text-[#142217]">السجل الرقمي للتطوع</p>
            <p className="text-[11px] text-[#006233]">المرصد الوطني للمجتمع المدني</p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>الرقم التسلسلي: {certificate.id}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Cryptographic Hash Footer */}
        <div className="relative mt-6 pt-3 border-t border-[#e2e8e2] text-center">
          <p className="text-[9px] font-mono text-[#526356] break-all">
            بصمة التشفير الرقمية (SHA-256): <span className="font-bold text-[#142217]">{certificate.cryptoHash}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
