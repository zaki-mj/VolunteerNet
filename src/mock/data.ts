export interface Ngo {
  id: string;
  name: string;
  licenseNumber: string;
  wilaya: string;
  category: string;
  establishedYear: number;
  status: 'active' | 'pending' | 'suspended';
  activeOpportunities: number;
  verifiedVolunteers: number;
  contactEmail: string;
  phone: string;
  presidentName: string;
  logoInitial: string;
  registrationDate: string;
  documents: {
    statute: boolean;
    generalAssemblyMinutes: boolean;
    wilayaApproval: boolean;
  };
}

export interface Opportunity {
  id: string;
  title: string;
  ngoId: string;
  ngoName: string;
  category: 'environment' | 'health' | 'education' | 'relief' | 'tech' | 'culture';
  wilaya: string;
  commune: string;
  hours: number;
  spotsTotal: number;
  spotsTaken: number;
  startDate: string;
  endDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'open' | 'in_progress' | 'completed';
  featured?: boolean;
  mapCoordinates?: {
    x?: number;
    y?: number;
    lat: number;
    lng: number;
  };
}

export interface Workshop {
  id: string;
  title: string;
  organizer: string;
  partnerNgoId: string;
  category: string;
  durationHours: number;
  days: number;
  totalSeats: number;
  seatsBooked: number;
  startDate: string;
  location: string;
  description: string;
  learningOutcomes: string[];
  accreditedBy: string;
  badgeTag: string;
  wilaya: string;
  commune: string;
  lat: number;
  lng: number;
}

export interface CertificateRecord {
  participationRole?: 'participant' | 'host';
  id: string;
  serialNumber: string;
  volunteerName: string;
  volunteerId: string;
  opportunityTitle: string;
  opportunityId: string;
  issuingNgoName: string;
  issuingNgoLicense: string;
  hoursAccredited: number;
  issueDate: string;
  expiryDate?: string;
  wilaya: string;
  cryptoHash: string;
  status: 'verified' | 'revoked' | 'under_review';
  signerName: string;
  signerRole: string;
  revocationReason?: string;
  qrPayload: string;
}

