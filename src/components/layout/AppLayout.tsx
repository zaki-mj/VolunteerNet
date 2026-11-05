import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Compass,
  GraduationCap,
  ShieldCheck,
  Building2,
  Sun,
  Moon,
  ShieldAlert,
  User,
  Layers,
  LogOut,
  Trophy,
  Menu,
  X,
  Clock,
  Award,
  PlusCircle,
  Users,
  Globe,
} from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { GlobalSearch } from '../common/GlobalSearch';

export const AppLayout: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, role, setRole, logout } = useAuth();
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close hamburger drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHamburgerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (hamburgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hamburgerOpen]);

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setHamburgerOpen(false);
    if (newRole === 'tech_team') {
      navigate('/admin/ngos');
    } else if (newRole === 'ngo') {
      navigate('/ngo/dashboard');
    } else {
      navigate('/activity');
    }
  };

  // Shared Public Tabs in Top Navbar:
  // 1. Home, 2. Opportunities (with Map Discovery), 3. Learn & Participate, 4. Leaderboard, 5. Verify Certificates
  const publicNavTabs = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/opportunities', label: t('nav.opportunities'), icon: Compass },
    { to: '/workshops', label: t('nav.workshops'), icon: GraduationCap },
    { to: '/leaderboard', label: t('nav.leaderboard'), icon: Trophy },
    { to: '/verify', label: t('nav.verify'), icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      {/* 🚀 Ultra-Clean Top Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <NavLink to="/" className="flex items-center group">
              <Logo size="md" />
            </NavLink>
          </div>

          {/* Shared Public Navigation Tabs (Center) */}
          <nav className="hidden lg:flex items-center gap-1">
            {publicNavTabs.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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

          {/* Search Bar for Volunteers & NGOs */}
          <div className="flex-1 max-w-xs md:max-w-sm hidden sm:block">
            <GlobalSearch />
          </div>

          {/* 👤 Profile Link & 🍔 Hamburger Actions Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dedicated Profile Page Button */}
            <NavLink
              to="/profile"
              title={t('nav.profile')}
              aria-label={t('nav.profile')}
              className={({ isActive }) =>
                `flex items-center gap-2 p-1.5 sm:ps-2 sm:pe-3 rounded-full sm:rounded-xl border transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                  isActive
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-container)]/50 text-[var(--color-primary)] shadow-xs'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/40 text-[var(--color-text)]'
                }`
              }
            >
              {/* Avatar circle with role ring & status badge */}
              <div className="relative">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full sm:rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-transform group-hover:scale-105 ${
                    role === 'tech_team'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 ring-2 ring-amber-500/30'
                      : role === 'ngo'
                      ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/30'
                      : 'bg-[var(--color-primary)] text-white ring-2 ring-[var(--color-primary)]/20'
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

                {/* Status indicator dot */}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ring-2 ring-[var(--color-surface)] ${
                    role === 'tech_team'
                      ? 'bg-amber-500'
                      : role === 'ngo'
                      ? 'bg-[var(--color-primary)]'
                      : 'bg-emerald-500'
                  }`}
                />
              </div>

              {/* Text label: Name + Role pill on screens >= sm */}
              <div className="hidden sm:flex flex-col text-start leading-tight">
                <span className="text-xs font-bold text-[var(--color-text)] truncate max-w-[90px]">
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                  {role === 'tech_team'
                    ? 'فريق تقني'
                    : role === 'ngo'
                    ? 'جمعية'
                    : 'متطوع'}
                </span>
              </div>
            </NavLink>

            {/* Subtle Vertical Divider */}
            <div className="h-6 w-px bg-[var(--color-border)] hidden sm:block" />

            {/* Dedicated Hamburger Menu Toggle Button */}
            <button
              onClick={() => setHamburgerOpen(true)}
              aria-label={t('nav.menu')}
              aria-expanded={hamburgerOpen}
              title={t('nav.menu')}
              className="p-2 sm:p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/40 text-[var(--color-text)] transition-all shadow-2xs group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <Menu className="w-5 h-5 text-[var(--color-text)] group-hover:text-[var(--color-primary)] group-hover:scale-105 transition-all" />
            </button>
          </div>
        </div>

        {/* Small screen inline search bar below header on mobile (< 640px) */}
        <div className="sm:hidden px-4 pb-2.5">
          <GlobalSearch />
        </div>
      </header>

      {/* 🍔 Slide-Over Hamburger Menu Drawer */}
      {hamburgerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setHamburgerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer Content Panel */}
          <div
            ref={drawerRef}
            className="relative w-full max-w-sm bg-[var(--color-surface)] h-full shadow-2xl border-s border-[var(--color-border)] z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Header with Close Button */}
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface-muted)]/50">
              <div className="flex items-center gap-2">
                <Logo size="sm" showText={false} />
                <span className="font-bold text-sm text-[var(--color-text)]">
                  {t('app.name')}
                </span>
              </div>
              <button
                onClick={() => setHamburgerOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-6 flex-1">
              {/* 1. Logged-in Profile Card */}
              <div className="p-4 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                      role === 'tech_team'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        : role === 'ngo'
                        ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                        : 'bg-[var(--color-primary)] text-white'
                    }`}
                  >
                    {role === 'tech_team' ? (
                      <ShieldAlert className="w-6 h-6" />
                    ) : role === 'ngo' ? (
                      <Building2 className="w-6 h-6" />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>

                  <div className="truncate">
                    <span className="font-bold text-sm text-[var(--color-text)] block truncate">
                      {user.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] block truncate">
                      {user.email}
                    </span>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        role === 'tech_team'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300'
                          : role === 'ngo'
                          ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                          : 'bg-[var(--color-secondary-container)] text-[var(--color-secondary)]'
                      }`}
                    >
                      {role === 'tech_team'
                        ? 'إشراف مركزي (Admin)'
                        : role === 'ngo'
                        ? 'منظمة / جمعية'
                        : 'متطوع شاب'}
                    </span>
                  </div>
                </div>

                {/* Perspective Role Switcher (Prototype Demo) */}
                <div className="pt-2 border-t border-[var(--color-border)]/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[var(--color-primary)]" />
                    <span>{t('profile.switch_role_title')}</span>
                  </span>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <button
                      onClick={() => handleRoleSwitch('volunteer')}
                      className={`p-2 rounded-lg font-bold border transition-all text-center ${
                        role === 'volunteer'
                          ? 'border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs'
                          : 'border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                      }`}
                    >
                      متطوع
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('ngo')}
                      className={`p-2 rounded-lg font-bold border transition-all text-center ${
                        role === 'ngo'
                          ? 'border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs'
                          : 'border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                      }`}
                    >
                      جمعية
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('tech_team')}
                      className={`p-2 rounded-lg font-bold border transition-all text-center ${
                        role === 'tech_team'
                          ? 'border-amber-400 bg-[var(--color-surface)] text-amber-700 dark:text-amber-300 shadow-xs'
                          : 'border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                      }`}
                    >
                      مسؤول
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Role-Customized Actions Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                  {t('menu.role_features')}
                </span>

                <div className="space-y-1">
                  {/* FOR VOLUNTEERS: My Activities & My Certificates */}
                  {role === 'volunteer' && (
                    <>
                      <NavLink
                        to="/activity"
                        onClick={() => setHamburgerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                              : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                          }`
                        }
                      >
                        <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{t('menu.my_activities')}</span>
                      </NavLink>

                      <NavLink
                        to="/certificates"
                        onClick={() => setHamburgerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                              : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                          }`
                        }
                      >
                        <Award className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{t('menu.my_certificates')}</span>
                      </NavLink>
                    </>
                  )}

                  {/* FOR ORGANIZATIONS: Host Activity & Manage Applicants */}
                  {role === 'ngo' && (
                    <>
                      <NavLink
                        to="/opportunities/new"
                        onClick={() => setHamburgerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                              : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                          }`
                        }
                      >
                        <PlusCircle className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{t('menu.host_activity')}</span>
                      </NavLink>

                      <NavLink
                        to="/ngo/dashboard"
                        onClick={() => setHamburgerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                              : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                          }`
                        }
                      >
                        <Users className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{t('menu.manage_applicants')}</span>
                      </NavLink>
                    </>
                  )}

                  {/* FOR ADMIN: Manage Organizations & Manage Volunteers */}
                  {role === 'tech_team' && (
                    <>
                      <NavLink
                        to="/admin/ngos"
                        onClick={() => setHamburgerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                          }`
                        }
                      >
                        <Building2 className="w-4 h-4 text-amber-600" />
                        <span>{t('menu.manage_orgs')}</span>
                      </NavLink>

                      <NavLink
                        to="/admin/ngos"
                        onClick={() => setHamburgerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                          }`
                        }
                      >
                        <Users className="w-4 h-4 text-amber-600" />
                        <span>{t('menu.manage_volunteers')}</span>
                      </NavLink>

                      <NavLink
                        to="/verify"
                        onClick={() => setHamburgerOpen(false)}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{t('menu.verify_ledger')}</span>
                      </NavLink>
                    </>
                  )}

                  {/* Profile Section */}
                  <NavLink
                    to="/profile"
                    onClick={() => setHamburgerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                          : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                      }`
                    }
                  >
                    <User className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>{t('nav.profile')}</span>
                  </NavLink>
                </div>
              </div>

              {/* 3. Preferences (Theme, Language, Account) */}
              <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                  {t('menu.preferences')}
                </span>

                {/* Dark / Light Mode Switcher */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--color-surface-muted)] text-xs">
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Moon className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Sun className="w-4 h-4 text-amber-500" />
                    )}
                    <span className="font-bold text-[var(--color-text)]">
                      {theme === 'dark' ? t('menu.dark_mode') : t('menu.light_mode')}
                    </span>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className="px-3 py-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors shadow-2xs"
                  >
                    تبديل
                  </button>
                </div>

                {/* Language Switcher */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--color-surface-muted)] text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="font-bold text-[var(--color-text)]">
                      {t('common.language')}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-primary-container)] px-2 py-0.5 rounded-md">
                    العربية (RTL)
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Footer with Logout */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]/50">
              <NavLink
                to="/auth"
                onClick={() => {
                  setHamburgerOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 border border-[var(--color-border)] text-xs font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('common.logout')}</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-20">
        <Outlet />
      </main>
    </div>
  );
};
