import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  PlusCircle,
  MapPin,
  Clock,
  Users,
  Building2,
  CheckCircle2,
  Compass,
  ArrowRight,
  HeartHandshake,
  GraduationCap,
  Sparkles,
  Link as LinkIcon,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  ALGERIA_WILAYAS_58,
  saveCustomOpportunity,
  saveCustomWorkshop,
  type Opportunity,
  type Workshop,
} from '../mock/data';

export const AddOpportunityScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form State
  const [initiativeType, setInitiativeType] = useState<'volunteering' | 'education'>('volunteering');
  const [title, setTitle] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('16 - الجزائر العاصمة');
  const [commune, setCommune] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [hours, setHours] = useState<number>(8);
  const [totalSpots, setTotalSpots] = useState<number>(30);
  const [startDate, setStartDate] = useState('2026-12-01');
  const [endDate, setEndDate] = useState('2026-12-02');
  const [deadline, setDeadline] = useState('2026-11-25');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState<string>('العمر 18 سنة فما فوق\nالالتزام بمواقيت العمل الميداني\nاللياقة البدنية المناسبة');
  const [benefits, setBenefits] = useState<string>('شهادة تطوع رقمية معتمدة برمز QR\nساعات خدمة مجتمعية موثقة بالسجل الوطني\nتغطية تأمينية كاملة طيلة الفعالية');

  // Map Picker State
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 36.7538,
    lng: 3.0588,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState<string>('');

  // Leaflet Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize mini Leaflet Map for interactive coordinate picking
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [coords.lat, coords.lng],
      zoom: 11,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Initial marker
    const marker = L.marker([coords.lat, coords.lng], {
      draggable: true,
    }).addTo(map);

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      setCoords({ lat: parseFloat(pos.lat.toFixed(4)), lng: parseFloat(pos.lng.toFixed(4)) });
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setCoords({ lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) });
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // When Wilaya changes, smoothly fly map to that Wilaya's default center
  const handleWilayaChange = (wilayaName: string) => {
    setSelectedWilaya(wilayaName);
    const cleanName = wilayaName.replace(/^\d+\s*-\s*/, '').trim();
    const found = ALGERIA_WILAYAS_58.find((w) => w.wilaya === cleanName);
    if (found && mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo([found.lat, found.lng], 10, { duration: 1 });
      markerRef.current.setLatLng([found.lat, found.lng]);
      setCoords({ lat: found.lat, lng: found.lng });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const cleanWilaya = selectedWilaya.replace(/^\d+\s*-\s*/, '').trim();
    const cleanRequirements = requirements.split('\n').map((r) => r.trim()).filter(Boolean);
    const cleanBenefits = benefits.split('\n').map((b) => b.trim()).filter(Boolean);

    if (initiativeType === 'volunteering') {
      const newOppId = `opp-custom-${Date.now()}`;
      const newOpp: Opportunity = {
        id: newOppId,
        title: title.trim(),
        ngoId: 'ngo-current',
        ngoName: user.name || 'جمعية السد الأخضر والتنمية المستدامة',
        category: 'environment',
        wilaya: cleanWilaya,
        commune: commune.trim() || cleanWilaya,
        hours: Number(hours) || 8,
        spotsTotal: Number(totalSpots) || 30,
        spotsTaken: 0,
        startDate: startDate,
        endDate: endDate,
        deadline: deadline,
        description: description.trim() || 'مبادرة تطوعية مدنية ميدانية تهدف لخدمة الصالح العام والمجتمع الجزائري.',
        requirements: cleanRequirements,
        benefits: cleanBenefits,
        status: 'open',
        featured: true,
        mapCoordinates: {
          lat: coords.lat,
          lng: coords.lng,
          x: 50,
          y: 50,
        },
      };

      saveCustomOpportunity(newOpp);
      setCreatedId(newOppId);
    } else {
      const newWsId = `ws-custom-${Date.now()}`;
      const newWs: Workshop = {
        id: newWsId,
        title: title.trim(),
        organizer: user.name || 'نادي بصمة شباب التقني',
        partnerNgoId: 'ngo-current',
        category: 'تأهيل وتكوين',
        durationHours: Number(hours) || 12,
        days: 2,
        totalSeats: Number(totalSpots) || 25,
        seatsBooked: 0,
        startDate: startDate,
        location: `${commune || cleanWilaya} - ${cleanWilaya}`,
        wilaya: cleanWilaya,
        commune: commune.trim() || cleanWilaya,
        lat: coords.lat,
        lng: coords.lng,
        description: description.trim() || 'ورشة تكوينية وتدريب تطبيقي لبناء قدرات الشباب والمهارات التطوعية.',
        learningOutcomes: cleanRequirements,
        accreditedBy: 'المرصد الوطني للمجتمع المدني',
        badgeTag: 'ورشة معتمدة',
      };

      saveCustomWorkshop(newWs);
      setCreatedId(newWsId);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 🔙 Back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع إلى لوحة الجمعية</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
          <Building2 className="w-3.5 h-3.5" />
          <span>منظور الجمعية / المنظمة (NGO Perspective)</span>
        </div>
      </div>

      {/* 🎉 Success State Modal / Overlay */}
      {isSubmitted ? (
        <div className="rounded-3xl bg-[var(--color-surface)] border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-black text-[var(--color-text)]">
              تم نشر المبادرة بنجاح وإسقاطها على الخريطة!
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
              أصبحت المبادرة متاحة الآن لعموم الشباب والمتطوعين في ولاية{' '}
              <span className="font-bold text-[var(--color-primary)]">{selectedWilaya}</span>، ويمكنهم التقديم عليها فوراً عبر الموقع وخريطة الجزائر الحية.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--color-surface-muted)] max-w-md mx-auto text-start space-y-1.5 text-xs border border-[var(--color-border)]">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">اسم المبادرة:</span>
              <span className="font-bold text-[var(--color-text)]">{title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">النوع:</span>
              <span className="font-bold text-[var(--color-primary)]">
                {initiativeType === 'volunteering' ? '🤝 فرصة تطوعية' : '🎓 ورشة وتكوين'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">الإحداثيات الجغرافية:</span>
              <span className="font-mono text-[var(--color-text)]">
                {coords.lat}°N, {coords.lng}°E
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to={`/opportunities?view=map&wilaya=${encodeURIComponent(selectedWilaya.replace(/^\d+\s*-\s*/, '').trim())}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>معاينة موقع المبادرة على خريطة الجزائر</span>
            </Link>

            <Link
              to="/ngo/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-bold transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>الذهاب إلى لوحة إدارة الجمعية</span>
            </Link>

            {createdId && (
              <Link
                to={initiativeType === 'volunteering' ? `/opportunities/${createdId}` : `/workshops/${createdId}`}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[var(--color-primary)]/40 bg-[var(--color-primary-container)]/40 text-[var(--color-primary)] text-xs font-bold transition-all"
              >
                <span>صفحة المبادرة ←</span>
              </Link>
            )}

            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              + إضافة مبادرة أخرى
            </button>
          </div>
        </div>
      ) : (
        /* 📝 Main Create Opportunity Form */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Banner */}
          <div className="rounded-3xl bg-linear-to-b from-[var(--color-primary-container)]/50 to-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[var(--color-primary)] text-white shadow-xs">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
                  نشر واستضافة مبادرة جديدة
                </h1>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  أدخل بيانات الفعالية التطوعية أو الورشة التكوينية وحدد موقعها الجغرافي على خريطة الجزائر
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Form Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Initiative Type Selector */}
              <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-3">
                <label className="block text-xs font-bold text-[var(--color-text)] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>نوع المبادرة (اختر نوع النشاط):</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInitiativeType('volunteering')}
                    className={`p-4 rounded-xl border-2 text-start transition-all flex flex-col justify-between gap-2 ${
                      initiativeType === 'volunteering'
                        ? 'border-[#006233] bg-[#e6f3ec]/60 text-[#006233] shadow-xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <HeartHandshake className="w-5 h-5 text-[#006233]" />
                      {initiativeType === 'volunteering' && (
                        <CheckCircle2 className="w-4 h-4 text-[#006233]" />
                      )}
                    </div>
                    <div>
                      <span className="font-black text-sm block">فرصة تطوعية ميدانية</span>
                      <span className="text-[11px] opacity-80">
                        حملات بيئية، تشجير، قوافل إغاثة، نشاط خيري
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInitiativeType('education')}
                    className={`p-4 rounded-xl border-2 text-start transition-all flex flex-col justify-between gap-2 ${
                      initiativeType === 'education'
                        ? 'border-[#2563eb] bg-[#dbeafe]/60 text-[#1e40af] shadow-xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <GraduationCap className="w-5 h-5 text-[#2563eb]" />
                      {initiativeType === 'education' && (
                        <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                      )}
                    </div>
                    <div>
                      <span className="font-black text-sm block">ورشة وتكوين تعليمي</span>
                      <span className="text-[11px] opacity-80">
                        إسعافات أولية، روبوتات، رقمنة، تأهيل قيادي
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Main Title */}
              <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                    عنوان المبادرة / اسم الفرصة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: حملة التشجير الكبرى لتأهيل حزام السد الأخضر 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-2xs"
                  />
                </div>

                {/* Wilaya & Commune */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>الولاية (من الـ 58 ولاية)</span>
                    </label>
                    <select
                      value={selectedWilaya}
                      onChange={(e) => handleWilayaChange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-bold text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    >
                      {ALGERIA_WILAYAS_58.map((w) => (
                        <option key={w.code} value={w.name}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                      البلدية أو الحي / المقر الميداني
                    </label>
                    <input
                      type="text"
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      placeholder="مثال: بلدية عين الإبل / غابة سن الباء"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                </div>

                {/* Location URL (Optional external link) */}
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    <span>رابط الموقع الجغرافي (Google Maps / رابط تفصيلي - اختياري)</span>
                  </label>
                  <input
                    type="url"
                    value={locationUrl}
                    onChange={(e) => setLocationUrl(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                  />
                </div>
              </div>

              {/* 3. Hours, Spots, and Dates */}
              <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>ساعات النشاط المعتمدة</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono font-bold text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>عدد المقاعد المتاحة (المتطوعين)</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={totalSpots}
                      onChange={(e) => setTotalSpots(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono font-bold text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--color-text-muted)] mb-1">
                      تاريخ الانطلاق
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--color-text-muted)] mb-1">
                      تاريخ الاختتام
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--color-text-muted)] mb-1">
                      آخر أجل للتسجيل
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Description */}
              <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-2">
                <label className="block text-xs font-bold text-[var(--color-text)]">
                  الوصف والهدف المجتمعي للمبادرة
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اشرح أهداف المبادرة، ما الذي سيقوم به المتطوع، والأثر المجتمعي المرجو تحقيقه..."
                  className="w-full p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>

              {/* 5. Requirements & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-2">
                  <label className="block text-xs font-bold text-[var(--color-text)] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>شروط المشاركة (سطر لكل شرط)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)]"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-2">
                  <label className="block text-xs font-bold text-[var(--color-text)] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>الامتيازات والتثمين (سطر لكل امتياز)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text)]"
                  />
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive Map Location Picker & Live Preview */}
            <div className="lg:col-span-5 space-y-6 sticky top-20">
              {/* 🗺️ Leaflet Map Location Picker */}
              <div className="p-5 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
                  <div>
                    <h3 className="text-xs font-black text-[var(--color-text)] flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>تحديد الموقع الدقيق على الخريطة</span>
                    </h3>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      انقر على الخريطة أو اسحب الدبوس لتحديد نقطة انطلاق النشاط
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)] font-bold">
                    {coords.lat}°N, {coords.lng}°E
                  </span>
                </div>

                {/* Map Container */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-inner relative">
                  <div ref={mapContainerRef} className="w-full h-full" />
                </div>

                <div className="p-2.5 rounded-xl bg-[var(--color-surface-muted)] text-[11px] text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                  <span>
                    الولاية المحددة: <b className="text-[var(--color-text)]">{selectedWilaya}</b> • سيتم إسقاط الدبوس تلقائياً في خريطة المنصة الحية.
                  </span>
                </div>
              </div>

              {/* 🌟 Live Preview Card */}
              <div className="p-5 rounded-3xl bg-linear-to-b from-[var(--color-surface)] to-[var(--color-surface-muted)]/50 border border-[var(--color-border)] shadow-xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                  معاينة حية لشكل البطاقة للمتطوعين:
                </span>

                <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                        initiativeType === 'volunteering'
                          ? 'bg-[#e6f3ec] text-[#006233]'
                          : 'bg-[#dbeafe] text-[#1e40af]'
                      }`}
                    >
                      {initiativeType === 'volunteering' ? (
                        <>
                          <HeartHandshake className="w-3 h-3" />
                          <span>تطوع • {selectedWilaya.replace(/^\d+\s*-\s*/, '')}</span>
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-3 h-3" />
                          <span>ورشة • {selectedWilaya.replace(/^\d+\s*-\s*/, '')}</span>
                        </>
                      )}
                    </span>

                    <span className="text-[11px] font-mono text-emerald-600 font-bold">
                      {totalSpots} مقاعد متاحة
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[var(--color-text)] leading-snug">
                    {title || 'عنوان المبادرة سيظهر هنا فور كتابته'}
                  </h4>

                  <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    <span>{user.name || 'جمعية السد الأخضر'}</span>
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[var(--color-border)] text-xs">
                    <span className="font-mono font-bold text-[var(--color-primary)] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{hours} ساعات معتمدة</span>
                    </span>

                    <span className="text-[10px] font-bold text-[var(--color-text-muted)]">
                      الانطلاق: {startDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!title.trim()}
                className="w-full py-4 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm transition-all shadow-md hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>نشر المبادرة وإسقاطها على خريطة الجزائر فوراً</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