export const MOCK_NGOS: Ngo[] = [
  {
    id: 'ngo-1',
    name: 'الهلال الأحمر الجزائري - لجنة الإغاثة وتأهيل الشباب',
    licenseNumber: 'CRA-DZ-16-001',
    wilaya: 'الجزائر العاصمة',
    category: 'إغاثة وصحة مجتمعية',
    establishedYear: 1962,
    status: 'active',
    activeOpportunities: 6,
    verifiedVolunteers: 1420,
    contactEmail: 'contact@cra-alger.dz',
    phone: '+213 21 63 31 55',
    presidentName: 'د. ابتسام حملاوي',
    logoInitial: 'CRA',
    registrationDate: '2026-01-15',
    documents: {
      statute: true,
      generalAssemblyMinutes: true,
      wilayaApproval: true,
    },
  },
  {
    id: 'ngo-2',
    name: 'جمعية السد الأخضر والتنمية المستدامة',
    licenseNumber: 'ASD-DZ-17-089',
    wilaya: 'الجلفة',
    category: 'بيئة وتشجير وطني',
    establishedYear: 2018,
    status: 'active',
    activeOpportunities: 3,
    verifiedVolunteers: 650,
    contactEmail: 'info@greendam-dz.org',
    phone: '+213 27 87 14 20',
    presidentName: 'المهندس فاروق بوزيد',
    logoInitial: 'ASD',
    registrationDate: '2026-02-10',
    documents: {
      statute: true,
      generalAssemblyMinutes: true,
      wilayaApproval: true,
    },
  },
  {
    id: 'ngo-3',
    name: 'نادي بصمة شباب التقني - وهران',
    licenseNumber: 'BYTC-DZ-31-118',
    wilaya: 'وهران',
    category: 'تكنولوجيا ومحو أمية رقمية',
    establishedYear: 2021,
    status: 'active',
    activeOpportunities: 4,
    verifiedVolunteers: 410,
    contactEmail: 'hello@basmatech.dz',
    phone: '+213 41 42 18 90',
    presidentName: 'مريم سعداوي',
    logoInitial: 'BTC',
    registrationDate: '2026-03-01',
    documents: {
      statute: true,
      generalAssemblyMinutes: true,
      wilayaApproval: true,
    },
  },
  {
    id: 'ngo-4',
    name: 'جمعية إقرأ لمحو الأمية وتنمية المهارات',
    licenseNumber: 'IQRA-DZ-25-055',
    wilaya: 'قسنطينة',
    category: 'تعليم ومحو أمية',
    establishedYear: 1990,
    status: 'active',
    activeOpportunities: 2,
    verifiedVolunteers: 890,
    contactEmail: 'secretariat@iqra-constantine.dz',
    phone: '+213 31 92 65 11',
    presidentName: 'أ. لخضر شريف',
    logoInitial: 'IQR',
    registrationDate: '2026-02-28',
    documents: {
      statute: true,
      generalAssemblyMinutes: true,
      wilayaApproval: true,
    },
  },
  {
    id: 'ngo-5',
    name: 'جمعية أمل للتضامن الأسري ورعاية الأيتام',
    licenseNumber: 'AMAL-DZ-06-033',
    wilaya: 'بجاية',
    category: 'تضامن ورعاية اجتماعية',
    establishedYear: 2023,
    status: 'pending',
    activeOpportunities: 0,
    verifiedVolunteers: 0,
    contactEmail: 'contact@amal-bejaia.org',
    phone: '+213 34 21 09 44',
    presidentName: 'جمال الدين مقران',
    logoInitial: 'AML',
    registrationDate: '2026-11-01',
    documents: {
      statute: true,
      generalAssemblyMinutes: true,
      wilayaApproval: false, // Pending wilaya accreditation document
    },
  },
  {
    id: 'ngo-6',
    name: 'جمعية حماية التراث وواحات الجنوب',
    licenseNumber: 'SPPO-DZ-47-012',
    wilaya: 'غرداية',
    category: 'تراث وسياحة بيئية',
    establishedYear: 2015,
    status: 'active',
    activeOpportunities: 2,
    verifiedVolunteers: 320,
    contactEmail: 'contact@ghardaia-heritage.dz',
    phone: '+213 29 88 41 12',
    presidentName: 'عمر باحمد',
    logoInitial: 'SPP',
    registrationDate: '2026-04-12',
    documents: {
      statute: true,
      generalAssemblyMinutes: true,
      wilayaApproval: true,
    },
  },
  {
    id: 'ngo-7',
    name: 'مبادرة رواد الغد للتنمية المستدامة',
    licenseNumber: 'PRTD-DZ-09-902',
    wilaya: 'البليدة',
    category: 'ريادة مجتمعية',
    establishedYear: 2024,
    status: 'suspended',
    activeOpportunities: 0,
    verifiedVolunteers: 18,
    contactEmail: 'admin@rowad-elghad.org',
    phone: '+213 25 31 99 00',
    presidentName: 'كمال يوسفي',
    logoInitial: 'PRT',
    registrationDate: '2026-05-18',
    documents: {
      statute: true,
      generalAssemblyMinutes: false,
      wilayaApproval: false,
    },
  },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'حملة التشجير الكبرى لتأهيل حزام السد الأخضر 2026',
    ngoId: 'ngo-2',
    ngoName: 'جمعية السد الأخضر والتنمية المستدامة',
    category: 'environment',
    wilaya: 'الجلفة',
    commune: 'عين الإبل',
    hours: 8,
    spotsTotal: 100,
    spotsTaken: 78,
    startDate: '2026-11-20',
    endDate: '2026-11-20',
    deadline: '2026-11-15',
    description: 'مبادرة تطوعية وطنية تهدف إلى غرس 10,000 شجيرة صنوبر حلبي وفستق أطلسي لإعادة إحياء شريط السد الأخضر ومقاومة التصحر، بإشراف مهندسين زراعيين.',
    requirements: ['العمر 18 سنة فما فوق', 'اللياقة البدنية المناسبة للعمل الميداني', 'الالتزام بإجراءات السلامة'],
    benefits: ['شهادة تطوع رقمية معتمدة برمز QR', 'توفير وجبة غداء ونقل مجاني من مقر الولاية', 'تغطية تأمينية خلال الفعالية'],
    status: 'open',
    featured: true,
    mapCoordinates: { x: 53, y: 31 , lat: 34.3512, lng: 3.2201 },
  },
  {
    id: 'opp-2',
    title: 'تأطير ورشات البرمجة والذكاء الاصطناعي لتلاميذ المدارس',
    ngoId: 'ngo-3',
    ngoName: 'نادي بصمة شباب التقني - وهران',
    category: 'tech',
    wilaya: 'وهران',
    commune: 'وهران المركز',
    hours: 12,
    spotsTotal: 20,
    spotsTaken: 14,
    startDate: '2026-11-25',
    endDate: '2026-11-27',
    deadline: '2026-11-18',
    description: 'تدريب طلاب مرحلة التعليم المتوسط على مبادئ التفكير الحسابي وبرمجة الروبوتات التعليمية، بهدف تقليص الفجوة الرقمية وتشجيع المهارات المستقبلية.',
    requirements: ['معرفة أساسية بأساسيات بايثون أو سكراتش', 'شغف بنقل المعرفة والتدريس التفاعلي', 'حضور أيام الورشة كاملة'],
    benefits: ['اعتماد تطوع تكنولوجي معترف به', 'توصية مهنية للأكاديميات التقنية', 'شهادة ساعات عمل مدني'],
    status: 'open',
    featured: true,
    mapCoordinates: { x: 38, y: 18 , lat: 35.6987, lng: -0.6349 },
  },
  {
    id: 'opp-3',
    title: 'تنظيم قوافل الإسعاف والرعاية الميدانية للسباقات الرياضية',
    ngoId: 'ngo-1',
    ngoName: 'الهلال الأحمر الجزائري - لجنة الإغاثة وتأهيل الشباب',
    category: 'health',
    wilaya: 'الجزائر العاصمة',
    commune: 'سيدي امحمد / خليج الجزائر',
    hours: 6,
    spotsTotal: 50,
    spotsTaken: 42,
    startDate: '2026-11-22',
    endDate: '2026-11-22',
    deadline: '2026-11-17',
    description: 'المشاركة في تأمين نقاط الإسعافات الأولية والتوجيه الصحي على مسار نصف ماراثون العاصمة، بالتعاون مع فرق الحماية المدنية الجزائرية.',
    requirements: ['حيازة شهادة إسعاف أولي (مكتسبة أو عبر ورشات المنصة)', 'روح العمل الجماعي وسرعة البديهة'],
    benefits: ['احتساب 6 ساعات تطوعية مباشرة في ملفك', 'سترة ميدانية رسمية للمتطوع', 'وجبة إفطار وغداء خفيفة'],
    status: 'open',
    featured: true,
    mapCoordinates: { x: 55, y: 15 , lat: 36.7538, lng: 3.0588 },
  },
  {
    id: 'opp-4',
    title: 'تنشيط حصص محو الأمية الرقمية لكبار السن في الفضاءات البلدية',
    ngoId: 'ngo-4',
    ngoName: 'جمعية إقرأ لمحو الأمية وتنمية المهارات',
    category: 'education',
    wilaya: 'قسنطينة',
    commune: 'قسنطينة المركز',
    hours: 16,
    spotsTotal: 15,
    spotsTaken: 9,
    startDate: '2026-12-01',
    endDate: '2026-12-10',
    deadline: '2026-11-25',
    description: 'مرافقة المتقاعدين وكبار السن في تعلم استخدام التطبيقات الخدمية الحكومية (بريدي موب، بوابة منحة البطالة، التطبيقات الصحية) بكل سلاسة وأمان.',
    requirements: ['الصبر والقدرة على التواصل البناء', 'التمكن من استخدام الهواتف الذكية والتطبيقات البنكية الحكومية'],
    benefits: ['شهادة خدمة مجتمعية رفيعة', 'تثمين الخبرة الإنسانية'],
    status: 'open',
    mapCoordinates: { x: 70, y: 18 , lat: 36.365, lng: 6.6147 },
  },
  {
    id: 'opp-5',
    title: 'حملة تنظيف وصيانة قنوات الري التقليدي في قصر بني يزقن',
    ngoId: 'ngo-6',
    ngoName: 'جمعية حماية التراث وواحات الجنوب',
    category: 'culture',
    wilaya: 'غرداية',
    commune: 'بني يزقن',
    hours: 10,
    spotsTotal: 35,
    spotsTaken: 30,
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    deadline: '2026-11-30',
    description: 'حملة تطوعية بيئية-تراثية لحماية نظام توزيع المياه التقليدي (السواقي الفوقية والتحتية) في واحات وادي ميزاب المصنفة تراثاً إنسانياً عالمياً.',
    requirements: ['القدرة على العمل اليدوي في البيئة الواحاتية', 'احترام القوانين العرفية للمنطقة'],
    benefits: ['شهادة حفظ التراث الوطني الجزائري', 'زيارة استكشافية مجانية لمعالم القصر'],
    status: 'open',
    mapCoordinates: { x: 57, y: 44 , lat: 32.4812, lng: 3.6821 },
  },
  {
    id: 'opp-6',
    title: 'قافلة الإغاثة الشتوية وتوزيع المستلزمات لقرى جبال البابور',
    ngoId: 'ngo-1',
    ngoName: 'الهلال الأحمر الجزائري - فرع سطيف',
    category: 'relief',
    wilaya: 'سطيف',
    commune: 'بابور',
    hours: 14,
    spotsTotal: 40,
    spotsTaken: 28,
    startDate: '2026-12-10',
    endDate: '2026-12-12',
    deadline: '2026-12-05',
    description: 'توزيع حصص التدفئة، الأغطية الصوفية، والمواد الغذائية الأساسية على العائلات المعزولة في المداشر الجبلية خلال موجات البرد القارس.',
    requirements: ['القدرة على تحمل درجات الحرارة المنخفضة', 'اللياقة البدنية للتحميل والتوزيع الميداني'],
    benefits: ['شهادة عمل إنساني وإغاثة ميدانية', 'تأمين كامل ومرافقة لوجستية'],
    status: 'open',
    featured: true,
    mapCoordinates: { x: 66, y: 19 , lat: 36.4911, lng: 5.5342 },
  },
  {
    id: 'opp-7',
    title: 'حماية ومراقبة السلاحف البحرية والتنوع الحيوي البيئي بشاطئ واد بقراط',
    ngoId: 'ngo-2',
    ngoName: 'جمعية حماية البيئة والتنوع الحيوي البحري',
    category: 'environment',
    wilaya: 'عنابة',
    commune: 'سرايدي',
    hours: 8,
    spotsTotal: 25,
    spotsTaken: 19,
    startDate: '2026-12-15',
    endDate: '2026-12-15',
    deadline: '2026-12-08',
    description: 'حملة ميدانية لتنظيف الساحل وحماية مواقع تعشيش السلاحف البحرية بمشاركة فرق الغوص وحراس السواحل الجزائريين.',
    requirements: ['الشغف بالبيئة البحرية', 'الالتزام بإرشادات خبراء الأحياء البحرية'],
    benefits: ['شهادة متطوع بيئي بحري', 'ورشة مجانية في علم الأحياء البحرية'],
    status: 'open',
    mapCoordinates: { x: 79, y: 15 , lat: 36.9587, lng: 7.6621 },
  },
  {
    id: 'opp-8',
    title: 'ترميم ورقمنة المخطوطات والوثائق التاريخية القديمة بحاضرة تلمسان',
    ngoId: 'ngo-6',
    ngoName: 'مؤسسة حفظ الذاكرة والتراث الجزائري',
    category: 'culture',
    wilaya: 'تلمسان',
    commune: 'تلمسان العتيقة',
    hours: 12,
    spotsTotal: 15,
    spotsTaken: 11,
    startDate: '2026-12-18',
    endDate: '2026-12-20',
    deadline: '2026-12-12',
    description: 'المشاركة تحت إشراف مؤرخين ومختصين في فهرسة ورقمنة وثائق ومخطوطات تاريخية نادرة تعود للعهود الزيانية والعثمانية.',
    requirements: ['دقة الملاحظة والتعامل الحذر مع المواد التاريخية', 'معرفة أولية باستخدام الماسحات الضوئية'],
    benefits: ['شهادة مساهمة في الأرشيف والتراث الوطني', 'بطاقة دخول شرفية للمتاحف الوطنية'],
    status: 'open',
    mapCoordinates: { x: 33, y: 22 , lat: 34.8828, lng: -1.3167 },
  },
  {
    id: 'opp-9',
    title: 'مشروع الحزام الأخضر لمقاومة زحف الرمال حول واحات حاسي بن عبد الله',
    ngoId: 'ngo-2',
    ngoName: 'جمعية الواحات والتنمية الريفية بورقلة',
    category: 'environment',
    wilaya: 'ورقلة',
    commune: 'حاسي بن عبد الله',
    hours: 15,
    spotsTotal: 50,
    spotsTaken: 36,
    startDate: '2026-12-22',
    endDate: '2026-12-24',
    deadline: '2026-12-16',
    description: 'غرس مصدات الرياح وتثبيت الكثبان لحماية مزارع النخيل ومنازل الفلاحين من العواصف الرملية في عمق الصحراء الجزائرية.',
    requirements: ['تحمل أجواء العمل الصحراوي', 'العمل الجماعي وروح المبادرة'],
    benefits: ['شهادة عمل مناخي معتمدة', 'إقامة وضيافة صحراوية أصيلة طيلة فترة المبادرة'],
    status: 'open',
    mapCoordinates: { x: 68, y: 49 , lat: 32.0123, lng: 5.4612 },
  },
  {
    id: 'opp-10',
    title: 'تنشيط ورشات الحساب الذهني والروبوتات للأطفال في قصور تاغيت',
    ngoId: 'ngo-3',
    ngoName: 'نادي بصمة شباب التقني بالجنوب',
    category: 'tech',
    wilaya: 'بشار',
    commune: 'تاغيت',
    hours: 10,
    spotsTotal: 18,
    spotsTaken: 12,
    startDate: '2026-12-27',
    endDate: '2026-12-28',
    deadline: '2026-12-20',
    description: 'إدخال التكنولوجيا الحديثة وألعاب التفكير المنطقي لأطفال واحة تاغيت والمناطق المجاورة في أجواء تفاعلية مشوقة.',
    requirements: ['القدرة على تبسيط المفاهيم للأطفال', 'حب السفر والتبادل الثقافي'],
    benefits: ['اعتماد مدرب تقني متطوع', 'جولة سياحية بيئية في واحات النخيل والكثبان'],
    status: 'open',
    mapCoordinates: { x: 30, y: 46 , lat: 30.9167, lng: -2.0333 },
  },
  {
    id: 'opp-11',
    title: 'حملة النظافة وحماية النظام البيئي للحظيرة الوطنية قورايا',
    ngoId: 'ngo-2',
    ngoName: 'جمعية حماية حظيرة قورايا الطبيعية',
    category: 'environment',
    wilaya: 'بجاية',
    commune: 'بجاية',
    hours: 6,
    spotsTotal: 60,
    spotsTaken: 45,
    startDate: '2026-11-29',
    endDate: '2026-11-29',
    deadline: '2026-11-24',
    description: 'تنظيف المسالك الجبلية والغابية وحماية الموطن الطبيعي لقردة الماغو البربرية النادرة بالتعاون مع محافظة الغابات.',
    requirements: ['اللياقة البدنية للمشي في المنحدرات الجبلية', 'احترام الحياة البرية'],
    benefits: ['شهادة حامي الطبيعة والبيئة', 'وجبة غذاء جبلية تقليدية للمتطوعين'],
    status: 'open',
    mapCoordinates: { x: 61, y: 15 , lat: 36.7621, lng: 5.0934 },
  },
];

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: 'first-aid',
    title: 'ورشة مبادئ الإسعافات الأولية والاستجابة للكوارث الطبيعية',
    organizer: 'الهلال الأحمر الجزائري',
    partnerNgoId: 'ngo-1',
    category: 'صحة وإنقاذ',
    durationHours: 16,
    days: 2,
    totalSeats: 30,
    seatsBooked: 24,
    startDate: '2026-11-29',
    location: 'المركز الوطني للتكوين الإسعافي - الجزائر العاصمة',
    description: 'برنامج تدريبي مكثف ومعتمد وطنياً يزود الشباب بالمهارات الإسعافية الطارئة، تشمل الإنعاش القلبي الرئوي (CPR)، التعامل مع الحروق والكسور، والإخلاء الآمن.',
    learningOutcomes: [
      'الإنعاش القلبي الرئوي واستخدام جهاز الصدمات الآلي AED',
      'تدابير إيقاف النزيف وتثبيت الكسور بالطرق الحديثة',
      'بروتوكول السلامة أثناء الزلازل وحوادث الطرقات',
      'الحصول على شهادة مسعف أولي معتمدة رسمياً في السجل الوطني',
    ],
    accreditedBy: 'الهلال الأحمر الجزائري + وزارة الصحة',
    badgeTag: 'شهادة رسمية موثقة',
    wilaya: 'الجزائر العاصمة',
    commune: 'بن عكنون',
    lat: 36.7620,
    lng: 3.0180,
  },
  {
    id: 'digital-leadership',
    title: 'إدارة الحملات التطوعية الرقمية والقيادة المجتمعية',
    organizer: 'نادي بصمة شباب التقني',
    partnerNgoId: 'ngo-3',
    category: 'قيادة وإدارة',
    durationHours: 10,
    days: 2,
    totalSeats: 40,
    seatsBooked: 35,
    startDate: '2026-12-03',
    location: 'حاضنة الأعمال القطبية - جامعة وهران 1',
    description: 'دورة تطبيقية في التخطيط الإستراتيجي للمبادرات الشبابية، حشد المتطوعين عبر الوسائط الرقمية، وتوثيق الأثر المجتمعي بالأرقام والبيانات.',
    learningOutcomes: [
      'هندسة المبادرات المجتمعية وصياغة مؤشرات الأداء KPIs',
      'إدارة فرق المتطوعين وأساليب التحفيز والتوزيع الفعال',
      'صناعة المحتوى التوعوي وحملات التأثير الهادف',
    ],
    accreditedBy: 'المرصد الوطني للمجتمع المدني',
    badgeTag: 'تأهيل قيادي',
    wilaya: 'وهران',
    commune: 'وهران المركز',
    lat: 35.7050,
    lng: -0.6200,
  },
  {
    id: 'gis-forestry',
    title: 'نظم المعلومات الجغرافية (GIS) لرصد ومتابعة مساحات التشجير',
    organizer: 'جمعية السد الأخضر والتنمية المستدامة',
    partnerNgoId: 'ngo-2',
    category: 'بيئة وتقنية',
    durationHours: 12,
    days: 2,
    totalSeats: 25,
    seatsBooked: 21,
    startDate: '2026-12-12',
    location: 'محطة أبحاث الغابات - الجلفة',
    description: 'ورشة تجمع بين البيئة والبيانات المفتوحة، لتعليم المتطوعين كيفية تحديد إحداثيات الأشجار المغروسة وتتبع نسبة نموها بالأقمار الصناعية.',
    learningOutcomes: [
      'استخدام تطبيق QGIS لرسم خرائط الأراضي القاحلة',
      'مسح المواقع الجغرافية بالأجهزة الكفية الذكية',
      'إنشاء تقارير بيئية رقمية موجهة لمصالح الغابات',
    ],
    accreditedBy: 'المحافظة السامية للغابات',
    badgeTag: 'مهارة تخصصية',
    wilaya: 'الجلفة',
    commune: 'عين الإبل',
    lat: 34.6850,
    lng: 3.2650,
  },
  {
    id: 'heritage-restoration',
    title: 'ورشة حفظ وترميم المخطوطات والوثائق التاريخية الجزائرية',
    organizer: 'جمعية إقرأ + مديرية الثقافة',
    partnerNgoId: 'ngo-4',
    category: 'تراث وتوثيق',
    durationHours: 12,
    days: 2,
    totalSeats: 30,
    seatsBooked: 22,
    startDate: '2026-12-14',
    location: 'قصر أحمد باي - قسنطينة',
    wilaya: 'قسنطينة',
    commune: 'قسنطينة المركز',
    lat: 36.3620,
    lng: 6.6110,
    description: 'تدريب تطبيقي على تقنيات ترميم الورق القديم، التجليد الفني، والمسح الرقمي عالي الدقة لحماية التراث الوطني.',
    learningOutcomes: [
      'أساسيات المعالجة الكيميائية لورق المخطوطات',
      'التصوير الرقمي الميكروفيلمي والفهرسة الأكاديمية',
      'شهادة معتمدة في حفظ الأرشيف الوطني',
    ],
    accreditedBy: 'وزارة الثقافة والفنون',
    badgeTag: 'تراث وطني',
  },
  {
    id: 'solar-energy',
    title: 'تركيب وصيانة أنظمة الطاقة الشمسية لضخ مياه الواحات',
    organizer: 'جمعية حماية التراث وواحات الجنوب',
    partnerNgoId: 'ngo-6',
    category: 'طاقة وبيئة',
    durationHours: 14,
    days: 3,
    totalSeats: 25,
    seatsBooked: 18,
    startDate: '2026-12-20',
    location: 'معهد الطاقات المتجددة - ورقلة',
    wilaya: 'ورقلة',
    commune: 'ورقلة المركز',
    lat: 31.9550,
    lng: 5.3350,
    description: 'ورشة تقنية موجهة لشباب الجنوب لتمكينهم من صيانة مضخات الطاقة الشمسية لدعم الفلاحين وحماية نخيل الواحات.',
    learningOutcomes: [
      'حساب استطاعة الألواح الشمسية والمحولات',
      'صيانة دورات الضخ الغاطسة في الآبار الارتوازية',
      'شهادة تقني مساعد في الطاقة الشمسية',
    ],
    accreditedBy: 'مركز تنمية الطاقات المتجددة CDER',
    badgeTag: 'طاقة نظيفة',
  },
];

