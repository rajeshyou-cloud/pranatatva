# PranaTatva — Session Resume Notes

**Last updated:** 2026-05-25

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

## Current status

Dev server:
```
cd d:\pranatatva
npx next dev
```
→ http://localhost:3000

**Working pages:** `/` homepage, `/services`, `/about`, `/contact`, `/services/[slug]`, `/book`, `/admin/login`

**Not working yet:** Slot picker shows "No slots available" — needs Supabase connected.

---

## What's NOT done (Session 2 picks these up)

### Immediate (today)
- [ ] About page — still shows old "Lakshmmi" practitioner with wrong bio and specialties
- [ ] Footer — completely missing from all pages
- [ ] Contact page — phone number is placeholder `+91 99999 99999`
- [ ] Booking flow visual QA in browser

### Blocked on user (requires API keys)
- [ ] `.env.local` — needs Supabase, Razorpay, Resend, Anthropic, WhatsApp, Zoom credentials
- [ ] Supabase schema — add Hemavathi + Shruthi as practitioners, update service slugs

---

## Tech decisions to remember

- **Tailwind brand-violet = amber (#C4780A)** — the primary action color. Not violet anymore.
- **brand-charcoal = #2C1A0E** — used for nav, footer, dark elements.
- **Practitioner colours:** Hemavathi `#8B5A2A` (brown amber), Shruthi `#6A3D8A` (deep violet).
- All monetary values stored in **paise** (integer). `formatINR()` in `src/lib/utils.ts` converts for display.
- Consent records must be **immutable** — never update, only append.
- Slot API (`/api/slots`) expects Supabase UUID for `practitioner_id`, not the `'hema'`/`'shru'` shortcodes used in front-end data.

---

*Full session plan → see `docs/PROJECT_PLAN.md`*
