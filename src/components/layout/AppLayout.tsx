import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
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
  Layers,
  LogOut,
  Trophy,
} from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

export const AppLayout: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, role, setRole, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setProfileDropdownOpen(false);
    if (newRole === 'tech_team') {
      navigate('/admin/ngos');
    } else if (newRole === 'ngo') {
      navigate('/ngo/dashboard');
    } else {
      navigate('/activity');
    }
  };

  // Clean primary navigation items (Now including Leaderboard!)
  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/opportunities', label: t('nav.opportunities'), icon: Compass },
    { to: '/workshops', label: t('nav.workshops'), icon: GraduationCap },
    { to: '/leaderboard', label: t('nav.leaderboard'), icon: Trophy },
    { to: '/activity', label: t('nav.activity'), icon: Clock },
    { to: '/certificates', label: t('nav.certificates'), icon: Award },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      {/* Clean Top Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <NavLink to="/" className="flex items-center group">
              <Logo size="md" />
            </NavLink>
          </div>

          {/* Clean Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)] shadow-2xs'
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

          {/* Right Header Utilities: Fast Verify, Theme Toggle, and Unified Profile Menu */}
          <div className="flex items-center gap-2">
            {/* Quick Public Certificate Verification shortcut */}
            <NavLink
              to="/verify"
              className={({ isActive }) =>
                `p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                  isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-container)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`
              }
              title="فحص صحة الشهادات المعتمدة"
            >
              <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="hidden xl:inline text-[11px]">فحص الشهادات</span>
            </NavLink>

            {/* Modular Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={t('common.theme_toggle')}
              className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Unified User Profile & Role Dropdown (Replaces scattered buttons) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-right ${
                  profileDropdownOpen
                    ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 bg-[var(--color-surface-hover)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    role === 'tech_team'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : role === 'ngo'
                      ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                      : 'bg-[var(--color-primary)] text-white'
                  }`}
                >
                  {role === 'tech_team' ? (
                    <ShieldAlert className="w-4 h-4" />
                  ) : role === 'ngo' ? (
                    <Building2 className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                <div className="hidden sm:flex flex-col select-none">
                  <span className="font-bold text-xs leading-none text-[var(--color-text)] truncate max-w-[110px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--color-text-muted)] mt-0.5">
                    {role === 'tech_team'
                      ? 'مسؤول تقني'
                      : role === 'ngo'
                      ? 'جمعية'
                      : 'متطوع'}
                  </span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
              </button>

              {/* Clean Profile & Perspective Switcher Menu */}
              {profileDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl p-2.5 z-50 text-xs space-y-2 animate-in fade-in duration-150">
                  {/* Menu User Header */}
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-muted)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--color-text)] truncate max-w-[170px]">
                        {user.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          role === 'tech_team'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : role === 'ngo'
                            ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                            : 'bg-[var(--color-secondary-container)] text-[var(--color-secondary)]'
                        }`}
                      >
                        {role === 'tech_team'
                          ? 'إشراف مركزي'
                          : role === 'ngo'
                          ? 'جمعية معتمدة'
                          : 'متطوع بسيط'}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] truncate">
                      {user.email}
                    </div>
                  </div>

                  {/* Dropdown Section: Role Switcher (Prototype Demo) */}
                  <div className="space-y-1 pt-1">
                    <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[var(--color-primary)]" />
                      <span>{t('profile.switch_role_title')}</span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <button
                        onClick={() => handleRoleSwitch('volunteer')}
                        className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors ${
                          role === 'volunteer'
                            ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)] font-bold'
                            : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5" />
                          <span>{t('profile.roles.volunteer')}</span>
                        </div>
                        {role === 'volunteer' && <span className="text-[11px]">✓ نشط</span>}
                      </button>

                      <button
                        onClick={() => handleRoleSwitch('ngo')}
                        className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors ${
                          role === 'ngo'
                            ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)] font-bold'
                            : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{t('profile.roles.ngo')}</span>
                        </div>
                        {role === 'ngo' && <span className="text-[11px]">✓ نشط</span>}
                      </button>

                      <button
                        onClick={() => handleRoleSwitch('tech_team')}
                        className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors ${
                          role === 'tech_team'
                            ? 'bg-amber-100 text-amber-900 font-bold dark:bg-amber-950/60 dark:text-amber-200'
                            : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>{t('profile.roles.tech_team')}</span>
                        </div>
                        {role === 'tech_team' && <span className="text-[11px]">✓ نشط</span>}
                      </button>
                    </div>
                  </div>

                  {/* Navigation Links inside User Profile Menu */}
                  <div className="pt-2 border-t border-[var(--color-border)] space-y-1">
                    <NavLink
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] font-bold transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>{t('nav.profile')} (إدارة الحساب)</span>
                    </NavLink>

                    {role === 'ngo' && (
                      <NavLink
                        to="/ngo/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] font-semibold transition-colors"
                      >
                        <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        <span>لوحة إدارة المتقدمين والاعتمادات</span>
                      </NavLink>
                    )}

                    {role === 'tech_team' && (
                      <NavLink
                        to="/admin/ngos"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] font-semibold transition-colors"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        <span>بوابة حوكمة وتراخيص الجمعيات</span>
                      </NavLink>
                    )}

                    <NavLink
                      to="/auth"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-[var(--color-text-muted)] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-[11px] transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('common.logout')} / تبديل الحساب</span>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar (< 768px) with Leaderboard & Profile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-lg print:hidden">
        <div className="grid grid-cols-5 h-16">
          <NavLink
            to="/"
            end
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
                <div className={`p-1 rounded-full ${isActive ? 'bg-[var(--color-primary-container)]' : ''}`}>
                  <Home className="w-4 h-4" />
                </div>
                <span className="truncate max-w-[64px] text-[10px]">{t('nav.home')}</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/opportunities"
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
                <div className={`p-1 rounded-full ${isActive ? 'bg-[var(--color-primary-container)]' : ''}`}>
                  <Compass className="w-4 h-4" />
                </div>
                <span className="truncate max-w-[64px] text-[10px]">{t('nav.opportunities')}</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/leaderboard"
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
                <div className={`p-1 rounded-full ${isActive ? 'bg-[var(--color-primary-container)]' : ''}`}>
                  <Trophy className="w-4 h-4" />
                </div>
                <span className="truncate max-w-[64px] text-[10px]">{t('nav.leaderboard')}</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/activity"
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
                <div className={`p-1 rounded-full ${isActive ? 'bg-[var(--color-primary-container)]' : ''}`}>
                  <Clock className="w-4 h-4" />
                </div>
                <span className="truncate max-w-[64px] text-[10px]">{t('nav.activity')}</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/profile"
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
                <div className={`p-1 rounded-full ${isActive ? 'bg-[var(--color-primary-container)]' : ''}`}>
                  <User className="w-4 h-4" />
                </div>
                <span className="truncate max-w-[64px] text-[10px]">{t('nav.profile')}</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
