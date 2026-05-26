# PranaTatva — Session Resume Notes

**Last updated:** 2026-05-26

---

## What was built

A full UI redesign of the PranaTatva spiritual wellness portal to match the reference design (`D:/Users/rajes/Downloads/pranatatva_webapp.html`).

### Design system
- **Colors:** Warm earthy palette — saffron amber primary (`#C4780A`), dark espresso nav (`#2C1A0E`), warm parchment bg (`#FBF7F0`). All in `tailwind.config.ts`.
- **Fonts:** Playfair Display (headings) + DM Sans (body), loaded via `next/font/google` in `src/app/layout.tsx`.
- **Key fix:** `@apply` with newly-added Tailwind brand colors fails in `@layer base`. Use direct hex values in `globals.css` instead.

### Files changed
| File | What changed |
|---|---|
| `tailwind.config.ts` | Full earthy palette, DM Sans + Playfair fonts |
| `src/app/globals.css` | Direct hex values in @layer base/components (no @apply for brand colors) |
| `src/app/layout.tsx` | Fonts switched; header offset `pt-[62px]` |
| `src/components/layout/Header.tsx` | Dark espresso fixed nav, lotus SVG logo, language switcher |
| `src/app/page.tsx` | Dark hero, practitioner cards (Hemavathi + Shruthi), 3 service preview, testimonials, CTA |
| `src/app/services/page.tsx` | 6-service grid with category filter chips, SVG sacred geometry, AI recommender banner |
| `src/app/services/[slug]/page.tsx` | 6 new service slugs, Hemavathi/Shruthi practitioners |
| `src/components/booking/StepServiceSelect.tsx` | 6 services, 2 practitioners, exported `services` array |
| `src/components/booking/StepSlotPicker.tsx` | Monthly calendar replacing week-strip |
| `src/components/booking/BookingFlow.tsx` | Pre-populates service data from URL param so slot picker has practitionerId |
| `src/components/booking/StepPayment.tsx` | Razorpay theme color updated to `#C4780A` |
| `src/app/admin/dashboard/page.tsx` | Admin header uses `bg-brand-charcoal` |

### Services (6 total)
| Slug | Practitioner | Price |
|---|---|---|
| `theta-healing-deep-dive` | Hemavathi | ₹2,500 |
| `abundance-manifestation` | Hemavathi | ₹3,000 |
| `tarot-card-reading` | Shruthi | ₹1,800 |
| `spiritual-awakening-mastery` | Hemavathi | ₹22,000 |
| `akashic-records-soul-reading` | Shruthi | ₹2,200 |
| `free-discovery-call` | Hemavathi or Shruthi | Free |

---

## Session 3 — 2026-05-26 (Today)

### Completed this session

| Task | File(s) | Notes |
|---|---|---|
| QA bug fixes — homepage service 404s | `src/app/page.tsx` | Fixed 3 wrong service card slugs: akashic-readings→akashic-records-soul-reading, tarot-reading→tarot-card-reading, theta-healing→theta-healing-deep-dive |
| QA bug fix — "0 minutes" display | `src/app/services/[slug]/page.tsx`, `StepReview.tsx` | `duration === 0` means 8-week program; shows "8-week program" instead of "0 min" |
| QA bug fix — AI recommender banner link | `src/app/services/page.tsx` | `/ai-recommender` (404) → `/contact` |
| `formatINR(0)` fix | `src/lib/utils.ts` | Returns `'Free'` for 0 paise (was showing ₹0) |
| Static slot API (demo mode) | `src/app/api/slots/route.ts` | Full rewrite: Hemavathi Mon/Wed/Fri/Sat, Shruthi Sun/Tue/Thu/Sat, deterministic booked slots via hash |
| Booking create API (demo mode) | `src/app/api/bookings/create/route.ts` | Returns `{demo:true, bookingRef, orderId:'demo'}` when no Razorpay/Supabase env vars; free bookings skip Razorpay |
| Payment verify API (demo mode) | `src/app/api/payments/verify/route.ts` | Passes through with `{success:true}` when no credentials configured |
| StepPayment — 3 payment paths | `src/components/booking/StepPayment.tsx` | Handles: Free booking (green CTA), Demo mode (skips Razorpay), Real Razorpay (signature verify) |
| Service info panel in booking flow | `src/components/booking/BookingFlow.tsx` | Added `ServiceInfoCard` sticky panel on steps 2-5, `lg:grid lg:grid-cols-[1fr_280px]` two-column layout; panel hidden on mobile |
| Booking page container widened | `src/app/book/page.tsx` | `max-w-5xl` → `max-w-6xl` for two-column layout |

### Key decisions made
- **Demo mode pattern:** All 3 booking APIs check for missing env vars at runtime; fall back to mock data. No code changes needed when real credentials are added.
- **Booking ref format:** `PT-{base36timestamp}-{rand}` (e.g. `PT-lx2p4k-3f`)
- **Service info panel:** reads from the same `services` array in `StepServiceSelect.tsx` — single source of truth
- **Free booking flow:** `pricePaise === 0` → green confirm button → skips Razorpay entirely, uses `orderId: 'free'` path

---

## Session 2 — 2026-05-25

