-- ============================================================
-- Blood Connect — Supabase Database Schema
-- Run this entire file in the Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → Paste → Run)
-- ============================================================

-- ── 1. PROFILES (links auth.users to role & extra info) ──────
create table if not exists public.profiles (
    id          uuid references auth.users(id) on delete cascade primary key,
    role        text not null check (role in ('hospital', 'donor')),
    created_at  timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile"
    on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
    on public.profiles for update using (auth.uid() = id);

-- ── 2. HOSPITALS ──────────────────────────────────────────────
create table if not exists public.hospitals (
    id              uuid primary key default gen_random_uuid(),
    user_id         uuid references auth.users(id) on delete cascade unique,
    name            text not null,
    reg_number      text,
    facility_type   text,
    email           text,
    phone           text,
    address         text,
    city            text,
    state           text,
    pincode         text,
    website         text,
    bed_count       integer,
    status          text default 'active',
    created_at      timestamptz default now()
);
alter table public.hospitals enable row level security;
create policy "Hospitals are publicly readable"
    on public.hospitals for select using (true);
create policy "Hospitals can update own record"
    on public.hospitals for update using (auth.uid() = user_id);
create policy "Hospitals can insert own record"
    on public.hospitals for insert with check (auth.uid() = user_id);

-- ── 3. BLOOD INVENTORY ────────────────────────────────────────
create table if not exists public.blood_inventory (
    id          uuid primary key default gen_random_uuid(),
    hospital_id uuid references public.hospitals(id) on delete cascade,
    blood_type  text not null check (blood_type in ('A+','A-','B+','B-','O+','O-','AB+','AB-')),
    units       integer not null default 0 check (units >= 0),
    updated_at  timestamptz default now(),
    unique(hospital_id, blood_type)
);
alter table public.blood_inventory enable row level security;
create policy "Inventory is publicly readable"
    on public.blood_inventory for select using (true);
create policy "Hospital can manage own inventory"
    on public.blood_inventory for all
    using (hospital_id in (select id from public.hospitals where user_id = auth.uid()));

-- ── 4. DONORS ─────────────────────────────────────────────────
create table if not exists public.donors (
    id                  uuid primary key default gen_random_uuid(),
    user_id             uuid references auth.users(id) on delete cascade unique,
    full_name           text,
    blood_type          text check (blood_type in ('A+','A-','B+','B-','O+','O-','AB+','AB-')),
    phone               text,
    city                text,
    state               text,
    date_of_birth       date,
    last_donation_date  date,
    total_donations     integer default 0,
    is_eligible         boolean default true,
    created_at          timestamptz default now()
);
alter table public.donors enable row level security;
create policy "Donors can view own record"
    on public.donors for select using (auth.uid() = user_id);
create policy "Donors can update own record"
    on public.donors for update using (auth.uid() = user_id);
create policy "Donors can insert own record"
    on public.donors for insert with check (auth.uid() = user_id);
create policy "Hospitals can view donor records"
    on public.donors for select
    using (exists (select 1 from public.hospitals where user_id = auth.uid()));

-- ── 5. EMERGENCY REQUESTS ─────────────────────────────────────
create table if not exists public.emergency_requests (
    id              uuid primary key default gen_random_uuid(),
    hospital_id     uuid references public.hospitals(id) on delete cascade,
    blood_type      text not null,
    units_needed    integer not null,
    urgency         text default 'critical',
    patient_info    text,
    notes           text,
    status          text default 'pending' check (status in ('pending','fulfilled','cancelled')),
    created_at      timestamptz default now()
);
alter table public.emergency_requests enable row level security;
create policy "Hospitals can manage own requests"
    on public.emergency_requests for all
    using (hospital_id in (select id from public.hospitals where user_id = auth.uid()));
create policy "Emergency requests publicly readable"
    on public.emergency_requests for select using (true);

-- ── 6. HANDOFFS ───────────────────────────────────────────────
create table if not exists public.handoffs (
    id              uuid primary key default gen_random_uuid(),
    hospital_id     uuid references public.hospitals(id) on delete cascade,
    request_id      uuid references public.emergency_requests(id) on delete set null,
    blood_type      text,
    units           integer,
    urgency         text,
    status          text default 'pending' check (status in ('pending','completed','dismissed')),
    created_at      timestamptz default now(),
    completed_at    timestamptz
);
alter table public.handoffs enable row level security;
create policy "Hospitals can manage own handoffs"
    on public.handoffs for all
    using (hospital_id in (select id from public.hospitals where user_id = auth.uid()));

-- ── 7. REALTIME ───────────────────────────────────────────────
-- Enable realtime for live blood inventory updates
alter publication supabase_realtime add table public.blood_inventory;
alter publication supabase_realtime add table public.emergency_requests;