export const MOCK_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'CERT-DZ-2026-891',
    participationRole: 'participant',
    serialNumber: 'VN-2026-CRA-0891-ALG',
    volunteerName: 'أمين بن علي',
    volunteerId: 'VOL-DZ-16-98214',
    opportunityTitle: 'ورشة مبادئ الإسعافات الأولية والاستجابة للكوارث الطبيعية',
    opportunityId: 'first-aid',
    issuingNgoName: 'الهلال الأحمر الجزائري - لجنة الإغاثة وتأهيل الشباب',
    issuingNgoLicense: 'CRA-DZ-16-001',
    hoursAccredited: 16,
    issueDate: '2026-10-18',
    wilaya: 'الجزائر العاصمة',
    cryptoHash: '9e7a8f3d1b6c04e25a819b5c3d7e1f4a9b2c8e5d0f1a3c7b6e9d2f0a1c4e7b8d',
    status: 'verified',
    signerName: 'د. ابتسام حملاوي',
    signerRole: 'رئيسة الهلال الأحمر الجزائري',
    qrPayload: 'https://volunteernet.dz/verify?id=CERT-DZ-2026-891&hash=9e7a8f3d',
  },
  {
    id: 'CERT-DZ-2026-442',
    participationRole: 'participant',
    serialNumber: 'VN-2026-ASD-0442-DJL',
    volunteerName: 'سارة مراد',
    volunteerId: 'VOL-DZ-17-43109',
    opportunityTitle: 'حملة التشجير الكبرى لتأهيل حزام السد الأخضر 2026',
    opportunityId: 'opp-1',
    issuingNgoName: 'جمعية السد الأخضر والتنمية المستدامة',
    issuingNgoLicense: 'ASD-DZ-17-089',
    hoursAccredited: 8,
    issueDate: '2026-09-22',
    wilaya: 'الجلفة',
    cryptoHash: '5a2c4e7f8b9d0a1b3c5e7f9a2b4c6e8d0f1a3b5c7e9f1a3b5c7e9f1a3b5c7e9f',
    status: 'verified',
    signerName: 'المهندس فاروق بوزيد',
    signerRole: 'رئيس جمعية السد الأخضر',
    qrPayload: 'https://volunteernet.dz/verify?id=CERT-DZ-2026-442&hash=5a2c4e7f',
  },
  {
    id: 'CERT-DZ-2026-105',
    participationRole: 'host',
    serialNumber: 'VN-2026-BTC-0105-ORN',
    volunteerName: 'محمد رضوان زروقي',
    volunteerId: 'VOL-DZ-31-88412',
    opportunityTitle: 'تأطير ورشات البرمجة والذكاء الاصطناعي لتلاميذ المدارس',
    opportunityId: 'opp-2',
    issuingNgoName: 'نادي بصمة شباب التقني - وهران',
    issuingNgoLicense: 'BYTC-DZ-31-118',
    hoursAccredited: 12,
    issueDate: '2026-10-30',
    wilaya: 'وهران',
    cryptoHash: '2b4c6e8d0f1a3b5c7e9f1a3b5c7e9f1a3b5c7e9f9e7a8f3d1b6c04e25a819b5c',
    status: 'verified',
    signerName: 'مريم سعداوي',
    signerRole: 'منسقة نادي بصمة شباب',
    qrPayload: 'https://volunteernet.dz/verify?id=CERT-DZ-2026-105&hash=2b4c6e8d',
  },
  {
    id: 'CERT-DZ-2025-999',
    participationRole: 'participant',
    serialNumber: 'VN-2025-SUS-9999-BLD',
    volunteerName: 'أحمد قاسم (حالة تجريبية ملغاة)',
    volunteerId: 'VOL-DZ-09-00129',
    opportunityTitle: 'مبادرة الإرشاد الميداني غير المكتملة',
    opportunityId: 'opp-fake',
    issuingNgoName: 'مبادرة رواد الغد (معلقة الاعتماد)',
    issuingNgoLicense: 'PRTD-DZ-09-902',
    hoursAccredited: 0,
    issueDate: '2025-04-10',
    wilaya: 'البليدة',
    cryptoHash: '0000000000000000000000000000000000000000000000000000000000000000',
    status: 'revoked',
    signerName: 'غير معتمد',
    signerRole: 'حساب موقوف',
    revocationReason: 'تم إلغاء هذه الشهادة بعد مراجعة الفريق التقني: الجمعية المصدرة غير معتمدة وساعات التطوع لم يتم إثباتها ميدانياً.',
    qrPayload: 'https://volunteernet.dz/verify?id=CERT-DZ-2025-999&revoked=true',
  },
];

