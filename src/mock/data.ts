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
}

export interface CertificateRecord {
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
  },
];

export const MOCK_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'CERT-DZ-2026-891',
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