### Completed this session

| Task | File(s) | Notes |
|---|---|---|
| All 4 hero components mobile-responsive | `src/components/hero/HeroA/B/C/D.tsx` | CSS media queries in `<style>` tags; mobile stacks vertically, tablet adjusts widths, mandala panels fixed height, pills hidden on mobile |
| About page — real practitioner content | `src/app/about/page.tsx` | Replaced placeholder "Lakshmmi" with full bios for Hemavathi & Shruthi; removed photo placeholder box; added stats, modality tags, decorative specialisations panels; dark CTA section at bottom |
| Services page mobile layout bug fixed | `src/components/layout/Sidebar.tsx` | `flex` → `hidden md:flex` — sidebar now hidden on mobile |
| Main content margin mobile bug fixed | `src/components/layout/LayoutShell.tsx` | Inline `marginLeft: 230` → Tailwind `md:ml-[230px]` — margin only on desktop |
| Header left-offset mobile bug fixed | `src/components/layout/Header.tsx` | Inline `left: sidebarVisible ? 230 : 0` → Tailwind `left-0 md:left-[230px]` — header full width on mobile |
| TypeScript build error fixed | `src/app/(designs)/design-d/page.tsx` | Duplicate `borderLeft` property on line 263 was a compile error; removed `border: 'none'` and duplicate key |
| GitHub repo created & code pushed | — | Repo: https://github.com/rajeshyou-cloud/pranatatva.git; branch: main |
| Vercel auto-deploy configured | — | Every `git push origin main` triggers production redeploy automatically |

### Key decisions made
- **Sidebar pattern:** `hidden md:flex` on the nav, `md:ml-[230px]` on content wrapper, `left-0 md:left-[230px]` on header — this is the consistent responsive pattern for all sidebar-adjacent layouts
- **Hero mobile pattern:** CSS classes on elements + `@media` block at end of CSS const — same pattern for all 4 heroes (HeroA–D)
- **Practitioner colours:** Hemavathi `#C4780A` (warm amber), Shruthi `#8B5A2A` (brown) — used consistently on about page and sidebar

---

## Current status

**Live URL:** https://pranatatva.vercel.app (auto-deploys on push to main)

Dev server:
```
cd d:\pranatatva
npx next dev
```
→ http://localhost:3000

**Working pages:** `/` homepage, `/services`, `/about`, `/contact`, `/services/[slug]`, `/book`, `/admin/login`, `/booking/confirmation`

**Mobile tested:** Home, Services page (sidebar fix deployed and confirmed)

**Booking flow status:** Fully working end-to-end in demo mode (no credentials needed). Service info panel visible on desktop (steps 2–5). Static slots generate from hardcoded schedule. Free Discovery Call skips payment entirely.

**Not working yet:** Real Razorpay checkout, WhatsApp notifications, Zoom meeting links — all blocked on credentials.

---

## What's NOT done (Next session picks these up)

### UI / Frontend
- [ ] Contact page — phone number is still placeholder `+91 99999 99999` — needs real number
- [ ] Services page mobile — card grid and content QA below the hero (sidebar fix is done; content layout may still need review)
- [ ] Booking flow — visual QA on mobile
- [ ] AdBanner component (40px top strip) — verify it renders correctly on mobile

### Blocked on user (requires credentials / decisions)
- [ ] `.env.local` — needs Supabase, Razorpay, Resend, Anthropic, WhatsApp, Zoom API keys
- [ ] Supabase schema — add Hemavathi + Shruthi as practitioners, update service slugs
- [ ] Real contact number for Contact page
- [ ] WhatsApp Business number for click-to-chat links

### Backend (partially built — demo mode only)
- [x] Slot API — static schedule (demo); needs real Supabase slots table
- [x] Booking create API — demo mode returns mock ref; needs real Supabase + Razorpay
- [x] Payment verify API — passthrough in demo; needs real Razorpay signature check
- [ ] Auth (Supabase email OTP + Google SSO)
- [ ] Confirmation page `/booking/confirmation` — needs to exist and show booking ref
- [ ] WhatsApp notifications (Meta Cloud API)
- [ ] Zoom meeting auto-link on booking
- [ ] Admin dashboard (real data)
- [ ] Email via Resend (file exists but untested)

---

## Tech decisions to remember

- **Tailwind brand-violet = amber (`#C4780A`)** — the primary action color
- **brand-charcoal = `#2C1A0E`** — used for nav, footer, sidebar, dark elements
- **Practitioner colours:** Hemavathi `#C4780A` (amber), Shruthi `#8B5A2A` (brown)
- **Layout math:** AdBanner 40px (z-60) + Header 62px (z-40) = 102px total — `pt-[102px]` on main content
- **Sidebar width:** 230px — `md:ml-[230px]` on content, `left-0 md:left-[230px]` on header
- All monetary values stored in **paise** (integer). `formatINR()` in `src/lib/utils.ts` converts for display
- Consent records must be **immutable** — never update, only append
- Slot API (`/api/slots`) expects Supabase UUID for `practitioner_id`, not the `'hema'`/`'shru'` shortcodes used in front-end data

---

*Full session plan → see `docs/PROJECT_PLAN.md`*
