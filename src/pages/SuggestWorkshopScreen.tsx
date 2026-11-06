import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Send,
  CheckCircle2,
  Search,
  Sparkles,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  MOCK_NGOS,
  saveWorkshopProposal,
  type WorkshopProposal,
} from '../mock/data';

export const SuggestWorkshopScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const { user } = useAuth();

  // Query parameter pre-select (defaults to Sebdou if specified or found)
  const initialNgoId = searchParams.get('ngoId') || 'ngo-sebdou-youth';

  // State
  const [selectedNgoId, setSelectedNgoId] = useState<string>(initialNgoId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');

  // Form fields
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('تكنولوجيا وبرمجة');
  const [targetAudience, setTargetAudience] = useState<string>('أطفال وتلاميذ المدارس من 8 إلى 14 سنة');
  const [durationHours, setDurationHours] = useState<number>(12);
  const [proposedDate, setProposedDate] = useState<string>('2026-11-28');
  const [description, setDescription] = useState<string>('');
  const [outcomesText, setOutcomesText] = useState<string>(
    'إتقان المبادئ الأساسية للتفكير المنطقي والبرمجة الرسومية\nبناء مشروع تطبيقي تفاعلي متكامل لكل مشارك\nتعزيز روح العمل الجماعي والابتكار الرقمي لدى الناشئة'
  );
  const [equipmentText, setEquipmentText] = useState<string>(
    'قاعة إعلام آلي مجهزة بحواسيب (10 إلى 15 جهازاً)\nجهاز عارض البيانات (DataShow)\nسبورة توضيحية واتصال بالإنترنت'
  );
  const [trainerName, setTrainerName] = useState<string>(user?.name || 'مجدوب محمد زكرياء');
  const [trainerPhone, setTrainerPhone] = useState<string>('+213 658 12 34 56');
  const [trainerEmail, setTrainerEmail] = useState<string>(user?.email || 'contact@volunteernet.dz');

  const [submittedProposal, setSubmittedProposal] = useState<WorkshopProposal | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Selected NGO Object
  const selectedNgo = MOCK_NGOS.find((n) => n.id === selectedNgoId) || MOCK_NGOS[0];

  // Filter NGOs
  const wilayaList = Array.from(new Set(MOCK_NGOS.map((n) => n.wilaya)));
  const filteredNgos = MOCK_NGOS.filter((ngo) => {
    const matchesWilaya = selectedWilaya === 'all' || ngo.wilaya === selectedWilaya;
    const matchesSearch =
      searchQuery.trim() === '' ||
      ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWilaya && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('يرجى كتابة عنوان واضح للورشة أو الدورة.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('يرجى تقديم وصف تفصيلي لمنهجية الورشة والمحتوى المقترح.');
      return;
    }
    if (!selectedNgo) {
      setErrorMessage('يرجى اختيار المؤسسة أو الجمعية المراد توجيه المقترح إليها.');
      return;
    }

    const learningOutcomes = outcomesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const equipmentNeeded = equipmentText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newProposal: WorkshopProposal = {
      id: `prop-${Date.now().toString().slice(-6)}`,
      ngoId: selectedNgo.id,
      ngoName: selectedNgo.name,
      ngoWilaya: selectedNgo.wilaya,
      volunteerId: user?.id || 'vol-current',
      volunteerName: trainerName.trim() || user?.name || 'متطوع مبادر',
      volunteerPhone: trainerPhone.trim(),
      volunteerEmail: trainerEmail.trim(),
      title: title.trim(),
      category: category.trim(),
      targetAudience: targetAudience.trim(),
      durationHours: Number(durationHours) || 8,
      proposedDate: proposedDate || '2026-12-01',
      description: description.trim(),
      learningOutcomes,
      equipmentNeeded,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };

    saveWorkshopProposal(newProposal);
    setSubmittedProposal(newProposal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* SUCCESS CONFIRMATION STATE */}
      {submittedProposal ? (
        <div className="bg-[var(--color-surface)] border border-emerald-500/30 rounded-2xl p-8 sm:p-10 shadow-lg text-center max-w-2xl mx-auto animate-fadeIn">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 ring-8 ring-emerald-50 dark:ring-emerald-950/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-3">
            تم استلام المقترح وتوجيهه بنجاح ✓
          </span>

          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
            شكراً لك، تم إرسال مقترح الورشة إلى المؤسسة بنجاح!
          </h2>

          <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
            تم تسجيل مقترحك التدريبي برمز مرجعي{' '}
            <span className="font-mono font-bold text-[var(--color-primary)]">
              {submittedProposal.id}
            </span>{' '}
            وإرساله إلى{' '}
            <strong className="text-[var(--color-text)]">{submittedProposal.ngoName}</strong>{' '}
            بـ {submittedProposal.ngoWilaya}. سيقوم مسؤولو المؤسسة بمراجعة التفاصيل، والموافقة على
            توفير القاعة والعتاد المطلوب لتحديد موعد إطلاق الورشة رسمياً.
          </p>

          {/* Proposal Summary Card */}
          <div className="bg-[var(--color-surface-muted)] rounded-xl p-5 text-right text-xs mb-8 border border-[var(--color-border)] space-y-2">
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)]">عنوان الورشة:</span>
              <span className="font-bold text-[var(--color-text)] text-sm">
                {submittedProposal.title}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)]">المؤسسة المستقبلة:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {submittedProposal.ngoName} ({submittedProposal.ngoWilaya})
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)]">المدة والتاريخ المقترح:</span>
              <span className="font-bold text-[var(--color-text)]">
                {submittedProposal.durationHours} ساعة تدريبية — {submittedProposal.proposedDate}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)]">المؤطر الميداني:</span>
              <span className="font-bold text-[var(--color-text)]">
                {submittedProposal.volunteerName} ({submittedProposal.volunteerPhone})
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--color-text-muted)]">حالة المراجعة:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                قيد الدراسة والمصادقة الإدارية 🟡
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/ngo/dashboard?tab=proposals&ngoId=${submittedProposal.ngoId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-xs"
            >
              <Building2 className="w-4 h-4" />
              <span>معاينة المقترح في لوحة تحكم المؤسسة</span>
            </Link>

            <button
              onClick={() => {
                setSubmittedProposal(null);
                setTitle('');
                setDescription('');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text)] transition-all"
            >
              <span>تقديم مقترح ورشة أخرى</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* HEADER / INTRO BANNER */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 text-white p-6 sm:p-8 shadow-md">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>مبادرة المتطوع التكوينية • المنصة الوطنية للمتطوعين</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                اقترح ورشة عمل أو دورة تدريبية لجمعية أو دار شباب
              </h1>
              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed max-w-2xl">
                هل تملك خبرة في البرمجة، الروبوتات، التصميم، الإسعافات، أو اللغات؟ بادر باقتراح
                نشاطك التكويني مباشرة إلى المؤسسات الشبانية المعتمدة (مثل{' '}
                <strong className="underline underline-offset-4 decoration-amber-300">
                  دار الشباب الجيلالي اليابس سبدو بولاية تلمسان
                </strong>
                ). تتكفل المؤسسة بتوفير القاعات والتجهيزات مع توثيق ساعاتك التطوعية رسمياً!
              </p>
            </div>
            {/* Background ambient accents */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* STEP 1: SELECT RECIPIENT ORGANIZATION */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base font-bold text-[var(--color-text)]">
                    اختر المؤسسة أو دار الشباب المستقبلة للطلب
                  </h2>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  اختر من بين المراكز ودور الشباب والجمعيات المعتمدة رسمياً لاستضافة الورشة التدريبية
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث بالاسم أو النشاط..."
                    className="w-48 sm:w-56 text-xs pr-8 pl-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                  />
                </div>

                <select
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                >
                  <option value="all">جميع الولايات</option>
                  {wilayaList.map((w) => (
                    <option key={w} value={w}>
                      ولاية {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Organizations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredNgos.map((ngo) => {
                const isSelected = selectedNgoId === ngo.id;
                const isSebdou = ngo.id === 'ngo-sebdou-youth';

                return (
                  <div
                    key={ngo.id}
                    onClick={() => setSelectedNgoId(ngo.id)}
                    className={`cursor-pointer relative p-4 rounded-xl border transition-all duration-200 text-right flex flex-col justify-between ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-container)]/30 ring-2 ring-[var(--color-primary)]/40 shadow-xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/40'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] border border-[var(--color-border)] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                          <span>ولاية {ngo.wilaya}</span>
                        </span>

                        {isSebdou ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 flex items-center gap-1 animate-pulse">
                            <Sparkles className="w-3 h-3" />
                            <span>موصى به • دار شباب نشطة</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-[var(--color-text-muted)]">
                            معتمدة رسمياً ✓
                          </span>
                        )}
                      </div>

                      {/* NGO Name */}
                      <h3 className="font-bold text-sm text-[var(--color-text)] mb-1 flex items-start gap-1.5">
                        <Building2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                        <span>{ngo.name}</span>
                      </h3>

                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mb-3">
                        {ngo.category} • الاعتماد الوزاري: {ngo.licenseNumber}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                      <span className="text-[var(--color-text-muted)] text-[11px]">
                        {ngo.verifiedVolunteers} متطوع مسجل
                      </span>

                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                          isSelected
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-[var(--color-surface-muted)] text-[var(--color-text)]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>المؤسسة المختارة</span>
                          </>
                        ) : (
                          <span>اختيار المؤسسة</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Currently Selected Banner */}
            {selectedNgo && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold block">
                      سيتم توجيه مقترحك التكويني إلى:
                    </span>
                    <strong className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                      {selectedNgo.name} (ولاية {selectedNgo.wilaya})
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-emerald-800 dark:text-emerald-300">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{selectedNgo.phone}</span>
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{selectedNgo.contactEmail}</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: WORKSHOP DETAILS FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-[var(--color-border)]">
              <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-[var(--color-text)]">
                  بيانات وتفاصيل الورشة التكوينية المقترحة
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  أدخل تفاصيل المحتوى والجمهور المستهدف والموارد اللوجستية المطلوبة لتسهيل موافقة
                  المؤسسة
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Workshop Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  عنوان النشاط أو الورشة <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: ورشة البرمجة والمنطق للأطفال عبر سكراتش (Scratch Kids)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  مجال وتصنيف الورشة <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium"
                >
                  <option value="تكنولوجيا وبرمجة">تكنولوجيا وبرمجة للأطفال والشباب</option>
                  <option value="ذكاء اصطناعي وتطبيقاته">ذكاء اصطناعي وتطبيقاته الحديثة</option>
                  <option value="إسعافات أولية وصحة مجتمعية">إسعافات أولية وصحة مجتمعية</option>
                  <option value="بيئة وتشجير واستدامة">بيئة وتشجير واستدامة</option>
                  <option value="لغات وتواصل فعال">لغات وتواصل فعال</option>
                  <option value="فنون ورسم وإعلام آلي">فنون ورسم وتصميم رقمي</option>
                  <option value="مهارات ريادية وتأهيل مهني">مهارات ريادية وتأهيل مهني</option>
                </select>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  الفئة المستهدفة <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="مثال: أطفال من 8 إلى 14 سنة / طلبة الطور الثانوي والجامعي"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium"
                />
              </div>

              {/* Duration Hours */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  المدة الإجمالية المقدرة (بالساعات) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-mono font-bold"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)] font-semibold">
                    ساعات
                  </span>
                </div>
              </div>

              {/* Proposed Start Date */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  التاريخ المقترح للبدء <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  وصف النشاط والمنهجية التكوينية <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اشرح محاور الورشة بالتفصيل، الأنشطة التطبيقية، وطريقة تفاعل المشاركين..."
                  className="w-full text-xs p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] leading-relaxed"
                />
              </div>

              {/* Learning Outcomes */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  الأهداف والمخرجات التكوينية المتوقعة (سطر لكل هدف)
                </label>
                <textarea
                  rows={3}
                  value={outcomesText}
                  onChange={(e) => setOutcomesText(e.target.value)}
                  placeholder="أدخل هدفاً في كل سطر..."
                  className="w-full text-xs p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-mono text-[11px] leading-relaxed"
                />
              </div>

              {/* Equipment Needed from the Organization */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  المتطلبات اللوجستية والتقنية المطلوبة من دار الشباب / الجمعية (سطر لكل عنصر)
                </label>
                <textarea
                  rows={3}
                  value={equipmentText}
                  onChange={(e) => setEquipmentText(e.target.value)}
                  placeholder="مثال: قاعة إعلام آلي، شاشة عرض، شبكة إنترنت..."
                  className="w-full text-xs p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-mono text-[11px] leading-relaxed"
                />
              </div>
            </div>

            {/* STEP 3: TRAINER / VOLUNTEER CONTACT INFO */}
            <div className="pt-4 border-t border-[var(--color-border)] space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-[var(--color-text)]">
                  معلومات المؤطر أو المدرب المتطوع
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--color-text)] mb-1">
                    الاسم واللقب <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      type="text"
                      required
                      value={trainerName}
                      onChange={(e) => setTrainerName(e.target.value)}
                      className="w-full text-xs pr-8 pl-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--color-text)] mb-1">
                    رقم الهاتف للتواصل الميداني <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      type="text"
                      required
                      value={trainerPhone}
                      onChange={(e) => setTrainerPhone(e.target.value)}
                      className="w-full text-xs pr-8 pl-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--color-text)] mb-1">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      type="email"
                      value={trainerEmail}
                      onChange={(e) => setTrainerEmail(e.target.value)}
                      className="w-full text-xs pr-8 pl-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  بإرسالك لهذا المقترح، توافق على توثيق ساعات تدريبك كخدمة مجتمعية تطوعية معتمدة برمز QR.
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-md hover:scale-102 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال مقترح الورشة إلى {selectedNgo?.name || 'المؤسسة'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SuggestWorkshopScreen;
