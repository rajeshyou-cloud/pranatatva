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

insert into practitioners (name, slug, title, bio, specialties, languages) values
(
  'Lakshmmi',
  'lakshmmi',
  'Spiritual Healer & Manifestation Coach',
  'With over a decade of experience in energy healing, Vedic astrology, and manifestation coaching, Lakshmmi guides seekers on a transformative journey toward inner peace and abundance.',
  array['Energy Healing', 'Manifestation', 'Vedic Astrology', 'Past Life Regression'],
  array['en', 'hi', 'te']
);

insert into services (slug, name, name_hi, name_te, description, category, duration_minutes, price_paise, session_type) values
(
  '1on1-healing-session',
  '1:1 Healing Session',
  'व्यक्तिगत हीलिंग सत्र',
  'వ్యక్తిగత వైద్య సత్రం',
  'A deeply personalised healing session addressing your unique energy blocks, emotional patterns, and life challenges. Includes chakra assessment and customised energy work.',
  'healing', 60, 250000, '1on1'
),
(
  'manifestation-coaching',
  'Manifestation Coaching',
  'अभिव्यक्ति कोचिंग',
  'వ్యక్తీకరణ కోచింగ్',
  'Learn the art and science of conscious creation. This session combines Vedic wisdom with modern manifestation techniques to align your energy with your desires.',
  'manifestation', 60, 200000, '1on1'
),
(
  'spiritual-consultation',
  'Spiritual Consultation',
  'आध्यात्मिक परामर्श',
  'ఆధ్యాత్మిక సంప్రదింపు',
  'A comprehensive spiritual guidance session covering your life path, karmic patterns, and actionable steps for growth. Suitable for anyone seeking clarity and direction.',
  'consultation', 45, 150000, '1on1'
),
(
  'group-healing-circle',
  'Group Healing Circle',
  'समूह हीलिंग सर्कल',
  'సమూహ వైద్య మండలి',
  'Join our monthly group healing circle — a sacred space for collective energy work, guided meditation, and shared healing. Limited to 12 participants.',
  'healing', 90, 100000, 'group'
);
