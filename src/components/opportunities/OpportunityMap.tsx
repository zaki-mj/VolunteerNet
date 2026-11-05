import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Compass,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import type { Opportunity } from '../../mock/data';

interface OpportunityMapProps {
  opportunities: Opportunity[];
  selectedWilaya: string;
  onSelectWilaya: (wilaya: string) => void;
  selectedOpportunityId?: string;
  onSelectOpportunity?: (opp: Opportunity) => void;
}

// Major Algerian geographic Wilaya coordinates for SVG projection (Percentages: x 0-100%, y 0-100%)
const ALGERIAN_WILAYAS_GEO = [
  { name: 'الجزائر العاصمة', code: '16', x: 55, y: 15, zone: 'north' },
  { name: 'وهران', code: '31', x: 38, y: 18, zone: 'north' },
  { name: 'قسنطينة', code: '25', x: 70, y: 18, zone: 'plateau' },
  { name: 'عنابة', code: '23', x: 79, y: 15, zone: 'north' },
  { name: 'بجاية', code: '06', x: 62, y: 15, zone: 'north' },
  { name: 'تلمسان', code: '13', x: 33, y: 22, zone: 'north' },
  { name: 'سطيف', code: '19', x: 66, y: 19, zone: 'plateau' },
  { name: 'الجلفة', code: '17', x: 53, y: 31, zone: 'plateau' },
  { name: 'باتنة', code: '05', x: 71, y: 24, zone: 'plateau' },
  { name: 'بسكرة', code: '07', x: 68, y: 29, zone: 'plateau' },
  { name: 'غرداية', code: '47', x: 57, y: 44, zone: 'sahara' },
  { name: 'ورقلة', code: '30', x: 68, y: 49, zone: 'sahara' },
  { name: 'بشار', code: '08', x: 30, y: 46, zone: 'sahara' },
  { name: 'الوادي', code: '39', x: 74, y: 37, zone: 'sahara' },
  { name: 'أدرار', code: '01', x: 42, y: 64, zone: 'sahara' },
  { name: 'تمنراست', code: '11', x: 65, y: 84, zone: 'sahara' },
];