export const PLATFORM_STATS = {
  totalHours: 28450,
  activeVolunteers: 4320,
  accreditedNgos: 184,
  wilayasCovered: 58,
  verifiedCertificatesIssued: 3120,
};


export interface VolunteerLeaderboardEntry {
  id: string;
  name: string;
  wilaya: string;
  avatarInitials: string;
  contributingHours: number; // Highest contributing hours
  teachingHours: number;     // Teaching / training hours
  learningHours: number;     // Learning / workshop hours
  badgesCount: number;
  featuredBadge: string;
}

export interface NgoLeaderboardEntry {
  id: string;
  name: string;
  licenseNumber: string;
  wilaya: string;
  category: string;
  impactedVolunteers: number;  // Number of impacted volunteers
  activityHours: number;       // Total organized activity hours
  completedInitiatives: number;
}

export const MOCK_VOLUNTEER_LEADERBOARD: VolunteerLeaderboardEntry[] = [
  {
    id: 'vol-1',
    name: 'أمين بن علي',
    wilaya: 'الجزائر العاصمة',
    avatarInitials: 'أم',
    contributingHours: 168,
    teachingHours: 32,
    learningHours: 28,
    badgesCount: 7,
    featuredBadge: 'قائد ميداني متميز',
  },
  {
    id: 'vol-2',
    name: 'مريم سعداوي',
    wilaya: 'وهران',
    avatarInitials: 'مر',
    contributingHours: 124,
    teachingHours: 96,
    learningHours: 18,
    badgesCount: 6,
    featuredBadge: 'مدربة برمجة وذكاء اصطناعي',
  },
  {
    id: 'vol-3',
    name: 'فاروق بوزيد',
    wilaya: 'الجلفة',
    avatarInitials: 'فا',
    contributingHours: 154,
    teachingHours: 24,
    learningHours: 36,
    badgesCount: 5,
    featuredBadge: 'بطل حزام السد الأخضر',
  },
  {
    id: 'vol-4',
    name: 'فاطمة الزهراء بن عيسى',
    wilaya: 'قسنطينة',
    avatarInitials: 'فط',
    contributingHours: 92,
    teachingHours: 44,
    learningHours: 82,
    badgesCount: 8,
    featuredBadge: 'سفيرة التعلّم والتمكين',
  },
  {
    id: 'vol-5',
    name: 'حسام الدين شريف',
    wilaya: 'سطيف',
    avatarInitials: 'حس',
    contributingHours: 138,
    teachingHours: 52,
    learningHours: 22,
    badgesCount: 5,
    featuredBadge: 'منسق حملات الإغاثة الشتوية',
  },
  {
    id: 'vol-6',
    name: 'ليلى بوعزيز',
    wilaya: 'بجاية',
    avatarInitials: 'لي',
    contributingHours: 112,
    teachingHours: 78,
    learningHours: 40,
    badgesCount: 6,
    featuredBadge: 'مؤطرة ورشات ريادة المجتمع',
  },
  {
    id: 'vol-7',
    name: 'عمر باحمد',
    wilaya: 'غرداية',
    avatarInitials: 'عم',
    contributingHours: 142,
    teachingHours: 38,
    learningHours: 26,
    badgesCount: 5,
    featuredBadge: 'حامي التراث والواحات',
  },
  {
    id: 'vol-8',
    name: 'سارة مراد',
    wilaya: 'البليدة',
    avatarInitials: 'سا',
    contributingHours: 98,
    teachingHours: 18,
    learningHours: 64,
    badgesCount: 4,
    featuredBadge: 'مسعفة أولية معتمدة',
  },
  {
    id: 'vol-9',
    name: 'محمد رضوان زروقي',
    wilaya: 'تلمسان',
    avatarInitials: 'مح',
    contributingHours: 106,
    teachingHours: 68,
    learningHours: 34,
    badgesCount: 6,
    featuredBadge: 'مؤطر الابتكار التقني',
  },
  {
    id: 'vol-10',
    name: 'خديجة لموشي',
    wilaya: 'عنابة',
    avatarInitials: 'خد',
    contributingHours: 118,
    teachingHours: 42,
    learningHours: 54,
    badgesCount: 5,
    featuredBadge: 'منشطة التوعية البيئية الساحلية',
  },
];

