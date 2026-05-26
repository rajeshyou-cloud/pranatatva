# PranaTatva — Spiritual Wellness & Healing Portal

India B2C + B2B web platform with WhatsApp integration.

## Session Protocol

**START of every session:** Read `docs/RESUME.md` first to understand current state, what's done, and what's next.

**END of every session:** Update `docs/RESUME.md` with what was completed, what changed, and what's pending next session. Keep it current — this is the single source of truth for session continuity.

## Project Overview

A spiritual wellness portal for 1:1 healing sessions, group cohorts, events, and subscriptions. Serves individual seekers (B2C) and corporate wellness programs (B2B). Supports 2–5 multi-disciplinary practitioners.

**Target market:** India | **Payment:** INR / Razorpay | **Compliance:** DPDP Act 2023  
**Languages:** English / Hindi / Telugu | **Platform:** Web + WhatsApp

## User Roles

| Role | Description |
|---|---|
| Seeker (B2C) | Books sessions, tracks journal, joins events & subscriptions |
| Corporate (B2B) | HR/wellness manager; bulk booking, GST invoicing, monthly statements |
| Admin / Practitioner | Calendar, services, client notes, revenue dashboard; up to 5 practitioners with RBAC |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 + Tailwind CSS |
| CMS / Backend | Strapi (headless) or Payload CMS |
| Database | PostgreSQL via Supabase (hosted) |
| Auth | Supabase Auth — email OTP + Google SSO |
| Payments | Razorpay (one-time + subscriptions) |
| Email | Resend (transactional) |
| WhatsApp | Meta Cloud API (WhatsApp Business) |
| Video Phase 1 | Zoom API — auto-link generation |
| Video Phase 2 | Daily.co embedded SDK |
| AI Recommender | Anthropic Claude Sonnet API |
| i18n | next-i18next (EN / HI / TE) |
| Analytics | PostHog (privacy-first, self-hostable) |
| Hosting | Vercel (frontend) + Railway (backend) |

## Feature Modules

### CORE (P1 — Launch Blockers)
- **Booking & Scheduling:** Service catalogue with category filter, per-practitioner real-time availability, reschedule/cancel with configurable policy, intake consent form before payment, WhatsApp click-to-book
- **Payments & Invoicing:** Razorpay one-time + subscription payments in INR, GST-compliant auto-generated PDF invoices, coupon/discount codes, partial refund workflow, B2B consolidated invoices with GSTIN
- **Notifications & Reminders:** WhatsApp 24h + 1h session reminders, email booking confirmation with video link, practitioner alerts, payment receipts
- **Admin Dashboard:** Revenue summary (daily/weekly/monthly), bookings calendar, per-practitioner load, client list, event revenue, CSV export
- **Video Consultation:** Phase 1 — Zoom auto-link on booking; Phase 2 — Daily.co native embedded room. Recording requires explicit client consent toggle; encrypted storage; 30-day auto-expiry
- **Auth:** Email OTP + Google SSO

### NEW (P1–P2)
- **AI Service Recommender (P1):** 5-question concern form → AI maps to best-fit service/practitioner with reasoning. Fallback to WhatsApp chat. Powered by Claude Sonnet via Anthropic API. Prompts localised per selected language.
- **Client Healing Journal (P2):** Private per-client diary, mood/energy tracker (1–10), practitioner session notes visible to client, progress timeline, PDF export (Phase 2)
- **Multilingual Support (P2):** EN/HI/TE toggle in header, preference persisted per user, all UI labels + emails + AI prompts + WhatsApp flows translated
- **WhatsApp Integration (P1):** Booking confirmations, video links, session reminders, payment receipts, event broadcasts, click-to-chat on all service pages

### CORE (P2)
- **Events & Workshops:** List/month/day views, paid ticketing via Razorpay, calendar export (Google/iCal/Outlook), virtual + in-person, waitlist, post-event feedback
- **Subscriptions & Memberships:** Monthly/quarterly/annual plans, Razorpay auto-renewal, member-only content, corporate bulk seats, self-service pause/cancel
- **Blog & Content:** Rich-text CMS, category tags, SEO meta fields, member-gated posts, social share (WhatsApp/Instagram/Facebook)

### P3 (Phase 3)
- Group cohort booking with seat cap + waitlist
- Coupon/promo code engine
- Healing journal PDF export
- Post-event feedback with star rating

