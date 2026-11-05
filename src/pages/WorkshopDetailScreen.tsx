import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  ArrowRight,
  Calendar,
  Building2,
  Award,
  CheckCircle2,
  Sparkles,
  Users,
  Map as MapIcon,
} from 'lucide-react';
import { MOCK_WORKSHOPS, getStoredWorkshops } from '../mock/data';

export const WorkshopDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allWorkshops = [...getStoredWorkshops(), ...MOCK_WORKSHOPS];
  const workshop = allWorkshops.find((w) => w.id === id) || MOCK_WORKSHOPS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* 🔙 Back link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع إلى قائمة الفرص والورشات</span>
        </button>

        <Link
          to={`/opportunities?view=map&wilaya=${encodeURIComponent(workshop.wilaya)}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[#2563eb] transition-all shadow-2xs"
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>عرض موقع {workshop.wilaya} على الخريطة</span>
        </Link>
      </div>

      {/* 🌟 Main Workshop Card */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 shadow-sm space-y-6">
        {/* Past Notice */}
        {workshop.isPast && (
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>ورشة سابقة مكتملة (Past Event) • أقيمت بتاريخ {workshop.startDate}</span>
            </div>
            <span className="font-mono bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded-md">
              منتهية وموثقة ✓
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>ولاية {workshop.wilaya} • {workshop.commune}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
            <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>تاريخ الانعقاد: {workshop.startDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] leading-snug">
          {workshop.title}
        </h1>

        {/* Organizer Banner */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563eb] flex items-center justify-center font-bold text-sm shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-[var(--color-text)] block">
              {workshop.organizer}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              اعتماد: {workshop.accreditedBy}
            </span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] space-y-1">
            <Clock className="w-5 h-5 text-[#2563eb] mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">الساعات التدريبية</span>
            <span className="font-mono font-black text-sm text-[var(--color-text)]">
              {workshop.durationHours} ساعات
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] space-y-1">
            <Users className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">المقاعد</span>
            <span className="font-mono font-black text-sm text-[var(--color-text)]">
              {workshop.totalSeats} مقعد
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] space-y-1">
            <Award className="w-5 h-5 text-amber-500 mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">الشهادة</span>
            <span className="font-bold text-xs text-[var(--color-text)]">معتمدة برمز QR</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] space-y-1">
            <MapPin className="w-5 h-5 text-purple-500 mx-auto" />
            <span className="text-xs text-[var(--color-text-muted)] block">المكان</span>
            <span className="font-bold text-xs text-[var(--color-text)] line-clamp-1">
              {workshop.location}
            </span>
          </div>
        </div>

        {/* Event Photos Gallery */}
        {workshop.images && workshop.images.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>معرض صور الفعالية (دار الشباب سبدو)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-sky-50 dark:bg-sky-950/30 aspect-video flex items-center justify-center p-6 shadow-xs">
                <img
                  src={workshop.images[0]}
                  alt="شعار ورشة سكراتش"
                  className="max-h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black/5 aspect-video relative group shadow-xs">
                <img
                  src={workshop.images[1]}
                  alt="أطفال يبرمجون بدار الشباب سبدو"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white text-xs font-semibold">
                  <span>ورشة سكراتش للأطفال بدار الشباب سبدو (29 أكتوبر 2026)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mentors List */}
        {workshop.mentors && workshop.mentors.length > 0 && (
          <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] space-y-2.5">
            <h4 className="font-bold text-xs text-[var(--color-text)] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#2563eb]" />
              <span>المؤطرون والمدربون المعتمدون للورشة:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {workshop.mentors.map((mentor, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text)] shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                  <span>{mentor}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="space-y-2 pt-2">
          <h3 className="font-bold text-sm text-[var(--color-text)]">تفاصيل الورشة والأهداف</h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            {workshop.description}
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]/40 space-y-3">
          <h4 className="font-bold text-xs text-[var(--color-text)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>مخرجات التعلّم والمهارات المكتسبة للأطفال</span>
          </h4>
          <ul className="space-y-2 text-xs text-[var(--color-text-muted)]">
            {workshop.learningOutcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-1.5 shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/verify?id=CERT-DZ-2026-SEBDOU-01"
            className="px-5 py-3 rounded-2xl bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>معاينة نموذج الشهادة المعتمدة للورشة</span>
          </Link>

          <Link
            to="/leaderboard"
            className="px-4 py-3 rounded-2xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] transition-colors"
          >
            عرض لوحة الشرف الوطنية
          </Link>
        </div>
      </div>
    </div>
  );
};
