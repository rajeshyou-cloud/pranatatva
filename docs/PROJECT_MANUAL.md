# PranaTatva — Project Manual
### A Complete Guide for Business Owners, Practitioners, and Operations Teams

**Version:** 1.0 | **Date:** May 2026 | **Audience:** Non-Technical Stakeholders

---

## How to Use This Manual

| If you are… | Read these sections |
|---|---|
| **Business owner / Founder** | All sections — especially Phase Roadmap, Razorpay Setup, and Booking Flow |
| **Practitioner (Hemavathi / Shruthi)** | Section 5 (Your Role in the System), Section 6 (Booking Flow), Section 8 (What Clients Experience) |
| **Operations / Admin staff** | Section 6 (Booking Flow), Section 7 (Confirmation Delivery), Section 9 (Day-to-Day Operations) |
| **B2B Corporate HR Manager** | Section 3 (Phase 3 — B2B Features), Section 10 (Corporate Invoicing) |

---

## Table of Contents

1. [What PranaTatva Is Building](#1-what-pranatatva-is-building)
2. [Project Phases at a Glance](#2-project-phases-at-a-glance)
3. [Phase 1 — MVP Core (Weeks 1–4)](#3-phase-1--mvp-core-weeks-14)
4. [Phase 2 — Engagement Layer (Months 2–4)](#4-phase-2--engagement-layer-months-24)
5. [Phase 3 — B2B and Growth (Months 5–6)](#5-phase-3--b2b-and-growth-months-56)
6. [Razorpay Payment Gateway — Complete Setup Guide](#6-razorpay-payment-gateway--complete-setup-guide)
7. [The Booking Flow — How It Works End to End](#7-the-booking-flow--how-it-works-end-to-end)
8. [Booking Confirmation — What Happens After Payment](#8-booking-confirmation--what-happens-after-payment)
9. [Cancellation and Rescheduling Policy](#9-cancellation-and-rescheduling-policy)
10. [Roles and Permissions in the System](#10-roles-and-permissions-in-the-system)
11. [Corporate (B2B) Invoicing](#11-corporate-b2b-invoicing)
12. [Data Privacy and Compliance](#12-data-privacy-and-compliance)
13. [Glossary of Technical Terms](#13-glossary-of-technical-terms)

---

## 1. What PranaTatva Is Building

PranaTatva is a **spiritual wellness and healing portal** that allows individuals and corporate clients across India to discover, book, and attend 1-on-1 healing sessions online — all from a single website.

### The Problem It Solves

Today, practitioners like Hemavathi and Shruthi manage bookings via WhatsApp messages, collect payments manually (UPI QR codes or bank transfers), and send Zoom links by hand. This is time-consuming, error-prone, and does not scale when the client base grows.

PranaTatva replaces this entirely with:
- A professional website where clients self-book in under 3 minutes
- Automated payments and invoices (fully GST-compliant)
- Automatic Zoom meeting links sent to client and practitioner
- WhatsApp-friendly confirmations
- A dashboard so practitioners can see their calendar, upcoming clients, and revenue without calling anyone

### Who It Serves

| Client Type | Description |
|---|---|
| Individual seeker (B2C) | Someone looking for theta healing, tarot readings, or spiritual guidance. Books and pays online. Receives confirmation via email. |
| Corporate HR / Wellness manager (B2B) | A company that purchases a block of sessions for employees. Receives consolidated invoices with GSTIN for reimbursement. |
| Practitioner (Hemavathi / Shruthi) | Manages their own calendar, reads client intake notes, joins sessions, adds private notes after sessions. |
| Admin / Operations | Manages bookings across all practitioners, processes rescheduling requests, monitors revenue. |

---

## 2. Project Phases at a Glance

The project is delivered in **three distinct phases**. Each phase adds more capability on top of what was built before.

```
PHASE 1 — MVP CORE          Weeks 1–4         Target: Live bookings + payments
PHASE 2 — ENGAGEMENT        Months 2–4        Target: AI, journals, subscriptions
PHASE 3 — B2B & GROWTH      Months 5–6        Target: Corporate clients, events, analytics
```

| Phase | What becomes available | Business outcome |
|---|---|---|
| **Phase 1** | Service listings, booking calendar, online payment, email confirmation, basic admin dashboard | First paying online client |
| **Phase 2** | AI recommender, healing journals, Hindi/Telugu language support, session subscriptions | Repeat bookings, higher client retention |
| **Phase 3** | Corporate HR portal, events/workshops ticketing, video upgrade, promo codes, analytics | New revenue streams; B2B contracts |

---

## 3. Phase 1 — MVP Core (Weeks 1–4)

This is the **launch phase**. The goal is to have a working website where a client can discover a service, book a slot, pay online, and receive a confirmation — all without any manual intervention from the team.

### What Gets Built

#### 3.1 Service Catalogue
The website will display 6 healing services across 2 practitioners:

| Service | Practitioner | Price |
|---|---|---|
| Theta Healing Deep Dive (60 min) | Hemavathi | ₹2,500 |
| Abundance Manifestation Session (90 min) | Hemavathi | ₹3,000 |
| Spiritual Awakening Mastery (120 min) | Hemavathi | ₹22,000 |
| Tarot Card Reading (45 min) | Shruthi | ₹1,800 |
| Akashic Records Soul Reading (60 min) | Shruthi | ₹2,200 |
| Free Discovery Call (30 min) | Hemavathi or Shruthi | Free |

Each service page will show:
- Full description of the service
- What the client can expect
- Duration and price
- Practitioner bio
- A prominent "Book Now" button
- A disclaimer: *"This is a complementary wellness service and not a substitute for medical advice."*

#### 3.2 Booking Calendar
Each practitioner will have a real-time calendar. When a client selects a date, they see only the time slots that practitioner has marked as available and that are not already booked.

#### 3.3 Online Payment via Razorpay
Clients pay using:
- UPI (Google Pay, PhonePe, Paytm)
- Credit / Debit card
- Net banking

A GST-compliant invoice is automatically generated and emailed to the client after successful payment.

> **GST Note:** Once the business's GSTIN is confirmed, it will be printed on every invoice. Until then, invoices carry the business name and a placeholder that will be updated before launch.

#### 3.4 Email Confirmation
After payment, the client receives an email containing:
- Booking reference number
- Service name, date, and time
- Practitioner name
- Zoom meeting link (auto-generated for each booking)
- Invoice PDF attachment

The practitioner also receives an email notification with the client's name and session details.

#### 3.5 Admin Dashboard
The admin/operations team gets a private dashboard (accessible only with password) showing:
- Today's bookings at a glance
- Revenue summary (daily, weekly, monthly)
- Full booking calendar across all practitioners
- Client list with contact details

#### 3.6 User Registration and Login
Clients can create an account using:
- **Email OTP** — Enter email, receive a one-time code, verified instantly
- **Google Sign-In** — One click using their Google account

Having an account lets clients view their booking history and reschedule sessions.

### Phase 1 Checklist (for Operations Team to verify before go-live)

- [ ] Razorpay live keys configured (see Section 6)
- [ ] Test payment of ₹1 completed successfully
- [ ] Confirmation email received by test client account
- [ ] Zoom link in confirmation email opens correctly
- [ ] At least 2 weeks of availability added for each practitioner
- [ ] All 6 service descriptions reviewed and approved by practitioners
- [ ] GST placeholder updated with real GSTIN (or confirmed not required)
- [ ] Admin dashboard login credentials shared securely with operations team
- [ ] Privacy policy and terms page reviewed by founder

---

## 4. Phase 2 — Engagement Layer (Months 2–4)

Once the booking engine is stable and live, Phase 2 adds features that deepen client relationships and increase repeat bookings.

### 4.1 AI Service Recommender
A 5-question guided flow on the website where a prospective client answers questions like:
- "What are you seeking help with?"
- "How long have you been experiencing this?"
- "Have you tried any healing modalities before?"

The AI (powered by Anthropic Claude) then recommends the most suitable service and practitioner, with a plain-language explanation of why. Clients who are unsure what to book are guided directly to the right service, reducing drop-off.

> **Business value:** Converts browsers into bookings. Replaces the need for a free consultation just to figure out which service is right.

### 4.2 Client Healing Journal
Each client gets a private, secure digital journal:
- Write session reflections after each healing session
- Track mood and energy on a scale of 1–10
- Practitioners can add private session notes (visible only to that client)
- Clients see a progress timeline across all their sessions

### 4.3 Session Subscriptions
Clients can subscribe to a monthly plan (e.g., 4 sessions/month) at a discounted rate. Payments are automatic via Razorpay's subscription feature. Clients can pause or cancel self-service from their account.

### 4.4 Hindi and Telugu Language Support
The entire website — service descriptions, booking flow, emails, and AI recommender — will be available in English, Hindi, and Telugu. Clients select their preferred language once and it is remembered across visits.

### 4.5 Group / Cohort Booking
Workshops and group healing sessions with a fixed seat cap. Clients book a seat, pay per seat, and receive the group Zoom link. Waitlist opens when seats are full.

---

## 5. Phase 3 — B2B and Growth (Months 5–6)

Phase 3 opens PranaTatva to corporate clients and adds advanced monetisation tools.

### 5.1 Corporate HR Portal
A separate login for HR / wellness managers at companies. They can:
- Purchase a block of sessions (e.g., 20 sessions for employees)
- Assign sessions to employees by email
- Download a consolidated invoice with the company's GSTIN for finance team reimbursement
- View usage reports (how many sessions have been used, by which employees)

> **For B2B HR managers:** You will not need to coordinate individual bookings. Purchase a block once, and employees self-book from your allocated pool.

### 5.2 Events and Workshops
Paid ticketing for one-time events (retreats, masterclasses, live Q&A sessions). Features:
- Event listing with date, location (online/in-person), and ticket price
- Payment via Razorpay
- Calendar export to Google Calendar / iCal
- Waitlist for sold-out events

### 5.3 Video Upgrade — Embedded Rooms
Phase 1 uses Zoom links. Phase 3 upgrades to an embedded video room (Daily.co) directly inside the website — no Zoom app needed. Clients join the healing session without leaving the PranaTatva website.

### 5.4 Analytics Dashboard
A management view showing:
- Which services are most popular
- Practitioner utilisation rate
- Revenue by service and practitioner
- Client retention rates
- Conversion rate from free discovery call to paid session

### 5.5 Promo Codes
Create discount codes for:
- First-time client offers
- Corporate bulk discounts
- Festival promotions

---

## 6. Razorpay Payment Gateway — Complete Setup Guide

This section guides you step by step through creating and configuring a Razorpay account for PranaTatva. **No technical knowledge is required** — every step below is done on Razorpay's website.

> **Time required:** 30–60 minutes to complete the account setup. KYC approval typically takes 1–3 business days. You can test the payment flow immediately without waiting for KYC approval.

---

### 6.1 Step 1 — Create Your Razorpay Account

1. Open your browser and go to **[razorpay.com](https://razorpay.com)**
2. Click the **"Sign Up"** button (top right corner)
3. Enter:
   - Business email address (use a business email, not personal Gmail if possible)
   - Mobile number (this will receive OTP verifications)
   - Create a password
4. Click **"Create Account"**
5. Check your email for a verification link — click it to verify your email address

---

### 6.2 Step 2 — Complete Business Details

After logging in, Razorpay will prompt you to fill in business information.

#### Business Category
When Razorpay asks for your business category and sub-category, select:

| Field | Select |
|---|---|
| Business Category | **Healthcare & Wellness** |
| Sub-category | **Alternative Medicine** or **Health & Wellness Coaching** |

#### Business Type
Select the option that matches your legal structure:

| If you are… | Select |
|---|---|
| One owner, no formal company registered | **Individual / Sole Proprietor** |
| Two or more owners with a partnership deed | **Partnership** |
| Registered as a Private Limited Company | **Private Limited Company** |
| Registered as an LLP | **LLP** |

> **Recommendation for most wellness practitioners starting out:** Begin as **Individual / Sole Proprietor**. This requires the least documentation and is fastest to approve. You can upgrade the account type later after the business grows.

---

### 6.3 Step 3 — KYC Documents Checklist

KYC (Know Your Customer) is Razorpay's mandatory identity verification. You must upload clear photos or scans of these documents.

#### For Individual / Sole Proprietor

| Document | Details |
|---|---|
| **PAN Card** | Personal PAN card of the owner |
| **Aadhaar Card** | Front and back, or DigiLocker XML |
| **Bank Account Details** | Cancelled cheque with account number and IFSC code visible, OR a bank statement (last 3 months) |
| **Business Address Proof** | Utility bill, rental agreement, or any government document showing your business address (same city as registered) |

#### For Private Limited Company (if applicable)

| Document | Details |
|---|---|
| Certificate of Incorporation | From MCA / ROC |
| Company PAN card | |
| Director's PAN + Aadhaar | For each director |
| Bank account details | Company current account |
| GST Certificate | If GST registered |
| Board Resolution | Authorising the signatory |

#### Tips for Document Upload
- Photos must be **clear and not blurry** — Razorpay will reject poor-quality images
- File formats accepted: JPG, PNG, PDF
- File size limit: usually 5 MB per document
- Aadhaar: if you are not comfortable sharing your Aadhaar number, Razorpay accepts a **masked Aadhaar** where the first 8 digits are hidden

> **GST Registration:** If the business's annual turnover will exceed ₹20 lakh, GST registration is mandatory. If you have a GSTIN, enter it in the GST section. If you are not yet registered, leave it blank — you can add it later before the portal goes live. *(Placeholder: add GSTIN here once received)*

---

### 6.4 Step 4 — Bank Account Setup

1. In Razorpay dashboard → go to **Settings → Bank Account**
2. Enter your business bank account details:
   - Account holder name (must match the KYC name exactly)
   - Account number
   - IFSC code
   - Account type: Savings (for individual) or Current (for business)
3. Razorpay will send a small test deposit (₹1) to verify the account. This takes 1–2 business days.
4. Once the deposit appears in your bank statement, Razorpay will activate your account for live payments.

---

### 6.5 Step 5 — Generate API Keys (for your developer)

API Keys are the "passwords" that connect the PranaTatva website to your Razorpay account. There are two types:

| Key Type | When to Use |
|---|---|
| **Test Keys** | During development and testing — no real money moves |
| **Live Keys** | When the website is ready for real clients — real payments |

**How to generate Test Keys:**
1. Log in to Razorpay Dashboard
2. Go to **Settings → API Keys**
3. Make sure the toggle at the top right says **"Test Mode"** (not Live Mode)
4. Click **"Generate Test Key"**
5. You will see a **Key ID** (starts with `rzp_test_`) and a **Key Secret**
6. **Copy both immediately** — the Key Secret is only shown once. If you miss it, you must regenerate.
7. Send these two values securely to your developer (use a password manager or encrypted message — do not send via WhatsApp or email as plain text)

**How to generate Live Keys** (do this only after KYC is approved):
1. Toggle the mode to **"Live Mode"**
2. Repeat the same steps above
3. The Key ID will start with `rzp_live_`
4. Send the live keys to your developer to replace the test keys before the website launches

---

### 6.6 Step 6 — Test Mode Walkthrough (Before Going Live)

Before accepting real payments, the developer will test the entire payment flow using **test card numbers provided by Razorpay**. You (or your operations team) should verify the following test scenarios:

#### Test Credit Card Numbers

Use these card numbers in the payment screen — they simulate real payments without any actual charge:

| Test Scenario | Card Number | Expiry | CVV |
|---|---|---|---|
| Successful payment | 4111 1111 1111 1111 | Any future date | Any 3 digits |
| Payment failure | 4000 0000 0000 0002 | Any future date | Any 3 digits |

#### Test UPI
Use the UPI ID: `success@razorpay`

#### What to Check During Testing
- [ ] Payment screen opens correctly with the correct amount
- [ ] Razorpay theme colour matches the PranaTatva amber brand
- [ ] "PranaTatva" appears as the business name in the payment window
- [ ] After successful test payment, the booking appears in the admin dashboard
- [ ] Confirmation email is received by the test client account with:
  - [ ] Booking reference number
  - [ ] Correct service name, date, time
  - [ ] Zoom link that opens a real (test) meeting
  - [ ] Invoice PDF is attached
- [ ] A booking notification appears in the admin dashboard

---

### 6.7 Step 7 — Going Live

Once all tests pass and KYC is approved:

1. The developer replaces test API keys with live API keys in the portal configuration
2. Remove all test booking data from the database
3. Conduct one final real payment of ₹1 using your own card
4. Verify the ₹1 appears in your Razorpay dashboard (minus Razorpay's fee)
5. Announce the portal is live

> **Razorpay Fees:** Standard fee is 2% per transaction (Indian cards). UPI payments are slightly lower. Fee is deducted before settlement to your bank account. Settlements happen daily by default.

---

### 6.8 Razorpay Subscription Setup (Phase 2)

When you are ready to offer monthly subscription plans (Phase 2):

1. In Razorpay Dashboard → go to **Subscriptions → Plans**
2. Create a plan for each subscription tier (e.g., "4 sessions / month — ₹9,000")
3. Set billing cycle: monthly / quarterly / annual
4. Share the Plan ID with your developer — they will link it to the subscription product on the website

---

## 7. The Booking Flow — How It Works End to End

This section explains exactly what happens — technically and from the client's perspective — when someone books a session on PranaTatva.

### 7.1 The Client's Journey (What the Client Sees)

```
STEP 1 ──► Choose a Service
STEP 2 ──► Pick a Date and Time Slot
STEP 3 ──► Fill Intake Form + Give Consent
STEP 4 ──► Pay Online
STEP 5 ──► Receive Confirmation
```

#### Step 1 — Choose a Service

The client visits the Services page. They can:
- Browse all 6 services with descriptions and prices
- Filter by category (healing, reading, coaching, etc.)
- Click "Book Now" on the service they want
- Or use the **AI Recommender** (Phase 2) if they are unsure which service fits them

When they click "Book Now", the system notes which service was selected and carries that information forward automatically. The client does not have to type the service name again in any subsequent step.

> **Technical detail (for developer reference):** The URL carries the service selection as a parameter (e.g., `/book?service=theta-healing-deep-dive`). The BookingFlow component reads this and pre-populates service name, price, duration, and practitioner ID automatically.

---

#### Step 2 — Pick a Date and Time Slot

The client sees a **monthly calendar view**. They tap any available date (greyed-out dates have no availability).

When a date is selected:
1. The system checks which time slots the practitioner has marked as available for that date
2. The system removes slots that are already booked by other clients
3. Only the genuinely available slots are shown

The client taps their preferred time. The slot is **not held/reserved** at this point — it is only confirmed after payment.

> **What "available slot" means technically:** The portal calls the database (Supabase) with the practitioner's ID and the selected date. The database returns all time slots that are (a) within the practitioner's working hours for that day and (b) not already booked. This query runs live every time a date is selected — availability is always up-to-date.

---

#### Step 3 — Intake Form and Consent

Before payment, the client fills in:

| Field | Required? |
|---|---|
| Full name | Yes |
| Email address | Yes |
| Phone number (WhatsApp preferred) | Yes |
| What are you hoping to address in this session? | Yes |
| Any health conditions we should know about? | Optional |
| Have you attended a healing session before? | Yes |

At the bottom of the form is a **mandatory consent checkbox**:

> *"I understand that this is a complementary spiritual wellness service and is not a substitute for licensed medical, psychological, or psychiatric care. I consent to this session."*

**The client cannot proceed to payment without ticking this checkbox.**

> **Why this consent is important (DPDP Act 2023):** Once the client ticks this box and submits the form, a consent record is permanently written to the database with the client's name, the timestamp (date and time in IST), the session ID, and the exact text of the consent statement. This record **can never be edited or deleted** — it is stored as a permanent legal record. If there is ever a dispute, the business can show exactly when consent was given.

---

#### Step 4 — Payment

The Razorpay payment window opens as an overlay on the PranaTatva website. The client sees:

- Business name: **PranaTatva**
- Service name and price in INR
- Payment options: UPI, Card, Net Banking, Wallets

The client completes payment. Razorpay handles all card security — PranaTatva never sees or stores the card number.

**What happens in the background when payment is submitted:**

1. Razorpay processes the payment on its secure servers
2. Razorpay sends a success signal back to the PranaTatva website (containing a unique payment ID and a signature)
3. The PranaTatva server **verifies the signature** to confirm the payment is authentic and not tampered with
4. Only after verification does the portal create the booking record in the database

> **Why the server-side verification matters:** This prevents a technically sophisticated person from bypassing payment by faking a success signal. The verification step on the server is a mandatory security requirement.

---

#### Step 5 — Booking Confirmation Screen

After successful payment, the client sees a confirmation screen with:

- Booking reference number (e.g., `PT-2026-05-2847`)
- Service name, date, and time
- Practitioner name
- "An email confirmation has been sent to [email address]"
- "Add to calendar" buttons (Google / Outlook / iCal) — Phase 2

---

### 7.2 Technical Components Involved in the Booking Flow

This section is for those who want to understand the "behind the scenes" system. Non-technical readers can skip this.

```
CLIENT BROWSER
│
│  Visits /services → clicks Book Now
│  → page URL: /book?service=theta-healing-deep-dive
│
▼
PRANATATVA WEBSITE (Next.js on Vercel)
│
│  BookingFlow.tsx — orchestrates all 5 steps
│  StepServiceSelect.tsx — shows service details
│  StepSlotPicker.tsx — calls the slot API
│  StepIntakeForm.tsx — collects client data + consent
│  StepPayment.tsx — opens Razorpay checkout
│
│  Calls APIs:
│  GET  /api/slots?practitioner_id=UUID&date=2026-06-01
│  POST /api/bookings   (creates booking after payment)
│  POST /api/consent    (stores consent record)
│
▼
SUPABASE DATABASE (PostgreSQL)
│
│  Tables involved:
│  - services (catalogue of 6 services)
│  - practitioners (Hemavathi, Shruthi — stored as real UUIDs)
│  - availability (practitioner working hours per day)
│  - bookings (one row per confirmed booking)
│  - consents (immutable consent log — append only)
│  - invoices (generated PDF reference per booking)
│
│  Security: Row Level Security (RLS) ensures Hemavathi
│  can only see her own clients; Shruthi can only see hers.
│
▼
RAZORPAY
│
│  - Processes actual payment (INR)
│  - Returns: payment_id + signature on success
│  - PranaTatva server verifies signature before booking is created
│  - Settlement to PranaTatva bank account daily
│
▼
RESEND (Email Service)
│
│  Triggered immediately after booking is confirmed:
│  - Email to CLIENT: booking receipt + invoice PDF + Zoom link
│  - Email to PRACTITIONER: new booking alert with client name and intake notes
│
▼
ZOOM API
│
│  - A new Zoom meeting is created automatically for each booking
│  - Meeting ID is unique per booking (never reused)
│  - Zoom link is embedded in the confirmation email
│
▼
ADMIN DASHBOARD (Supabase Realtime)
│
│  - New booking appears instantly in the dashboard
│  - No page refresh required — updates in real time
│  - Operations team sees the booking within seconds of payment
```

---

## 8. Booking Confirmation — What Happens After Payment

This section details exactly what each person receives after a booking is confirmed.

### 8.1 Client Receives

**Immediately after payment (within 30–60 seconds):**

An email from PranaTatva containing:

```
Subject: Your booking is confirmed — Theta Healing Deep Dive with Hemavathi

Dear [Client Name],

Your session has been confirmed. Here are the details:

Service:      Theta Healing Deep Dive
Practitioner: Hemavathi
Date:         Tuesday, 3 June 2026
Time:         10:00 AM – 11:00 AM IST
Duration:     60 minutes

Join your session using this Zoom link:
[Zoom Join Link]
Meeting ID: [Meeting ID]
Passcode: [Passcode]

A PDF invoice is attached to this email.

Need to reschedule? Contact us at [contact email] with your booking reference: PT-2026-05-2847

Warm regards,
The PranaTatva Team
```

**Attached to the email:**
- Invoice PDF containing: booking reference, service name, practitioner, date/time, amount paid in INR, GST details (once GSTIN is confirmed), PranaTatva business name and contact

### 8.2 Practitioner Receives

An email notification:

```
Subject: New booking — Theta Healing Deep Dive — 3 June, 10:00 AM

A new session has been booked with you.

Client:    [Client Name]
Service:   Theta Healing Deep Dive
Date:      Tuesday, 3 June 2026
Time:      10:00 AM IST
Duration:  60 minutes

Client's intake notes:
- Seeking: Relief from anxiety and mental clarity
- Health conditions: None noted
- Previous healing experience: Yes

View full details in your dashboard: [dashboard link]
```

### 8.3 Admin Dashboard Shows

The operations team's dashboard updates in real time to show:
- New booking with client name and session details
- Revenue updated for today
- Practitioner's calendar slot marked as booked
- Client's intake form accessible from the booking record

---

## 9. Cancellation and Rescheduling Policy

### Policy: No Refunds — Rescheduling Permitted Once

PranaTatva's policy as configured in the system:

| Situation | Outcome |
|---|---|
| Client cancels before the session | **No refund.** Client may reschedule once within 7 days of cancellation. |
| Client does not show up (no-show) | Session is marked as completed. No refund, no reschedule. |
| Practitioner cancels | Full refund issued manually by admin via Razorpay dashboard. |
| Technical issue prevents session | Admin investigates; may offer reschedule or refund at discretion. |

### How Rescheduling Works

**Client initiates a reschedule:**
1. Client logs into their account on PranaTatva
2. Goes to "My Bookings"
3. Clicks "Request Reschedule" on the booking
4. Enters their requested new date/time and a brief reason
5. Request is sent to the admin dashboard
6. Admin approves or offers alternative slots
7. New Zoom link is generated and sent to client

> **Operations note:** Currently, rescheduling is handled manually via the admin dashboard. Phase 2 will add self-service rescheduling where clients can directly pick an available slot for their new time.

### Policy Display on Website
The cancellation and rescheduling policy is displayed:
- On every service detail page
- In the intake form (before consent checkbox)
- In the booking confirmation email
- In the Terms and Conditions page

---

## 10. Roles and Permissions in the System

Different people have different levels of access. The system enforces these automatically.

| Role | What they can do | What they cannot do |
|---|---|---|
| **Client / Seeker** | View own bookings, fill intake form, pay, reschedule, write journal entries | See other clients' data; see admin dashboard; change prices |
| **Practitioner** | View own calendar and upcoming sessions, read their own clients' intake notes, add session notes to their own clients' journals | See the other practitioner's clients; access revenue data; modify bookings |
| **Admin / Operations** | View all bookings, process rescheduling, view revenue, export data, manage availability for all practitioners | Modify consent records (these are permanent by law) |
| **Super Admin / Founder** | Everything, including user management, pricing changes, API key management, practitioner onboarding | Nothing is blocked — use with care |

> **Security note:** The database enforces these restrictions at the database level (Row Level Security), not just in the user interface. Even if someone tried to access data directly through a technical method, the database would refuse to show them data they are not permitted to see.

---

## 11. Corporate (B2B) Invoicing

*Available in Phase 3.*

### How It Works for Corporate Clients

1. **HR Manager signs up** for a corporate account (separate from individual client accounts)
2. **Purchases a block of sessions** (e.g., 20 sessions at a negotiated rate)
3. **Provides company GSTIN** for GST input tax credit
4. **Assigns sessions to employees** by entering their work email addresses
5. Each employee receives an email invitation to book their session (within the allocated block)
6. **HR Manager downloads** a consolidated monthly invoice showing:
   - Company name and GSTIN
   - PranaTatva GSTIN and SAC code
   - Session breakdown by employee, service, date, and amount
   - Total GST (18% on wellness services — confirm applicable rate before launch)
   - Net total in INR

### What the HR Manager Sees in Their Dashboard

- Total sessions purchased
- Sessions used vs. remaining
- Which employees have booked and which haven't
- Download invoice button (PDF)

---

## 12. Data Privacy and Compliance

PranaTatva handles sensitive personal information (client names, emails, phone numbers, health notes). The following compliance measures are built into the system and are **non-negotiable**.

### 12.1 India DPDP Act 2023

The Digital Personal Data Protection Act 2023 governs how personal data is collected and used in India.

**What this means for PranaTatva:**

| Requirement | How PranaTatva handles it |
|---|---|
| Explicit consent before data collection | Mandatory consent checkbox at registration and before every booking |
| Clear notice about how data is used | Privacy policy page in plain language; shown during registration |
| No sharing data with third parties without consent | PranaTatva does not sell or share client data. Only Razorpay (payment), Resend (email), and Zoom (video) receive the minimum data needed to function. |
| Right to erasure (data deletion) | Phase 3 feature — clients can request deletion of their account and data |
| Designated Data Protection Officer | Contact email for privacy concerns: *(add DPO email before launch)* |

### 12.2 Consent Records — Why They Cannot Be Changed

Every time a client gives consent (booking consent, WhatsApp opt-in, recording consent), a permanent record is created. The system is built so that **no one — not even the founder — can edit or delete a consent record** once it is written.

This is a legal requirement. If a client ever disputes that they gave consent, the business needs to be able to produce the original record with the exact timestamp.

### 12.3 Session Recording Consent

When video sessions are recorded (Phase 2 feature):
- The client must actively turn on a "Record this session" toggle before the session begins
- Recording does NOT start automatically
- A separate consent record is created at the moment the client enables recording
- Recordings are stored encrypted
- Recordings are automatically deleted after 30 days (admin can extend for specific sessions)
- The encryption key is never stored in the PranaTatva database (stored in a separate secure key management service)

### 12.4 WhatsApp Opt-In

WhatsApp messages can only be sent to clients who have explicitly opted in at registration. Clients can opt out by replying "STOP" to any WhatsApp message. The opt-out is processed immediately and logged permanently.

---

## 13. Glossary of Technical Terms

For non-technical readers, here is a plain-English explanation of terms used in this manual.

| Term | What it means |
|---|---|
| **API** | A connection point between two software systems. Like a waiter taking your order to the kitchen and bringing back the food — the API carries information between the website and the database or payment system. |
| **API Key** | A password that allows the website to talk to an external service (like Razorpay). Must be kept secret. |
| **Supabase** | The database service where all booking, client, and practitioner data is stored securely. Based on PostgreSQL, an industry-standard database. |
| **Razorpay** | The Indian payment gateway that processes all INR transactions. Like a bank's POS machine, but for websites. |
| **KYC** | Know Your Customer — the identity verification process that Razorpay (and all Indian payment companies) requires before you can accept real payments. |
| **GSTIN** | Goods and Services Tax Identification Number — a unique 15-digit number assigned to GST-registered businesses in India. Required for B2B invoicing. |
| **Paise** | The smallest unit of Indian currency (100 paise = ₹1). All payment amounts are stored as integers in paise to avoid rounding errors. ₹2,500 is stored as 250000 paise. |
| **Zoom API** | A connection to Zoom's system that allows PranaTatva to automatically create a new Zoom meeting for every booking, without anyone logging into Zoom manually. |
| **Row Level Security (RLS)** | A database security feature that automatically ensures each user only sees their own data. Hemavathi logs in — she sees only her clients. Shruthi logs in — she sees only hers. |
| **Resend** | The email delivery service used to send booking confirmations and invoices. |
| **Next.js** | The framework (toolset) used to build the PranaTatva website. |
| **Vercel** | The hosting company that runs the PranaTatva website on the internet. Like a landlord for websites. |
| **Test Mode / Live Mode** | Razorpay has two modes. Test mode lets you simulate payments without real money. Live mode processes real INR transactions. |
| **Webhook** | An automatic notification that one system sends to another when something happens. When Razorpay processes a payment, it sends a webhook to PranaTatva saying "payment received — here's the ID." |
| **OTP** | One-Time Password — a short code sent to your phone or email for identity verification. Used for client login. |
| **DPDP Act** | Digital Personal Data Protection Act, 2023 — India's data privacy law governing how businesses collect and use personal information. |
| **SAC Code** | Services Accounting Code — a code used in GST invoices to classify the type of service being billed. Wellness and alternative medicine services have a specific SAC code. |
| **UUID** | Universally Unique Identifier — a long random code used to uniquely identify records in the database (e.g., each practitioner and each booking has a UUID). |

---

*End of Project Manual — v1.0*

*For updates, contact the development team. For questions about specific business decisions, contact the founder.*

*This document is maintained in the project repository at `docs/PROJECT_MANUAL.md`*
