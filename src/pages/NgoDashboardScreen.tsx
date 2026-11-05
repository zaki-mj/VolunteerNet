import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Users,
  PlusCircle,
  CheckCircle,
  XCircle,
  Award,
  ShieldCheck,
  CheckCircle2,
  X,
  FileCheck,
} from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';

interface Applicant {
  id: number;
  name: string;
  opportunity: string;
  status: string;
  hours: number;
  certificateIssued?: boolean;
}

export const NgoDashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 1,
      name: 'أمين بن علي',
      opportunity: 'حملة تشجير السد الأخضر 2026',
      status: 'مقبول',
      hours: 8,
      certificateIssued: true,
    },
    {
      id: 2,
      name: 'سارة مراد',
      opportunity: 'ورشة مبادئ الإسعافات الأولية',
      status: 'مقبول',
      hours: 16,
      certificateIssued: false,
    },
    {
      id: 3,
      name: 'ياسين بوقرة',
      opportunity: 'تأطير ورشات البرمجة والذكاء الاصطناعي',
      status: 'قيد الانتظار',
      hours: 12,
      certificateIssued: false,
    },
  ]);

  // Modal State for Certificate Issuing
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [certRole, setCertRole] = useState<'participant' | 'host'>('participant');
  const [certHours, setCertHours] = useState<number>(8);
  const [successCertId, setSuccessCertId] = useState<string | null>(null);

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleOpenIssueModal = (app: Applicant) => {
    setSelectedApplicant(app);
    setCertHours(app.hours);
    setCertRole('participant');
    setSuccessCertId(null);
  };

  const handleConfirmIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplicant) return;

    // Simulate issuing in national registry
    const generatedId = `CERT-DZ-2026-${Math.floor(100 + Math.random() * 900)}`;
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === selectedApplicant.id ? { ...a, certificateIssued: true } : a
      )
    );
    setSuccessCertId(generatedId);
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
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--color-primary-container)] text-[var(--color-primary)]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">
                قائمة المترشحين وإصدار الاعتمادات الرسمية
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                اعتماد ساعات التطوع الميدانية وإصدار وثائق الشهادات الرقمية المشفرة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Link
              to="/opportunities/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-xs hover:scale-102"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>نشر مبادرة جديدة</span>
            </Link>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              الهلال الأحمر الجزائري (معتمدة ✓)
            </span>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]">
                <th className="py-3 px-3.5 font-bold">اسم المتطوع</th>
                <th className="py-3 px-3.5 font-bold">المبادرة الميدانية</th>
                <th className="py-3 px-3.5 font-bold">الساعات المنجزة</th>
                <th className="py-3 px-3.5 font-bold">حالة الطلب</th>
                <th className="py-3 px-3.5 font-bold text-center">اعتماد الشهادة</th>
                <th className="py-3 px-3.5 font-bold text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {applicants.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                  <td className="py-3.5 px-3.5 font-semibold text-[var(--color-text)]">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-3.5 text-[var(--color-text-muted)]">
                    {item.opportunity}
                  </td>
                  <td className="py-3.5 px-3.5 font-mono font-bold text-[var(--color-primary)]">
                    {item.hours} س
                  </td>
                  <td className="py-3.5 px-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
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
                  <td className="py-3.5 px-3.5 text-center">
                    {item.status === 'مقبول' ? (
                      item.certificateIssued ? (
                        <Link
                          to={`/certificates/CERT-DZ-2026-891`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 font-bold text-[11px] hover:underline"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>معتمدة (عرض الوثيقة)</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenIssueModal(item)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--color-primary)] text-white font-bold text-[11px] hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>إصدار شهادة معتمدة</span>
                        </button>
                      )
                    ) : (
                      <span className="text-[11px] text-[var(--color-text-muted)]">
                        يلزم القبول أولاً
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3.5 text-center">
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

        {/* Modal: Issue Accredited Certificate */}
        {selectedApplicant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-lg rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[var(--color-primary-container)] text-[var(--color-primary)]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-text)]">
                      إصدار شهادة تطوع معتمدة رسمياً
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      الجمهورية الجزائرية الديمقراطية الشعبية • السجل الرقمي
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!successCertId ? (
                <form onSubmit={handleConfirmIssue} className="space-y-4 text-xs">
                  {/* Recipient summary */}
                  <div className="p-3 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">اسم المتطوع:</span>
                      <strong className="text-[var(--color-text)] font-bold">{selectedApplicant.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">المبادرة:</span>
                      <span className="text-[var(--color-text)] truncate max-w-[240px]">{selectedApplicant.opportunity}</span>
                    </div>
                  </div>

                  {/* Requirement 1: Role Selector (Host vs Participant) */}
                  <div className="space-y-2">
                    <label className="block font-bold text-[var(--color-text)]">
                      دور وصفة المتطوع في الفعالية:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCertRole('participant')}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          certRole === 'participant'
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary-container)] text-[var(--color-primary)] font-bold shadow-2xs'
                            : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                        }`}
                      >
                        <span className="block font-bold text-xs text-[var(--color-text)]">
                          متطوع مشارك (Participant)
                        </span>
                        <span className="text-[10px] block opacity-80 mt-0.5">
                          مشاركة ميدانية وإنجاز المهام التطوعية
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCertRole('host')}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          certRole === 'host'
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold shadow-2xs'
                            : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                        }`}
                      >
                        <span className="block font-bold text-xs text-[var(--color-text)]">
                          مؤطر ومنظم (Host / Leader)
                        </span>
                        <span className="text-[10px] block opacity-80 mt-0.5">
                          قيادة وتأطير المبادرة الميدانية
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Requirement 2: Duration in Hours */}
                  <div className="space-y-1.5">
                    <label className="block font-bold text-[var(--color-text)]">
                      حجم الساعات المعتمدة ميدانياً (Duration in Hours):
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={certHours}
                        onChange={(e) => setCertHours(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-mono font-bold text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)]"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-xs text-[var(--color-text-muted)] font-bold">
                        ساعات عمل مدني
                      </span>
                    </div>
                  </div>

                  {/* Requirement 3: Dual Seal Notice */}
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>الأختام الرقمية الرسمية المدرجة بالشهادة:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[10px] opacity-90 pr-1">
                      <li>ختم واعتماد المنظمة المستضيفة (الهلال الأحمر الجزائري - رقم CRA-DZ-16-001)</li>
                      <li>ختم واعتماد المنصة الوطنية (المرصد الوطني للمجتمع المدني)</li>
                      <li>توليد رمز استجابة سريع (QR) مشفر ببصمة SHA-256 لمنع التزوير</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedApplicant(null)}
                      className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-surface-hover)]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-md"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>تأكيد وإصدار الشهادة الرسمية</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Success View */
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-[var(--color-text)]">
                      تم إصدار وتوثيق الشهادة بنجاح!
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] font-mono">
                      الرقم التسلسلي: {successCertId}
                    </p>
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)] max-w-sm mx-auto leading-relaxed">
                    تم توثيق ساعات التطوع ({certHours} ساعة) بصفة ({certRole === 'host' ? 'مؤطر ومنظم' : 'متطوع مشارك'}) في السجل الوطني وإرسال الوثيقة لمحفظة المتطوع.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Link
                      to={`/certificates/CERT-DZ-2026-891`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-sm"
                    >
                      <Award className="w-4 h-4" />
                      <span>معاينة الشهادة والطباعة الرسمية</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedApplicant(null)}
                      className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-surface-hover)]"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ScreenPlaceholder>
  );
};
