# VolunteerNet Algeria - Antigravity Agent Guidelines

This workspace contains the frontend and database architecture for **VolunteerNet Algeria (شبكة التطوع الجزائرية)**, a national platform connecting Algerian youth with accredited civil organizations.

## 🛠️ Tech Stack & Conventions

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with custom CSS variables in `src/index.css`
- **Database & Auth**: Supabase (`@supabase/supabase-js`, PostgreSQL schema in `supabase/schema.sql`)
- **Icons**: `lucide-react`
- **Localization**: `react-i18next` with RTL support (`dir="rtl"`). All Arabic strings are in `src/locales/ar.json`.
- **Navigation**: `react-router-dom` v7 with `AppLayout.tsx`

## 📁 Key Directories

- `src/pages/`: Application screens (HomeScreen, OpportunitiesScreen, WorkshopsScreen, ActivityScreen, CertificatesScreen, VerifyCertificateScreen, NgoDashboardScreen, TechTeamAdminScreen, AuthScreen).
- `src/components/`: Reusable UI components (`layout/`, `common/`, `certificate/`).
- `src/lib/`: Service clients (`supabase.ts`).
- `src/types/`: Database & domain TypeScript definitions (`database.types.ts`).
- `src/mock/`: Prototype mock data (`data.ts`).
- `supabase/`: Database schemas, RLS policies, and triggers (`schema.sql`).

## ⚙️ Development Commands

- Start Dev Server: `npm run dev`
- Build & Typecheck: `npm run build` (`tsc -b && vite build`)
- Lint: `npm run lint` (`oxlint`)
