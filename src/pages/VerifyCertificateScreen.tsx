import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { MOCK_CERTIFICATES, type CertificateRecord } from '../mock/data';

export const VerifyCertificateScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [certInput, setCertInput] = useState('');
  const [currentCertificate, setCurrentCertificate] = useState<CertificateRecord | null>(null);
  const [searched, setSearched] = useState(false);

  const queryId = searchParams.get('id');

  useEffect(() => {
    if (queryId) {
      setCertInput(queryId);
      performSearch(queryId);
    } else {
      // Default to first valid certificate for preview
      setCertInput('CERT-DZ-2026-891');
      performSearch('CERT-DZ-2026-891');
    }
  }, [queryId]);

  const performSearch = (searchTerm: string) => {
    const clean = searchTerm.trim().toLowerCase();
    const found = MOCK_CERTIFICATES.find(
      (c) =>
        c.id.toLowerCase() === clean ||
        c.serialNumber.toLowerCase() === clean ||
        c.cryptoHash.toLowerCase().startsWith(clean)
    );
    setCurrentCertificate(found || null);
    setSearched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certInput.trim()) {
      setSearchParams({ id: certInput.trim() });
      performSearch(certInput.trim());
    }
  };

  const handleSelectSample = (id: string) => {
    setCertInput(id);
    setSearchParams({ id });
    performSearch(id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-[var(--color-primary-container)] text-[var(--color-primary)] shadow-xs">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          منظومة التحقق من صحة شهادات التطوع الرسمية
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-xl mx-auto">
          البوابة الوطنية الموحدة للمؤسسات وأرباب العمل والجامعات للتحقق الفوري من صحة وموثوقية ساعات التطوع والشهادات الرقمية المعتمدة.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-xs font-bold text-[var(--color-text)]">
            أدخل الرقم التسلسلي للشهادة أو المعرف الرقمي أو البصمة الإلكترونية (Hash)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="مثال: CERT-DZ-2026-891 أو VN-2026-CRA-0891-ALG"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-mono text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-bold transition-all shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>فحص الوثيقة</span>
            </button>
          </div>
        </form>

        {/* Quick Sample Pickers for Testing */}
        <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--color-text-muted)] font-medium">نماذج اختبار سريعة:</span>
          <button
            type="button"
            onClick={() => handleSelectSample('CERT-DZ-2026-891')}
            className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] hover:underline border border-emerald-200 dark:border-emerald-800"
          >
            CERT-DZ-2026-891 (شهادة سارية ✓)
          </button>
          <button
            type="button"
            onClick={() => handleSelectSample('CERT-DZ-2026-442')}
            className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] hover:underline border border-emerald-200 dark:border-emerald-800"
          >
            CERT-DZ-2026-442 (السد الأخضر ✓)
          </button>
          <button
            type="button"
            onClick={() => handleSelectSample('CERT-DZ-2025-999')}
            className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-mono text-[11px] hover:underline border border-rose-200 dark:border-rose-800"
          >
            CERT-DZ-2025-999 (شهادة مسحوبة ✕)
          </button>
        </div>
      </div>

      {/* Verification Result Breakdown */}
      {searched && (
        <div className="space-y-6">
          {currentCertificate ? (
            currentCertificate.status === 'verified' ? (
              /* Verified & Valid Card */
              <div className="p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-[var(--color-text)] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200 dark:border-emerald-800/60">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                        شهادة رسمية مطابقة وموثقة
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-emerald-950 dark:text-emerald-100">
                        سارية ومسجلة في السجل الوطني
                      </h2>
                    </div>
                  </div>

                  <Link
                    to={`/certificates/${currentCertificate.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs self-start sm:self-center"
                  >
                    <span>معاينة الشهادة الكاملة والطباعة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Data Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#101c15] border border-emerald-100 dark:border-emerald-900 shadow-2xs space-y-1">
                    <span className="text-[var(--color-text-muted)] block">اسم المتطوع المعتمد</span>
                    <strong className="text-sm font-bold block">{currentCertificate.volunteerName}</strong>
                    <span className="font-mono text-[11px] text-[var(--color-primary)]">{currentCertificate.volunteerId}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#101c15] border border-emerald-100 dark:border-emerald-900 shadow-2xs space-y-1">
                    <span className="text-[var(--color-text-muted)] block">الصفة والدور المعتمد</span>
                    <strong className="text-sm font-bold block text-[#006233] dark:text-emerald-400">
                      {currentCertificate.participationRole === 'host' ? 'مؤطّر ومُنظّم (Host)' : 'مُتطوّع مُشارِك (Participant)'}
                    </strong>
                    <span className="text-[11px] text-[var(--color-text-muted)]">معتمد في السجل الوطني</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#101c15] border border-emerald-100 dark:border-emerald-900 shadow-2xs space-y-1">
                    <span className="text-[var(--color-text-muted)] block">الجهة المستضيفة</span>
                    <strong className="text-sm font-bold block truncate">{currentCertificate.issuingNgoName}</strong>
                    <span className="font-mono text-[11px] text-[var(--color-primary)]">{currentCertificate.issuingNgoLicense}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#101c15] border border-emerald-100 dark:border-emerald-900 shadow-2xs space-y-1">
                    <span className="text-[var(--color-text-muted)] block">حجم الساعات المعتمدة</span>
                    <strong className="text-sm font-bold text-[var(--color-secondary)] block font-mono">
                      {currentCertificate.hoursAccredited} ساعة تطوعية
                    </strong>
                    <span className="text-[11px] text-[var(--color-text-muted)]">ولاية {currentCertificate.wilaya}</span>
                  </div>
                </div>

                {/* Cryptographic Trust Pillars */}
                <div className="p-4 rounded-xl bg-white/80 dark:bg-[#101c15]/80 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>تأكيد السلامة الرقمية ومقاومة التلاعب (Tamper-Proof)</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                    تم التوقيع إلكترونياً على هذه الوثيقة باستخدام المفاتيح المعتمدة للجهة المشرفة، ومطابقتها مع السجل الوطني المركزي للتطوع في الجزائر.
                  </p>
                  <div className="pt-1 font-mono text-[10px] text-emerald-900 dark:text-emerald-200 break-all bg-emerald-50 dark:bg-emerald-950/60 p-2 rounded-lg border border-emerald-200 dark:border-emerald-900">
                    SHA-256 HASH: {currentCertificate.cryptoHash}
                  </div>
                </div>
              </div>
            ) : (
              /* Revoked / Flagged Card */
              <div className="p-6 sm:p-8 rounded-2xl border-2 border-rose-500/40 bg-rose-50/40 dark:bg-rose-950/20 text-[var(--color-text)] shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-rose-200 dark:border-rose-900">
                  <div className="p-3 rounded-full bg-rose-600 text-white shadow-xs">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
                      تحذير تدقيق أمني
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-rose-950 dark:text-rose-100">
                      شهادة غير معتمدة أو تم سحبها
                    </h2>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#101c15] border border-rose-200 dark:border-rose-900 space-y-2 text-xs">
                  <p className="font-bold text-rose-800 dark:text-rose-300">سبب سحب الاعتماد:</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {currentCertificate.revocationReason || 'تم تعليق هذه الشهادة لمخالفتها معايير التوثيق الميداني المعتمدة.'}
                  </p>
                </div>
              </div>
            )
          ) : (
            /* Not Found State */
            <div className="p-8 text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)]">لم يتم العثور على أي شهادة بهذا الرمز</h3>
              <p className="text-xs text-[var(--color-text-muted)] max-w-md mx-auto">
                يرجى التأكد من كتابة الرقم التسلسلي بدقة، أو مسح رمز الاستجابة السريعة (QR) مباشرة من وثيقة المتطوع.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
