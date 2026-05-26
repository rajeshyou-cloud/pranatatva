-- ============================================================
-- PranaTatva — Supabase Schema
-- Run this entire script in Supabase → SQL Editor → New query
-- ============================================================

-- ── Custom ENUM types ────────────────────────────────────────

CREATE TYPE booking_status  AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'no_show');
CREATE TYPE payment_status  AS ENUM ('pending', 'paid', 'refunded', 'partially_refunded', 'failed', 'free');
CREATE TYPE session_type    AS ENUM ('1on1', 'group', 'event');
CREATE TYPE service_category AS ENUM ('healing', 'manifestation', 'consultation', 'subscription');

-- ── Tables ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS practitioners (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,   -- 'hema' | 'shru'
  title       TEXT        NOT NULL,
  bio         TEXT        NOT NULL DEFAULT '',
  photo_url   TEXT,
  specialties TEXT[]      DEFAULT '{}',
  languages   TEXT[]      DEFAULT '{"English"}',
  zoom_link   TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id               UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT             NOT NULL UNIQUE,
  name             TEXT             NOT NULL,
  name_hi          TEXT,
  name_te          TEXT,
  description      TEXT             NOT NULL DEFAULT '',
  description_hi   TEXT,
  description_te   TEXT,
  category         service_category NOT NULL,
  duration_minutes INT              NOT NULL DEFAULT 60,
  price_paise      INT              NOT NULL DEFAULT 0,
  practitioner_id  UUID             REFERENCES practitioners(id),
  session_type     session_type     NOT NULL DEFAULT '1on1',
  max_seats        INT,
  is_active        BOOLEAN          NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ      NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS availability_slots (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  practitioner_id UUID        NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
  date            DATE        NOT NULL,
  start_time      TEXT        NOT NULL,  -- '10:00'
  end_time        TEXT        NOT NULL,  -- '11:00'
  is_available    BOOLEAN     NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (practitioner_id, date, start_time)
);

CREATE TABLE IF NOT EXISTS bookings (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref       TEXT          NOT NULL UNIQUE
                                  DEFAULT 'PT-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  service_id        UUID          NOT NULL REFERENCES services(id),
  practitioner_id   UUID          NOT NULL REFERENCES practitioners(id),
  slot_id           UUID          NOT NULL REFERENCES availability_slots(id),
  client_name       TEXT          NOT NULL,
  client_email      TEXT          NOT NULL,
  client_phone      TEXT          NOT NULL,
  client_concern    TEXT,
  intake_consent    BOOLEAN       NOT NULL DEFAULT false,
  intake_consent_at TIMESTAMPTZ   NOT NULL,
  whatsapp_opt_in   BOOLEAN       NOT NULL DEFAULT false,
  status            booking_status NOT NULL DEFAULT 'pending',
  payment_status    payment_status NOT NULL DEFAULT 'pending',
  payment_id        TEXT,
  amount_paise      INT           NOT NULL DEFAULT 0,
  zoom_link         TEXT,
  notes             TEXT,
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id                  UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id          UUID           NOT NULL REFERENCES bookings(id),
  razorpay_order_id   TEXT           NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_signature  TEXT,
  amount_paise        INT            NOT NULL,
  status              payment_status NOT NULL DEFAULT 'pending',
  invoice_url         TEXT,
  created_at          TIMESTAMPTZ    NOT NULL DEFAULT now()
);

-- Auto-update updated_at on bookings
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row Level Security ───────────────────────────────────────

ALTER TABLE practitioners      ENABLE ROW LEVEL SECURITY;
ALTER TABLE services           ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments           ENABLE ROW LEVEL SECURITY;

-- Anyone can read active practitioners + services
CREATE POLICY "public read practitioners"
  ON practitioners FOR SELECT USING (is_active = true);

CREATE POLICY "public read services"
  ON services FOR SELECT USING (is_active = true);

CREATE POLICY "public read slots"
  ON availability_slots FOR SELECT USING (true);

-- Only the service-role key (used by API routes) can write
CREATE POLICY "service role manages bookings"
  ON bookings
  USING      (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service role manages payments"
  ON payments
  USING      (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service role updates slots"
  ON availability_slots FOR UPDATE
  USING (auth.role() = 'service_role');

-- ── Seed: Practitioners ──────────────────────────────────────

INSERT INTO practitioners (name, slug, title, bio, specialties, languages) VALUES
(
  'Hemavathi',
  'hema',
  'Theta Healing & Manifestation Practitioner',
  'Hemavathi is a certified Theta Healing practitioner with over 8 years of experience guiding individuals through deep healing and abundance work.',
  ARRAY['Theta Healing', 'Manifestation', 'Energy Work', 'Spiritual Awakening'],
  ARRAY['English', 'Telugu', 'Kannada']
),
(
  'Shruthi',
  'shru',
  'Tarot Reader & Akashic Records Practitioner',
  'Shruthi is an intuitive Tarot reader and Akashic Records practitioner helping seekers find clarity and soul-level guidance.',
  ARRAY['Tarot Reading', 'Akashic Records', 'Intuitive Guidance', 'Soul Readings'],
  ARRAY['English', 'Telugu', 'Hindi']
)
ON CONFLICT (slug) DO NOTHING;

-- ── Seed: Services ───────────────────────────────────────────

INSERT INTO services (slug, name, category, duration_minutes, price_paise, practitioner_id, session_type, description)
SELECT
  v.slug, v.name, v.category::service_category,
  v.duration_minutes, v.price_paise,
  p.id, '1on1'::session_type, v.description
FROM (VALUES
  (
    'theta-healing-deep-dive',
    'Theta Healing Deep Dive',
    'healing', 60, 250000, 'hema',
    'A deep 60-minute Theta Healing session to clear limiting beliefs and trauma at the subconscious level.'
  ),
  (
    'abundance-manifestation',
    'Abundance Manifestation Session',
    'manifestation', 75, 300000, 'hema',
    'Align your energy with abundance and prosperity through guided manifestation work.'
  ),
  (
    'tarot-card-reading',
    'Tarot Card Reading',
    'consultation', 45, 180000, 'shru',
    'Gain clarity and guidance through an intuitive Tarot reading session.'
  ),
  (
    'spiritual-awakening-mastery',
    'Spiritual Awakening Mastery Program',
    'subscription', 0, 2200000, 'hema',
    'An 8-week comprehensive program for spiritual awakening and inner transformation.'
  ),
  (
    'akashic-records-soul-reading',
    'Akashic Records Soul Reading',
    'healing', 60, 220000, 'shru',
    'Access the Akashic Records to uncover your soul''s purpose and past life patterns.'
  ),
  (
    'free-discovery-call',
    'Free Discovery Call',
    'consultation', 30, 0, 'hema',
    'A complimentary 30-minute call to explore how PranaTatva can support your healing journey.'
  )
) AS v(slug, name, category, duration_minutes, price_paise, prac_slug, description)
JOIN practitioners p ON p.slug = v.prac_slug
ON CONFLICT (slug) DO NOTHING;

-- ── Generate 90 days of availability slots ───────────────────
-- Hemavathi: Mon(1) Wed(3) Fri(5) Sat(6)
-- Shruthi:   Sun(0) Tue(2) Thu(4) Sat(6)
-- Times:     10:00 11:00 12:00 14:00 15:00 16:00 17:00

DO $$
DECLARE
  hema_id   uuid;
  shru_id   uuid;
  d         date;
  t         text;
  end_h     int;
  end_t     text;
  times     text[] := ARRAY['10:00','11:00','12:00','14:00','15:00','16:00','17:00'];
  hema_days int[]  := ARRAY[1, 3, 5, 6];
  shru_days int[]  := ARRAY[0, 2, 4, 6];
BEGIN
  SELECT id INTO hema_id FROM practitioners WHERE slug = 'hema';
  SELECT id INTO shru_id FROM practitioners WHERE slug = 'shru';

  FOR d IN
    SELECT gs::date
    FROM generate_series(CURRENT_DATE, CURRENT_DATE + 90, '1 day'::interval) gs
  LOOP
    IF EXTRACT(DOW FROM d)::int = ANY(hema_days) THEN
      FOREACH t IN ARRAY times LOOP
        end_h := split_part(t, ':', 1)::int + 1;
        end_t := lpad(end_h::text, 2, '0') || ':00';
        INSERT INTO availability_slots (practitioner_id, date, start_time, end_time, is_available)
        VALUES (hema_id, d, t, end_t, true)
        ON CONFLICT (practitioner_id, date, start_time) DO NOTHING;
      END LOOP;
    END IF;

    IF EXTRACT(DOW FROM d)::int = ANY(shru_days) THEN
      FOREACH t IN ARRAY times LOOP
        end_h := split_part(t, ':', 1)::int + 1;
        end_t := lpad(end_h::text, 2, '0') || ':00';
        INSERT INTO availability_slots (practitioner_id, date, start_time, end_time, is_available)
        VALUES (shru_id, d, t, end_t, true)
        ON CONFLICT (practitioner_id, date, start_time) DO NOTHING;
      END LOOP;
    END IF;
  END LOOP;
END $$;

-- ── Verify ───────────────────────────────────────────────────
SELECT 'practitioners' AS tbl, count(*) FROM practitioners
UNION ALL
SELECT 'services',    count(*) FROM services
UNION ALL
SELECT 'slots',       count(*) FROM availability_slots;