export const MOCK_NGO_LEADERBOARD: NgoLeaderboardEntry[] = [
  {
    id: 'ngo-lead-1',
    name: 'الهلال الأحمر الجزائري - لجنة الإغاثة وتأهيل الشباب',
    licenseNumber: 'CRA-DZ-16-001',
    wilaya: 'الجزائر العاصمة',
    category: 'إغاثة وصحة مجتمعية',
    impactedVolunteers: 2450,
    activityHours: 14200,
    completedInitiatives: 48,
  },
  {
    id: 'ngo-lead-2',
    name: 'جمعية السد الأخضر والتنمية المستدامة',
    licenseNumber: 'ASD-DZ-17-089',
    wilaya: 'الجلفة',
    category: 'بيئة وتشجير وطني',
    impactedVolunteers: 1820,
    activityHours: 11800,
    completedInitiatives: 34,
  },
  {
    id: 'ngo-lead-3',
    name: 'نادي بصمة شباب التقني - وهران',
    licenseNumber: 'BYTC-DZ-31-118',
    wilaya: 'وهران',
    category: 'تكنولوجيا ومحو أمية رقمية',
    impactedVolunteers: 1340,
    activityHours: 8900,
    completedInitiatives: 28,
  },
  {
    id: 'ngo-lead-4',
    name: 'جمعية إقرأ لمحو الأمية وتنمية المهارات',
    licenseNumber: 'IQRA-DZ-25-055',
    wilaya: 'قسنطينة',
    category: 'تعليم ومحو أمية',
    impactedVolunteers: 980,
    activityHours: 7400,
    completedInitiatives: 22,
  },
  {
    id: 'ngo-lead-5',
    name: 'جمعية حماية التراث وواحات الجنوب',
    licenseNumber: 'SPPO-DZ-47-012',
    wilaya: 'غرداية',
    category: 'تراث وسياحة بيئية',
    impactedVolunteers: 720,
    activityHours: 5100,
    completedInitiatives: 16,
  },
  {
    id: 'ngo-lead-6',
    name: 'الجمعية الولائية للنشاطات الشبانية والبيئة',
    licenseNumber: 'AJSE-DZ-19-041',
    wilaya: 'سطيف',
    category: 'بيئة وشباب',
    impactedVolunteers: 640,
    activityHours: 4600,
    completedInitiatives: 14,
  },
  {
    id: 'ngo-lead-7',
    name: 'جمعية أمل للتضامن والعمل الخيري',
    licenseNumber: 'AMAL-DZ-06-033',
    wilaya: 'بجاية',
    category: 'تضامن ورعاية أسرية',
    impactedVolunteers: 580,
    activityHours: 3900,
    completedInitiatives: 12,
  },
  {
    id: 'ngo-lead-8',
    name: 'رابطة الغوص وحماية الساحل المرجاني',
    licenseNumber: 'RPPC-DZ-23-018',
    wilaya: 'عنابة',
    category: 'حماية البيئة البحرية',
    impactedVolunteers: 490,
    activityHours: 3200,
    completedInitiatives: 9,
  },
];


