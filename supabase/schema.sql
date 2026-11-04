-- ==============================================================================
-- VolunteerNet Algeria (شبكة التطوع الجزائرية)
-- Supabase PostgreSQL Schema & Security Policies
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Custom Enums & Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('volunteer', 'ngo', 'tech_team');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ngo_status AS ENUM ('pending', 'active', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE opportunity_category AS ENUM (
        'environment',
        'health',
        'education',
        'relief',
        'tech',
        'culture'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE opportunity_status AS ENUM ('open', 'in_progress', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE certificate_status AS ENUM ('verified', 'revoked', 'under_review');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. Core Tables
-- ==============================================================================

-- Table: profiles (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'volunteer',
    wilaya TEXT NOT NULL DEFAULT '16 - الجزائر العاصمة',
    phone TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table: ngos (الجمعيات الوطنية والمحلية المعتمدة)
CREATE TABLE IF NOT EXISTS public.ngos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    license_number TEXT UNIQUE NOT NULL,
    wilaya TEXT NOT NULL,
    category TEXT NOT NULL,
    established_year INTEGER CHECK (established_year >= 1900 AND established_year <= 2100),
    status ngo_status NOT NULL DEFAULT 'pending',
    contact_email TEXT NOT NULL,
    phone TEXT,
    president_name TEXT NOT NULL,
    logo_initial TEXT,
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    statute_doc_verified BOOLEAN NOT NULL DEFAULT false,
    general_assembly_verified BOOLEAN NOT NULL DEFAULT false,
    wilaya_approval_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table: opportunities (الفرص والمبادرات التطوعية)
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ngo_id UUID NOT NULL REFERENCES public.ngos(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category opportunity_category NOT NULL DEFAULT 'environment',
    wilaya TEXT NOT NULL,
    commune TEXT NOT NULL,
    hours INTEGER NOT NULL CHECK (hours > 0),
    spots_total INTEGER NOT NULL CHECK (spots_total > 0),
    spots_taken INTEGER NOT NULL DEFAULT 0 CHECK (spots_taken >= 0 AND spots_taken <= spots_total),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    deadline DATE NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
    benefits TEXT[] DEFAULT ARRAY[]::TEXT[],
    status opportunity_status NOT NULL DEFAULT 'open',
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table: workshops (ورشات التأهيل المدني: تعلّم وشارك)
CREATE TABLE IF NOT EXISTS public.workshops (
    id TEXT PRIMARY KEY,
    partner_ngo_id UUID REFERENCES public.ngos(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    organizer TEXT NOT NULL,
    category TEXT NOT NULL,
    duration_hours INTEGER NOT NULL CHECK (duration_hours > 0),
    days INTEGER NOT NULL DEFAULT 1 CHECK (days > 0),
    total_seats INTEGER NOT NULL CHECK (total_seats > 0),
    seats_booked INTEGER NOT NULL DEFAULT 0 CHECK (seats_booked >= 0 AND seats_booked <= total_seats),
    start_date DATE NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    learning_outcomes TEXT[] DEFAULT ARRAY[]::TEXT[],
    accredited_by TEXT NOT NULL,
    badge_tag TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table: applications (طلبات التسجيل والمشاركة)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    volunteer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    workshop_id TEXT REFERENCES public.workshops(id) ON DELETE CASCADE,
    status application_status NOT NULL DEFAULT 'pending',
    hours_logged INTEGER NOT NULL DEFAULT 0 CHECK (hours_logged >= 0),
    applicant_note TEXT,
    admin_response TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_application_target CHECK (
        (opportunity_id IS NOT NULL AND workshop_id IS NULL) OR
        (opportunity_id IS NULL AND workshop_id IS NOT NULL)
    ),
    CONSTRAINT uq_volunteer_opportunity UNIQUE (volunteer_id, opportunity_id),
    CONSTRAINT uq_volunteer_workshop UNIQUE (volunteer_id, workshop_id)
);

-- Table: certificates (الشهادات الرقمية المشفرة)
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY,
    serial_number TEXT UNIQUE NOT NULL,
    volunteer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    volunteer_name TEXT NOT NULL,
    volunteer_code TEXT,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
    workshop_id TEXT REFERENCES public.workshops(id) ON DELETE SET NULL,
    opportunity_title TEXT NOT NULL,
    issuing_ngo_id UUID REFERENCES public.ngos(id) ON DELETE SET NULL,
    issuing_ngo_name TEXT NOT NULL,
    issuing_ngo_license TEXT NOT NULL,
    hours_accredited INTEGER NOT NULL CHECK (hours_accredited >= 0),
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    wilaya TEXT NOT NULL,
    crypto_hash TEXT NOT NULL,
    status certificate_status NOT NULL DEFAULT 'verified',
    signer_name TEXT NOT NULL,
    signer_role TEXT NOT NULL,
    revocation_reason TEXT,
    qr_payload TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 4. Indexes for High-Performance Queries
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_ngos_status ON public.ngos(status);
CREATE INDEX IF NOT EXISTS idx_ngos_wilaya ON public.ngos(wilaya);
CREATE INDEX IF NOT EXISTS idx_opportunities_status_wilaya ON public.opportunities(status, wilaya);
CREATE INDEX IF NOT EXISTS idx_opportunities_ngo_id ON public.opportunities(ngo_id);
CREATE INDEX IF NOT EXISTS idx_applications_volunteer ON public.applications(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_applications_opportunity ON public.applications(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_certificates_volunteer ON public.certificates(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_certificates_serial ON public.certificates(serial_number);
CREATE INDEX IF NOT EXISTS idx_certificates_crypto_hash ON public.certificates(crypto_hash);

-- ==============================================================================
-- 5. Automatic Timestamp Triggers
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_updated_at_profiles ON public.profiles;
CREATE TRIGGER trigger_set_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS trigger_set_updated_at_ngos ON public.ngos;
CREATE TRIGGER trigger_set_updated_at_ngos
    BEFORE UPDATE ON public.ngos
    FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS trigger_set_updated_at_opportunities ON public.opportunities;
CREATE TRIGGER trigger_set_updated_at_opportunities
    BEFORE UPDATE ON public.opportunities
    FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS trigger_set_updated_at_workshops ON public.workshops;
CREATE TRIGGER trigger_set_updated_at_workshops
    BEFORE UPDATE ON public.workshops
    FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS trigger_set_updated_at_applications ON public.applications;
CREATE TRIGGER trigger_set_updated_at_applications
    BEFORE UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS trigger_set_updated_at_certificates ON public.certificates;
CREATE TRIGGER trigger_set_updated_at_certificates
    BEFORE UPDATE ON public.certificates
    FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ==============================================================================
-- 6. Trigger: Auto-create Profile on Supabase Auth Signup
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role_val user_role := 'volunteer';
BEGIN
    IF (NEW.raw_user_meta_data->>'role') IS NOT NULL THEN
        BEGIN
            user_role_val := (NEW.raw_user_meta_data->>'role')::user_role;
        EXCEPTION WHEN OTHERS THEN
            user_role_val := 'volunteer';
        END;
    END IF;

    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        role,
        wilaya,
        phone
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        user_role_val,
        COALESCE(NEW.raw_user_meta_data->>'wilaya', '16 - الجزائر العاصمة'),
        NEW.raw_user_meta_data->>'phone'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 7. Trigger: Update Opportunity Spots on Application Accepted/Cancelled
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_application_spots_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        -- Accepted now: increment spots
        IF OLD.status <> 'accepted' AND NEW.status = 'accepted' THEN
            IF NEW.opportunity_id IS NOT NULL THEN
                UPDATE public.opportunities
                SET spots_taken = LEAST(spots_total, spots_taken + 1)
                WHERE id = NEW.opportunity_id;
            ELSIF NEW.workshop_id IS NOT NULL THEN
                UPDATE public.workshops
                SET seats_booked = LEAST(total_seats, seats_booked + 1)
                WHERE id = NEW.workshop_id;
            END IF;
        -- Revoked/Cancelled from accepted: decrement spots
        ELSIF OLD.status = 'accepted' AND NEW.status <> 'accepted' THEN
            IF NEW.opportunity_id IS NOT NULL THEN
                UPDATE public.opportunities
                SET spots_taken = GREATEST(0, spots_taken - 1)
                WHERE id = NEW.opportunity_id;
            ELSIF NEW.workshop_id IS NOT NULL THEN
                UPDATE public.workshops
                SET seats_booked = GREATEST(0, seats_booked - 1)
                WHERE id = NEW.workshop_id;
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_application_spots ON public.applications;
CREATE TRIGGER trigger_application_spots
    AFTER UPDATE OF status ON public.applications
    FOR EACH ROW EXECUTE FUNCTION public.handle_application_spots_change();

-- ==============================================================================
-- 8. Row Level Security (RLS) Policies
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current user is Tech Team Admin
CREATE OR REPLACE FUNCTION public.is_tech_team()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'tech_team'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- Profiles RLS ---
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id OR public.is_tech_team());

-- --- NGOs RLS ---
CREATE POLICY "Active NGOs are viewable by everyone"
    ON public.ngos FOR SELECT
    USING (status = 'active' OR auth.uid() = user_id OR public.is_tech_team());

CREATE POLICY "NGO representatives can create NGO application"
    ON public.ngos FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "NGO representative or Tech Team can update NGO"
    ON public.ngos FOR UPDATE
    USING (auth.uid() = user_id OR public.is_tech_team());

-- --- Opportunities RLS ---
CREATE POLICY "Opportunities are viewable by everyone"
    ON public.opportunities FOR SELECT
    USING (true);

CREATE POLICY "NGO representatives can create opportunities"
    ON public.opportunities FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.ngos
            WHERE id = ngo_id AND (user_id = auth.uid() OR public.is_tech_team())
        )
    );

CREATE POLICY "NGO representatives can update their opportunities"
    ON public.opportunities FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.ngos
            WHERE id = ngo_id AND (user_id = auth.uid() OR public.is_tech_team())
        )
    );

CREATE POLICY "NGO representatives can delete their opportunities"
    ON public.opportunities FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.ngos
            WHERE id = ngo_id AND (user_id = auth.uid() OR public.is_tech_team())
        )
    );

-- --- Workshops RLS ---
CREATE POLICY "Workshops are viewable by everyone"
    ON public.workshops FOR SELECT
    USING (true);

CREATE POLICY "Tech team or partner NGO can manage workshops"
    ON public.workshops FOR ALL
    USING (public.is_tech_team());

-- --- Applications RLS ---
CREATE POLICY "Volunteers can view their own applications"
    ON public.applications FOR SELECT
    USING (
        auth.uid() = volunteer_id
        OR public.is_tech_team()
        OR EXISTS (
            SELECT 1 FROM public.opportunities o
            JOIN public.ngos n ON o.ngo_id = n.id
            WHERE o.id = applications.opportunity_id AND n.user_id = auth.uid()
        )
    );

CREATE POLICY "Volunteers can submit application"
    ON public.applications FOR INSERT
    WITH CHECK (auth.uid() = volunteer_id);

CREATE POLICY "NGO and Tech Team can update application status"
    ON public.applications FOR UPDATE
    USING (
        public.is_tech_team()
        OR EXISTS (
            SELECT 1 FROM public.opportunities o
            JOIN public.ngos n ON o.ngo_id = n.id
            WHERE o.id = applications.opportunity_id AND n.user_id = auth.uid()
        )
    );

-- --- Certificates RLS ---
CREATE POLICY "Certificates are publicly verifiable"
    ON public.certificates FOR SELECT
    USING (true);

CREATE POLICY "NGO and Tech Team can issue certificates"
    ON public.certificates FOR INSERT
    WITH CHECK (
        public.is_tech_team()
        OR EXISTS (
            SELECT 1 FROM public.ngos
            WHERE id = issuing_ngo_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "NGO and Tech Team can update certificates"
    ON public.certificates FOR UPDATE
    USING (
        public.is_tech_team()
        OR EXISTS (
            SELECT 1 FROM public.ngos
            WHERE id = issuing_ngo_id AND user_id = auth.uid()
        )
    );

-- ==============================================================================
-- 9. Seed Initial Data (Matching VolunteerNet Mock Catalog)
-- ==============================================================================

-- Insert Sample NGOs
INSERT INTO public.ngos (
    id, name, license_number, wilaya, category, established_year, status,
    contact_email, phone, president_name, logo_initial, registration_date,
    statute_doc_verified, general_assembly_verified, wilaya_approval_verified
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'الهلال الأحمر الجزائري - لجنة الإغاثة وتأهيل الشباب',
    'CRA-DZ-16-001',
    'الجزائر العاصمة',
    'إغاثة وصحة مجتمعية',
    1962,
    'active',
    'contact@cra-alger.dz',
    '+213 21 63 31 55',
    'د. ابتسام حملاوي',
    'CRA',
    '2026-01-15',
    true, true, true
),
(
    '00000000-0000-0000-0000-000000000002',
    'جمعية السد الأخضر والتنمية المستدامة',
    'ASD-DZ-17-089',
    'الجلفة',
    'بيئة وتشجير وطني',
    2018,
    'active',
    'info@greendam-dz.org',
    '+213 27 87 14 20',
    'المهندس فاروق بوزيد',
    'ASD',
    '2026-02-10',
    true, true, true
),
(
    '00000000-0000-0000-0000-000000000003',
    'نادي بصمة شباب التقني - وهران',
    'BYTC-DZ-31-118',
    'وهران',
    'تكنولوجيا ومحو أمية رقمية',
    2021,
    'active',
    'hello@basmatech.dz',
    '+213 41 42 18 90',
    'مريم سعداوي',
    'BTC',
    '2026-03-01',
    true, true, true
),
(
    '00000000-0000-0000-0000-000000000004',
    'جمعية إقرأ لمحو الأمية وتنمية المهارات',
    'IQRA-DZ-25-055',
    'قسنطينة',
    'تعليم ومحو أمية',
    1990,
    'active',
    'secretariat@iqra-constantine.dz',
    '+213 31 92 65 11',
    'أ. لخضر شريف',
    'IQR',
    '2026-02-28',
    true, true, true
),
(
    '00000000-0000-0000-0000-000000000005',
    'جمعية أمل للتضامن الأسري ورعاية الأيتام',
    'AMAL-DZ-06-033',
    'بجاية',
    'تضامن ورعاية اجتماعية',
    2023,
    'pending',
    'contact@amal-bejaia.org',
    '+213 34 21 09 44',
    'جمال الدين مقران',
    'AML',
    '2026-11-01',
    true, true, false
)
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Opportunities
INSERT INTO public.opportunities (
    id, ngo_id, title, category, wilaya, commune, hours, spots_total, spots_taken,
    start_date, end_date, deadline, description, requirements, benefits, status, featured
) VALUES
(
    '11111111-1111-1111-1111-111111110001',
    '00000000-0000-0000-0000-000000000002',
    'حملة التشجير الكبرى لتأهيل حزام السد الأخضر 2026',
    'environment',
    'الجلفة',
    'عين الإبل',
    8, 100, 78,
    '2026-11-20', '2026-11-20', '2026-11-15',
    'مبادرة تطوعية وطنية تهدف إلى غرس 10,000 شجيرة صنوبر حلبي وفستق أطلسي لإعادة إحياء شريط السد الأخضر ومقاومة التصحر، بإشراف مهندسين زراعيين.',
    ARRAY['العمر 18 سنة فما فوق', 'اللياقة البدنية المناسبة للعمل الميداني', 'الالتزام بإجراءات السلامة'],
    ARRAY['شهادة تطوع رقمية معتمدة برمز QR', 'توفير وجبة غداء ونقل مجاني من مقر الولاية', 'تغطية تأمينية خلال الفعالية'],
    'open', true
),
(
    '11111111-1111-1111-1111-111111110002',
    '00000000-0000-0000-0000-000000000003',
    'تأطير ورشات البرمجة والذكاء الاصطناعي لتلاميذ المدارس',
    'tech',
    'وهران',
    'وهران المركز',
    12, 20, 14,
    '2026-11-25', '2026-11-27', '2026-11-18',
    'تدريب طلاب مرحلة التعليم المتوسط على مبادئ التفكير الحسابي وبرمجة الروبوتات التعليمية، بهدف تقليص الفجوة الرقمية وتشجيع المهارات المستقبلية.',
    ARRAY['معرفة أساسية بأساسيات بايثون أو سكراتش', 'شغف بنقل المعرفة والتدريس التفاعلي', 'حضور أيام الورشة كاملة'],
    ARRAY['اعتماد تطوع تكنولوجي معترف به', 'توصية مهنية للأكاديميات التقنية', 'شهادة ساعات عمل مدني'],
    'open', true
),
(
    '11111111-1111-1111-1111-111111110003',
    '00000000-0000-0000-0000-000000000001',
    'تنظيم قوافل الإسعاف والرعاية الميدانية للسباقات الرياضية',
    'health',
    'الجزائر العاصمة',
    'سيدي امحمد / خليج الجزائر',
    6, 50, 42,
    '2026-11-22', '2026-11-22', '2026-11-17',
    'المشاركة في تأمين نقاط الإسعافات الأولية والتوجيه الصحي على مسار نصف ماراثون العاصمة، بالتعاون مع فرق الحماية المدنية الجزائرية.',
    ARRAY['حيازة شهادة إسعاف أولي (مكتسبة أو عبر ورشات المنصة)', 'روح العمل الجماعي وسرعة البديهة'],
    ARRAY['احتساب 6 ساعات تطوعية مباشرة في ملفك', 'سترة ميدانية رسمية للمتطوع', 'وجبة إفطار وغداء خفيفة'],
    'open', true
)
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Workshops
INSERT INTO public.workshops (
    id, partner_ngo_id, title, organizer, category, duration_hours, days,
    total_seats, seats_booked, start_date, location, description,
    learning_outcomes, accredited_by, badge_tag
) VALUES
(
    'first-aid',
    '00000000-0000-0000-0000-000000000001',
    'ورشة مبادئ الإسعافات الأولية والاستجابة للكوارث الطبيعية',
    'الهلال الأحمر الجزائري',
    'صحة وإنقاذ',
    16, 2, 30, 24,
    '2026-11-29',
    'المركز الوطني للتكوين الإسعافي - الجزائر العاصمة',
    'برنامج تدريبي مكثف ومعتمد وطنياً يزود الشباب بالمهارات الإسعافية الطارئة، تشمل الإنعاش القلبي الرئوي (CPR)، التعامل مع الحروق والكسور، والإخلاء الآمن.',
    ARRAY[
        'الإنعاش القلبي الرئوي واستخدام جهاز الصدمات الآلي AED',
        'تدابير إيقاف النزيف وتثبيت الكسور بالطرق الحديثة',
        'بروتوكول السلامة أثناء الزلازل وحوادث الطرقات',
        'الحصول على شهادة مسعف أولي معتمدة رسمياً في السجل الوطني'
    ],
    'الهلال الأحمر الجزائري + وزارة الصحة',
    'شهادة رسمية موثقة'
),
(
    'digital-leadership',
    '00000000-0000-0000-0000-000000000003',
    'إدارة الحملات التطوعية الرقمية والقيادة المجتمعية',
    'نادي بصمة شباب التقني',
    'قيادة وإدارة',
    10, 2, 40, 35,
    '2026-12-03',
    'حاضنة الأعمال القطبية - جامعة وهران 1',
    'دورة تطبيقية في التخطيط الإستراتيجي للمبادرات الشبابية، حشد المتطوعين عبر الوسائط الرقمية، وتوثيق الأثر المجتمعي بالأرقام والبيانات.',
    ARRAY[
        'هندسة المبادرات المجتمعية وصياغة مؤشرات الأداء KPIs',
        'إدارة فرق المتطوعين وأساليب التحفيز والتوزيع الفعال',
        'صناعة المحتوى التوعوي وحملات التأثير الهادف'
    ],
    'المرصد الوطني للمجتمع المدني',
    'تأهيل قيادي'
)
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Certificates
INSERT INTO public.certificates (
    id, serial_number, volunteer_name, volunteer_code, opportunity_title,
    issuing_ngo_id, issuing_ngo_name, issuing_ngo_license, hours_accredited,
    issue_date, wilaya, crypto_hash, status, signer_name, signer_role, qr_payload
) VALUES
(
    'CERT-DZ-2026-891',
    'VN-2026-CRA-0891-ALG',
    'أمين بن علي',
    'VOL-DZ-16-98214',
    'ورشة مبادئ الإسعافات الأولية والاستجابة للكوارث الطبيعية',
    '00000000-0000-0000-0000-000000000001',
    'الهلال الأحمر الجزائري - لجنة الإغاثة وتأهيل الشباب',
    'CRA-DZ-16-001',
    16,
    '2026-10-18',
    'الجزائر العاصمة',
    '9e7a8f3d1b6c04e25a819b5c3d7e1f4a9b2c8e5d0f1a3c7b6e9d2f0a1c4e7b8d',
    'verified',
    'د. ابتسام حملاوي',
    'رئيسة الهلال الأحمر الجزائري',
    'https://volunteernet.dz/verify?id=CERT-DZ-2026-891&hash=9e7a8f3d'
),
(
    'CERT-DZ-2026-442',
    'VN-2026-ASD-0442-DJL',
    'سارة مراد',
    'VOL-DZ-17-43109',
    'حملة التشجير الكبرى لتأهيل حزام السد الأخضر 2026',
    '00000000-0000-0000-0000-000000000002',
    'جمعية السد الأخضر والتنمية المستدامة',
    'ASD-DZ-17-089',
    8,
    '2026-09-22',
    'الجلفة',
    '5a2c4e7f8b9d0a1b3c5e7f9a2b4c6e8d0f1a3b5c7e9f1a3b5c7e9f1a3b5c7e9f',
    'verified',
    'المهندس فاروق بوزيد',
    'رئيس جمعية السد الأخضر',
    'https://volunteernet.dz/verify?id=CERT-DZ-2026-442&hash=5a2c4e7f'
)
ON CONFLICT (id) DO NOTHING;
