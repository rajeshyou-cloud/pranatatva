# PranaTatva — Project Plan & Progress Tracker

**Goal:** Launch a fully functional spiritual wellness booking portal to a custom domain  
**Timeline:** 8 sessions | **Current Phase:** UI Design & Review  
**Last updated:** 2026-05-25

---

## Session Map Overview

| # | Session | Focus | Status |
|---|---|---|---|
| 1 | UI Design & Redesign | New design system, all pages, 6 services, 2 practitioners | ✅ Done |
| 2 | UI Completion + Client Options | About page, Footer, Contact, 2 design variants for client | 🔵 Today |
| 3 | Auth + Database | Supabase setup, DB schema, email OTP + Google SSO | ⬜ Pending |
| 4 | Booking Engine | Real slot API, intake form, booking confirmation flow | ⬜ Pending |
| 5 | Payments + Invoicing | Razorpay integration, GST PDF invoice, Resend email | ⬜ Pending |
| 6 | Notifications + Video | WhatsApp reminders (Meta API), Zoom auto-link, email templates | ⬜ Pending |
| 7 | Admin + AI Recommender | Enhanced dashboard, 5-question AI service recommender | ⬜ Pending |
| 8 | QA + Deployment | Mobile QA, bug fixes, Vercel deploy, custom domain | ⬜ Pending |

---

## Session 1 — UI Design & Redesign ✅ DONE

**Completed 2026-05-24**

