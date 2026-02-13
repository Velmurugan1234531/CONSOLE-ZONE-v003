-- Create service_bookings table
create table if not exists public.service_bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  service_id text not null, -- Assuming Service IDs are strings in JSON/Code, but if foreign key to repair_services(id) make sure type matches.
  device_model text not null,
  serial_number text,
  issue_description text not null,
  preferred_date date not null,
  status text default 'Pending' check (status in ('Pending', 'Confirmed', 'In-Progress', 'Completed', 'Cancelled')),
  contact_name text not null,
  contact_phone text not null,
  contact_email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.service_bookings enable row level security;

-- Policy: Allow public to insert (for guest bookings)
create policy "Enable insert for all users" on public.service_bookings
for insert with check (true);

-- Policy: Users can view their own bookings
create policy "Users can view own bookings" on public.service_bookings
for select using (auth.uid() = user_id);

-- Policy: Admins can view/edit all (Assumes admin logic or service_role usage)
-- For simplicity in this SQL, we'll rely on dashboard/service logic often having full access or specific admin policies.
