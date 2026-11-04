import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  FileText,
  Search,
  AlertTriangle,
} from 'lucide-react';
import { MOCK_NGOS, type Ngo } from '../mock/data';
import { useAuth } from '../context/AuthContext';

export const TechTeamAdminScreen: React.FC = () => {
  const { role } = useAuth();
  const [ngos, setNgos] = useState<Ngo[]>(MOCK_NGOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [auditNotification, setAuditNotification] = useState<string | null>(null);

  const pendingNgos = ngos.filter((n) => n.status === 'pending');
  const activeNgos = ngos.filter((n) => n.status === 'active');
  const suspendedNgos = ngos.filter((n) => n.status === 'suspended');

  const filteredNgos = ngos.filter((ngo) => {
    const matchesQuery =
      ngo.name.includes(searchQuery) ||
      ngo.licenseNumber.includes(searchQuery) ||
      ngo.wilaya.includes(searchQuery);
    const matchesStatus =
      statusFilter === 'all' ? true : ngo.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleApprove = (id: string, name: string) => {
    setNgos((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: 'active',
              documents: { ...n.documents, wilayaApproval: true },
            }
          : n
      )
    );
    setAuditNotification(`تم منح الاعتماد الرقمي الرسمي بنجاح لـ: ${name}`);
    setTimeout(() => setAuditNotification(null), 5000);
  };

  const handleToggleSuspend = (id: string, currentStatus: string, name: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    setNgos((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: newStatus as any } : n))
    );
    setAuditNotification(
      newStatus === 'suspended'
        ? `تم تعليق نشاط الجمعية وإيقاف إصدار الشهادات لـ: ${name}`
        : `تم إعادة تفعيل اعتماد: ${name}`
    );
    setTimeout(() => setAuditNotification(null), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Admin Title & Authority Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              بوابة الفريق التقني والإشراف المركزي
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              ROLE: {role.toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight mt-1">
            إدارة الجمعيات والتحقق من التراخيص
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] max-w-2xl mt-1">
            مراجعة طلبات اعتماد الجمعيات الجديدة، تدقيق الوثائق القانونية والولائية، وحماية نزاهة الشهادات المعتمدة من التزوير.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="p-2 rounded-xl bg-[var(--color-primary-container)] text-[var(--color-primary)]">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Audit Notification Banner */}
      {auditNotification && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{auditNotification}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs">
          <span className="text-xs text-[var(--color-text-muted)] block">إجمالي الجمعيات المسجلة</span>
          <span className="text-2xl font-bold text-[var(--color-text)]">{ngos.length}</span>
          <span className="text-[11px] text-[var(--color-text-muted)] block mt-1">عبر كافة ولايات الوطن</span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900 shadow-xs">
          <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold block">طلبات الاعتماد المعلقة</span>
          <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">{pendingNgos.length}</span>
          <span className="text-[11px] text-amber-700/80 dark:text-amber-400/80 block mt-1">تتطلب تدقيق الوثائق</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900 shadow-xs">
          <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold block">جمعيات نشطة ومعتمدة</span>
          <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{activeNgos.length}</span>
          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 block mt-1">مخولة لإصدار الشهادات</span>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900 shadow-xs">
          <span className="text-xs text-rose-800 dark:text-rose-300 font-semibold block">حسابات موقوفة احترازياً</span>
          <span className="text-2xl font-bold text-rose-700 dark:text-rose-400">{suspendedNgos.length}</span>
          <span className="text-[11px] text-rose-700/80 dark:text-rose-400/80 block mt-1">بانتظار تجديد الاعتماد</span>
        </div>
      </div>

      {/* Priority Section: Pending Accreditation Reviews */}
      {pendingNgos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-[var(--color-text)]">
              ملفات الاعتماد قيد التدقيق القانوني ({pendingNgos.length})
            </h2>
          </div>

          <div className="space-y-3">
            {pendingNgos.map((ngo) => (
              <div
                key={ngo.id}
                className="p-5 rounded-xl border border-amber-300 bg-amber-50/30 dark:bg-amber-950/15 dark:border-amber-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-base text-[var(--color-text)]">{ngo.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      {ngo.licenseNumber}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">ولاية {ngo.wilaya}</span>
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)]">
                    الممثل القانوني: <strong className="text-[var(--color-text)]">{ngo.presidentName}</strong> • تاريخ التسجيل: {ngo.registrationDate} • البريد: {ngo.contactEmail}
                  </p>

                  {/* Document Compliance Indicators */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="text-[var(--color-text-muted)] font-medium">حالة الملف:</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] ${
                        ngo.documents.statute
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      <FileText className="w-3 h-3" /> النظام الأساسي (مطابق)
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] ${
                        ngo.documents.generalAssemblyMinutes
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      <FileText className="w-3 h-3" /> محضر الجلسة العامة
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] ${
                        ngo.documents.wilayaApproval
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                      }`}
                    >
                      <FileText className="w-3 h-3" /> وصل الإيداع الولائي (بانتظار المطابقة)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center">
                  <button
                    onClick={() => handleApprove(ngo.id, ngo.name)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>منح الاعتماد الرسمي وتفعيل الصلاحيات</span>
                  </button>
                  <button
                    onClick={() => alert(`تم إرسال إشعار للجمعية بضرورة إرفاق وصل الاعتماد الصادر عن ولاية ${ngo.wilaya}`)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[var(--color-border)] text-xs font-medium hover:bg-[var(--color-surface-hover)] transition-colors"
                  >
                    <span>طلب استكمال الملف</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Master NGO Directory Table */}
      <div className="space-y-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[var(--color-text)]">
              سجل الجمعيات المعتمدة والموقوفة
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              مراقبة التراخيص، إحصائيات الساعات الممنوحة، والتحكم في صلاحية إصدار الشهادات
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2.5 right-2.5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم أو الرقم أو الولاية..."
                className="pr-8 pl-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشطة فقط</option>
              <option value="pending">قيد التدقيق</option>
              <option value="suspended">موقوفة</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                <th className="py-3 px-3">اسم الجمعية والاعتماد</th>
                <th className="py-3 px-3">الولاية والتخصص</th>
                <th className="py-3 px-3 text-center">المتطوعين</th>
                <th className="py-3 px-3 text-center">الفرص النشطة</th>
                <th className="py-3 px-3 text-center">الحالة القانونية</th>
                <th className="py-3 px-3 text-center">إجراءات الحوكمة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredNgos.map((ngo) => (
                <tr key={ngo.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-[var(--color-text)]">{ngo.name}</div>
                    <div className="text-[11px] font-mono text-[var(--color-primary)] mt-0.5">
                      {ngo.licenseNumber}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-[var(--color-text)]">{ngo.wilaya}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{ngo.category}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-medium">
                    {ngo.verifiedVolunteers}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-medium">
                    {ngo.activeOpportunities}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        ngo.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                          : ngo.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                      }`}
                    >
                      {ngo.status === 'active'
                        ? 'معتمدة ونشطة'
                        : ngo.status === 'pending'
                        ? 'قيد التدقيق'
                        : 'معلقة مؤقتاً'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {ngo.status === 'pending' ? (
                      <button
                        onClick={() => handleApprove(ngo.id, ngo.name)}
                        className="px-2.5 py-1 rounded bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                      >
                        اعتماد
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleSuspend(ngo.id, ngo.status, ngo.name)}
                        className={`px-2.5 py-1 rounded font-medium transition-colors ${
                          ngo.status === 'active'
                            ? 'border border-rose-200 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                            : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                        }`}
                      >
                        {ngo.status === 'active' ? 'تجميد الاعتماد' : 'إلغاء التجميد'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
