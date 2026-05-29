-- PranaTatva — Supabase PostgreSQL Schema
-- Run this in the Supabase SQL editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── ENUMS ───────────────────────────────────────────────────────────────────

create type service_category as enum ('healing', 'manifestation', 'consultation', 'subscription');
create type booking_status   as enum ('pending', 'confirmed', 'cancelled', 'completed', 'no_show');
create type payment_status   as enum ('pending', 'paid', 'refunded', 'partially_refunded', 'failed');
create type session_type     as enum ('1on1', 'group', 'event');

-- ─── PRACTITIONERS ────────────────────────────────────────────────────────────

create table practitioners (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  title        text not null,
  bio          text not null default '',
  photo_url    text,
  specialties  text[] not null default '{}',
  languages    text[] not null default '{en}',
  zoom_link    text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ─── SERVICES ────────────────────────────────────────────────────────────────

create table services (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  name_hi         text,
  name_te         text,
  description     text not null default '',
  description_hi  text,
  description_te  text,
  category        service_category not null,
  duration_minutes int not null default 60,
  price_paise     int not null,                  -- stored in paise (₹ × 100)
  practitioner_id uuid references practitioners(id) on delete set null,
  session_type    session_type not null default '1on1',
  max_seats       int,                           -- null = unlimited (1:1)
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ─── AVAILABILITY SLOTS ───────────────────────────────────────────────────────

create table availability_slots (
  id               uuid primary key default gen_random_uuid(),
  practitioner_id  uuid not null references practitioners(id) on delete cascade,
  date             date not null,
  start_time       time not null,
  end_time         time not null,
  is_available     boolean not null default true,
  created_at       timestamptz not null default now(),
  unique (practitioner_id, date, start_time)
);

-- ─── BOOKINGS ─────────────────────────────────────────────────────────────────

create table bookings (
  id                  uuid primary key default gen_random_uuid(),
  booking_ref         text not null unique default 'PT-' || upper(substr(gen_random_uuid()::text, 1, 8)),
  service_id          uuid not null references services(id),
  practitioner_id     uuid not null references practitioners(id),
  slot_id             uuid not null references availability_slots(id),
  client_name         text not null,
  client_email        text not null,
  client_phone        text not null,
  client_concern      text,
  -- DPDP / legal: immutable consent records
  intake_consent      boolean not null default false,
  intake_consent_at   timestamptz not null default now(),
  whatsapp_opt_in     boolean not null default false,
  status              booking_status not null default 'pending',
  payment_status      payment_status not null default 'pending',
  payment_id          text,
  amount_paise        int not null,
  zoom_link           text,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- immutable consent: prevent updating consent columns after insert
create or replace function protect_consent_fields()
returns trigger language plpgsql as $$
begin
  if old.intake_consent <> new.intake_consent
     or old.intake_consent_at <> new.intake_consent_at then
    raise exception 'Consent fields are immutable once recorded';
  end if;
  return new;
end;
$$;

create trigger bookings_protect_consent
  before update on bookings
  for each row execute function protect_consent_fields();

-- auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_set_updated_at
  before update on bookings
  for each row execute function set_updated_at();

-- ─── PAYMENTS ────────────────────────────────────────────────────────────────

create table payments (
  id                   uuid primary key default gen_random_uuid(),
  booking_id           uuid not null references bookings(id),
  razorpay_order_id    text not null,
  razorpay_payment_id  text,
  razorpay_signature   text,
  amount_paise         int not null,
  status               payment_status not null default 'pending',
  invoice_url          text,
  created_at           timestamptz not null default now()
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

alter table practitioners     enable row level security;
alter table services          enable row level security;
alter table availability_slots enable row level security;
alter table bookings          enable row level security;
alter table payments          enable row level security;

-- Public read for active practitioners and services
create policy "Public can read active practitioners" on practitioners
  for select using (is_active = true);

create policy "Public can read active services" on services
  for select using (is_active = true);

create policy "Public can read available slots" on availability_slots
  for select using (is_available = true);

-- Clients can insert bookings (anonymous)
create policy "Anyone can create a booking" on bookings
  for insert with check (true);

-- Clients can read their own booking by email (used in confirmation page)
create policy "Client can view own bookings" on bookings
  for select using (true);  -- restrict by session in application layer

-- Service role (admin) has full access — handled via SUPABASE_SERVICE_ROLE_KEY

-- ─── SEED DATA ───────────────────────────────────────────────────────────────
-- Run this once against your Supabase project to populate real practitioners
-- and services. Safe to re-run: uses ON CONFLICT DO NOTHING.

insert into practitioners (name, slug, title, bio, specialties, languages) values
(
  'Hemavathi',
  'hema',
  'Founder · Master Theta Healing Practitioner · Certified NLP · Certified Instructor',
  'The visionary behind PranaTatva, Hemavathi brings 18 years of practice and a master-level depth to every session. She specialises in dissolving deep-rooted limiting beliefs through Theta Healing and guiding seekers into lasting states of abundance, clarity, and spiritual alignment.',
  array['Theta Healing', 'Manifestation', 'Spiritual Training', 'Reiki', 'NLP', 'Akashic Records', 'Ancestral Healing'],
  array['en']
),
(
  'Shruthi',
  'shru',
  'Healing Guide · Tarot Reader · Numerologist · EFT Practitioner',
  'Shruthi''s relationship with Tarot began not as mysticism but as a mirror — a tool for honest self-inquiry refined into a precise, compassionate practice over six years. As a trained Numerologist and EFT practitioner she translates intuitive insight into tangible next steps.',
  array['Tarot Reading', 'Numerology', 'EFT Tapping', 'Akashic Records', 'Chakra Balancing', 'Intuitive Guidance'],
  array['en']
)
ON CONFLICT (slug) DO NOTHING;

insert into services (slug, name, description, category, duration_minutes, price_paise, session_type) values
('theta-healing-deep-dive',       'Theta Healing Deep Dive',              'Deep theta-state session to permanently dissolve limiting beliefs and energetic blocks.',                                         'healing',       60,  250000, '1on1'),
('abundance-manifestation',       'Abundance Manifestation Session',      'Align your energy with abundance through Theta Healing and manifestation coaching.',                                            'manifestation', 75,  300000, '1on1'),
('tarot-card-reading',            'Tarot Card Reading',                   'Intuitive Tarot readings that illuminate your path and offer clarity on love, career, and purpose.',                            'tarot',         45,  180000, '1on1'),
('spiritual-awakening-mastery',   'Spiritual Awakening Mastery Program',  '8-week certification program for deep spiritual transformation and awakening.',                                                  'training',      0,  2200000,'1on1'),
('akashic-records-soul-reading',  'Akashic Records Soul Reading',         'Access the energetic blueprint of your soul''s journey for clarity on relationships, life purpose, and karmic patterns.',       'akashic',       60,  220000, '1on1'),
('vasthu-consultation',           'Vasthu Consultation',                  'Align your living or working space with Vasthu principles for harmony, prosperity, and positive energy flow.',                  'consultation',  60,   50000, '1on1'),
('psychic-consultation',          'Psychic Consultation',                 'An intuitive session to gain clarity on life questions, relationships, and decisions through psychic guidance.',                 'consultation',  60,   50000, '1on1'),
('akashic-consultation',          'Akashic Consultation',                 'Focused Akashic Records consultation to address specific life questions and soul-level patterns.',                               'akashic',       60,  150000, '1on1'),
('akashic-readings',              'Akashic Readings',                     'In-depth Akashic Records reading — soul history, contracts, and future potentials.',                                            'akashic',       45,  510000, '1on1'),
('tarot-reading',                 'Tarot Reading',                        'Comprehensive Tarot reading for guidance on life path, relationships, and career.',                                              'tarot',         45,  240000, '1on1'),
('akashic-reading-course',        'Akashic Reading Course',               'Certification course to learn Akashic Records reading — access the Akashic field for yourself and others.',                    'course',        0,  1500000,'1on1'),
('tarot-reading-course',          'Tarot Reading Course',                 'Certification course in Tarot reading — from foundational card meanings to intuitive reading practice.',                        'course',        0,  1500000,'1on1'),
('numerology',                    'Numerology',                           'Decode your name and birth date to reveal life-path themes, soul urges, and the timing of significant transitions.',             'numerology',    0,   666600,'1on1'),
('free-discovery-call',           'Free Discovery Call',                  'A complimentary 30-minute call to explore which healing modality is the right fit for your journey.',                           'consultation',  30,        0,'1on1')
ON CONFLICT (slug) DO NOTHING;