## Functional Requirements Priority

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | User registration & login via email OTP or Google SSO | P1 |
| FR-02 | Service listing with filter by category and practitioner | P1 |
| FR-03 | Calendar slot picker with real-time availability | P1 |
| FR-04 | Intake form + terms consent before payment | P1 |
| FR-05 | Razorpay payment with INR; auto GST invoice emailed | P1 |
| FR-06 | WhatsApp reminder 24h & 1h before confirmed session | P1 |
| FR-07 | Admin dashboard: revenue, bookings, calendar in one view | P1 |
| FR-08 | AI recommender: 5-question concern form → service match | P1 |
| FR-09 | Video room (Zoom link Phase 1 / Daily.co Phase 2) | P1 |
| FR-10 | Session recording consent toggle; encrypted storage | P1 |
| FR-11 | Client healing journal with mood tracker + notes | P2 |
| FR-12 | Group cohort booking with seat cap and waitlist | P2 |
| FR-13 | Monthly subscription with Razorpay auto-renewal | P2 |
| FR-14 | Events module with paid ticketing + calendar export | P2 |
| FR-15 | Blog CMS with member-gated posts and SEO fields | P2 |
| FR-16 | Language toggle: English / Hindi / Telugu | P2 |
| FR-17 | B2B HR admin — bulk seat booking + consolidated invoice | P2 |
| FR-18 | Coupon / promo code at checkout | P3 |
| FR-19 | Healing journal export as PDF | P3 |
| FR-20 | Post-event feedback form with star rating | P3 |

## Non-Functional Requirements

| Category | Target |
|---|---|
| Performance (LCP) | < 2.5 s on 4G mobile |
| Uptime SLA | 99.5% monthly |
| Security | AES-256 at rest + TLS 1.3 in transit |
| Concurrent video rooms | Up to 5 (one per practitioner) |
| Concurrent users | 500 at launch |
| Accessibility | WCAG Level AA minimum |
| Responsive breakpoints | 320 px – 1440 px |
| SEO | All Core Web Vitals green on PageSpeed Insights |
| Session recording retention | 30 days (admin-configurable) |

## Compliance & Legal — Non-Negotiable

**DPDP Act 2023 (India)**
- Explicit consent checkbox at registration
- Data processing notice in plain language
- Self-service right to erasure (Phase 3)
- No third-party data sharing without consent
- Designated DPO contact on privacy page

**Intake & Terms Consent**
- Mandatory checkbox before every booking: *"I understand this is a complementary wellness service and not a substitute for medical advice."*
- Timestamped consent record stored per booking in DB

**Session Recording Consent**
- Separate opt-in toggle shown to client before video session starts
- Recording does NOT begin unless client actively enables it
- Consent logged with session ID + timestamp

**GST Compliance**
- Auto-generated INR invoices with GST registration number, HSN/SAC code, and client GSTIN field for B2B

**WhatsApp Business Policy**
- Opt-in collected at registration for WhatsApp notifications
- Users can opt out via reply STOP
- All template messages approved via Meta Business Manager before use

**Advisory:** Every service description must include a disclaimer that sessions are not a substitute for licensed medical, psychological, or psychiatric care.

## Delivery Roadmap

### Phase 1 — MVP Core (Weeks 1–8)
- Service catalogue and per-practitioner booking calendar
- Razorpay checkout with GST invoice
- Intake consent form before payment
- Email + WhatsApp booking confirmations and reminders
- Basic admin dashboard (bookings, revenue, calendar)
- Video consultation via Zoom auto-link
- User registration and login (email OTP + Google SSO)

### Phase 2 — Engagement Layer (Weeks 9–16)
- AI recommender (5-question → service match via Claude Sonnet)
- Client healing journal with mood tracker and practitioner notes
- Group/cohort booking with seat cap and waitlist
- Monthly subscription plans with Razorpay auto-renewal
- Hindi and Telugu language support (next-i18next)
- Session recording consent + encrypted storage
- Member-only blog with gated posts

### Phase 3 — B2B & Growth (Weeks 17–22)
- Corporate HR portal with bulk seat booking
- Consolidated B2B invoicing with GSTIN field
- Events module with paid ticketing and calendonlar export
- Migrate video to Daily.co embedded SDK
- Coupon and promo code engine
- PostHog analytics dashboard
- DPDP data erasure (right to be forgotten) flow
- GDPR light — cookie consent banner and data export

## Development Rules

- All monetary values stored and displayed in **INR paise** (integer); format for display only
- Consent records (intake, recording, WhatsApp opt-in) must be **immutable** once written — never update or delete, only append
- Session recording encryption key must not be stored in the application database
- AI recommender calls must pass the user's selected language (`en`/`hi`/`te`) so prompts are localised
- Every API route that touches booking or payment data requires auth middleware — no public write endpoints
- WhatsApp templates must be pre-approved; never send free-form messages to users who haven't opted in
- Use Supabase Row Level Security (RLS) so practitioners can only read their own clients' data
- Video rooms: one Zoom meeting per booking — do not reuse meeting IDs across clients
