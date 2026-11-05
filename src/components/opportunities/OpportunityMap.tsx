import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass,
  MapPin,
  HeartHandshake,
  GraduationCap,
  RotateCcw,
} from 'lucide-react';
import type { Opportunity, Workshop } from '../../mock/data';

export type PointTypeFilter = 'all' | 'volunteer' | 'learning';

interface OpportunityMapProps {
  opportunities: Opportunity[];
  workshops: Workshop[];
  selectedWilaya: string;
  onSelectWilaya: (wilaya: string) => void;
  filterType?: PointTypeFilter;
  onFilterTypeChange?: (type: PointTypeFilter) => void;
  selectedId?: string;
}

// Major Algerian Wilaya coordinates for quick panning
const WILAYA_COORDINATES: Record<string, [number, number]> = {
  'الجزائر العاصمة': [36.7538, 3.0588],
  'وهران': [35.6987, -0.6349],
  'قسنطينة': [36.365, 6.6147],
  'عنابة': [36.9, 7.7667],
  'الجلفة': [34.6728, 3.2503],
  'سطيف': [36.1911, 5.4137],
  'غرداية': [32.4909, 3.6735],
  'تلمسان': [34.8828, -1.3167],
  'بجاية': [36.7559, 5.0843],
  'ورقلة': [31.9493, 5.325],
  'بشار': [31.6167, -2.2167],
  'باتنة': [35.556, 6.1741],
  'بسكرة': [34.8504, 5.7281],
  'تمنراست': [22.785, 5.5228],
  'أدرار': [27.8742, -0.2939],
  'تندوف': [27.6711, -8.1474],
};

