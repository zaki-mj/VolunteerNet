import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  X,
  Users,
  Building2,
  MapPin,
} from 'lucide-react';
import {
  MOCK_VOLUNTEER_LEADERBOARD,
  MOCK_NGOS,
  type VolunteerLeaderboardEntry,
  type Ngo,
} from '../../mock/data';

export const GlobalSearch: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching volunteers and NGOs
  const matchingVolunteers: VolunteerLeaderboardEntry[] = query.trim()
    ? MOCK_VOLUNTEER_LEADERBOARD.filter((v) => {
        const q = query.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.wilaya.toLowerCase().includes(q) ||
          v.featuredBadge.toLowerCase().includes(q)
        );
      }).slice(0, 4)
    : [];

  const matchingNgos: Ngo[] = query.trim()
    ? MOCK_NGOS.filter((n) => {
        const q = query.toLowerCase();
        return (
          n.name.toLowerCase().includes(q) ||
          n.wilaya.toLowerCase().includes(q) ||
          n.licenseNumber.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
        );
      }).slice(0, 4)
    : [];

  const hasResults = matchingVolunteers.length > 0 || matchingNgos.length > 0;

  const handleSelectVolunteer = (vol: VolunteerLeaderboardEntry) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/leaderboard?tab=volunteers&highlight=${vol.id}`);
  };

  const handleSelectNgo = (ngo: Ngo) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/opportunities?wilaya=${encodeURIComponent(ngo.wilaya)}`);
  };

  return (
    <div className="relative flex-1 max-w-sm sm:max-w-md" ref={containerRef}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute top-2.5 right-3 text-[var(--color-text-muted)] pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t('search.placeholder')}
          className="w-full pr-9 pl-8 py-2 rounded-xl text-xs bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)] transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute top-2.5 left-2.5 p-0.5 rounded-full hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Floating Results Cards Overlay */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-3 z-50 max-h-[480px] overflow-y-auto space-y-4 animate-in fade-in duration-150">
          {hasResults ? (
            <>
              {/* Volunteers Results Section */}
              {matchingVolunteers.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-primary)] px-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{t('search.volunteers')} ({matchingVolunteers.length})</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {matchingVolunteers.map((vol) => (
                      <div
                        key={vol.id}
                        onClick={() => handleSelectVolunteer(vol)}
                        className="p-2.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                            {vol.avatarInitials}
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-xs text-[var(--color-text)] block truncate">
                              {vol.name}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)] mt-0.5">
                              <span className="flex items-center gap-0.5">
                                <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                                {vol.wilaya}
                              </span>
                              <span>•</span>
                              <span className="text-[var(--color-primary)] font-semibold">
                                {vol.featuredBadge}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left shrink-0">
                          <span className="font-mono font-bold text-xs text-[var(--color-primary)] block">
                            {vol.contributingHours} س
                          </span>
                          <span className="text-[9px] text-[var(--color-text-muted)]">
                            مساهمة
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NGOs Results Section */}
              {matchingNgos.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-secondary)] px-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{t('search.organizations')} ({matchingNgos.length})</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {matchingNgos.map((ngo) => (
                      <div
                        key={ngo.id}
                        onClick={() => handleSelectNgo(ngo)}
                        className="p-2.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-surface-hover)] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary-container)] text-[var(--color-secondary)] flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-xs text-[var(--color-text)] block truncate">
                              {ngo.name}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)] mt-0.5">
                              <span className="flex items-center gap-0.5">
                                <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                                {ngo.wilaya}
                              </span>
                              <span>•</span>
                              <span className="font-mono text-[9px]">{ngo.licenseNumber}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left shrink-0">
                          <span className="font-mono font-bold text-xs text-[var(--color-text)] block">
                            {ngo.activeOpportunities}
                          </span>
                          <span className="text-[9px] text-[var(--color-text-muted)]">
                            {t('search.active_opps')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* No Results Found */
            <div className="py-6 text-center text-xs text-[var(--color-text-muted)] space-y-1">
              <p>
                {t('search.no_results')} <strong className="text-[var(--color-text)]">"{query}"</strong>
              </p>
              <p className="text-[10px]">
                جرب البحث باسم متطوع، جمعية معتمدة، أو ولاية جزائرية.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
