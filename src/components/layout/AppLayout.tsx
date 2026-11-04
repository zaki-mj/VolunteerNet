import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Compass,
  GraduationCap,
  Clock,
  Award,
  ShieldCheck,
  Building2,
  Sun,
  Moon,
  ShieldAlert,
  User,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

export const AppLayout: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, role, setRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const isNgoSection = location.pathname.startsWith('/ngo');
  const isAdminSection = location.pathname.startsWith('/admin');

  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/opportunities', label: t('nav.opportunities'), icon: Compass },
    { to: '/workshops', label: t('nav.workshops'), icon: GraduationCap },
    { to: '/activity', label: t('nav.activity'), icon: Clock },
    { to: '/certificates', label: t('nav.certificates'), icon: Award },
  ];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setRoleMenuOpen(false);
    if (newRole === 'tech_team') {
      navigate('/admin/ngos');
    } else if (newRole === 'ngo') {
      navigate('/ngo/dashboard');
    } else {
      navigate('/activity');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center group">
              <Logo size="md" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action Tools & Role Switcher */}
          <div className="flex items-center gap-2">
            {/* Quick Public Verification Shortcut */}
            <NavLink
              to="/verify"
              className={({ isActive }) =>
                `hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-container)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`
              }
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>فحص الشهادات</span>
            </NavLink>

            {/* Tech Team / Admin Portal Button */}
            <NavLink
              to="/admin/ngos"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                isAdminSection
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100'
              }`}
              title="بوابة الفريق التقني لإدارة الجمعيات"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden md:inline">الفريق التقني</span>
            </NavLink>

            {/* NGO Dashboard Button */}
            <NavLink
              to="/ngo/dashboard"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                isNgoSection
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border-[var(--color-border)]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('nav.ngo_dashboard')}</span>
            </NavLink>

            {/* Interactive Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                <span className="max-w-[80px] sm:max-w-[120px] truncate text-[var(--color-text)]">
                  {user.name.split(' ')[0]} ({role === 'tech_team' ? 'Admin' : role === 'ngo' ? 'جمعية' : 'متطوع'})
                </span>
                <ChevronDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </button>

              {roleMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl p-2 z-50 text-xs space-y-1">
                  <div className="px-2 py-1.5 border-b border-[var(--color-border)] text-[11px] text-[var(--color-text-muted)]">
                    تبديل دور المستخدم (تجربة النموذج):
                  </div>
                  <button
                    onClick={() => handleRoleChange('volunteer')}
                    className={`w-full text-right px-2 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      role === 'volunteer'
                        ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)] font-bold'
                        : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                    }`}
                  >
                    <span>متطوع شاب (أمين بن علي)</span>
                    {role === 'volunteer' && <span>✓</span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('ngo')}
                    className={`w-full text-right px-2 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      role === 'ngo'
                        ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)] font-bold'
                        : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                    }`}
                  >
                    <span>ممثل جمعية (الهلال الأحمر)</span>
                    {role === 'ngo' && <span>✓</span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('tech_team')}
                    className={`w-full text-right px-2 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      role === 'tech_team'
                        ? 'bg-amber-100 text-amber-900 font-bold dark:bg-amber-950/60 dark:text-amber-200'
                        : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                    }`}
                  >
                    <span>الفريق التقني (إدارة الجمعيات)</span>
                    {role === 'tech_team' && <span>✓</span>}
                  </button>

                  <div className="pt-1 border-t border-[var(--color-border)]">
                    <NavLink
                      to="/auth"
                      onClick={() => setRoleMenuOpen(false)}
                      className="w-full text-right px-2 py-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] flex items-center gap-1.5 text-[11px]"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>صفحة الدخول والتسجيل الكاملة</span>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={t('common.theme_toggle')}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-lg print:hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition-colors ${
                    isActive
                      ? 'text-[var(--color-primary)] font-black'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-1 rounded-full ${
                        isActive ? 'bg-[var(--color-primary-container)]' : ''
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="truncate max-w-[64px] text-[10px]">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