export const ALGERIA_WILAYAS_58 = [
  { code: '01', name: '01 - أدرار', wilaya: 'أدرار', lat: 27.8742, lng: -0.2939 },
  { code: '02', name: '02 - الشلف', wilaya: 'الشلف', lat: 36.1647, lng: 1.3317 },
  { code: '03', name: '03 - الأغواط', wilaya: 'الأغواط', lat: 33.8000, lng: 2.8651 },
  { code: '04', name: '04 - أم البواقي', wilaya: 'أم البواقي', lat: 35.8755, lng: 7.1135 },
  { code: '05', name: '05 - باتنة', wilaya: 'باتنة', lat: 35.5560, lng: 6.1741 },
  { code: '06', name: '06 - بجاية', wilaya: 'بجاية', lat: 36.7559, lng: 5.0843 },
  { code: '07', name: '07 - بسكرة', wilaya: 'بسكرة', lat: 34.8504, lng: 5.7281 },
  { code: '08', name: '08 - بشار', wilaya: 'بشار', lat: 31.6167, lng: -2.2167 },
  { code: '09', name: '09 - البليدة', wilaya: 'البليدة', lat: 36.4700, lng: 2.8300 },
  { code: '10', name: '10 - البويرة', wilaya: 'البويرة', lat: 36.3749, lng: 3.9020 },
  { code: '11', name: '11 - تمنراست', wilaya: 'تمنراست', lat: 22.7850, lng: 5.5228 },
  { code: '12', name: '12 - تبسة', wilaya: 'تبسة', lat: 35.4042, lng: 8.1242 },
  { code: '13', name: '13 - تلمسان', wilaya: 'تلمسان', lat: 34.8828, lng: -1.3167 },
  { code: '14', name: '14 - تيارت', wilaya: 'تيارت', lat: 35.3710, lng: 1.3170 },
  { code: '15', name: '15 - تيزي وزو', wilaya: 'تيزي وزو', lat: 36.7118, lng: 4.0459 },
  { code: '16', name: '16 - الجزائر العاصمة', wilaya: 'الجزائر العاصمة', lat: 36.7538, lng: 3.0588 },
  { code: '17', name: '17 - الجلفة', wilaya: 'الجلفة', lat: 34.6728, lng: 3.2503 },
  { code: '18', name: '18 - جيجل', wilaya: 'جيجل', lat: 36.8206, lng: 5.7667 },
  { code: '19', name: '19 - سطيف', wilaya: 'سطيف', lat: 36.1911, lng: 5.4137 },
  { code: '20', name: '20 - سعيدة', wilaya: 'سعيدة', lat: 34.8303, lng: 0.1517 },
  { code: '21', name: '21 - سكيكدة', wilaya: 'سكيكدة', lat: 36.8762, lng: 6.9092 },
  { code: '22', name: '22 - سيدي بلعباس', wilaya: 'سيدي بلعباس', lat: 35.1899, lng: -0.6308 },
  { code: '23', name: '23 - عنابة', wilaya: 'عنابة', lat: 36.9000, lng: 7.7667 },
  { code: '24', name: '24 - قالمة', wilaya: 'قالمة', lat: 36.4621, lng: 7.4261 },
  { code: '25', name: '25 - قسنطينة', wilaya: 'قسنطينة', lat: 36.3650, lng: 6.6147 },
  { code: '26', name: '26 - المدية', wilaya: 'المدية', lat: 36.2642, lng: 2.7539 },
  { code: '27', name: '27 - مستغانم', wilaya: 'مستغانم', lat: 35.9312, lng: 0.0892 },
  { code: '28', name: '28 - المسيلة', wilaya: 'المسيلة', lat: 35.7058, lng: 4.5419 },
  { code: '29', name: '29 - معسكر', wilaya: 'معسكر', lat: 35.3966, lng: 0.1403 },
  { code: '30', name: '30 - ورقلة', wilaya: 'ورقلة', lat: 31.9493, lng: 5.3250 },
  { code: '31', name: '31 - وهران', wilaya: 'وهران', lat: 35.6987, lng: -0.6349 },
  { code: '32', name: '32 - البيض', wilaya: 'البيض', lat: 33.6800, lng: 1.0192 },
  { code: '33', name: '33 - إليزي', wilaya: 'إليزي', lat: 26.4858, lng: 8.4689 },
  { code: '34', name: '34 - برج بوعريريج', wilaya: 'برج بوعريريج', lat: 36.0732, lng: 4.7611 },
  { code: '35', name: '35 - بومرداس', wilaya: 'بومرداس', lat: 36.7599, lng: 3.4728 },
  { code: '36', name: '36 - الطارف', wilaya: 'الطارف', lat: 36.7672, lng: 8.3139 },
  { code: '37', name: '37 - تندوف', wilaya: 'تندوف', lat: 27.6711, lng: -8.1474 },
  { code: '38', name: '38 - تسمسيلت', wilaya: 'تسمسيلت', lat: 35.6072, lng: 1.8108 },
  { code: '39', name: '39 - الوادي', wilaya: 'الوادي', lat: 33.3683, lng: 6.8675 },
  { code: '40', name: '40 - خنشلة', wilaya: 'خنشلة', lat: 35.4358, lng: 7.1433 },
  { code: '41', name: '41 - سوق أهراس', wilaya: 'سوق أهراس', lat: 36.2864, lng: 7.9511 },
  { code: '42', name: '42 - تيبازة', wilaya: 'تيبازة', lat: 36.5897, lng: 2.4475 },
  { code: '43', name: '43 - ميلة', wilaya: 'ميلة', lat: 36.4503, lng: 6.2644 },
  { code: '44', name: '44 - عين الدفلى', wilaya: 'عين الدفلى', lat: 36.2644, lng: 1.9678 },
  { code: '45', name: '45 - النعامة', wilaya: 'النعامة', lat: 33.2667, lng: -0.3167 },
  { code: '46', name: '46 - عين تموشنت', wilaya: 'عين تموشنت', lat: 35.2975, lng: -1.1404 },
  { code: '47', name: '47 - غرداية', wilaya: 'غرداية', lat: 32.4909, lng: 3.6735 },
  { code: '48', name: '48 - غليزان', wilaya: 'غليزان', lat: 35.7372, lng: 0.5558 },
  { code: '49', name: '49 - تيميمون', wilaya: 'تيميمون', lat: 29.2639, lng: 0.2311 },
  { code: '50', name: '50 - برج باجي مختار', wilaya: 'برج باجي مختار', lat: 21.3275, lng: 0.9547 },
  { code: '51', name: '51 - أولاد جلال', wilaya: 'أولاد جلال', lat: 34.4333, lng: 5.0667 },
  { code: '52', name: '52 - بني عباس', wilaya: 'بني عباس', lat: 30.1333, lng: -2.1667 },
  { code: '53', name: '53 - عين صالح', wilaya: 'عين صالح', lat: 27.1936, lng: 2.4608 },
  { code: '54', name: '54 - عين قزام', wilaya: 'عين قزام', lat: 19.5686, lng: 5.7725 },
  { code: '55', name: '55 - توقرت', wilaya: 'توقرت', lat: 33.1053, lng: 6.0583 },
  { code: '56', name: '56 - جانت', wilaya: 'جانت', lat: 24.5539, lng: 9.4847 },
  { code: '57', name: '57 - المغير', wilaya: 'المغير', lat: 33.9500, lng: 5.9167 },
  { code: '58', name: '58 - المنيعة', wilaya: 'المنيعة', lat: 30.5847, lng: 2.8797 },
];

