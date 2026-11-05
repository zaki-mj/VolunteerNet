import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Clock,
  Search,
  ArrowLeft,
  Map as MapIcon,
  LayoutGrid,
  Columns,
  CheckCircle2,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '../mock/data';
import { OpportunityMap } from '../components/opportunities/OpportunityMap';

type ViewMode = 'split' | 'map' | 'grid';

export const OpportunitiesScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialView = (searchParams.get('view') as ViewMode) || 'split';
  const initialWilaya = searchParams.get('wilaya') || '';

  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(initialWilaya);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | undefined>(
    MOCK_OPPORTUNITIES[0]?.id
  );
  const [appliedId, setAppliedId] = useState<string | null>(null);

  // Update URL params when view or wilaya changes
  const handleWilayaChange = (wilaya: string) => {
    setSelectedWilaya(wilaya);
    const newParams = new URLSearchParams(searchParams);
    if (wilaya) {
      newParams.set('wilaya', wilaya);
    } else {
      newParams.delete('wilaya');
    }
    setSearchParams(newParams);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('view', mode);
    setSearchParams(newParams);
  };

  // Categories list
  const categories = [
    { id: 'all', label: 'كافة المجالات' },
    { id: 'environment', label: 'بيئة وتشجير', color: '#006233' },
    { id: 'tech', label: 'تكنولوجيا ورقمنة', color: '#2563eb' },
    { id: 'health', label: 'صحة وإسعاف', color: '#dc2626' },
    { id: 'education', label: 'تعليم ومحو أمية', color: '#d97706' },
    { id: 'culture', label: 'تراث وثقافة', color: '#7c3aed' },
    { id: 'relief', label: 'إغاثة وتضامن', color: '#059669' },
  ];

  // List of unique Wilayas present in opportunities
  const availableWilayas = useMemo(() => {
    const set = new Set(MOCK_OPPORTUNITIES.map((opp) => opp.wilaya));
    return Array.from(set).sort();
  }, []);

  // Filtered opportunities based on search, wilaya, and category
  const filteredOpportunities = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((opp) => {
      // Wilaya filter
      if (selectedWilaya && opp.wilaya !== selectedWilaya) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && opp.category !== selectedCategory) {
        return false;
      }
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesNgo = opp.ngoName.toLowerCase().includes(q);
        const matchesWilaya = opp.wilaya.toLowerCase().includes(q);
        const matchesCommune = opp.commune.toLowerCase().includes(q);
        const matchesDesc = opp.description.toLowerCase().includes(q);
        return matchesTitle || matchesNgo || matchesWilaya || matchesCommune || matchesDesc;
      }
      return true;
    });
  }, [selectedWilaya, selectedCategory, searchQuery]);

  const handleApply = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setAppliedId(id);
    setTimeout(() => {
      setAppliedId(null);
    }, 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 🧭 Header & Discovery Subtitle */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[var(--color-primary-container)]/50 to-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-2xs">
            <Compass className="w-3.5 h-3.5" />
            <span>خريطة ومستكشف الفرص التطوعية الوطنية</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[var(--color-text)]">
            استكشف الفرص التطوعية الميدانية في <span className="text-[var(--color-primary)]">الجزائر</span>
          </h1>

          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            ابحث عن المبادرات حسب ولايتك، أو تصفح الخريطة التفاعلية للتعرف على احتياجات المجتمع والمقاعد الشاغرة لدى أكثر من 180 جمعية معتمدة عبر الوطن.
          </p>
        </div>

        {/* 🎛️ Filter & Controls Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-t border-[var(--color-border)]/80">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المبادرة، الجمعية، البلدية أو الولاية..."
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                مسح
              </button>
            )}
          </div>

          {/* Wilaya Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-xs font-bold text-[var(--color-text-muted)] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span className="hidden sm:inline">الولاية:</span>
            </label>
            <select
              value={selectedWilaya}
              onChange={(e) => handleWilayaChange(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-bold text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            >
              <option value="">كافة الولايات ({MOCK_OPPORTUNITIES.length} فرصة)</option>
              {availableWilayas.map((wilaya) => (
                <option key={wilaya} value={wilaya}>
                  {wilaya}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-[var(--color-surface-muted)] p-1 rounded-xl border border-[var(--color-border)] shrink-0 self-start md:self-auto">
            <button
              onClick={() => handleViewModeChange('split')}
              title="عرض مزدوج (خريطة + بطاقات)"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'split'
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-2xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">عرض مزدوج</span>
            </button>

            <button
              onClick={() => handleViewModeChange('map')}
              title="عرض الخريطة التفاعلية"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-2xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>الخريطة</span>
            </button>

            <button
              onClick={() => handleViewModeChange('grid')}
              title="عرض بطاقات الفرص"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-2xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>البطاقات</span>
            </button>
          </div>
        </div>

        {/* 🏷️ Category Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? MOCK_OPPORTUNITIES.length
                : MOCK_OPPORTUNITIES.filter((o) => o.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white shadow-xs'
                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {cat.color && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isSelected ? '#ffffff' : cat.color }}
                  />
                )}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🎯 MAIN VIEWPORTS */}

      {/* 1. SPLIT VIEW (Map 7 cols + List 5 cols on desktop) */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 sticky top-20">
            <OpportunityMap
              opportunities={filteredOpportunities}
              selectedWilaya={selectedWilaya}
              onSelectWilaya={handleWilayaChange}
              selectedOpportunityId={selectedOpportunityId}
              onSelectOpportunity={(opp) => setSelectedOpportunityId(opp.id)}
            />
          </div>

          {/* Opportunities List Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] px-1">
              <span>
                النتائج المتاحة ({filteredOpportunities.length} مبادرة)
              </span>
              {selectedWilaya && (
                <button
                  onClick={() => handleWilayaChange('')}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  إلغاء تصفية الولاية
                </button>
              )}
            </div>

            {filteredOpportunities.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
                <Compass className="w-10 h-10 text-[var(--color-text-muted)] mx-auto opacity-50" />
                <h4 className="font-bold text-sm text-[var(--color-text)]">
                  لا توجد فرص تطوعية مطابقة
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">
                  جرب اختيار ولاية أخرى أو إلغاء كلمات البحث للعثور على مبادرات.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedWilaya('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold"
                >
                  إعادة ضبط البحث
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[750px] overflow-y-auto pe-1">
                {filteredOpportunities.map((opp) => {
                  const isFocused = selectedOpportunityId === opp.id;
                  const spotsLeft = opp.spotsTotal - opp.spotsTaken;
                  const isApplied = appliedId === opp.id;

                  return (
                    <div
                      key={opp.id}
                      onClick={() => setSelectedOpportunityId(opp.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isFocused
                          ? 'border-[var(--color-primary)] bg-[var(--color-surface)] shadow-md ring-2 ring-[var(--color-primary)]/20'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-hover)] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] mb-1.5">
                        <span className="flex items-center gap-1 font-bold text-[var(--color-primary)]">
                          <MapPin className="w-3.5 h-3.5" />
                          {opp.wilaya} • {opp.commune}
                        </span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          {spotsLeft} مقاعد شاغرة
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[var(--color-text)] leading-snug">
                        {opp.title}
                      </h4>

                      <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="truncate">{opp.ngoName}</span>
                      </p>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--color-border)] gap-2">
                        <span className="text-xs font-mono font-bold text-[var(--color-primary)] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {opp.hours} ساعات معتمدة
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/opportunities/${opp.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text)] text-xs font-medium"
                            title="عرض التفاصيل الكاملة"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          {isApplied ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>تم التسجيل</span>
                            </span>
                          ) : (
                            <button
                              onClick={(e) => handleApply(opp.id, e)}
                              className="px-3 py-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-2xs hover:scale-102"
                            >
                              تطوع الآن
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. MAP VIEW ONLY (Full Width Map with active spotlight below) */}
      {viewMode === 'map' && (
        <div className="space-y-6">
          <OpportunityMap
            opportunities={filteredOpportunities}
            selectedWilaya={selectedWilaya}
            onSelectWilaya={handleWilayaChange}
            selectedOpportunityId={selectedOpportunityId}
            onSelectOpportunity={(opp) => setSelectedOpportunityId(opp.id)}
          />

          {/* Active Wilaya Opportunities Grid Below Map */}
          {selectedWilaya && (
            <div className="space-y-4 pt-2">
              <h3 className="font-extrabold text-lg text-[var(--color-text)] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                <span>المبادرات النشطة في ولاية {selectedWilaya}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] mb-1.5">
                        <span className="font-bold text-[var(--color-primary)]">
                          {opp.commune}
                        </span>
                        <span className="font-mono text-emerald-600 font-bold">
                          {opp.spotsTotal - opp.spotsTaken} مقاعد متاحة
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[var(--color-text)]">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        {opp.ngoName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                      <span className="text-xs font-mono font-bold text-[var(--color-primary)]">
                        {opp.hours} ساعات تطوع
                      </span>
                      <Link
                        to={`/opportunities/${opp.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline"
                      >
                        <span>التفاصيل الكاملة</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. GRID VIEW ONLY */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] px-1">
            <span>
              عرض كافة الفرص المتاحة ({filteredOpportunities.length} مبادرة)
            </span>
            <button
              onClick={() => handleViewModeChange('map')}
              className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>استعراض على الخريطة التفاعلية</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOpportunities.map((opp) => {
              const spotsLeft = opp.spotsTotal - opp.spotsTaken;
              const isApplied = appliedId === opp.id;

              return (
                <div
                  key={opp.id}
                  className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)]">
                        <MapPin className="w-3 h-3" />
                        {opp.wilaya} • {opp.commune}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {spotsLeft} مقاعد متبقية
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                      {opp.title}
                    </h4>

                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 pt-1">
                      <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span className="truncate">{opp.ngoName}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--color-primary)]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{opp.hours} ساعات</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/opportunities/${opp.id}`}
                        className="px-3 py-1.5 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] transition-colors"
                      >
                        التفاصيل
                      </Link>

                      {isApplied ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                          تم التسجيل
                        </span>
                      ) : (
                        <button
                          onClick={(e) => handleApply(opp.id, e)}
                          className="px-3.5 py-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-xs"
                        >
                          تطوع الآن
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
