import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  Building2,
  Lock,
  Mail,
} from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';

export const AuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setRole, login } = useAuth();

  const initialTab = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [wilaya, setWilaya] = useState('16 - الجزائر العاصمة');
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'demo@volunteernet.dz', selectedRole);
    if (selectedRole === 'tech_team') {
      navigate('/admin/ngos');
    } else if (selectedRole === 'ngo') {
      navigate('/ngo/dashboard');
    } else {
      navigate('/activity');
    }
  };

  const handleQuickDemoLogin = (targetRole: UserRole) => {
    setRole(targetRole);
    if (targetRole === 'tech_team') {
      navigate('/admin/ngos');
    } else if (targetRole === 'ngo') {
      navigate('/ngo/dashboard');
    } else {
      navigate('/activity');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] tracking-tight">
          {activeTab === 'login' ? 'تسجيل الدخول إلى المنصة' : 'إنشاء حساب جديد'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
          بوابة موحدة للشباب المتطوع، الجمعيات الوطنية، وفريق الإشراف والاعتماد.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-xs space-y-6">
        {/* Auth Mode Toggle (Login vs Register) */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--color-surface-muted)] text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`py-2.5 rounded-lg transition-all ${
              activeTab === 'login'
                ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-xs font-black'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`py-2.5 rounded-lg transition-all ${
              activeTab === 'register'
                ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-xs font-black'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Account Role Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[var(--color-text)]">
            نوع الحساب:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSelectedRole('volunteer')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                selectedRole === 'volunteer'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>متطوع شاب</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('ngo')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                selectedRole === 'ngo'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>جمعية أو هيئة مدنية</span>
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[var(--color-text)]">
                {selectedRole === 'ngo' ? 'الاسم الرسمي للجمعية' : 'الاسم الكامل'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={selectedRole === 'ngo' ? 'مثال: جمعية حماية البيئة والتنمية' : 'مثال: أمين بن علي'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
              />
            </div>
          )}

          {activeTab === 'register' && selectedRole === 'ngo' && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[var(--color-text)]">
                رقم الاعتماد الولائي أو الوطني
              </label>
              <input
                type="text"
                required
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="مثال: CRA-DZ-16-001 أو وصل الإيداع الولائي"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
                dir="ltr"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--color-text)]">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute top-3 right-3 text-[var(--color-text-muted)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.dz"
                className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--color-text)]">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute top-3 right-3 text-[var(--color-text-muted)]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[var(--color-text)]">
                الولاية
              </label>
              <select
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
              >
                <option value="16 - الجزائر العاصمة">16 - الجزائر العاصمة</option>
                <option value="31 - وهران">31 - وهران</option>
                <option value="25 - قسنطينة">25 - قسنطينة</option>
                <option value="17 - الجلفة">17 - الجلفة</option>
                <option value="06 - بجاية">06 - بجاية</option>
                <option value="47 - غرداية">47 - غرداية</option>
                <option value="09 - البليدة">09 - البليدة</option>
                <option value="19 - سطيف">19 - سطيف</option>
                <option value="15 - تيزي وزو">15 - تيزي وزو</option>
                <option value="30 - ورقلة">30 - ورقلة</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-xs mt-2"
          >
            {activeTab === 'login' ? 'دخول إلى المنصة' : 'إتمام التسجيل والتقديم'}
          </button>
        </form>

        {/* Demo Fast Role Logins (Ideal for prototype testing) */}
        <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
          <span className="text-[11px] text-[var(--color-text-muted)] font-bold block text-center">
            ⚡ تجربة سريعة للنموذج الأولي (تبديل الأدوار بنقرة واحدة):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('volunteer')}
              className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] hover:border-[var(--color-primary)] text-right transition-colors"
            >
              <div className="font-bold text-[var(--color-text)]">متطوع شاب</div>
              <div className="text-[10px] text-[var(--color-text-muted)]">أمين بن علي</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('ngo')}
              className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] hover:border-[var(--color-primary)] text-right transition-colors"
            >
              <div className="font-bold text-[var(--color-text)]">إدارة الجمعية</div>
              <div className="text-[10px] text-[var(--color-text-muted)]">الهلال الأحمر الجزائري</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('tech_team')}
              className="p-2.5 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-right transition-colors font-bold"
            >
              <div>الفريق التقني (Admin)</div>
              <div className="text-[10px] font-normal">إدارة واعتماد الجمعيات</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
