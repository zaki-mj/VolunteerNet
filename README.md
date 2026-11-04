# VolunteerNet Algeria Platform - Web Prototype
**منصة شبكة التطوع الجزائرية - النموذج التفاعلي الأولي**

This is an interactive, lightweight web prototype realizing the **VolunteerNet Algeria Platform** project from Stitch.

---

## 🚀 Quick Start

To run the interactive prototype locally:

```bash
cd volunteernet-web
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🌐 Architecture & Features

### 1. Internationalization (i18n & RTL)
- **Zero hardcoded text**: All UI text is loaded dynamically via `react-i18next`.
- **Translations directory**: `src/locales/ar.json`.
- **RTL Support**: The document direction dynamically adapts (`dir="rtl"` for Arabic, `dir="ltr"` for Latin languages).
- **Adding new languages (French/English)**:
  1. Add `fr.json` or `en.json` under `src/locales/`.
  2. Register them in `src/i18n/config.ts`.

### 2. Modular Theming (Light / Dark)
- Built on CSS custom variables (`src/index.css`) matching Stitch design tokens:
  - Primary Algerian Green: `#006233` (Light) / `#15803d` (Dark)
  - Secondary Algerian Red: `#D21034` (Light) / `#e11d48` (Dark)
  - Canvas & surfaces: Warm off-white `#F7F8F5` (Light) / `#0B0F19` (Dark)
- Managed via `src/theme/ThemeProvider.tsx` and can be toggled using the header button.

### 3. Scalable Desktop & Mobile Navigation
- **Mobile (`< 768px`)**: Fixed bottom navigation bar with 5 primary touch targets (`الرئيسية`, `الفرص`, `تعلّم`, `نشاطي`, `شهاداتي`).
- **Desktop (`≥ 768px`)**: Top navigation bar with branding, screen tabs, public verification portal button, and NGO dashboard switcher.

---

## 🗺️ Screen Relationship Map

| Screen Name in Stitch | Route | Related Screens & Cross-Links |
| :--- | :--- | :--- |
| **الرئيسية** (Home) | `/` | Opportunities, Workshops, Activity, Certificates, Verify, NGO Portal |
| **قائمة الفرص** (Opportunities) | `/opportunities` | Opportunity Details (`/opportunities/:id`), Workshops, Activity |
| **تفاصيل الفرصة التطوعية** (Opportunity Detail) | `/opportunities/:id` | "Apply Now" action, NGO Dashboard, Activity |
| **تعلّم وشارك** (Workshops) | `/workshops` | First Aid Workshop Detail (`/workshops/first-aid`), Certificates |
| **تفاصيل ورشة الإسعافات الأولية** (Workshop Detail) | `/workshops/:id` | Certificates, Workshops list |
| **نشاطي** (My Activity) | `/activity` | Certificates (`/certificates`), Opportunities |
| **شهاداتي** (Certificates) | `/certificates` | Certificate Detail (`/certificates/:id`), Verify (`/verify`) |
| **شهادة تطوع** (Certificate Detail) | `/certificates/:id` | Public Verification Portal (`/verify?id=...`), PDF download |
| **التحقق من الشهادة** (Verify Certificate) | `/verify` | Search by Certificate ID / Hash, View verified certificate |
| **لوحة تحكم الجمعية** (NGO Dashboard) | `/ngo/dashboard` | Manage volunteer applicants (Approve/Reject), Opportunity Details |
