import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
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
  Lightbulb,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  Mail,
  User,
  Laptop,
  BookOpen,
} from 'lucide-react';
import { ScreenPlaceholder } from '../components/common/ScreenPlaceholder';
import {
  MOCK_NGOS,
  getStoredProposals,
  updateProposalStatus,
  type Ngo,
  type WorkshopProposal,
} from '../mock/data';

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
  const [searchParams, setSearchParams] = useSearchParams();

  // Active NGO switcher (from query param or default to Sebdou if provided, else ngo-sebdou-youth)
  const initialNgoId = searchParams.get('ngoId') || 'ngo-sebdou-youth';
  const initialTab = searchParams.get('tab') === 'proposals' ? 'proposals' : 'applicants';

  const [currentNgoId, setCurrentNgoId] = useState<string>(initialNgoId);
  const [activeTab, setActiveTab] = useState<'applicants' | 'proposals'>(initialTab);
  const [proposalStatusFilter, setProposalStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  // Rejection Modal State
  const [rejectingProposalId, setRejectingProposalId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('عدم توفر قاعة مجهزة في الموعد المقترح');

  // Stored Workshop Proposals
  const [proposals, setProposals] = useState<WorkshopProposal[]>(() => getStoredProposals());

  // Applicants State
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
    {
      id: 4,
      name: 'مجدوب محمد زكرياء',
      opportunity: 'تأطير ورشة سكراتش للأطفال بدار الشباب سبدو',
      status: 'مقبول',
      hours: 14,
      certificateIssued: true,
    },
    {
      id: 5,
      name: 'شاوي عبد الصمد',
      opportunity: 'ورشة سكراتش والمنطق البرمجي بسبدو',
      status: 'مقبول',
      hours: 14,
      certificateIssued: false,
    },
  ]);

  // Modal State for Certificate Issuing
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [certRole, setCertRole] = useState<'participant' | 'host'>('participant');
  const [certHours, setCertHours] = useState<number>(8);
  const [successCertId, setSuccessCertId] = useState<string | null>(null);

  // Sync proposals on mount and storage events
  useEffect(() => {
    const handleUpdate = () => {
      setProposals(getStoredProposals());
    };
    window.addEventListener('volunteernet_proposals_updated', handleUpdate);
    return () => window.removeEventListener('volunteernet_proposals_updated', handleUpdate);
  }, []);

  // Update query param when switching tab or NGO
  const handleSelectNgo = (ngoId: string) => {
    setCurrentNgoId(ngoId);
    setSearchParams({ tab: activeTab, ngoId });
  };

  const handleSelectTab = (tab: 'applicants' | 'proposals') => {
    setActiveTab(tab);
    setSearchParams({ tab, ngoId: currentNgoId });
  };

  const currentNgo: Ngo =
    MOCK_NGOS.find((n) => n.id === currentNgoId) ||
    MOCK_NGOS.find((n) => n.id === 'ngo-sebdou-youth') ||
    MOCK_NGOS[0];

  // Filtered proposals for the currently selected NGO
  const ngoProposals = proposals.filter((p) => p.ngoId === currentNgo.id);
  const pendingCount = ngoProposals.filter((p) => p.status === 'pending').length;

  const filteredProposals = ngoProposals.filter((p) => {
    if (proposalStatusFilter === 'all') return true;
    return p.status === proposalStatusFilter;
  });

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

    const generatedId = `CERT-DZ-2026-${Math.floor(100 + Math.random() * 900)}`;
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === selectedApplicant.id ? { ...a, certificateIssued: true } : a
      )
    );
    setSuccessCertId(generatedId);
  };

  // Proposal Acceptance / Rejection Handlers
  const handleAcceptProposal = (proposalId: string) => {
    updateProposalStatus(proposalId, 'accepted');
    setProposals(getStoredProposals());
  };

  const handleOpenRejectModal = (proposalId: string) => {
    setRejectingProposalId(proposalId);
    setRejectionReason('عدم توفر قاعة مجهزة في الموعد المقترح');
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingProposalId) return;

    updateProposalStatus(rejectingProposalId, 'rejected', rejectionReason);
    setProposals(getStoredProposals());
    setRejectingProposalId(null);
  };

  return (
    <ScreenPlaceholder
      title={t('screens.ngo_dashboard.title')}
      description={t('screens.ngo_dashboard.description')}
      screenCode="لوحة تحكم المؤسسة والجمعية (fecf895f)"
      relatedLinks={[
        { label: '💡 اقترح ورشة تدريبية', to: '/suggest-workshop' },
        { label: t('nav.opportunities'), to: '/opportunities' },
        { label: t('nav.verify'), to: '/verify' },
        { label: t('nav.home'), to: '/' },
      ]}
    >
      <div className="space-y-6">
        {/* ORGANIZATION SWITCHER & PROFILE HEADER */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Org identity */}
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-[var(--color-text)]">
                    {currentNgo.name}
                  </h2>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300">
                    معتمدة رسمياً ✓
                  </span>
                  {currentNgo.id === 'ngo-sebdou-youth' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>قطاع الشباب والرياضة</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    <span>ولاية {currentNgo.wilaya}</span>
                  </span>
                  <span>•</span>
                  <span>رقم الاعتماد: <strong className="font-mono text-[var(--color-text)]">{currentNgo.licenseNumber}</strong></span>
                  <span>•</span>
                  <span>هاتف: <span className="font-mono text-[var(--color-text)]">{currentNgo.phone}</span></span>
                </div>
              </div>
            </div>

            {/* Switch Organization Dropdown & New Initiative Button */}
            <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-[var(--color-border)] w-full lg:w-auto">
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <span className="text-xs font-semibold text-[var(--color-text-muted)] whitespace-nowrap">
                  تغيير المؤسسة:
                </span>
                <select
                  value={currentNgoId}
                  onChange={(e) => handleSelectNgo(e.target.value)}
                  className="text-xs px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  {MOCK_NGOS.map((ngo) => (
                    <option key={ngo.id} value={ngo.id}>
                      {ngo.name} ({ngo.wilaya})
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to="/opportunities/new"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>نشر مبادرة جديدة</span>
              </Link>
            </div>
          </div>
        </div>

        {/* TABS SWITCHER */}
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
          <button
            type="button"
            onClick={() => handleSelectTab('applicants')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'applicants'
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>المترشحون والاعتمادات الميدانية</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'applicants'
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
              }`}
            >
              {applicants.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('proposals')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
              activeTab === 'proposals'
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>مقترحات الورشات والدورات الواردة</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 animate-pulse">
                {pendingCount} جديد
              </span>
            )}
            {pendingCount === 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'proposals'
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
                }`}
              >
                {ngoProposals.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: APPLICANTS & CERTIFICATES */}
        {activeTab === 'applicants' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[var(--color-primary-container)] text-[var(--color-primary)]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-text)]">
                    قائمة المتطوعين المسجلين بالمبادرات
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    مراجعة مشاركة المتطوعين الميدانية وتوثيق الساعات الرسمية
                  </p>
                </div>
              </div>
            </div>

            {/* Applicants Table */}
            <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
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
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--color-primary)] text-white font-bold text-[11px] hover:bg-[var(--color-primary-hover)] transition-all shadow-xs cursor-pointer"
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
                            className="p-1 rounded hover:bg-[var(--color-primary-container)] text-[var(--color-primary)] cursor-pointer"
                            title="قبول"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(item.id, 'مرفوض')}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600 dark:hover:bg-rose-950/40 cursor-pointer"
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
        )}

        {/* TAB 2: INCOMING WORKSHOP PROPOSALS */}
        {activeTab === 'proposals' && (
          <div className="space-y-5">
            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text)]">
                  مقترحات الورشات التكوينية المقدمة لـ {currentNgo.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  يمكن للمؤسسة قبول المقترح لتوفير القاعة والعتاد، أو رفضه وتوضيح السبب
                </p>
              </div>

              {/* Status Chips */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setProposalStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    proposalStatusFilter === 'all'
                      ? 'bg-[var(--color-primary)] text-white shadow-xs'
                      : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  الكل ({ngoProposals.length})
                </button>
                <button
                  type="button"
                  onClick={() => setProposalStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    proposalStatusFilter === 'pending'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  قيد الدراسة 🟡 ({ngoProposals.filter((p) => p.status === 'pending').length})
                </button>
                <button
                  type="button"
                  onClick={() => setProposalStatusFilter('accepted')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    proposalStatusFilter === 'accepted'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  المقبولة 🟢 ({ngoProposals.filter((p) => p.status === 'accepted').length})
                </button>
                <button
                  type="button"
                  onClick={() => setProposalStatusFilter('rejected')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    proposalStatusFilter === 'rejected'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  المرفوضة 🔴 ({ngoProposals.filter((p) => p.status === 'rejected').length})
                </button>
              </div>
            </div>

            {/* Proposals Cards List */}
            {filteredProposals.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] flex items-center justify-center">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[var(--color-text)]">
                  لا توجد مقترحات ورشات مطابقة للتصفية الحالية
                </h4>
                <p className="text-xs text-[var(--color-text-muted)] max-w-sm mx-auto">
                  يمكن للمتطوعين تقديم مقترحات تكوينية جديدة مباشرة لـ {currentNgo.name} عبر صفحة
                  الاقتراحات.
                </p>
                <Link
                  to={`/suggest-workshop?ngoId=${currentNgo.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold transition-all hover:bg-[var(--color-primary-hover)] shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>تقديم مقترح ورشة تدريبية جديدة</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProposals.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-[var(--color-primary)]/40 transition-all"
                  >
                    {/* Header: Title + Status + Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[var(--color-primary-container)] text-[var(--color-primary)]">
                            {item.category}
                          </span>
                          <span className="text-[11px] font-semibold text-[var(--color-text-muted)] font-mono">
                            {item.id}
                          </span>
                          <span className="text-[11px] text-[var(--color-text-muted)]">
                            • قُدم بتاريخ: {item.submittedAt}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[var(--color-text)]">
                          {item.title}
                        </h3>
                      </div>

                      {/* Status Badge */}
                      <div className="shrink-0">
                        {item.status === 'accepted' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>مقبول وتمت المصادقة ✓</span>
                          </span>
                        ) : item.status === 'rejected' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>تم الاعتذار عن الاستضافة</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>قيد الدراسة والمراجعة 🟡</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[var(--color-surface-muted)] p-3 rounded-xl border border-[var(--color-border)]">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[var(--color-primary)]" />
                        <div>
                          <span className="text-[10px] text-[var(--color-text-muted)] block">المؤطر المتطوع:</span>
                          <strong className="text-[var(--color-text)]">{item.volunteerName}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                        <div>
                          <span className="text-[10px] text-[var(--color-text-muted)] block">الحجم الساعي والتاريخ:</span>
                          <strong className="text-[var(--color-text)]">
                            {item.durationHours} ساعة • {item.proposedDate}
                          </strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[var(--color-primary)]" />
                        <div>
                          <span className="text-[10px] text-[var(--color-text-muted)] block">الفئة المستهدفة:</span>
                          <strong className="text-[var(--color-text)] truncate block max-w-[200px]">
                            {item.targetAudience}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="text-xs text-[var(--color-text)] leading-relaxed space-y-1">
                      <span className="font-bold text-[var(--color-text-muted)] text-[11px] block">
                        وصف المحتوى والمنهجية:
                      </span>
                      <p>{item.description}</p>
                    </div>

                    {/* Learning Outcomes & Logistics Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                      {/* Learning Outcomes */}
                      {item.learningOutcomes && item.learningOutcomes.length > 0 && (
                        <div className="p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1.5">
                          <span className="font-bold text-[var(--color-text)] flex items-center gap-1.5 text-[11px]">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                            <span>المخرجات التكوينية المتوقعة:</span>
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-[11px] text-[var(--color-text-muted)]">
                            {item.learningOutcomes.map((out, idx) => (
                              <li key={idx} className="leading-snug">{out}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Equipment Needed */}
                      {item.equipmentNeeded && item.equipmentNeeded.length > 0 && (
                        <div className="p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1.5">
                          <span className="font-bold text-[var(--color-text)] flex items-center gap-1.5 text-[11px]">
                            <Laptop className="w-3.5 h-3.5 text-cyan-600" />
                            <span>العتاد المطلوب توفيره من قِبل {currentNgo.name}:</span>
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-[11px] text-[var(--color-text-muted)]">
                            {item.equipmentNeeded.map((eq, idx) => (
                              <li key={idx} className="leading-snug">{eq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Rejection Note if rejected */}
                    {item.status === 'rejected' && item.rejectionReason && (
                      <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200">
                        <strong>سبب الاعتذار: </strong>
                        <span>{item.rejectionReason}</span>
                      </div>
                    )}

                    {/* Volunteer Contact Details */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-border)] text-xs">
                      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                        {item.volunteerPhone && (
                          <a
                            href={`tel:${item.volunteerPhone}`}
                            className="flex items-center gap-1 hover:text-[var(--color-primary)] font-mono"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item.volunteerPhone}</span>
                          </a>
                        )}
                        {item.volunteerEmail && (
                          <a
                            href={`mailto:${item.volunteerEmail}`}
                            className="flex items-center gap-1 hover:text-[var(--color-primary)] font-mono"
                          >
                            <Mail className="w-3.5 h-3.5 text-blue-600" />
                            <span>{item.volunteerEmail}</span>
                          </a>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {item.status === 'pending' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleAcceptProposal(item.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>قبول وتأكيد الورشة ✓</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenRejectModal(item.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-all cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>الاعتذار (رفض)</span>
                            </button>
                          </>
                        ) : item.status === 'accepted' ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>تمت الموافقة بتاريخ {item.responseDate || 'مؤخراً'}</span>
                            </span>
                            <Link
                              to="/opportunities/new"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-all"
                            >
                              <span>نشر كفرصة رسمية</span>
                            </Link>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAcceptProposal(item.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-semibold text-[var(--color-text)] transition-all"
                          >
                            <span>إعادة فتح المقترح وقبوله</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL: REJECT PROPOSAL REASON */}
        {rejectingProposalId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-md rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-rose-600">
                  <XCircle className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-[var(--color-text)]">
                    الاعتذار عن استضافة المقترح التكويني
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setRejectingProposalId(null)}
                  className="p-1 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  يرجى تحديد سبب تعذر قبول الورشة لإعلام المتطوع وتوضيح الموانع التنظيمية أو
                  اللوجستية:
                </p>

                <div className="space-y-2">
                  <label className="block font-bold text-[var(--color-text)]">سبب الاعتذار:</label>
                  <textarea
                    rows={3}
                    required
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-2 focus:ring-rose-500 text-xs leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRejectingProposalId(null)}
                    className="px-4 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-surface-hover)]"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>تأكيد تسجيل الاعتذار</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Issue Accredited Certificate (Existing) */}
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

                  {/* Role Selector */}
                  <div className="space-y-2">
                    <label className="block font-bold text-[var(--color-text)]">
                      دور وصفة المتطوع في الفعالية:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCertRole('participant')}
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
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
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
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

                  {/* Duration */}
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

                  {/* Dual Seal Notice */}
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>الأختام الرقمية الرسمية المدرجة بالشهادة:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[10px] opacity-90 pr-1">
                      <li>ختم واعتماد المنظمة المستضيفة ({currentNgo.name})</li>
                      <li>ختم واعتماد المنصة الوطنية (المرصد الوطني للمجتمع المدني)</li>
                      <li>توليد رمز استجابة سريع (QR) مشفر ببصمة SHA-256 لمنع التزوير</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedApplicant(null)}
                      className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-surface-hover)] cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
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
                      className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-surface-hover)] cursor-pointer"
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

export default NgoDashboardScreen;
