import React from 'react';
import { useTranslation } from 'react-i18next';
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
  ChevronDown,
  Layers,
  Activity,
} from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { MOCK_NGOS } from '../mock/data';

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user, role, setRole } = useAuth();

  const handleRoleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as UserRole);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Profile Header & Interactive Role Switcher Banner */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-border)]">
          {/* User Info Avatar & Title */}
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-sm shrink-0 ${
                role === 'tech_team'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  : role === 'ngo'
                  ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                  : 'bg-[var(--color-primary)] text-white'
              }`}
            >
              {role === 'tech_team' ? (
                <ShieldAlert className="w-8 h-8" />
              ) : role === 'ngo' ? (
                <Building2 className="w-8 h-8" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[var(--color-text)] tracking-tight">
                  {user.name}
                </h1>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                    role === 'tech_team'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                      : role === 'ngo'
                      ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                      : 'bg-[var(--color-secondary-container)] text-[var(--color-secondary)]'
                  }`}
                >
                  {role === 'tech_team'
                    ? t('profile.roles.tech_team')
                    : role === 'ngo'
                    ? t('profile.roles.ngo')
                    : t('profile.roles.volunteer')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                {user.email} • {user.wilaya || 'الجزائر العاصمة'}
              </p>
            </div>
          </div>

          {/* Interactive Role Switcher Dropdown */}
          <div className="p-3.5 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-1.5 self-start md:self-center shrink-0 w-full md:w-auto">
            <div className="flex items-center justify-between gap-2 text-xs font-bold text-[var(--color-text)]">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>{t('profile.switch_role_title')}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)]">
                تجربة تفاعلية
              </span>
            </div>

            <div className="relative">
              <select
                value={role}
                onChange={handleRoleSelect}
                className="w-full md:w-64 appearance-none px-3.5 py-2.5 pr-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-bold text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden cursor-pointer"
              >
                <option value="volunteer">👤 {t('profile.roles.volunteer')} (أمين بن علي)</option>
                <option value="ngo">🏢 {t('profile.roles.ngo')} (الهلال الأحمر الجزائري)</option>
                <option value="tech_team">🛡️ {t('profile.roles.tech_team')} (الإشراف والاعتماد)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute top-3 left-3 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2. Role-Specific Content Area */}
        {role === 'volunteer' && (
          <div className="space-y-6">
            {/* Volunteer Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--color-primary)] block">38</span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1 block">ساعة تطوعية معتمدة</span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--color-text)] block">4</span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1 block">مبادرات مكتملة</span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--color-secondary)] block">3</span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1 block">شهادات رقمية موثقة</span>
              </div>
            </div>

            {/* Volunteer Details & Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>بيانات العضوية المدنية</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-text-muted)]">المعرف الوطني للتطوع:</span>
                    <span className="font-mono font-bold text-[var(--color-text)]">VOL-DZ-16-98214</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-text-muted)]">الولاية:</span>
                    <span className="font-semibold text-[var(--color-text)]">16 - الجزائر العاصمة</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-text-muted)]">تاريخ الانضمام:</span>
                    <span className="font-semibold text-[var(--color-text)]">سبتمبر 2026</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[var(--color-text-muted)]">حالة الحساب:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> نشط ومطابق
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Badges */}
              <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                  <span>شارات المهارات المعتمدة</span>
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-primary-container)] text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                    🚑 مسعف أولي معتمد
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-primary-container)] text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                    🌲 متطوع السد الأخضر
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-secondary-container)] text-[var(--color-secondary)] border border-[var(--color-secondary)]/20">
                    💻 مدرب حاسوب للأطفال
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/certificates"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>عرض محفظة الشهادات الرسمية</span>
              </Link>
              <Link
                to="/activity"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold transition-colors"
              >
                <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                <span>سجل الأنشطة والساعات</span>
              </Link>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold transition-colors"
              >
                <span>استكشاف فرص جديدة للتطوع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {role === 'ngo' && (
          <div className="space-y-6">
            {/* NGO Performance Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--color-primary)] block">6</span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1 block">مبادرات تطوعية نشطة</span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--color-text)] block">1,420</span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1 block">متطوع مسجل تحت الإشراف</span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 block">100%</span>
                <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1 block">مطابقة التراخيص والوثائق</span>
              </div>
            </div>

            {/* NGO Legal & Operational Profile */}
            <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>بيانات الاعتماد الرسمي للجمعية</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[var(--color-surface-muted)]">
                  <span className="text-[var(--color-text-muted)] block mb-0.5">اسم المنظمة:</span>
                  <strong className="text-[var(--color-text)] font-bold">{MOCK_NGOS[0].name}</strong>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-muted)]">
                  <span className="text-[var(--color-text-muted)] block mb-0.5">رقم الاعتماد الولائي/الوطني:</span>
                  <span className="font-mono font-bold text-[var(--color-primary)]">{MOCK_NGOS[0].licenseNumber}</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-muted)]">
                  <span className="text-[var(--color-text-muted)] block mb-0.5">الممثل القانوني / الرئيس:</span>
                  <span className="font-semibold text-[var(--color-text)]">{MOCK_NGOS[0].presidentName}</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-muted)]">
                  <span className="text-[var(--color-text-muted)] block mb-0.5">سنة التأسيس والولاية:</span>
                  <span className="font-semibold text-[var(--color-text)]">{MOCK_NGOS[0].establishedYear} • {MOCK_NGOS[0].wilaya}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions for NGO View */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/ngo/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
              >
                <Activity className="w-4 h-4" />
                <span>لوحة تحكم الجمعية - إدارة المتقدمين والقبول</span>
              </Link>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold transition-colors"
              >
                <span>استعراض الفرص التطوعية المنشورة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {role === 'tech_team' && (
          <div className="space-y-6">
            {/* Admin Audit Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 dark:text-amber-400 block">184</span>
                <span className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-1 block">جمعية تحت الإشراف</span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                <span className="text-2xl sm:text-3xl font-black font-mono text-rose-600 block">1</span>
                <span className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-1 block">طلب اعتماد معلق للمراجعة</span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 block">3,120</span>
                <span className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-1 block">شهادة مشفرة مسجلة</span>
              </div>
            </div>

            {/* Clearance Card */}
            <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>مستوى الصلاحيات: إدارة مركزية وفحص التراخيص والوثائق (Super Admin)</span>
              </div>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                يملك هذا الحساب صلاحية منح الاعتماد للجمعيات الجديدة، تجميد الحسابات المخالفة، ومراقبة البصمات الإلكترونية الصادرة لشهادات التطوع على المستوى الوطني.
              </p>
            </div>

            {/* Quick Actions for Admin */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/admin/ngos"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>فتح بوابة تدقيق واعتماد ملفات الجمعيات</span>
              </Link>
              <Link
                to="/verify"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                <span>فحص الشهادات والبصمات الرقمية</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