- [x] New design system — earthy warm palette (saffron amber #C4780A, espresso nav #2C1A0E, parchment #FBF7F0)
- [x] Playfair Display + DM Sans fonts wired via next/font/google
- [x] Fixed Tailwind @apply bug — direct hex in globals.css
- [x] Header — dark espresso fixed nav, lotus SVG logo, language switcher (EN/हि/తె)
- [x] Homepage — dark hero, practitioner cards, 3 service preview, testimonials, CTA banner
- [x] Services page — 6-service grid, category filter chips, SVG sacred geometry, AI recommender banner
- [x] Service detail pages — all 6 slugs with Hemavathi/Shruthi, pricing, includes
- [x] Booking flow — StepServiceSelect (6 services), monthly calendar slot picker, pre-population fix
- [x] Admin dashboard header updated to brand-charcoal
- [x] Razorpay modal theme updated to amber

**Services catalogue:**
| Slug | Practitioner | Price |
|---|---|---|
| theta-healing-deep-dive | Hemavathi | ₹2,500 |
| abundance-manifestation | Hemavathi | ₹3,000 |
| tarot-card-reading | Shruthi | ₹1,800 |
| spiritual-awakening-mastery | Hemavathi | ₹22,000 |
| akashic-records-soul-reading | Shruthi | ₹2,200 |
| free-discovery-call | Hemavathi or Shruthi | Free |

---

## Session 2 — UI Completion + Client Design Options 🔵 TODAY

**Goal:** Complete all UI pages, then present 2 design theme variants for client selection. Once client picks, lock the design and proceed.

### Part A — Page Completion
- [ ] **About page** — rewrite with Hemavathi + Shruthi (remove old Lakshmmi), correct bios, specialties (Theta Healing, Tarot, Akashic Records), practitioner photo placeholders
- [ ] **Footer** — dark espresso, PranaTatva lotus logo, nav links, practitioner names, WhatsApp CTA, legal disclaimer, GST number placeholder
- [ ] **Contact page** — fix placeholder phone number, review ContactForm component
- [ ] **Booking visual QA** — confirm all 5 steps render correctly in browser with amber brand

### Part B — Client Design Options
Present 2 additional design direction options alongside the current design (Option A):

- **Option A (Current):** Warm earthy saffron amber — dark espresso nav, parchment backgrounds, Playfair Display headings *(already built)*
- **Option B:** Calm violet/indigo spiritual — deep navy hero, soft lavender cards, gold accents, more "cosmic" feel
- **Option C:** Clean minimal sacred — bright white, thin gold lines, very minimal, modern spa aesthetic

> **Action:** Show client screenshots or live previews of all 3 options → client selects → all remaining sessions follow that design

### Deliverable check for Session 2
- [ ] http://localhost:3000/about — correct Hemavathi + Shruthi content
- [ ] http://localhost:3000 — footer visible on all pages
- [ ] http://localhost:3000/contact — real contact details
- [ ] Client receives design options document or live preview links

---

## Session 3 — Auth + Database ⬜

**Prerequisites:** Client has confirmed design option. User provides Supabase project URL + keys.

### Environment setup
- [ ] Copy `.env.example` → `.env.local` with real keys:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
  - `RESEND_API_KEY` + `RESEND_FROM_EMAIL`
  - `ANTHROPIC_API_KEY`
  - `META_WHATSAPP_TOKEN` + `META_WHATSAPP_PHONE_ID` + `META_WHATSAPP_VERIFY_TOKEN`
  - `ZOOM_ACCOUNT_ID` + `ZOOM_CLIENT_ID` + `ZOOM_CLIENT_SECRET`

### Database
- [ ] Run `supabase/schema.sql` in Supabase SQL editor
- [ ] Add **Hemavathi** as practitioner row (with UUID to replace 'hema' shortcode)
- [ ] Add **Shruthi** as practitioner row (with UUID to replace 'shru' shortcode)
- [ ] Update service slugs in DB to match the 6 new ones
- [ ] Seed availability slots for both practitioners (next 30 days)
- [ ] Enable Supabase Row Level Security (RLS) — practitioners only see own clients

### Auth
- [ ] Email OTP login — test full flow (sign up → OTP → dashboard)
- [ ] Google SSO — configure OAuth in Supabase + Google Cloud Console
- [ ] Auth middleware on all protected routes (`/admin/*`, `/api/bookings/*`, `/api/payments/*`)
- [ ] Admin role assignment in Supabase

### Deliverable check
- [ ] `/api/slots?practitioner_id=<uuid>&date=2026-05-30` returns real slots
- [ ] User can log in via email OTP
- [ ] Google SSO sign-in works
- [ ] Admin routes redirect to login if unauthenticated

---

## Session 4 — Booking Engine ⬜

**Prerequisites:** Supabase + Auth working (Session 3 complete)

- [ ] Slot picker fetches and displays real slots from DB
- [ ] Selecting slot + practitioner → advances booking flow correctly
- [ ] **Intake consent form** — mandatory checkbox recorded with timestamp per DPDP Act 2023
- [ ] **WhatsApp opt-in** — checkbox stored per user
- [ ] Booking record created in DB on form submit (status: `pending`)
- [ ] Duplicate booking prevention (same slot, same client)
- [ ] Reschedule / cancel flow with configurable policy
- [ ] Booking confirmation page with booking ref
- [ ] Admin can view booking in dashboard

### Deliverable check
- [ ] End-to-end booking (pick service → pick slot → fill form → see confirmation) works without payment
- [ ] Booking appears in admin dashboard
- [ ] Consent recorded in DB (immutable — no update/delete)

---

## Session 5 — Payments + Invoicing ⬜

**Prerequisites:** Booking engine working (Session 4 complete)

- [ ] Razorpay order creation on booking confirm (`/api/bookings/create`)
- [ ] Razorpay payment modal opens with correct amount (paise), prefill name/email/phone
- [ ] Payment verification webhook (`/api/payments/verify`) — validate signature
- [ ] Booking status updated to `confirmed` on payment success
- [ ] Slot marked `is_available: false` after payment
- [ ] **GST invoice PDF** — generated via `@react-pdf/renderer` or `pdfkit`; includes:
  - PranaTatva name + GST number
  - Client GSTIN field (for B2B)
  - HSN/SAC code
  - INR amount breakdown (base + GST)
- [ ] Invoice emailed to client via Resend on payment success
- [ ] Partial refund workflow (admin-initiated via Razorpay API)
- [ ] Coupon/discount code field at checkout (basic: flat or %)

### Deliverable check
- [ ] Pay ₹1 test payment in Razorpay test mode → booking confirmed → invoice emailed
- [ ] Invoice PDF has correct GST fields
- [ ] Admin dashboard shows revenue correctly

---

## Session 6 — Notifications + Video ⬜

**Prerequisites:** Payments working (Session 5 complete)

### Email (Brevo — migrate from Resend before prod)
> ⚠️ Currently using Resend `onboarding@resend.dev` for dev/testing only. Switch to Brevo before production launch.
> Brevo free tier: 9,000 emails/month (300/day) vs Resend's 3,000 — better for prod volume.
> Steps: create Brevo account → verify `pranatatva.in` domain → install `@getbrevo/brevo` or use SMTP → update `EMAIL_FROM` + credentials in Vercel env vars.

- [ ] Create Brevo account and verify `pranatatva.in` domain
- [ ] Replace Resend SDK with Brevo in `src/lib/email.ts`
- [ ] Update Vercel env vars: remove `RESEND_API_KEY`, add Brevo SMTP/API credentials
- [ ] Booking confirmation email — service, date/time, Zoom link, invoice attached
- [ ] 24h reminder email
- [ ] 1h reminder email
- [ ] Cancellation/reschedule email

### WhatsApp (Meta Cloud API)
- [ ] Webhook endpoint `/api/webhooks/whatsapp` — verify token + receive messages
- [ ] Booking confirmation WhatsApp message (pre-approved template)
- [ ] 24h session reminder (pre-approved template)
- [ ] 1h session reminder (pre-approved template)
- [ ] Payment receipt (pre-approved template)
- [ ] Opt-out handling — reply STOP removes WhatsApp consent flag

### Video — Zoom (Phase 1)
- [ ] Zoom OAuth app set up (Server-to-Server)
- [ ] Auto-create Zoom meeting on booking confirm
- [ ] Meeting join link stored in booking row
- [ ] Join link included in confirmation email + WhatsApp message

### Deliverable check
- [ ] Full booking → WhatsApp message received on phone
- [ ] Zoom link in confirmation email works
- [ ] Reply STOP to WhatsApp → opt-out confirmed

---

## Session 7 — Admin Dashboard + AI Recommender ⬜

**Prerequisites:** End-to-end booking + payment + notifications working

### Admin dashboard
- [ ] Revenue chart (daily/weekly/monthly toggle)
- [ ] Bookings calendar view (month/week)
- [ ] Per-practitioner load / availability overview
- [ ] Client list with search + filter by practitioner
- [ ] Booking status management (confirm / cancel / mark complete)
- [ ] CSV export — bookings + revenue
- [ ] Practitioner-level RBAC (Hemavathi only sees her clients; Shruthi only sees hers)

### AI Service Recommender
- [ ] `/services/recommend` page — 5-question concern form
- [ ] Questions: primary concern, duration of issue, previous healing experience, goal, language preference
- [ ] Claude Sonnet API call with localised prompt (EN/HI/TE)
- [ ] Response: recommended service + practitioner + reasoning + Book Now CTA
- [ ] Fallback to WhatsApp chat if AI returns low confidence
- [ ] AI recommender banner on `/services` page links here

### Deliverable check
- [ ] Admin can log in and see full revenue + booking data
- [ ] Hemavathi cannot see Shruthi's client data
- [ ] AI recommender returns correct service match in English, Hindi, Telugu

---

## Session 8 — QA + Deployment ⬜

**Prerequisites:** All features complete and tested locally

### Quality assurance
- [ ] Mobile QA — test all pages at 320px, 375px, 768px, 1024px
- [ ] Booking flow end-to-end on mobile (thumb-friendly, no overflow)
- [ ] Cross-browser test — Chrome, Safari, Firefox, Edge
- [ ] Core Web Vitals — run PageSpeed Insights, target LCP < 2.5s
- [ ] WCAG AA accessibility check (keyboard nav, contrast ratios, aria labels)
- [ ] All 6 service detail pages load correctly
- [ ] Admin dashboard works on tablet

### Security checklist
- [ ] No public write API endpoints without auth middleware
- [ ] Supabase RLS enabled and tested
- [ ] Razorpay signature verification on webhook
- [ ] WhatsApp verify token check on Meta webhook
- [ ] Session recording encryption key NOT in application DB
- [ ] DPDP consent checkbox on every booking — immutable record

### Deployment
- [ ] Set all env vars in Vercel project settings
- [ ] `vercel --prod` — deploy to Vercel
- [ ] Configure custom domain in Vercel (e.g. `pranatatva.in`)
- [ ] DNS records at domain registrar — point A record / CNAME to Vercel
- [ ] SSL certificate auto-issued by Vercel (Let's Encrypt)
- [ ] Test all pages on live domain
- [ ] Set up Vercel cron for reminder emails (24h + 1h before sessions)
- [ ] PostHog analytics snippet added (privacy-first, no cookie banner needed initially)

### Pre-UAT blockers (must be done BEFORE UAT begins)
- [ ] **Email domain** — get DNS access for `pranatatva.in`, set up Brevo, verify domain, migrate `src/lib/email.ts` from Resend → Brevo, update Vercel env vars
- [ ] **Razorpay test mode** — add credentials to Vercel and test a paid booking end-to-end
- [ ] **Supabase** — confirm RLS policies active; schema already seeded ✅

### Go-live checklist
- [ ] WhatsApp templates submitted and approved in Meta Business Manager
- [ ] Razorpay switched from test mode to live mode
- [ ] GST registration number filled in invoice template
- [ ] Real practitioner phone number in Contact page
- [ ] Privacy policy page live (DPDP Act compliance)
- [ ] Google Search Console — submit sitemap

### Deliverable
- [ ] **Live site at `pranatatva.in` (or custom domain) accepting real bookings and payments**

---

## Key Technical Decisions (locked — do not change)

| Decision | Value | Reason |
|---|---|---|
| brand-violet | `#C4780A` (amber) | Primary saffron action color |
| brand-charcoal | `#2C1A0E` | Nav, footer, dark elements |
| Hemavathi color | `#8B5A2A` | Brown amber |
| Shruthi color | `#6A3D8A` | Deep violet |
| Money storage | Paise (integer) | Never float for currency |
| Consent records | Immutable (append only) | DPDP Act 2023 compliance |
| Slot API practitioner_id | Supabase UUID | Not 'hema'/'shru' shortcodes |
| Tailwind brand colors | Direct hex in globals.css | @apply fails in @layer base for extended colors |
| AI model | Claude Sonnet (claude-sonnet-4-6) | Recommender prompts in EN/HI/TE |

---

## Client Design Decision Required (Session 2)

Before proceeding past Session 2, client must choose one of:

| Option | Theme | Feel |
|---|---|---|
| **A — Current build** | Warm earthy saffron amber | Grounded, warm, traditional Indian wellness |
| **B — Cosmic violet** | Deep navy + soft lavender + gold | Mystical, cosmic, "universe" energy |
| **C — Sacred minimal** | Bright white + thin gold lines | Clean, modern, premium spa |

**Decision recorded:** _(pending client selection)_
