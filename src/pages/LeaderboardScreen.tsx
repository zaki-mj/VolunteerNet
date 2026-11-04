import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Trophy,
  Users,
  Building2,
  MapPin,
  ArrowUpDown,
  Search,
  Award,
} from 'lucide-react';
import {
  MOCK_VOLUNTEER_LEADERBOARD,
  MOCK_NGO_LEADERBOARD,
} from '../mock/data';

type LeaderboardTab = 'volunteers' | 'organizations';
type VolunteerSortCriteria = 'contributing' | 'teaching' | 'learning';
type NgoSortCriteria = 'impacted_volunteers' | 'activity_hours';

export const LeaderboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('volunteers');
  const [volunteerSort, setVolunteerSort] = useState<VolunteerSortCriteria>('contributing');
  const [ngoSort, setNgoSort] = useState<NgoSortCriteria>('impacted_volunteers');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique Wilayas for filter
  const volunteerWilayas = useMemo(() => {
    const list = Array.from(new Set(MOCK_VOLUNTEER_LEADERBOARD.map((v) => v.wilaya)));
    return list.sort();
  }, []);

  const ngoWilayas = useMemo(() => {
    const list = Array.from(new Set(MOCK_NGO_LEADERBOARD.map((n) => n.wilaya)));
    return list.sort();
  }, []);

  // Filtered & Sorted Volunteers
  const sortedVolunteers = useMemo(() => {
    let list = [...MOCK_VOLUNTEER_LEADERBOARD];

    if (selectedWilaya !== 'all') {
      list = list.filter((v) => v.wilaya === selectedWilaya);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((v) => v.name.toLowerCase().includes(q) || v.wilaya.toLowerCase().includes(q));
    }

    list.sort((a, b) => {
      if (volunteerSort === 'contributing') {
        return b.contributingHours - a.contributingHours;
      }
      if (volunteerSort === 'teaching') {
        return b.teachingHours - a.teachingHours;
      }
      return b.learningHours - a.learningHours;
    });

    return list;
  }, [volunteerSort, selectedWilaya, searchQuery]);

  // Filtered & Sorted NGOs
  const sortedNgos = useMemo(() => {
    let list = [...MOCK_NGO_LEADERBOARD];

    if (selectedWilaya !== 'all') {
      list = list.filter((n) => n.wilaya === selectedWilaya);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((n) => n.name.toLowerCase().includes(q) || n.wilaya.toLowerCase().includes(q));
    }

    list.sort((a, b) => {
      if (ngoSort === 'impacted_volunteers') {
        return b.impactedVolunteers - a.impactedVolunteers;
      }
      return b.activityHours - a.activityHours;
    });

    return list;
  }, [ngoSort, selectedWilaya, searchQuery]);

  // Top 3 Podium
  const topThreeVolunteers = sortedVolunteers.slice(0, 3);
  const topThreeNgos = sortedNgos.slice(0, 3);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-primary-container)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-2xs">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>{t('leaderboard.title')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-text)] tracking-tight">
          لوحة الشرف وصناع الأثر الوطني
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
          {t('leaderboard.subtitle')}
        </p>
      </div>

      {/* Main Mode Toggle: Volunteers vs Organizations */}
      <div className="max-w-md mx-auto grid grid-cols-2 p-1.5 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] shadow-xs">
        <button
          onClick={() => {
            setActiveTab('volunteers');
            setSelectedWilaya('all');
            setSearchQuery('');
          }}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'volunteers'
              ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm font-black'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('leaderboard.tabs.volunteers')}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('organizations');
            setSelectedWilaya('all');
            setSearchQuery('');
          }}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'organizations'
              ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm font-black'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{t('leaderboard.tabs.organizations')}</span>
        </button>
      </div>

      {/* Filter & Sorting Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute top-3 right-3 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('leaderboard.filters.search_placeholder')}
            className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Wilaya Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] font-medium focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
            >
              <option value="all">{t('leaderboard.filters.all_wilayas')}</option>
              {(activeTab === 'volunteers' ? volunteerWilayas : ngoWilayas).map((wilaya) => (
                <option key={wilaya} value={wilaya}>
                  {wilaya}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Criteria */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            {activeTab === 'volunteers' ? (
              <select
                value={volunteerSort}
                onChange={(e) => setVolunteerSort(e.target.value as VolunteerSortCriteria)}
                className="px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] font-bold focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
              >
                <option value="contributing">⏳ {t('leaderboard.sort_volunteers.contributing')}</option>
                <option value="teaching">👨‍🏫 {t('leaderboard.sort_volunteers.teaching')}</option>
                <option value="learning">🎓 {t('leaderboard.sort_volunteers.learning')}</option>
              </select>
            ) : (
              <select
                value={ngoSort}
                onChange={(e) => setNgoSort(e.target.value as NgoSortCriteria)}
                className="px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] font-bold focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-hidden"
              >
                <option value="impacted_volunteers">👥 {t('leaderboard.sort_ngos.impacted_volunteers')}</option>
                <option value="activity_hours">⏱️ {t('leaderboard.sort_ngos.activity_hours')}</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* 🏆 Podium Top 3 Showcase */}
      {((activeTab === 'volunteers' && topThreeVolunteers.length > 0) ||
        (activeTab === 'organizations' && topThreeNgos.length > 0)) && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-6">
            {activeTab === 'volunteers'
              ? [
                  { entry: topThreeVolunteers[1], rank: 2, badge: '🥈', color: 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30' },
                  { entry: topThreeVolunteers[0], rank: 1, badge: '🥇', color: 'border-amber-300 dark:border-amber-600 bg-amber-50/60 dark:bg-amber-950/20 md:-translate-y-4 shadow-md' },
                  { entry: topThreeVolunteers[2], rank: 3, badge: '🥉', color: 'border-amber-700/30 bg-orange-50/50 dark:bg-orange-950/20' },
                ].map(({ entry, rank, badge, color }) => {
                  if (!entry) return null;
                  return (
                    <div
                      key={entry.id}
                      className={`relative rounded-3xl border-2 p-5 text-center flex flex-col items-center justify-between gap-3 transition-transform ${color}`}
                    >
                      <span className="text-3xl filter drop-shadow-sm">{badge}</span>
                      <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center font-black text-xl shadow-sm">
                        {entry.avatarInitials}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                          المركز {rank}
                        </span>
                        <h3 className="text-base font-black text-[var(--color-text)]">{entry.name}</h3>
                        <div className="flex items-center justify-center gap-1 text-xs text-[var(--color-text-muted)]">
                          <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                          <span>{entry.wilaya}</span>
                        </div>
                      </div>

                      {/* Primary highlight stat based on sort */}
                      <div className="w-full pt-3 border-t border-[var(--color-border)]/60 text-xs space-y-1">
                        <div className="font-mono text-xl font-black text-[var(--color-primary)]">
                          {volunteerSort === 'contributing'
                            ? `${entry.contributingHours} س مساهمة`
                            : volunteerSort === 'teaching'
                            ? `${entry.teachingHours} س تدريس`
                            : `${entry.learningHours} س تعلّم`}
                        </div>
                        <span className="text-[10px] text-[var(--color-text-muted)] block">
                          {entry.featuredBadge}
                        </span>
                      </div>
                    </div>
                  );
                })
              : [
                  { entry: topThreeNgos[1], rank: 2, badge: '🥈', color: 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30' },
                  { entry: topThreeNgos[0], rank: 1, badge: '🥇', color: 'border-amber-300 dark:border-amber-600 bg-amber-50/60 dark:bg-amber-950/20 md:-translate-y-4 shadow-md' },
                  { entry: topThreeNgos[2], rank: 3, badge: '🥉', color: 'border-amber-700/30 bg-orange-50/50 dark:bg-orange-950/20' },
                ].map(({ entry, rank, badge, color }) => {
                  if (!entry) return null;
                  return (
                    <div
                      key={entry.id}
                      className={`relative rounded-3xl border-2 p-5 text-center flex flex-col items-center justify-between gap-3 transition-transform ${color}`}
                    >
                      <span className="text-3xl filter drop-shadow-sm">{badge}</span>
                      <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-black text-xl shadow-sm">
                        <Building2 className="w-8 h-8" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                          المركز {rank}
                        </span>
                        <h3 className="text-sm font-black text-[var(--color-text)] line-clamp-2 px-2">
                          {entry.name}
                        </h3>
                        <div className="flex items-center justify-center gap-1 text-xs text-[var(--color-text-muted)]">
                          <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                          <span>{entry.wilaya}</span>
                        </div>
                      </div>

                      <div className="w-full pt-3 border-t border-[var(--color-border)]/60 text-xs space-y-1">
                        <div className="font-mono text-xl font-black text-[var(--color-primary)]">
                          {ngoSort === 'impacted_volunteers'
                            ? `${entry.impactedVolunteers.toLocaleString('ar-DZ')} متطوع`
                            : `${entry.activityHours.toLocaleString('ar-DZ')} ساعة`}
                        </div>
                        <span className="text-[10px] text-[var(--color-text-muted)] block">
                          {entry.completedInitiatives} مبادرة منجزة
                        </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      )}

      {/* 📊 Full Ranked Table (Desktop & Tablet) */}
      <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-base font-bold text-[var(--color-text)]">
              {activeTab === 'volunteers' ? 'التصنيف الكامل للمتطوعين' : 'التصنيف الكامل للجمعيات المعتمدة'}
            </h2>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {activeTab === 'volunteers' ? sortedVolunteers.length : sortedNgos.length} سجل
          </span>
        </div>

        {activeTab === 'volunteers' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]">
                  <th className="py-3 px-4 text-center">{t('leaderboard.columns.rank')}</th>
                  <th className="py-3 px-4">{t('leaderboard.columns.volunteer')}</th>
                  <th className="py-3 px-4">{t('leaderboard.columns.wilaya')}</th>
                  <th className="py-3 px-4 text-center font-bold text-[var(--color-primary)]">
                    {t('leaderboard.columns.contributing_hours')}
                  </th>
                  <th className="py-3 px-4 text-center">{t('leaderboard.columns.teaching_hours')}</th>
                  <th className="py-3 px-4 text-center">{t('leaderboard.columns.learning_hours')}</th>
                  <th className="py-3 px-4 text-center">{t('leaderboard.columns.badge')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {sortedVolunteers.map((vol, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={vol.id}
                      className={`hover:bg-[var(--color-surface-hover)] transition-colors ${
                        rank <= 3 ? 'font-bold bg-[var(--color-primary-container)]/10' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-mono">
                        {rank === 1 ? '🥇 1' : rank === 2 ? '🥈 2' : rank === 3 ? '🥉 3' : rank}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xs shrink-0">
                            {vol.avatarInitials}
                          </div>
                          <div>
                            <span className="font-bold text-[var(--color-text)] block">{vol.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[var(--color-text-muted)]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                          {vol.wilaya}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-[var(--color-primary)]">
                        {vol.contributingHours} س
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium text-[var(--color-text)]">
                        {vol.teachingHours} س
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium text-[var(--color-text)]">
                        {vol.learningHours} س
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-border)]">
                          {vol.featuredBadge}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]">
                  <th className="py-3 px-4 text-center">{t('leaderboard.columns.rank')}</th>
                  <th className="py-3 px-4">{t('leaderboard.columns.ngo')}</th>
                  <th className="py-3 px-4">{t('leaderboard.columns.wilaya')}</th>
                  <th className="py-3 px-4 text-center font-bold text-[var(--color-primary)]">
                    {t('leaderboard.columns.impacted_volunteers')}
                  </th>
                  <th className="py-3 px-4 text-center">{t('leaderboard.columns.activity_hours')}</th>
                  <th className="py-3 px-4 text-center">{t('leaderboard.columns.initiatives')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {sortedNgos.map((ngo, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={ngo.id}
                      className={`hover:bg-[var(--color-surface-hover)] transition-colors ${
                        rank <= 3 ? 'font-bold bg-[var(--color-primary-container)]/10' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-mono">
                        {rank === 1 ? '🥇 1' : rank === 2 ? '🥈 2' : rank === 3 ? '🥉 3' : rank}
                      </td>
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-bold text-[var(--color-text)] block">{ngo.name}</span>
                          <span className="text-[10px] font-mono text-[var(--color-primary)] block mt-0.5">
                            {ngo.licenseNumber}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[var(--color-text-muted)]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                          {ngo.wilaya}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-[var(--color-primary)]">
                        {ngo.impactedVolunteers.toLocaleString('ar-DZ')}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium text-[var(--color-text)]">
                        {ngo.activityHours.toLocaleString('ar-DZ')} س
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium text-[var(--color-text)]">
                        {ngo.completedInitiatives}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
