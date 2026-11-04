import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Printer,
  Share2,
  Clock,
  UserCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import QRCode from 'qrcode';
import type { CertificateRecord } from '../../mock/data';

interface OfficialCertificateProps {
  certificate: CertificateRecord;
  showActions?: boolean;
}

export const OfficialCertificate: React.FC<OfficialCertificateProps> = ({
  certificate,
  showActions = true,
}) => {
  // Allow toggling role for demo / review purposes
  const [currentRole, setCurrentRole] = useState<'participant' | 'host'>(
    certificate.participationRole || 'participant'
  );
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate actual scannable QR Code
    const verifyUrl = `${window.location.origin}/verify?id=${encodeURIComponent(
      certificate.id
    )}&hash=${certificate.cryptoHash.slice(0, 10)}`;

    QRCode.toDataURL(verifyUrl, {
      margin: 1,
      width: 160,
      color: {
        dark: '#004824',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR Code:', err));
  }, [certificate]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/verify?id=${encodeURIComponent(certificate.id)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('تم نسخ رابط التحقق الرسمي من الشهادة إلى الحافظة.');
    }
  };

  const isRevoked = certificate.status === 'revoked';
  const isHost = currentRole === 'host';

  return (
    <div className="space-y-4">
      {/* Action & Preview Control Bar (Hidden when printing) */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs print:hidden">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isRevoked
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
              }`}
            >
              {isRevoked ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              <span>{isRevoked ? 'شهادة ملغاة / غير سارية' : 'شهادة رسمية موثقة ومؤمنة'}</span>
            </span>

            {/* Quick Role Switcher for Preview */}
            <div className="hidden sm:inline-flex items-center rounded-lg bg-[var(--color-surface-muted)] p-0.5 border border-[var(--color-border)] text-xs">
              <button
                type="button"
                onClick={() => setCurrentRole('participant')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  !isHost
                    ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-2xs'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                متطوع مشارك (Participant)
              </button>
              <button
                type="button"
                onClick={() => setCurrentRole('host')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  isHost
                    ? 'bg-[var(--color-surface)] text-amber-600 shadow-2xs font-bold'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                مؤطر ومنظم (Host)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--color-border)] text-[var(--color-text)] text-xs font-semibold hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة الرابط</span>
            </button>
          </div>
        </div>
      )}

      {/* Official Accredited Algerian Certificate Canvas */}
      <div
        id="printable-certificate"
        className={`relative mx-auto max-w-4xl w-full rounded-3xl border-4 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl transition-all ${
          isRevoked
            ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/10'
            : 'border-[#006233] bg-[#ffffff] text-[#142217]'
        }`}
        style={{
          boxShadow: '0 12px 48px -10px rgba(0, 98, 51, 0.18)',
        }}
        dir="rtl"
      >
        {/* Decorative Golden Inset Frame */}
        <div className="absolute inset-2.5 sm:inset-3.5 border-2 border-[#d4af37]/70 pointer-events-none rounded-2xl" />
        <div className="absolute inset-4 sm:inset-5 border border-[#006233]/25 pointer-events-none rounded-xl" />

        {/* Traditional Ornamental Corners */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] pointer-events-none" />
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] pointer-events-none" />

        {/* Background Algerian National Emblem Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
          <svg viewBox="0 0 200 200" className="w-[500px] h-[500px] fill-current">
            <circle cx="100" cy="100" r="90" fill="#006233" />
            <path
              d="M100 30 C60 30 30 60 30 100 C30 140 60 170 100 170 C125 170 148 158 160 140 C125 140 95 110 95 75 C95 55 105 38 120 30 C114 30 107 30 100 30 Z"
              fill="#d21034"
            />
            <polygon
              points="100,50 106,66 123,66 109,76 114,92 100,82 86,92 91,76 77,66 94,66"
              fill="#d21034"
            />
          </svg>
        </div>

        {/* 1. Official National Header */}
        <div className="relative text-center space-y-2 pb-5 border-b border-[#006233]/20">
          <div className="flex items-center justify-center gap-3">
            <div className="h-0.5 w-12 sm:w-24 bg-[#006233]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#006233] uppercase">
              الجمهورية الجزائرية الديمقراطية الشعبية
            </span>
            <div className="h-0.5 w-12 sm:w-24 bg-[#006233]" />
          </div>

          <p className="text-[11px] sm:text-xs text-[#526356] font-semibold">
            المرصد الوطني للمجتمع المدني • المنصة الوطنية الرقمية لتوثيق العمل التطوعي
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full bg-[#e6f3ec] text-[#006233] border border-[#006233]/40 shadow-2xs">
              <Award className="w-4 h-4 text-[#006233]" />
              <span className="text-xs sm:text-sm font-black tracking-wide">
                شهادة تطوع واعتماد مدني رسمي
              </span>
            </div>
          </div>
        </div>

        {/* Revoked Warning Banner if applicable */}
        {isRevoked && (
          <div className="relative my-4 p-4 rounded-xl border border-rose-300 bg-rose-100/90 text-rose-900 text-center space-y-1">
            <p className="font-bold text-sm flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>تنبيه رسمي: تم سحب اعتماد هذه الوثيقة وإلغاؤها</span>
            </p>
            <p className="text-xs text-rose-800">
              {certificate.revocationReason || 'تم إلغاء الشهادة لمخالفتها معايير التوثيق الميداني المعتمدة.'}
            </p>
          </div>
        )}

        {/* 2. Certificate Body */}
        <div className="relative py-7 sm:py-9 text-center space-y-5">
          <p className="text-xs sm:text-sm text-[#526356] font-medium">
            تُشهد المنصة الوطنية للعمل التطوعي بالتنسيق مع الهيئة المشرفة بأن:
          </p>

          {/* Volunteer / Host Recipient Name */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#006233] tracking-tight py-1 font-serif">
              {certificate.volunteerName}
            </h2>
            <div className="inline-flex items-center gap-2 mt-1.5 text-xs text-[#526356] font-mono">
              <span>المعرف الوطني الموحد:</span>
              <span className="font-bold text-[#142217] px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                {certificate.volunteerId}
              </span>
            </div>
          </div>

          {/* Role Declaration (Host / Participant) Badge */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold border ${
                isHost
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-emerald-50 text-[#006233] border-emerald-300'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>
                الصفة والدور:{' '}
                <strong>
                  {isHost ? 'مؤطّر ومُنظّم ميداني (Host / Organizer)' : 'مُتطوّع مُشارِك (Participant)'}
                </strong>
              </span>
            </div>
          </div>

          {/* Activity Statement & Duration */}
          <div className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-[#142217] px-2 pt-2">
            {isHost ? (
              <span>
                قد أتم بنجاح واقتدار قيادة وتأطير الفعالية الميدانية:
              </span>
            ) : (
              <span>
                قد أتم بنجاح وبكفاءة عالية المشاركة الفعالة في مبادرة:
              </span>
            )}

            <div className="font-extrabold text-base sm:text-xl text-[#006233] my-3 p-3 rounded-xl bg-[#f8faf7] border border-[#006233]/20 shadow-2xs">
              « {certificate.opportunityTitle} »
            </div>

            {/* Duration (in hours) Callout Box */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#f4f7f4] border border-[#d1ded1] text-xs sm:text-sm">
              <span className="text-[#526356] font-medium">حجم الساعات المعتمدة رسمياً:</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg font-black text-white bg-[#006233] font-mono shadow-2xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{certificate.hoursAccredited} ساعة تطوعية</span>
              </span>
              <span className="text-[#526356] font-medium hidden sm:inline">
                محققة ميدانياً ومضافة لسجل الخدمة المدنية.
              </span>
            </div>
          </div>
        </div>

        {/* 3. Certificate Metadata Strip */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 my-2 rounded-2xl bg-[#f8faf7] border border-[#e2e8e2] text-xs">
          <div className="p-2 text-center border-l border-[#e2e8e2] last:border-l-0">
            <span className="block text-[11px] text-[#526356] mb-0.5">الجهة المستضيفة</span>
            <span className="font-bold text-[#142217] leading-tight block truncate">
              {certificate.issuingNgoName}
            </span>
          </div>
          <div className="p-2 text-center border-l border-[#e2e8e2] last:border-l-0">
            <span className="block text-[11px] text-[#526356] mb-0.5">رقم الاعتماد الولائي</span>
            <span className="font-mono font-bold text-[#006233]">{certificate.issuingNgoLicense}</span>
          </div>
          <div className="p-2 text-center border-l border-[#e2e8e2] last:border-l-0">
            <span className="block text-[11px] text-[#526356] mb-0.5">تاريخ الإصدار</span>
            <span className="font-bold text-[#142217]">{certificate.issueDate}</span>
          </div>
          <div className="p-2 text-center">
            <span className="block text-[11px] text-[#526356] mb-0.5">الولاية المعتمدة</span>
            <span className="font-bold text-[#142217]">{certificate.wilaya}</span>
          </div>
        </div>

        {/* 4. Dual Official Institutional Seals & Verification QR */}
        <div className="relative pt-6 mt-4 border-t-2 border-[#006233]/20 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* SEAL 1: Official Seal of the Host Organization (ختم المنظمة المستضيفة) */}
          <div className="flex flex-col items-center text-center space-y-2">
            <span className="text-[11px] font-bold text-[#526356] uppercase tracking-wider">
              ختم واعتماد المنظمة المستضيفة
            </span>

            {/* Authentic Circular Host Organization Seal SVG */}
            <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-[#0a482b] p-1 flex items-center justify-center bg-white shadow-xs">
              <div className="w-full h-full rounded-full border border-[#0a482b] flex flex-col items-center justify-center p-2 text-center text-[#0a482b] relative overflow-hidden">
                <span className="text-[7.5px] font-bold leading-none line-clamp-2">
                  {certificate.issuingNgoName}
                </span>
                <div className="my-1 w-8 h-[1px] bg-[#0a482b]" />
                <span className="text-[7px] font-mono font-bold">
                  {certificate.issuingNgoLicense}
                </span>
                <span className="mt-1 px-1.5 py-0.5 rounded text-[8px] font-black bg-[#e6f3ec] text-[#006233] border border-[#006233]/40">
                  معتمد وموثق
                </span>

                {/* Simulated Stamp Angled Ink Overlay */}
                <div className="absolute inset-0 border-2 border-[#0a482b]/30 rounded-full pointer-events-none transform rotate-12" />
              </div>
            </div>

            <div className="text-center pt-1">
              <p className="text-xs font-bold text-[#142217]">{certificate.signerName}</p>
              <p className="text-[10px] text-[#526356]">{certificate.signerRole}</p>
            </div>
          </div>

          {/* Central QR Code: Real Scannable QR Code linking to /verify */}
          <div className="flex flex-col items-center text-center space-y-2 order-last md:order-none">
            <div className="p-2 rounded-2xl bg-white border-2 border-[#006233]/30 shadow-md">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Scannable Certificate Verification QR"
                  className="w-24 h-24 rounded-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">
                  جارٍ إنشاء الرمز...
                </div>
              )}
            </div>
            <div className="space-y-0.5">
              <span className="block text-[10px] font-mono font-bold text-[#006233] uppercase tracking-wider">
                امسح للتحقق الفوري (QR)
              </span>
              <span className="block text-[9px] font-mono text-[#526356]">
                {certificate.serialNumber}
              </span>
            </div>
          </div>

          {/* SEAL 2: Official Seal of the Platform (ختم واعتماد المنصة الوطنية) */}
          <div className="flex flex-col items-center text-center space-y-2">
            <span className="text-[11px] font-bold text-[#526356] uppercase tracking-wider">
              ختم واعتماد المنصة الوطنية
            </span>

            {/* Authentic Circular National Platform Seal SVG */}
            <div className="relative w-28 h-28 rounded-full border-2 border-double border-[#006233] p-1 flex items-center justify-center bg-white shadow-xs">
              <div className="w-full h-full rounded-full border border-[#006233] flex flex-col items-center justify-center p-2 text-center text-[#006233] relative overflow-hidden bg-radial from-white to-emerald-50/40">
                <span className="text-[7.5px] font-bold leading-none">
                  المرصد الوطني للمجتمع المدني
                </span>
                {/* Crescent & Star Emblem SVG */}
                <div className="my-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#d21034]">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.4 0 4.6-.85 6.32-2.27-3.95-.57-7-3.96-7-8.08s3.05-7.51 7-8.08C16.6 2.85 14.4 2 12 2zm3.5 7.5l.93 1.9 2.07.3-1.5 1.46.35 2.09-1.85-.97-1.85.97.35-2.09-1.5-1.46 2.07-.3.93-1.9z" />
                  </svg>
                </div>
                <span className="text-[7.5px] font-black tracking-tight text-[#006233]">
                  السجل الرقمي المعتمد
                </span>
                <span className="text-[6.5px] font-mono text-[#526356] mt-0.5">
                  رقم القيد: {certificate.id}
                </span>

                <div className="absolute inset-0 border border-[#d4af37]/40 rounded-full pointer-events-none" />
              </div>
            </div>

            <div className="text-center pt-1">
              <p className="text-xs font-bold text-[#142217]">إدارة التوثيق والاعتماد</p>
              <p className="text-[10px] text-[#006233]">المنصة الوطنية للعمل التطوعي</p>
            </div>
          </div>
        </div>

        {/* 5. Cryptographic Ledger Hash & Security Watermark Footer */}
        <div className="relative mt-6 pt-3 border-t border-[#e2e8e2] text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#006233] font-bold">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>وثيقة مشفرة ومؤمنة ضد التزوير مرتبطة بقاعدة البيانات الوطنية</span>
          </div>
          <p className="text-[9px] font-mono text-[#526356] break-all select-all">
            بصمة التشفير الرقمية (SHA-256):{' '}
            <span className="font-bold text-[#142217]">{certificate.cryptoHash}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