export const OpportunityMap: React.FC<OpportunityMapProps> = ({
  opportunities,
  selectedWilaya,
  onSelectWilaya,
  selectedOpportunityId,
  onSelectOpportunity,
}) => {
  const [hoveredWilaya, setHoveredWilaya] = useState<string | null>(null);

  // Group opportunities by Wilaya
  const wilayaOppsMap = opportunities.reduce<Record<string, Opportunity[]>>((acc, opp) => {
    if (!acc[opp.wilaya]) acc[opp.wilaya] = [];
    acc[opp.wilaya].push(opp);
    return acc;
  }, {});

  // Active Wilayas that have opportunities
  const activeWilayas = Object.keys(wilayaOppsMap);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environment':
        return '#006233'; // Algerian Green
      case 'tech':
        return '#2563eb'; // Blue
      case 'health':
        return '#dc2626'; // Red
      case 'education':
        return '#d97706'; // Amber
      case 'culture':
        return '#7c3aed'; // Purple
      case 'relief':
        return '#059669'; // Emerald
      default:
        return '#006233';
    }
  };

  return (
    <div className="flex flex-col rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 sm:p-6 shadow-sm overflow-hidden relative">
      {/* 🧭 Map Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-[var(--color-text)] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[var(--color-primary)] animate-spin-slow" />
            <span>خريطة الجزائر التفاعلية للمبادرات التطوعية</span>
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            انقر على أي ولاية لاستكشاف الفرص الميدانية ومقاعد التطوع المتاحة
          </p>
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006233]" />
            <span>بيئة</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
            <span>تكنولوجيا</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            <span>صحة</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]" />
            <span>تراث</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
            <span>إغاثة</span>
          </span>
        </div>
      </div>

      {/* 📍 Quick Filter Chips for Active Wilayas */}
      <div className="py-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectWilaya('')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedWilaya === ''
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          كل الولايات ({opportunities.length} فرصة)
        </button>

        {activeWilayas.map((wilaya) => {
          const count = wilayaOppsMap[wilaya]?.length || 0;
          const isSelected = selectedWilaya === wilaya;
          return (
            <button
              key={wilaya}
              onClick={() => onSelectWilaya(isSelected ? '' : wilaya)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>{wilaya}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-primary)] font-mono'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 🗺️ Interactive SVG Map Area */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[580px] bg-linear-to-b from-[var(--color-surface-muted)]/30 to-[var(--color-surface-muted)]/70 rounded-2xl border border-[var(--color-border)]/80 overflow-hidden flex items-center justify-center p-2 sm:p-4 select-none">
        {/* Subtle Background Grid & Latitude Lines */}
        <div
          className="absolute inset-0 opacity-15 dark:opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Regional Watermark Zones */}
        <div className="absolute top-4 start-4 flex flex-col gap-1 text-[10px] text-[var(--color-text-muted)]/60 font-mono pointer-events-none">
          <span>LAT: 36.75°N • LON: 3.05°E</span>
          <span>ZONE: ALGERIA • 58 WILAYAS</span>
        </div>

        <div className="absolute bottom-4 end-4 text-[10px] text-[var(--color-text-muted)]/60 font-mono pointer-events-none">
          SAHARA • HOGGAR • ATLAS
        </div>

        {/* Stylized Vector Territory Representation of Algeria */}
        <svg
          viewBox="0 0 1000 800"
          className="w-full h-full max-w-[850px] filter drop-shadow-sm transition-all"
        >
          <defs>
            <linearGradient id="algeriaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.12" />
              <stop offset="35%" stopColor="var(--color-primary)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--color-surface-muted)" stopOpacity="0.05" />
            </linearGradient>

            <pattern id="diagonalPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2"
                stroke="var(--color-border)"
                strokeWidth="0.5"
                opacity="0.25"
              />
            </pattern>
          </defs>

          {/* Algeria Approximate Geographic Silhouette Polyline */}
          <path
            d="
              M 320 180 
              Q 450 140, 560 145 
              Q 700 140, 800 150 
              L 815 190 
              L 780 230 
              L 790 310 
              L 760 380 
              L 770 480 
              L 810 580 
              L 760 670 
              L 670 780 
              L 600 780 
              L 540 680 
              L 440 640 
              L 360 550 
              L 280 470 
              L 260 380 
              L 300 280 
              L 320 220 
              Z
            "
            fill="url(#algeriaGradient)"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            className="transition-all duration-300"
          />

          {/* Tell Atlas / Northern Zone Contour Line */}
          <path
            d="M 310 210 Q 550 170, 800 165"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* High Plateaus Contour Line */}
          <path
            d="M 280 320 Q 540 290, 780 280"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.25"
          />

          {/* Northern Sahara Contour Line */}
          <path
            d="M 270 450 Q 560 430, 770 460"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          {/* Zone Labels */}
          <text x="560" y="165" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14" fontWeight="600" opacity="0.6">
            الشريط الساحلي والتلي
          </text>
          <text x="540" y="270" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14" fontWeight="600" opacity="0.5">
            الهضاب العليا والسهوب
          </text>
          <text x="550" y="490" textAnchor="middle" fill="var(--color-text-muted)" fontSize="16" fontWeight="bold" opacity="0.35">
            الصحراء الكبرى الجزائرية
          </text>
          <text x="630" y="730" textAnchor="middle" fill="var(--color-text-muted)" fontSize="13" fontWeight="bold" opacity="0.4">
            الهقار والطاسيلي
          </text>

          {/* Reference Inactive Wilaya Dots */}
          {ALGERIAN_WILAYAS_GEO.filter((w) => !activeWilayas.includes(w.name)).map((w) => (
            <g key={w.name} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
              <circle
                cx={w.x * 10}
                cy={w.y * 8}
                r="3.5"
                fill="var(--color-border)"
                stroke="var(--color-surface)"
                strokeWidth="1.5"
              />
              <text
                x={w.x * 10}
                y={w.y * 8 - 7}
                textAnchor="middle"
                fill="var(--color-text-muted)"
                fontSize="11"
                fontWeight="500"
              >
                {w.name}
              </text>
            </g>
          ))}
        </svg>

        {/* 📍 Active Opportunity Pins Layer */}
        {ALGERIAN_WILAYAS_GEO.filter((w) => activeWilayas.includes(w.name)).map((w) => {
          const opps = wilayaOppsMap[w.name] || [];
          const isSelected = selectedWilaya === w.name;
          const isHovered = hoveredWilaya === w.name;
          const isTargeted = opps.some((o) => o.id === selectedOpportunityId);
          const primaryOpp = opps[0];
          const pinColor = primaryOpp ? getCategoryColor(primaryOpp.category) : '#006233';

          return (
            <div
              key={w.name}
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 group"
              onMouseEnter={() => {
                setHoveredWilaya(w.name);
              }}
              onMouseLeave={() => {
                setHoveredWilaya(null);
              }}
            >
              {/* Radar Pulse Effect for Active Pins */}
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-75 pointer-events-none"
                style={{
                  backgroundColor: pinColor,
                  animationDuration: '2.5s',
                }}
              />

              {/* Pin Button */}
              <button
                onClick={() => {
                  onSelectWilaya(isSelected ? '' : w.name);
                  if (primaryOpp && onSelectOpportunity) {
                    onSelectOpportunity(primaryOpp);
                  }
                }}
                aria-label={`ولاية ${w.name}: ${opps.length} فرصة متاحة`}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 transition-all duration-200 cursor-pointer shadow-md ${
                  isSelected || isHovered || isTargeted
                    ? 'scale-115 ring-4 ring-[var(--color-primary)]/20 z-30'
                    : 'hover:scale-110'
                }`}
                style={{
                  backgroundColor: isSelected ? pinColor : 'var(--color-surface)',
                  borderColor: pinColor,
                  color: isSelected ? '#ffffff' : 'var(--color-text)',
                }}
              >
                <MapPin
                  className="w-3.5 h-3.5"
                  style={{
                    color: isSelected ? '#ffffff' : pinColor,
                  }}
                />
                <span className="text-[11px] font-black">{w.name}</span>
                <span
                  className="px-1.5 py-0.2 rounded-full text-[10px] font-black leading-none"
                  style={{
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : pinColor,
                    color: '#ffffff',
                  }}
                >
                  {opps.length}
                </span>
              </button>

              {/* 🪟 Interactive Hover / Focus Opportunity Preview Card */}
              {isHovered && primaryOpp && (
                <div
                  className="absolute bottom-full mb-3 start-1/2 -translate-x-1/2 w-72 p-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl z-50 text-start animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] text-[var(--color-text-muted)] pb-1.5 border-b border-[var(--color-border)]">
                    <span className="font-bold flex items-center gap-1 text-[var(--color-primary)]">
                      <Sparkles className="w-3 h-3" />
                      {w.name} • {primaryOpp.commune}
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {primaryOpp.spotsTotal - primaryOpp.spotsTaken} مقاعد شاغرة
                    </span>
                  </div>

                  <h5 className="font-bold text-xs text-[var(--color-text)] line-clamp-2 mt-2">
                    {primaryOpp.title}
                  </h5>

                  <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1 mt-1">
                    {primaryOpp.ngoName}
                  </p>

                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--color-text-muted)] mt-2 pt-2 border-t border-[var(--color-border)]">
                    <span className="flex items-center gap-1 text-[var(--color-primary)] font-bold">
                      <Clock className="w-3 h-3" />
                      {primaryOpp.hours} ساعات تطوع
                    </span>
                    <Link
                      to={`/opportunities/${primaryOpp.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--color-primary)] hover:underline"
                    >
                      <span>عرض التفاصيل</span>
                      <ArrowLeft className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 📌 Selected Wilaya Info Banner */}
      {selectedWilaya && (
        <div className="mt-4 p-3.5 rounded-2xl bg-[var(--color-primary-container)]/40 border border-[var(--color-primary)]/30 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-[var(--color-text)] block">
                الفرص التطوعية في ولاية: {selectedWilaya}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                تم العثور على {wilayaOppsMap[selectedWilaya]?.length || 0} مبادرات ميدانية معتمدة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectWilaya('')}
              className="px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] transition-colors"
            >
              عرض كافة الولايات
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
