import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  Calendar,
  Users,
  ShieldCheck,
  Award,
  Sparkles,
  Map as MapIcon,
  ChevronLeft,
} from 'lucide-react';
import { MOCK_OPPORTUNITIES, getStoredOpportunities } from '../mock/data';


export const resolveEventImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const OpportunityDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);

  // Look up opportunity by ID, fallback to the first
  const opportunity =
    getStoredOpportunities().find((opp) => opp.id === id) || MOCK_OPPORTUNITIES[0];

  const spotsLeft = opportunity.spotsTotal - opportunity.spotsTaken;
  const progressPercent = Math.min(
    100,
    Math.round((opportunity.spotsTaken / opportunity.spotsTotal) * 100)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* 🔙 Back link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع إلى قائمة الفرص</span>
        </button>

        <Link
          to={`/opportunities?view=map&wilaya=${encodeURIComponent(opportunity.wilaya)}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-primary)] transition-all shadow-2xs"
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>عرض موقع {opportunity.wilaya} على الخريطة التفاعلية</span>
        </Link>
      </div>

      {/* 🌟 Main Opportunity Hero Card */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)] font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>ولاية {opportunity.wilaya} • {opportunity.commune}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>تاريخ الانطلاق: {opportunity.startDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] leading-snug">
          {opportunity.title}
        </h1>

        {/* NGO Info Banner */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-bold text-sm shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-[var(--color-text)] block">
              {opportunity.ngoName}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              جمعية معتمدة رسمياً وموثقة لدى المنصة الوطنية
            </span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-center space-y-1">
            <Clock className="w-5 h-5 text-[var(--color-primary)] mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">الساعات المعتمدة</span>
            <span className="font-mono font-black text-sm text-[var(--color-text)]">
              {opportunity.hours} ساعات
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-center space-y-1">
            <Users className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">المقاعد المتاحة</span>
            <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
              {spotsLeft} من أصل {opportunity.spotsTotal}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-center space-y-1">
            <Award className="w-5 h-5 text-amber-500 mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">الشهادة الممنوحة</span>
            <span className="font-bold text-xs text-[var(--color-text)]">رقمية مشفرة</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-center space-y-1">
            <Calendar className="w-5 h-5 text-purple-500 mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">آخر أجل للتسجيل</span>
            <span className="font-mono font-bold text-xs text-[var(--color-text)]">
              {opportunity.deadline}
            </span>
          </div>
        </div>

        {/* Capacity Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-bold text-[var(--color-text-muted)]">
            <span>نسبة اكتمال التسجيل في المبادرة</span>
            <span className="font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--color-surface-muted)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-2 pt-2">
          <h3 className="font-bold text-sm text-[var(--color-text)]">عن المبادرة والهدف المجتمعي</h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            {opportunity.description}
          </p>
        </div>

        {/* Event Photos Gallery */}
        {opportunity.images && opportunity.images.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>معرض صور الفعالية (دار الشباب سبدو - ولاية تلمسان)</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                {opportunity.images.length} صور موثقة 📸
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              {/* Primary Photo: Kids in Dar Chabab Sebdou (7 cols) */}
              <div className="md:col-span-7 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-slate-900 relative min-h-[280px] shadow-sm group flex items-center justify-center">
                <img
                  src={resolveEventImageUrl(opportunity.images[1] || opportunity.images[0])}
                  alt="أطفال يبرمجون بدار الشباب سبدو"
                  className="w-full h-full max-h-[360px] object-cover object-top transition-transform duration-300 group-hover:scale-102"
                  onError={(e) => {
                    const filename = (opportunity.images![1] || opportunity.images![0]).split('/').pop();
                    e.currentTarget.src = `events/${filename}`;
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5 text-white">
                  <span className="font-bold text-xs block">
                    أطفال يبرمجون بقاعة الإعلام الآلي - دار الشباب سبدو (27 نوفمبر 2026)
                  </span>
                  <span className="text-[11px] text-slate-300">
                    تأطير وإشراف المتطوعين الشباب بولاية تلمسان
                  </span>
                </div>
              </div>

              {/* Secondary Photos / Logo (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                {/* Scratch Mascot */}
                <div className="flex-1 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-amber-500/10 dark:bg-amber-950/20 p-4 flex flex-col items-center justify-center relative shadow-xs">
                  <img
                    src={resolveEventImageUrl(opportunity.images[0])}
                    alt="شعار سكراتش"
                    className="w-full h-36 object-contain drop-shadow-sm"
                    onError={(e) => {
                      const filename = opportunity.images![0].split('/').pop();
                      e.currentTarget.src = `events/${filename}`;
                    }}
                  />
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-200 mt-2">
                    شعار الورشة التفاعلية • لغة سكراتش
                  </span>
                </div>

                {/* 3rd Image if exists */}
                {opportunity.images[2] && (
                  <div className="h-24 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-sky-50 dark:bg-sky-950/20 p-2 flex items-center justify-center shadow-xs">
                    <img
                      src={resolveEventImageUrl(opportunity.images[2])}
                      alt="Scratch banner"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const filename = opportunity.images![2].split('/').pop();
                        e.currentTarget.src = `events/${filename}`;
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mentors List */}
        {opportunity.mentors && opportunity.mentors.length > 0 && (
          <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] space-y-2.5">
            <h4 className="font-bold text-xs text-[var(--color-text)] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[var(--color-primary)]" />
              <span>المؤطرون والمدربون المعتمدون للورشة:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {opportunity.mentors.map((mentor, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text)] shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                  <span>{mentor}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Requirements & Benefits Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Requirements */}
          <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]/40 space-y-3">
            <h4 className="font-bold text-xs text-[var(--color-text)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>شروط ومتطلبات المشاركة</span>
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-text-muted)]">
              {opportunity.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]/40 space-y-3">
            <h4 className="font-bold text-xs text-[var(--color-text)] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>الامتيازات والتثمين الممنوح</span>
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-text-muted)]">
              {opportunity.benefits.map((ben, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
          {opportunity.isPast ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-bold border border-amber-200 dark:border-amber-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>هذه الفعالية أقيمت بنجاح في 29 أكتوبر 2026 وتم تسليم شهادات المشاركة والتأطير.</span>
              </div>
              <Link
                to="/verify?id=CERT-DZ-2026-SEBDOU-01"
                className="px-4 py-3 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold text-center transition-all shadow-xs"
              >
                معاينة نموذج الشهادة المعتمدة
              </Link>
            </div>
          ) : applied ? (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>
                تم تسجيل طلب تطوعك بنجاح! تم حجز مقعدك واحتساب {opportunity.hours} ساعات في ملفك قيد النشاط.
              </span>
            </div>
          ) : (
            <button
              onClick={() => setApplied(true)}
              className="px-6 py-3.5 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-black transition-all shadow-md hover:scale-102 flex items-center gap-2"
            >
              <span>تقديم طلب تطوع الآن (تسجيل فوري)</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <Link
            to="/activity"
            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-bold hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] transition-colors"
          >
            الانتقال إلى سجل نشاطي
          </Link>
        </div>
      </div>
    </div>
  );
};
