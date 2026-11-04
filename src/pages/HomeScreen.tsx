import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  GraduationCap,
  ShieldCheck,
  Building2,
  Clock,
  ArrowLeft,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  Search,
  Lock,
} from 'lucide-react';
import {
  MOCK_OPPORTUNITIES,
  MOCK_WORKSHOPS,
  MOCK_NGOS,
  PLATFORM_STATS,
} from '../mock/data';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [quickVerifyCode, setQuickVerifyCode] = useState('');

  const featuredOpportunities = MOCK_OPPORTUNITIES.slice(0, 3);
  const featuredWorkshops = MOCK_WORKSHOPS.slice(0, 2);

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickVerifyCode.trim()) {
      navigate(`/verify?id=${encodeURIComponent(quickVerifyCode.trim())}`);
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[var(--color-primary-container)]/70 to-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-12 md:p-16 text-center space-y-8 shadow-xs">
        {/* Subtle Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-primary)]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--color-secondary)]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
            <span>المنصة الوطنية لتوثيق العمل التطوعي في الجزائر • 58 ولاية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--color-text)] tracking-tight leading-[1.15]">
            استثمر طاقتك في <span className="text-[var(--color-primary)]">بناء الوطن</span> ووثّق أثرك رسمياً
          </h1>

          <p className="text-sm sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
            منصة وطنية تربط الشباب الجزائري بأكثر من 180 جمعية معتمدة للمشاركة في مبادرات ميدانية وتأهيل مجتمعي، مع إصدار شهادات وساعات عمل مدني مشفرة وموثوقة.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/opportunities"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-bold transition-all shadow-md hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4" />
              <span>استكشف الفرص المتاحة</span>
            </Link>

            <Link
              to="/workshops"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-sm font-bold transition-all"
            >
              <GraduationCap className="w-4 h-4 text-[var(--color-primary)]" />
              <span>تعلّم وشارك (الورشات)</span>
            </Link>

            <Link
              to="/verify"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[var(--color-primary)]/40 text-[var(--color-primary)] text-sm font-semibold hover:bg-[var(--color-primary-container)] transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>فحص صحة الشهادات</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> جمعيات معتمدة قانونياً
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Lock className="w-4 h-4 text-[var(--color-primary)]" /> شهادات مشفرة برمز QR
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[var(--color-primary)]" /> سجل ساعات معترف به
            </span>
          </div>
        </div>
      </section>

      {/* 2. Live Impact Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ساعة تطوعية معتمدة', value: `${PLATFORM_STATS.totalHours.toLocaleString('ar-DZ')}+`, icon: Clock, color: 'text-[var(--color-primary)]' },
          { label: 'متطوع شاب نشط', value: `${PLATFORM_STATS.activeVolunteers.toLocaleString('ar-DZ')}+`, icon: Users, color: 'text-[var(--color-primary)]' },
          { label: 'جمعية معتمدة رسمياً', value: `${PLATFORM_STATS.accreditedNgos}+`, icon: Building2, color: 'text-[var(--color-secondary)]' },
          { label: 'ولاية مغطاة ميدانياً', value: '58 / 58', icon: MapPin, color: 'text-[var(--color-primary)]' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs flex items-center gap-4 hover:border-[var(--color-primary)] transition-all"
            >
              <div className="p-3 rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-primary)] shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight block ${stat.color}`}>
                  {stat.value}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium block">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Featured Opportunities Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>فرص هذا الأسبوع</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)]">
              أحدث المبادرات التطوعية المفتوحة للتسجيل
            </h2>
          </div>
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline self-start sm:self-auto"
          >
            <span>عرض جميع الفرص (58 ولاية)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="flex flex-col justify-between p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    {opp.wilaya}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--color-primary-container)] text-[var(--color-primary)]">
                    {opp.hours} ساعات
                  </span>
                </div>

                <h3 className="font-bold text-base text-[var(--color-text)] leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                  {opp.title}
                </h3>

                <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                  {opp.description}
                </p>

                <div className="pt-2 text-[11px] text-[var(--color-text-muted)] flex items-center gap-1.5 border-t border-[var(--color-border)]">
                  <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span className="truncate">{opp.ngoName}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] text-[var(--color-text-muted)]">
                  متبقي {opp.spotsTotal - opp.spotsTaken} مقعد
                </span>
                <Link
                  to={`/opportunities/${opp.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--color-surface-muted)] hover:bg-[var(--color-primary)] hover:text-white text-xs font-semibold transition-colors"
                >
                  <span>التفاصيل والتسجيل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "تعلّم وشارك" Workshop Highlight */}
      <section className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-secondary-container)] text-[var(--color-secondary)]">
              برنامج التأهيل المدني: تعلّم وشارك
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)]">
              ورشات تدريبية لبناء مهارات المتطوعين
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
              دورات حضورية وميدانية معتمدة من الهيئات الوطنية تؤهلك لقيادة المبادرات والإسعاف الأولي.
            </p>
          </div>

          <Link
            to="/workshops"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shrink-0 self-start sm:self-auto"
          >
            <span>استعراض الورشات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {featuredWorkshops.map((ws) => (
            <div
              key={ws.id}
              className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] flex flex-col justify-between gap-4 hover:border-[var(--color-primary)] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">
                    {ws.accreditedBy}
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--color-secondary)]">
                    {ws.durationHours} ساعة تدريبية
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--color-text)]">{ws.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {ws.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                <span className="text-xs text-[var(--color-text-muted)]">
                  {ws.totalSeats - ws.seatsBooked} مقاعد متاحة
                </span>
                <Link
                  to={`/workshops/${ws.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline"
                >
                  <span>تفاصيل الورشة والاعتماد</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How It Works - 3 Step Impact Pipeline */}
      <section className="text-center space-y-10">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
            المسار الرقمي للمتطوع
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)]">
            كيف تبدأ وتوثق ساعاتك في 3 خطوات بسيطة؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 relative text-right shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-bold text-lg font-mono">
              1
            </div>
            <h3 className="text-base font-bold text-[var(--color-text)]">اختر المبادرة وقدم طلبك</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              تصفح الفرص المتاحة حسب ولايتك وشغفك (بيئة، صحة، تقنية، تعليم)، وقدم طلبك بنقرة واحدة لتصل للجمعية المنظمة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 relative text-right shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-bold text-lg font-mono">
              2
            </div>
            <h3 className="text-base font-bold text-[var(--color-text)]">شارك ميدانياً ووثق الساعات</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              احضر الفعالية وشارك بفعالية. تقوم الجمعية بتأكيد حضورك وتوثيق عدد الساعات المنجزة فور انتهاء المبادرة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 relative text-right shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary-container)] text-[var(--color-secondary)] flex items-center justify-center font-bold text-lg font-mono">
              3
            </div>
            <h3 className="text-base font-bold text-[var(--color-text)]">احصل على شهادتك المشفرة</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              تصلك وثيقة الشهادة الرقمية المعتمدة مع رمز استجابة سريع QR وبصمة تشفير وطنية تضاف فوراً لمحفظتك المهنية.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Quick Certificate Verification Bar */}
      <section className="rounded-3xl bg-linear-to-r from-[#004824] to-[#006233] p-8 sm:p-12 text-white space-y-6 shadow-lg">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-100 border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>لأرباب العمل والمؤسسات الأكاديمية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            التحقق الفوري من صحة وموثوقية الشهادات
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            تأكد من مصداقية ساعات التطوع والشهادات المقدمة من خلال السجل الوطني الرقمي المباشر.
          </p>
        </div>

        <form onSubmit={handleQuickVerify} className="flex flex-col sm:flex-row gap-2 max-w-xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={quickVerifyCode}
              onChange={(e) => setQuickVerifyCode(e.target.value)}
              placeholder="أدخل رمز الشهادة (مثال: CERT-DZ-2026-891)"
              className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-sm font-mono placeholder:text-slate-400 focus:outline-hidden"
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[var(--color-secondary)] hover:bg-[#ba002a] text-white font-bold text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>تحقق الآن</span>
          </button>
        </form>
      </section>

      {/* 7. Partner NGOs Carousel / Grid */}
      <section className="space-y-4 text-center">
        <span className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
          جمعيات وهيئات وطنية شريكة في المنصة
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {MOCK_NGOS.slice(0, 5).map((ngo) => (
            <div
              key={ngo.id}
              className="px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] flex items-center gap-2 shadow-2xs hover:border-[var(--color-primary)] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
              <span>{ngo.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