export const getStoredOpportunities = (): Opportunity[] => {
  try {
    const raw = localStorage.getItem('volunteernet_custom_opportunities');
    if (raw) {
      const parsed: Opportunity[] = JSON.parse(raw);
      return [...parsed, ...MOCK_OPPORTUNITIES];
    }
  } catch (err) {
    console.error('Error reading stored opportunities:', err);
  }
  return MOCK_OPPORTUNITIES;
};

export const saveCustomOpportunity = (opp: Opportunity): void => {
  try {
    const raw = localStorage.getItem('volunteernet_custom_opportunities');
    const list: Opportunity[] = raw ? JSON.parse(raw) : [];
    list.unshift(opp);
    localStorage.setItem('volunteernet_custom_opportunities', JSON.stringify(list));
    window.dispatchEvent(new Event('volunteernet_data_updated'));
  } catch (err) {
    console.error('Error saving opportunity:', err);
  }
};

export const getStoredWorkshops = (): Workshop[] => {
  try {
    const raw = localStorage.getItem('volunteernet_custom_workshops');
    if (raw) {
      const parsed: Workshop[] = JSON.parse(raw);
      return [...parsed, ...MOCK_WORKSHOPS];
    }
  } catch (err) {
    console.error('Error reading stored workshops:', err);
  }
  return MOCK_WORKSHOPS;
};

export const saveCustomWorkshop = (ws: Workshop): void => {
  try {
    const raw = localStorage.getItem('volunteernet_custom_workshops');
    const list: Workshop[] = raw ? JSON.parse(raw) : [];
    list.unshift(ws);
    localStorage.setItem('volunteernet_custom_workshops', JSON.stringify(list));
    window.dispatchEvent(new Event('volunteernet_data_updated'));
  } catch (err) {
    console.error('Error saving workshop:', err);
  }
};
