import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Building2,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Award,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Layers,
  MapPin,
  Calendar,
  Share2,
  Download,
  ExternalLink,
  ThumbsUp,
  FileCheck,
  Briefcase,
  QrCode,
  Globe,
  Filter,
} from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { MOCK_CERTIFICATES, type CertificateRecord } from '../mock/data';

type VolunteerTab = 'activity' | 'certificates' | 'about';

export const ProfileScreen: React.FC = () => {
  const { user, role, setRole } = useAuth();
  const [activeVolunteerTab, setActiveVolunteerTab] = useState<VolunteerTab>('activity');
  const [activityFilter, setActivityFilter] = useState<'all' | 'environment' | 'health' | 'relief'>('all');
  const [endorsedSkills, setEndorsedSkills] = useState([
    { id: 1, name: 'الإسعافات الأولية والإنعاش القلبي (CPR)', count: 24, icon: '🚑', endorsed: true },
    { id: 2, name: 'غرس الأشجار ومقاومة التصحر الميداني', count: 19, icon: '🌲', endorsed: true },
    { id: 3, name: 'إدارة وتأطير الفرق التطوعية الشبابية', count: 15, icon: '👥', endorsed: false },
    { id: 4, name: 'الاستجابة للكوارث الطبيعية والإغاثة الشتوية', count: 13, icon: '🤝', endorsed: false },
    { id: 5, name: 'برمجة بايثون والروبوتات التعليمية للأطفال', count: 11, icon: '💻', endorsed: false },
  ]);

  const handleRoleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as UserRole);
  };

  const handleToggleEndorse = (skillId: number) => {
    setEndorsedSkills((prev) =>
      prev.map((s) =>
        s.id === skillId
          ? { ...s, count: s.endorsed ? s.count - 1 : s.count + 1, endorsed: !s.endorsed }
          : s
      )
    );
  };

  // Volunteer's certificates from mock
  const volunteerCerts: CertificateRecord[] = MOCK_CERTIFICATES.filter(
    (c) => c.volunteerName === 'أمين بن علي' || c.id === 'CERT-DZ-2026-891'
  );

  // Volunteer's recent activity history items (LinkedIn style)
  const activityItems = [
    {
      id: 'act-1',
      type: 'environment',
      title: 'حملة التشجير الكبرى لتأهيل حزام السد الأخضر 2026',
      ngoName: 'جمعية السد الأخضر والتنمية المستدامة',
      ngoLicense: 'ASD-DZ-17-089',
      wilaya: 'الجلفة',
      commune: 'عين الإبل',
      date: 'نوفمبر 2026',
      timeAgo: 'منذ أسبوعين',
      hours: 8,
      role: 'قائد فريق الغرس الميداني',
      description:
        'المشاركة في غرس أكثر من 800 شجيرة فستق أطلسي وصنوبر حلبي على مسار شريط السد الأخضر لمقاومة التصحر، وتأطير 15 متطوعاً جديداً.',
      certId: 'CERT-DZ-2026-302',
      oppId: 'opp-1',
      status: 'معتمدة ومكتملة ✓',
    },
    {
      id: 'act-2',
      type: 'health',
      title: 'تنظيم قوافل الإسعاف والرعاية الميدانية للسباقات الرياضية',
      ngoName: 'الهلال الأحمر الجزائري - لجنة الإغاثة وتأهيل الشباب',
      ngoLicense: 'CRA-DZ-16-001',
      wilaya: 'الجزائر العاصمة',
      commune: 'خليج الجزائر',
      date: 'أكتوبر 2026',
      timeAgo: 'منذ شهر',
      hours: 6,
      role: 'مسعف أولي متطوع',
      description:
        'تأمين نقاط الإسعافات الأولية على طول مسار نصف ماراثون الجزائر العاصمة، وتقديم الرعاية الإسعافية الطارئة لـ 12 عداءً بالتعاون مع الحماية المدنية.',
      certId: 'CERT-DZ-2026-118',
      oppId: 'opp-3',
      status: 'معتمدة ومكتملة ✓',
    },
    {
      id: 'act-3',
      type: 'health',
      title: 'ورشة مبادئ الإسعافات الأولية والاستجابة للكوارث الطبيعية',
      ngoName: 'الهلال الأحمر الجزائري',
      ngoLicense: 'CRA-DZ-16-001',
      wilaya: 'الجزائر العاصمة',
      commune: 'بن عكنون',
      date: 'أكتوبر 2026',
      timeAgo: 'منذ شهر ونصف',
      hours: 16,
      role: 'متدرب ومشارك نشط',
      description:
        'إتمام برنامج تدريبي مكثف على الإنعاش القلبي الرئوي (CPR)، واستخدام جهاز الصدمات الآلي AED وإيقاف النزيف وفق البروتوكول الدولي.',
      certId: 'CERT-DZ-2026-891',
      oppId: 'first-aid',
      status: 'شهادة رسمية موثقة ✓',
    },
    {
      id: 'act-4',
      type: 'relief',
      title: 'قافلة الإغاثة الشتوية وتوزيع المستلزمات لقرى جبال البابور',
      ngoName: 'الهلال الأحمر الجزائري - فرع سطيف',
      ngoLicense: 'CRA-DZ-19-002',
      wilaya: 'سطيف',
      commune: 'بابور',
      date: 'سبتمبر 2026',
      timeAgo: 'منذ شهرين',
      hours: 14,
      role: 'منسق لوجستي ميداني',
      description:
        'المشاركة في شحن وتوزيع حصص التدفئة والأغطية الصوفية والمواد الغذائية على 45 عائلة معزولة في المداشر الجبلية الشاهقة خلال بداية موجة الصقيع.',
      certId: 'CERT-DZ-2026-774',
      oppId: 'opp-6',
      status: 'معتمدة ومكتملة ✓',
    },
  ];

  const filteredActivities = activityItems.filter((item) => {
    if (activityFilter === 'all') return true;
    return item.type === activityFilter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* 🌟 1. LinkedIn-Style Profile Header Card */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm overflow-hidden">
        {/* Cover Photo with Algerian Geometric Green Gradient */}
        <div className="relative h-40 sm:h-52 w-full bg-linear-to-r from-[#006233] via-[#004d27] to-[#142217] overflow-hidden">
          {/* Subtle Decorative Pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
              backgroundSize: '100px 100px',
            }}
          />

          {/* National Volunteer Network Watermark */}
          <div className="absolute top-4 start-6 flex items-center gap-2 text-white/80 text-xs font-bold pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>الجمهورية الجزائرية الديمقراطية الشعبية • السجل الوطني للتطوع</span>
          </div>

          {/* Perspective Role Switcher in Top Corner */}
          <div className="absolute top-4 end-4 z-20">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-white text-xs">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <select
                value={role}
                onChange={handleRoleSelect}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="volunteer" className="text-black">👤 متطوع بسيط (أمين بن علي)</option>
                <option value="ngo" className="text-black">🏢 جمعية (الهلال الأحمر الجزائري)</option>
                <option value="tech_team" className="text-black">🛡️ فريق تقني (الإشراف)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Profile Info & Actions Bar (overlapping the cover) */}
        <div className="px-6 sm:px-10 pb-6 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            {/* Avatar with Role Ring */}
            <div className="relative inline-block">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[var(--color-surface)] p-1.5 shadow-xl border border-[var(--color-border)]">
                <div className="w-full h-full rounded-2xl bg-linear-to-tr from-[#006233] to-[#059669] text-white flex items-center justify-center font-black text-4xl sm:text-5xl shadow-inner">
                  {role === 'tech_team' ? (
                    <ShieldAlert className="w-16 h-16 text-amber-300" />
                  ) : role === 'ngo' ? (
                    <Building2 className="w-16 h-16 text-emerald-200" />
                  ) : (
                    <span>أب</span>
                  )}
                </div>
              </div>

              {/* Status & Verified Badge */}
              <div
                className="absolute -bottom-1 -end-1 p-1.5 rounded-xl bg-emerald-500 text-white shadow-md ring-4 ring-[var(--color-surface)]"
                title="حساب وطني معتمد وموثق"
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Action Buttons (LinkedIn Style) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
              <Link
                to="/certificates"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>محفظة الشهادات</span>
              </Link>

              <button
                onClick={() => alert('تم نسخ رابط جواز التطوع الرقمي إلى الحافظة!')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-bold transition-colors"
                title="مشاركة الحساب"
              >
                <Share2 className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="hidden sm:inline">مشاركة الحساب</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-bold transition-colors"
                title="تصدير كملف PDF"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">جواز التطوع (CV)</span>
              </button>
            </div>
          </div>

          {/* Name & Headline */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)]">
                {user.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-[#e6f3ec] text-[#006233] border border-[#006233]/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                متطوع وطني معتمد
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                ⭐ رتبة: متطوع متميز (Top 5%)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--color-text)] font-semibold leading-relaxed max-w-3xl">
              مسعف أولي معتمد من الهلال الأحمر الجزائري • ناشط بيئي في حملات السد الأخضر والتأهيل المجتمعي • مدرب حاسوب وروبوتات للأطفال
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>16 - الجزائر العاصمة، الجزائر</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>عضو مدني موثق منذ سبتمبر 2026</span>
              </span>
              <span className="flex items-center gap-1 font-mono">
                <FileCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>VOL-DZ-16-98214</span>
              </span>
            </div>
          </div>

          {/* 📊 LinkedIn-Style Analytics / Impact Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[var(--color-border)]">
            <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-start space-y-0.5">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] block">الساعات المعتمدة</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[var(--color-primary)] block">
                44 ساعة
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">+14 س هذا الشهر</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-start space-y-0.5">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] block">مبادرات مكتملة</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[var(--color-text)] block">
                4 مبادرات
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] block">عبر 3 ولايات</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-start space-y-0.5">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] block">شهادات رقمية مشفرة</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#2563eb] block">
                4 شهادات
              </span>
              <span className="text-[10px] text-blue-600 font-bold block">معتمدة برمز QR ✓</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] text-start space-y-0.5">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] block">الترتيب الوطني</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-amber-600 block">
                #12 وطنيا
              </span>
              <Link to="/leaderboard" className="text-[10px] text-[var(--color-primary)] font-bold hover:underline block">
                استعراض لوحة الشرف ←
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 2. LinkedIn-Style Sticky Tabs Bar */}
      <div className="sticky top-16 z-30 bg-[var(--color-surface)]/95 backdrop-blur-md rounded-2xl border border-[var(--color-border)] p-1.5 shadow-xs flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveVolunteerTab('activity')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeVolunteerTab === 'activity'
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>سجل الأنشطة والمشاركات</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeVolunteerTab === 'activity' ? 'bg-white/20 text-white' : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
              }`}
            >
              {activityItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveVolunteerTab('certificates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeVolunteerTab === 'certificates'
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>معرض الشهادات الرقمية</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeVolunteerTab === 'certificates' ? 'bg-white/20 text-white' : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
              }`}
            >
              {volunteerCerts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveVolunteerTab('about')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeVolunteerTab === 'about'
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>النبذة والمهارات المعتمدة</span>
          </button>
        </div>

        <Link
          to="/opportunities"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-primary)] text-xs font-bold"
        >
          <span>استكشاف فرص جديدة</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 📂 3. TAB 1: Recent Activity History (LinkedIn-Style Activity Feed) */}
      {activeVolunteerTab === 'activity' && (
        <div className="space-y-4">
          {/* Activity Filters Bar */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="font-bold text-[var(--color-text-muted)] flex items-center gap-1 ps-2 pe-1">
                <Filter className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>المجال:</span>
              </span>

              <button
                onClick={() => setActivityFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activityFilter === 'all'
                    ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                كافة المشاركات ({activityItems.length})
              </button>

              <button
                onClick={() => setActivityFilter('environment')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activityFilter === 'environment'
                    ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                🌲 بيئة وتشجير
              </button>

              <button
                onClick={() => setActivityFilter('health')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activityFilter === 'health'
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                🚑 صحة وإسعاف
              </button>

              <button
                onClick={() => setActivityFilter('relief')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activityFilter === 'relief'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                🤝 إغاثة وتضامن
              </button>
            </div>

            <span className="hidden sm:inline font-mono font-bold text-[var(--color-text-muted)]">
              إجمالي {filteredActivities.reduce((a, b) => a + b.hours, 0)} ساعة نشاط
            </span>
          </div>

          {/* Activity Timeline Feed */}
          <div className="space-y-4">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-xs hover:shadow-md transition-all space-y-4 group"
              >
                {/* Activity Header (Issuer NGO + Date) */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-bold text-lg shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[var(--color-text)]">
                          {act.ngoName}
                        </span>
                        <span title="جمعية معتمدة">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      </div>
                      <span className="text-[11px] text-[var(--color-text-muted)] block">
                        رقم الاعتماد: {act.ngoLicense} • {act.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Hours Badge */}
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full bg-[#e6f3ec] text-[#006233] dark:bg-[#006233]/20 dark:text-emerald-300 font-mono font-black text-xs border border-[#006233]/20">
                      +{act.hours} ساعات معتمدة
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold mt-1">
                      {act.status}
                    </span>
                  </div>
                </div>

                {/* Activity Body */}
                <div className="space-y-2">
                  <h3 className="font-black text-base text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {act.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[var(--color-text-muted)]">
                    <span className="inline-flex items-center gap-1 font-bold text-[var(--color-text)]">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>{act.wilaya} • {act.commune}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>الدور: {act.role}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>{act.date}</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Actions: View Certificate & Initiative Link */}
                <div className="pt-3 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/certificates/${act.certId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-surface-muted)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] font-bold transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>معاينة الشهادة الرقمية المعتمدة</span>
                    </Link>

                    <Link
                      to={`/verify?id=${act.certId}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-[11px] font-bold"
                      title="فحص فوري بالسجل"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>تدقيق التشفير</span>
                    </Link>
                  </div>

                  <Link
                    to={`/opportunities/${act.oppId}`}
                    className="inline-flex items-center gap-1 font-bold text-[var(--color-primary)] hover:underline"
                  >
                    <span>صفحة المبادرة</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📜 4. TAB 2: Certificate Gallery (Licenses & Certifications) */}
      {activeVolunteerTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text)] flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>معرض الشهادات الرسمية والاعتمادات المشفرة</span>
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                شهادات مدنية رسمية صادرة برمز استجابة سريعة QR وتوقيع رقمي معترف به وطنياً
              </p>
            </div>

            <Link
              to="/verify"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold shadow-xs hover:bg-[var(--color-primary-hover)] transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>فحص صحة أي شهادة</span>
            </Link>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {volunteerCerts.map((cert) => (
              <div
                key={cert.id}
                className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/60 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                {/* Top Certificate Header with Algerian Coat-of-Arms Watermark */}
                <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold shrink-0 border border-amber-300 dark:border-amber-800 shadow-2xs">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                        الجمهورية الجزائرية الديمقراطية الشعبية
                      </span>
                      <span className="font-bold text-xs text-[var(--color-text)] block truncate max-w-[200px]">
                        {cert.issuingNgoName}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono font-black text-xs">
                    {cert.hoursAccredited} ساعات
                  </span>
                </div>

                {/* Certificate Title & Recipient */}
                <div className="space-y-1.5">
                  <h4 className="font-black text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {cert.opportunityTitle}
                  </h4>

                  <p className="text-xs text-[var(--color-text-muted)] flex items-center justify-between pt-1">
                    <span>المتطوع: <b className="text-[var(--color-text)]">{cert.volunteerName}</b></span>
                    <span className="font-mono text-[11px]">{cert.issueDate}</span>
                  </p>
                </div>

                {/* Verification & Crypto Hash Snippet */}
                <div className="p-3 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)]">
                    <span className="font-bold flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      شهادة معتمدة وموثقة بالسجل
                    </span>
                    <span className="font-mono">{cert.serialNumber}</span>
                  </div>

                  <div className="text-[10px] font-mono text-[var(--color-text-muted)] truncate">
                    بصمة التشفير: {cert.cryptoHash.slice(0, 24)}...
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                  <Link
                    to={`/certificates/${cert.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
                  >
                    <span>عرض الوثيقة للطباعة</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <Link
                    to={`/verify?id=${cert.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    <span>فحص السجل</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 💡 5. TAB 3: About & Endorsed Skills (LinkedIn-Style) */}
      {activeVolunteerTab === 'about' && (
        <div className="space-y-6">
          {/* Bio / About Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-[var(--color-text)] flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--color-primary)]" />
              <span>نبذة عن المتطوع والمسار المدني</span>
            </h3>

            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
              شاب جزائري شغوف بالعمل الإنساني والميداني، مسعف أولي معتمد من الهلال الأحمر الجزائري ومشارك نشط في حملات تأهيل السد الأخضر وغرس الأشجار المقاومة للتصحر. أؤمن بأهمية تسخير الطاقات الشبابية والحلول التكنولوجية لتنمية المجتمع المحلي وصناعة أثر مدني مستدام.
            </p>
          </div>

          {/* Endorsed Skills Grid (LinkedIn Style) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[var(--color-text)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>المهارات والتزكيات المعتمدة (Endorsed Skills)</span>
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  مهارات ميدانية وتطوعية حازت على تزكية المنظمات المشرفة
                </p>
              </div>
              <span className="text-xs font-bold text-[var(--color-primary)]">
                {endorsedSkills.length} مهارات موثقة
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {endorsedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-2xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 transition-all hover:bg-[var(--color-surface-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <span className="font-black text-sm text-[var(--color-text)] block">
                        {skill.name}
                      </span>
                      <span className="text-[11px] text-[var(--color-text-muted)]">
                        تمت التزكية رسمياً من الجمعيات المشرفة
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleEndorse(skill.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                      skill.endorsed
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-primary-container)] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>تزكية</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        skill.endorsed ? 'bg-white/25 text-white' : 'bg-[var(--color-surface-muted)] text-[var(--color-primary)] font-bold'
                      }`}
                    >
                      {skill.count}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-[var(--color-text)] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[var(--color-primary)]" />
              <span>اللغات وإمكانات التواصل</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-[var(--color-surface-muted)] text-center">
                <span className="font-bold text-xs text-[var(--color-text)] block">العربية</span>
                <span className="text-[10px] text-emerald-600 font-bold block">اللغة الأم (Native)</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--color-surface-muted)] text-center">
                <span className="font-bold text-xs text-[var(--color-text)] block">الأمازيغية</span>
                <span className="text-[10px] text-[var(--color-text-muted)] block">جيد (Good)</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--color-surface-muted)] text-center">
                <span className="font-bold text-xs text-[var(--color-text)] block">الإنجليزية</span>
                <span className="text-[10px] text-blue-600 font-bold block">متقدم (C1)</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--color-surface-muted)] text-center">
                <span className="font-bold text-xs text-[var(--color-text)] block">الفرنسية</span>
                <span className="text-[10px] text-[var(--color-text-muted)] block">متقدم (B2)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
