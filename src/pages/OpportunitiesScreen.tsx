import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Clock,
  Search,
  Map as MapIcon,
  LayoutGrid,
  Camera,
  Columns,
  CheckCircle2,
  Building2,
  ExternalLink,
  HeartHandshake,
  GraduationCap,
} from 'lucide-react';
import { getStoredOpportunities, getStoredWorkshops, type Opportunity, type Workshop } from '../mock/data';
import { OpportunityMap, type PointTypeFilter } from '../components/opportunities/OpportunityMap';

type ViewMode = 'split' | 'map' | 'grid';

export const OpportunitiesScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => getStoredOpportunities());
  const [workshops, setWorkshops] = useState<Workshop[]>(() => getStoredWorkshops());

  useEffect(() => {
    const handleUpdate = () => {
      setOpportunities(getStoredOpportunities());
      setWorkshops(getStoredWorkshops());
    };
    window.addEventListener('volunteernet_data_updated', handleUpdate);
    return () => window.removeEventListener('volunteernet_data_updated', handleUpdate);
  }, []);

  const initialView = (searchParams.get('view') as ViewMode) || 'split';
  const initialWilaya = searchParams.get('wilaya') || '';

  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(initialWilaya);
  const initialType = (searchParams.get('type') as PointTypeFilter) || 'all';
  const [pointTypeFilter, setPointTypeFilter] = useState<PointTypeFilter>(initialType);

  const initialStatus = (searchParams.get('status') as 'all' | 'active' | 'past') || 'all';
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'past'>(initialStatus);

  const handleStatusFilterChange = (status: 'all' | 'active' | 'past') => {
    setStatusFilter(status);
    const newParams = new URLSearchParams(searchParams);
    if (status !== 'all') {
      newParams.set('status', status);
    } else {
      newParams.delete('status');
    }
    setSearchParams(newParams);
  };

  const handlePointTypeFilterChange = (type: PointTypeFilter) => {
    setPointTypeFilter(type);
    const newParams = new URLSearchParams(searchParams);
    if (type !== 'all') {
      newParams.set('type', type);
    } else {
      newParams.delete('type');
    }
    setSearchParams(newParams);
  };
  const [selectedId, setSelectedId] = useState<string | undefined>(() => opportunities[0]?.id);
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

  // Unique Wilayas from both opportunities and workshops
  const availableWilayas = useMemo(() => {
    const set = new Set<string>();
    opportunities.forEach((o) => set.add(o.wilaya));
    workshops.forEach((w) => {
      if (w.wilaya) set.add(w.wilaya);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered Opportunities (Volunteering)
  const filteredOpportunities = useMemo(() => {
    if (pointTypeFilter === 'learning') return [];

    return opportunities.filter((opp) => {
      // Status filter: active vs past
      if (statusFilter === 'active' && (opp.status === 'completed' || opp.isPast)) return false;
      if (statusFilter === 'past' && opp.status !== 'completed' && !opp.isPast) return false;

      if (selectedWilaya && opp.wilaya !== selectedWilaya) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          opp.title.toLowerCase().includes(q) ||
          opp.ngoName.toLowerCase().includes(q) ||
          opp.wilaya.toLowerCase().includes(q) ||
          opp.commune.toLowerCase().includes(q) ||
          opp.description.toLowerCase().includes(q) ||
          (opp.mentors && opp.mentors.some((m) => m.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [selectedWilaya, searchQuery, pointTypeFilter, statusFilter, opportunities]);

  // Filtered Workshops (Learning)
  const filteredWorkshops = useMemo(() => {
    if (pointTypeFilter === 'volunteer') return [];

    return workshops.filter((ws) => {
      // Status filter: active vs past
      if (statusFilter === 'active' && ws.isPast) return false;
      if (statusFilter === 'past' && !ws.isPast) return false;

      if (selectedWilaya && ws.wilaya !== selectedWilaya) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          ws.title.toLowerCase().includes(q) ||
          ws.organizer.toLowerCase().includes(q) ||
          (ws.wilaya && ws.wilaya.toLowerCase().includes(q)) ||
          ws.location.toLowerCase().includes(q) ||
          ws.description.toLowerCase().includes(q) ||
          (ws.mentors && ws.mentors.some((m) => m.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [selectedWilaya, searchQuery, pointTypeFilter, statusFilter, workshops]);

  const handleApply = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setAppliedId(id);
    setTimeout(() => {
      setAppliedId(null);
    }, 4000);
  };

  const totalResultsCount = filteredOpportunities.length + filteredWorkshops.length;

  return (
    <div className="space-y-8 pb-16">
      {/* 🧭 Header with OpenStreetMap Live Discovery */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[var(--color-primary-container)]/50 to-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-2xs">
            <Compass className="w-3.5 h-3.5" />
            <span>خريطة الجزائر الحية للاستكشاف الجغرافي</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[var(--color-text)]">
            استكشف فرص <span className="text-[var(--color-primary)]">التطوع</span> و{' '}
            <span className="text-[#2563eb]">التعلّم</span> عبر خريطة الجزائر
          </h1>

          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            خريطة جغرافية حقيقية للجزائر (OpenStreetMap) تمكّنك من استكشاف نوعين أساسيين من المبادرات: فرص التطوع الميداني مع الجمعيات المعتمدة، وورشات التعلّم وبناء القدرات.
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
              placeholder="ابحث باسم المبادرة، الجمعية، الولاية أو الورشة..."
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
              <option value="">كافة الولايات ({availableWilayas.length} ولاية نشطة)</option>
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

        {/* 🌟 Status / Timeline Filter Bar (All vs Open vs Past Events Archive) */}
        <div className="pt-3 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-3">
          {/* Timeline Status Segmented Switcher */}
          <div className="flex items-center bg-[var(--color-surface-muted)] p-1 rounded-2xl border border-[var(--color-border)] text-xs font-bold shrink-0">
            <button
              onClick={() => handleStatusFilterChange('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                statusFilter === 'all'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-xs font-black'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              كافة المبادرات
            </button>

            <button
              onClick={() => handleStatusFilterChange('active')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                statusFilter === 'active'
                  ? 'bg-[var(--color-surface)] text-emerald-600 shadow-xs font-black'
                  : 'text-[var(--color-text-muted)] hover:text-emerald-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>المفتوحة للتسجيل</span>
            </button>

            <button
              onClick={() => handleStatusFilterChange('past')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                statusFilter === 'past'
                  ? 'bg-amber-500 text-white shadow-xs font-black'
                  : 'text-amber-800 dark:text-amber-300 hover:text-amber-600 font-bold'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>أرشيف الفعاليات السابقة 📸</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === 'past'
                    ? 'bg-white/25 text-white'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                منجزة
              </span>
            </button>
          </div>

          <span className="text-xs text-[var(--color-text-muted)] font-medium">
            {statusFilter === 'past'
              ? '📸 تعرض الفعاليات والورشات المكتملة مع ألبوم الصور الميدانية'
              : statusFilter === 'active'
              ? '🟢 تعرض الفرص الحالية المتاحة للانضمام والتطوع الفوري'
              : 'استكشاف شامل للفرص المفتوحة والفعاليات المنجزة'}
          </span>
        </div>

        {/* 🌟 Type Filter Chips (Volunteering vs Learning) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
          <button
            onClick={() => handlePointTypeFilterChange('all')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              pointTypeFilter === 'all'
                ? 'bg-[var(--color-surface)] text-[var(--color-text)] border-2 border-[var(--color-primary)] shadow-xs'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <span>كافة النقاط</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]">
              {opportunities.length + workshops.length}
            </span>
          </button>

          <button
            onClick={() => handlePointTypeFilterChange('volunteer')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              pointTypeFilter === 'volunteer'
                ? 'bg-[#006233] text-white shadow-xs'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[#006233]'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
            <span>فرص التطوع الميداني</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                pointTypeFilter === 'volunteer'
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
              }`}
            >
              {opportunities.length}
            </span>
          </button>

          <button
            onClick={() => handlePointTypeFilterChange('learning')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              pointTypeFilter === 'learning'
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[#2563eb]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
            <span>فرص التعلّم والورشات</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                pointTypeFilter === 'learning'
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
              }`}
            >
              {workshops.length}
            </span>
          </button>
        </div>
      </div>

      {statusFilter === 'past' && (
        <div className="p-5 rounded-3xl bg-linear-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/40 border-2 border-amber-300 dark:border-amber-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-amber-950 dark:text-amber-100">
                  أرشيف الفعاليات الميدانية والورشات السابقة 📸
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                  توثيق رسمي
                </span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                سجل الأنشطة والورشات الميدانية التي أقيمت بنجاح في ولايات الوطن (مثل ورشة سكراتش بدار الشباب سبدو)، موثقة بالصور الحية، تقارير الأثر، وقائمة المؤطرين المتطوعين والشهادات الصادرة.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <button
              onClick={() => handleStatusFilterChange('all')}
              className="px-3.5 py-2 rounded-xl border border-amber-300 dark:border-amber-700 bg-[var(--color-surface)] hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-100 text-xs font-bold transition-all shadow-2xs"
            >
              عرض كافة المبادرات
            </button>
          </div>
        </div>
      )}

      {/* 🎯 MAIN VIEWPORTS */}

      {/* 1. SPLIT VIEW (Map 7 cols + List 5 cols on desktop) */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 sticky top-20">
            <OpportunityMap
              opportunities={filteredOpportunities}
              workshops={filteredWorkshops}
              selectedWilaya={selectedWilaya}
              onSelectWilaya={handleWilayaChange}
              filterType={pointTypeFilter}
              onFilterTypeChange={handlePointTypeFilterChange}
              selectedId={selectedId}
            />
          </div>

          {/* Opportunities & Workshops List Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] px-1">
              <span>النتائج المتاحة ({totalResultsCount} مبادرة)</span>
              {selectedWilaya && (
                <button
                  onClick={() => handleWilayaChange('')}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  إلغاء تصفية الولاية
                </button>
              )}
            </div>

            {totalResultsCount === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
                <Compass className="w-10 h-10 text-[var(--color-text-muted)] mx-auto opacity-50" />
                <h4 className="font-bold text-sm text-[var(--color-text)]">
                  لا توجد مبادرات مطابقة
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">
                  جرب اختيار ولاية أخرى أو إلغاء كلمات البحث.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedWilaya('');
                    setPointTypeFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold"
                >
                  إعادة ضبط البحث
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[750px] overflow-y-auto pe-1">
                {/* 🤝 Volunteering Cards */}
                {filteredOpportunities.map((opp) => {
                  const isFocused = selectedId === opp.id;
                  const spotsLeft = opp.spotsTotal - opp.spotsTaken;
                  const isApplied = appliedId === opp.id;

                  return (
                    <div
                      key={opp.id}
                      onClick={() => setSelectedId(opp.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isFocused
                          ? 'border-[var(--color-primary)] bg-[var(--color-surface)] shadow-md ring-2 ring-[var(--color-primary)]/20'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-hover)] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] mb-1.5">
                        <span className="flex items-center gap-1 font-bold text-[#006233] bg-[#e6f3ec] px-2 py-0.5 rounded-full text-[11px]">
                          <HeartHandshake className="w-3 h-3" />
                          تطوع • {opp.wilaya}
                        </span>
                        {opp.isPast ? (
                          <span className="font-bold text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            منتهية (Past) • 29/10/2026
                          </span>
                        ) : (
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                            {spotsLeft} مقاعد شاغرة
                          </span>
                        )}
                      </div>

                      {opp.images && opp.images[1] && (
                        <div className="my-2 h-28 rounded-xl overflow-hidden border border-[var(--color-border)] relative group">
                          <img
                            src={opp.images[1]}
                            alt={opp.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                            صور حية من سبدو 📸
                          </div>
                        </div>
                      )}
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
                            title="عرض التفاصيل"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          {opp.isPast ? (
                            <Link
                              to={`/opportunities/${opp.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-2xs"
                            >
                              معاينة الصور والتقرير
                            </Link>
                          ) : isApplied ? (
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

                {/* 🎓 Learning / Workshop Cards */}
                {filteredWorkshops.map((ws) => {
                  const isFocused = selectedId === ws.id;
                  const seatsLeft = ws.totalSeats - ws.seatsBooked;

                  return (
                    <div
                      key={ws.id}
                      onClick={() => setSelectedId(ws.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isFocused
                          ? 'border-[#2563eb] bg-[var(--color-surface)] shadow-md ring-2 ring-blue-500/20'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-blue-500/50 hover:bg-[var(--color-surface-hover)] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] mb-1.5">
                        <span className="flex items-center gap-1 font-bold text-[#1e40af] bg-[#dbeafe] px-2 py-0.5 rounded-full text-[11px]">
                          <GraduationCap className="w-3 h-3" />
                          ورشة وتكوين • {ws.wilaya}
                        </span>
                        <span className="font-mono text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                          {seatsLeft} مقاعد متاحة
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[var(--color-text)] leading-snug">
                        {ws.title}
                      </h4>

                      <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="truncate">{ws.organizer}</span>
                      </p>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--color-border)] gap-2">
                        <span className="text-xs font-mono font-bold text-[#2563eb] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {ws.durationHours} ساعات تأهيل
                        </span>

                        <Link
                          to={`/workshops/${ws.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs"
                        >
                          تفاصيل الورشة
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. MAP VIEW ONLY (Full Width Leaflet Map) */}
      {viewMode === 'map' && (
        <div className="space-y-6">
          <OpportunityMap
            opportunities={filteredOpportunities}
            workshops={filteredWorkshops}
            selectedWilaya={selectedWilaya}
            onSelectWilaya={handleWilayaChange}
            filterType={pointTypeFilter}
            onFilterTypeChange={setPointTypeFilter}
            selectedId={selectedId}
          />
        </div>
      )}

      {/* 3. GRID VIEW ONLY */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] px-1">
            <span>عرض كافة المبادرات ({totalResultsCount} مبادرة)</span>
            <button
              onClick={() => handleViewModeChange('map')}
              className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>استعراض على خريطة الجزائر الحية</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full bg-[#e6f3ec] text-[#006233]">
                      <HeartHandshake className="w-3 h-3" />
                      تطوع • {opp.wilaya}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 font-bold">
                      {opp.spotsTotal - opp.spotsTaken} مقاعد شاغرة
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[var(--color-text)]">
                    {opp.title}
                  </h4>

                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">
                    {opp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--color-primary)]">
                    {opp.hours} ساعات تطوع
                  </span>
                  <Link
                    to={`/opportunities/${opp.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold"
                  >
                    التفاصيل
                  </Link>
                </div>
              </div>
            ))}

            {filteredWorkshops.map((ws) => (
              <div
                key={ws.id}
                className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      <GraduationCap className="w-3 h-3" />
                      ورشة وتكوين • {ws.wilaya}
                    </span>
                    <span className="text-[11px] font-mono text-blue-600 font-bold">
                      {ws.totalSeats - ws.seatsBooked} مقاعد متاحة
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[var(--color-text)]">
                    {ws.title}
                  </h4>

                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">
                    {ws.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#2563eb]">
                    {ws.durationHours} ساعات تأهيل
                  </span>
                  <Link
                    to={`/workshops/${ws.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-[#2563eb] text-white text-xs font-bold"
                  >
                    تفاصيل الورشة
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