export const OpportunityMap: React.FC<OpportunityMapProps> = ({
  opportunities,
  workshops,
  selectedWilaya,
  onSelectWilaya,
  filterType = 'all',
  onFilterTypeChange,
  selectedId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<PointTypeFilter>(filterType);

  const handleFilterChange = (type: PointTypeFilter) => {
    setActiveFilter(type);
    if (onFilterTypeChange) onFilterTypeChange(type);
  };

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Algeria Geographic Center
    const map = L.map(containerRef.current, {
      center: [32.0, 3.2],
      zoom: 5.5,
      minZoom: 4,
      maxZoom: 16,
      scrollWheelZoom: false, // Prevents hijacking page scroll
      attributionControl: true,
      zoomControl: true,
    });

    // 100% Free OpenStreetMap Tiles - No API key needed!
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    mapRef.current = map;
    markersLayerRef.current = markersLayer;

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // 2. Render Markers on the map based on filterType and data
  useEffect(() => {
    const map = mapRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // 🤝 Volunteering Opportunities Markers
    if (activeFilter === 'all' || activeFilter === 'volunteer') {
      opportunities.forEach((opp) => {
        const lat = opp.mapCoordinates?.lat;
        const lng = opp.mapCoordinates?.lng;
        if (!lat || !lng) return;

        const spotsLeft = opp.spotsTotal - opp.spotsTaken;
        const isSelected = selectedId === opp.id;

        // Custom Green SVG Pin for Volunteering
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="absolute -inset-2 rounded-full bg-emerald-500/25 animate-ping pointer-events-none"></div>
            <div class="w-8 h-8 rounded-full bg-[#006233] text-white flex items-center justify-center shadow-lg border-2 ${
              isSelected ? 'border-amber-400 ring-4 ring-amber-400/30 scale-125' : 'border-white'
            } transition-transform hover:scale-115">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <span class="absolute -bottom-5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#006233] text-white shadow whitespace-nowrap">
              تطوع
            </span>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: iconHtml,
          iconSize: [36, 44],
          iconAnchor: [18, 22],
          popupAnchor: [0, -22],
        });

        const popupContent = `
          <div style="font-family: inherit; direction: rtl; text-align: start; padding: 14px; min-width: 240px; max-width: 280px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 11px; font-weight: 800; background: #e6f3ec; color: #006233; padding: 2px 8px; border-radius: 9999px;">
                🤝 فرصة تطوعية
              </span>
              <span style="font-size: 11px; font-weight: 700; color: #059669; font-family: monospace;">
                ${spotsLeft} مقاعد متبقية
              </span>
            </div>
            <h4 style="font-size: 13px; font-weight: 800; color: #142217; margin: 0 0 4px 0; line-height: 1.35;">
              ${opp.title}
            </h4>
            <p style="font-size: 11px; color: #526356; margin: 0 0 10px 0;">
              📍 ولاية ${opp.wilaya} • ${opp.commune}<br/>
              🏢 ${opp.ngoName}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8e2; padding-top: 8px;">
              <span style="font-size: 11px; font-weight: 700; color: #006233;">
                ⏱️ ${opp.hours} ساعات معتمدة
              </span>
              <a href="/opportunities/${opp.id}" style="font-size: 11px; font-weight: 800; color: #006233; text-decoration: underline;">
                التفاصيل ←
              </a>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], { icon }).bindPopup(popupContent);
        markersLayer.addLayer(marker);
      });
    }

    // 🎓 Learning Opportunities / Workshops Markers
    if (activeFilter === 'all' || activeFilter === 'learning') {
      workshops.forEach((ws) => {
        const lat = ws.lat;
        const lng = ws.lng;
        if (!lat || !lng) return;

        const seatsLeft = ws.totalSeats - ws.seatsBooked;
        const isSelected = selectedId === ws.id;

        // Custom Blue/Indigo SVG Pin for Learning
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="absolute -inset-2 rounded-full bg-blue-500/25 animate-ping pointer-events-none"></div>
            <div class="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-lg border-2 ${
              isSelected ? 'border-amber-400 ring-4 ring-amber-400/30 scale-125' : 'border-white'
            } transition-transform hover:scale-115">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
                <path d="M22 10v6"/>
                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
              </svg>
            </div>
            <span class="absolute -bottom-5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#2563eb] text-white shadow whitespace-nowrap">
              تعلّم
            </span>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: iconHtml,
          iconSize: [36, 44],
          iconAnchor: [18, 22],
          popupAnchor: [0, -22],
        });

        const popupContent = `
          <div style="font-family: inherit; direction: rtl; text-align: start; padding: 14px; min-width: 240px; max-width: 280px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 11px; font-weight: 800; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 9999px;">
                🎓 ورشة وتكوين
              </span>
              <span style="font-size: 11px; font-weight: 700; color: #2563eb; font-family: monospace;">
                ${seatsLeft} مقاعد متاحة
              </span>
            </div>
            <h4 style="font-size: 13px; font-weight: 800; color: #142217; margin: 0 0 4px 0; line-height: 1.35;">
              ${ws.title}
            </h4>
            <p style="font-size: 11px; color: #526356; margin: 0 0 10px 0;">
              📍 ولاية ${ws.wilaya} • ${ws.location}<br/>
              🏛️ ${ws.organizer}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8e2; padding-top: 8px;">
              <span style="font-size: 11px; font-weight: 700; color: #2563eb;">
                ⏱️ ${ws.durationHours} ساعات تأهيل
              </span>
              <a href="/workshops/${ws.id}" style="font-size: 11px; font-weight: 800; color: #2563eb; text-decoration: underline;">
                تفاصيل الورشة ←
              </a>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], { icon }).bindPopup(popupContent);
        markersLayer.addLayer(marker);
      });
    }
  }, [opportunities, workshops, activeFilter, selectedId]);

  // 3. Pan / Fly to selected Wilaya
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedWilaya && WILAYA_COORDINATES[selectedWilaya]) {
      const coords = WILAYA_COORDINATES[selectedWilaya];
      map.flyTo(coords, 9, {
        duration: 1.2,
      });
    } else if (!selectedWilaya) {
      map.flyTo([32.0, 3.2], 5.5, {
        duration: 1.0,
      });
    }
  }, [selectedWilaya]);

  const totalVolunteers = opportunities.length;
  const totalLearning = workshops.length;

  return (
    <div className="flex flex-col rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 sm:p-6 shadow-sm overflow-hidden relative space-y-4">
      {/* 🧭 Header & Simple 2-Point Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-[var(--color-text)] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[var(--color-primary)]" />
            <span>خريطة الجزائر الحية للمبادرات التطوعية والتعلّم</span>
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            خريطة جغرافية حقيقية للجمهورية الجزائرية (OpenStreetMap) توضح مواقع التطوع والورشات
          </p>
        </div>

        {/* 🌟 Simple 2-Category Filter Toggle */}
        <div className="flex items-center gap-1.5 bg-[var(--color-surface-muted)] p-1 rounded-2xl border border-[var(--color-border)]">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            كافة النقاط ({totalVolunteers + totalLearning})
          </button>

          <button
            onClick={() => handleFilterChange('volunteer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'volunteer'
                ? 'bg-[#006233] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[#006233]'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>فرص التطوع ({totalVolunteers})</span>
          </button>

          <button
            onClick={() => handleFilterChange('learning')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'learning'
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[#2563eb]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>فرص التعلّم ({totalLearning})</span>
          </button>
        </div>
      </div>

      {/* 📍 Quick Jump Wilaya Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => onSelectWilaya('')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedWilaya === ''
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          كامل القطر الجزائري
        </button>

        {Object.keys(WILAYA_COORDINATES).map((wName) => {
          const isSelected = selectedWilaya === wName;
          return (
            <button
              key={wName}
              onClick={() => onSelectWilaya(isSelected ? '' : wName)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'
              }`}
            >
              {wName}
            </button>
          );
        })}
      </div>

      {/* 🗺️ Real Leaflet OpenStreetMap Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[580px] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-inner">
        <div ref={containerRef} className="w-full h-full z-10" />

        {/* Reset View Button */}
        <button
          onClick={() => {
            onSelectWilaya('');
            mapRef.current?.flyTo([32.0, 3.2], 5.5);
          }}
          title="إعادة ضبط زاوية الرؤية لكامل الجزائر"
          className="absolute top-3 end-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] text-xs font-bold text-[var(--color-text)] shadow-md hover:bg-[var(--color-surface)] transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>كامل الجزائر</span>
        </button>
      </div>

      {/* 📌 Selected Wilaya Notification Card */}
      {selectedWilaya && (
        <div className="p-3.5 rounded-2xl bg-[var(--color-primary-container)]/40 border border-[var(--color-primary)]/30 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-[var(--color-text)] block">
                مواقع المبادرات في ولاية {selectedWilaya}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                تم توجيه الخريطة الجغرافية نحو الولاية
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectWilaya('')}
            className="px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] transition-colors"
          >
            عرض كافة الولايات
          </button>
        </div>
      )}
    </div>
  );
};
