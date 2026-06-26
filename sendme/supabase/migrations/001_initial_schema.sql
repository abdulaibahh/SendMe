-- SendMe initial Supabase schema.
-- This migration creates the operational database for customers, riders, admins,
-- market products, carts, orders, deliveries, payments, notifications, and audit logs.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('customer', 'rider', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum (
      'pending',
      'confirmed',
      'processing',
      'assigned',
      'out_for_delivery',
      'delivered',
      'cancelled'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_method') then
    create type public.payment_method as enum (
      'orange_money',
      'afrimoney',
      'cash_on_delivery'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type public.payment_status as enum (
      'pending',
      'awaiting_verification',
      'verified',
      'failed',
      'cash_on_delivery_pending',
      'refunded'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'rider_status') then
    create type public.rider_status as enum (
      'offline',
      'available',
      'busy',
      'suspended'
    );
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.generate_order_number()
returns text
language sql
volatile
as $$
  select 'SM-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 8));
$$;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'customer',
  full_name text not null,
  phone text,
  email text unique,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_full_name_not_blank check (length(btrim(full_name)) > 0)
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  label text not null,
  area text not null,
  street_address text not null,
  landmark text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint addresses_label_not_blank check (length(btrim(label)) > 0),
  constraint addresses_area_not_blank check (length(btrim(area)) > 0),
  constraint addresses_street_not_blank check (length(btrim(street_address)) > 0),
  constraint addresses_latitude_range check (latitude is null or latitude between -90 and 90),
  constraint addresses_longitude_range check (longitude is null or longitude between -180 and 180)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_name_not_blank check (length(btrim(name)) > 0),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12, 2) not null,
  unit text not null,
  stock_quantity integer not null default 0,
  image_url text,
  is_available boolean not null default true,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_name_not_blank check (length(btrim(name)) > 0),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint products_price_non_negative check (price >= 0),
  constraint products_stock_non_negative check (stock_quantity >= 0),
  constraint products_unit_not_blank check (length(btrim(unit)) > 0)
);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint carts_status_check check (status in ('active', 'converted', 'abandoned'))
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null,
  unit_price numeric(12, 2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cart_items_quantity_positive check (quantity > 0),
  constraint cart_items_unit_price_non_negative check (unit_price >= 0),
  constraint cart_items_one_product_per_cart unique (cart_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default public.generate_order_number(),
  customer_id uuid not null references public.users(id) on delete restrict,
  address_id uuid references public.addresses(id) on delete set null,
  status public.order_status not null default 'pending',
  customer_area text not null,
  delivery_notes text,
  subtotal numeric(12, 2) not null,
  service_fee numeric(12, 2) not null default 0,
  delivery_fee numeric(12, 2) not null default 0,
  total_amount numeric(12, 2) not null,
  placed_at timestamptz not null default now(),
  confirmed_at timestamptz,
  delivered_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_customer_area_not_blank check (length(btrim(customer_area)) > 0),
  constraint orders_subtotal_non_negative check (subtotal >= 0),
  constraint orders_service_fee_non_negative check (service_fee >= 0),
  constraint orders_delivery_fee_non_negative check (delivery_fee >= 0),
  constraint orders_total_amount_non_negative check (total_amount >= 0),
  constraint orders_total_matches_parts check (total_amount = subtotal + service_fee + delivery_fee)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit text not null,
  quantity integer not null,
  unit_price numeric(12, 2) not null,
  line_total numeric(12, 2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint order_items_product_name_not_blank check (length(btrim(product_name)) > 0),
  constraint order_items_unit_not_blank check (length(btrim(unit)) > 0),
  constraint order_items_quantity_positive check (quantity > 0),
  constraint order_items_unit_price_non_negative check (unit_price >= 0),
  constraint order_items_line_total_matches check (line_total = quantity * unit_price)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  customer_id uuid not null references public.users(id) on delete restrict,
  method public.payment_method not null,
  status public.payment_status not null default 'pending',
  amount numeric(12, 2) not null,
  provider_reference text,
  receipt_url text,
  verified_by uuid references public.users(id) on delete set null,
  verified_at timestamptz,
  failure_reason text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payments_amount_non_negative check (amount >= 0),
  constraint payments_mobile_money_reference_required check (
    method = 'cash_on_delivery'
    or provider_reference is null
    or length(btrim(provider_reference)) > 0
  )
);

create table if not exists public.riders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete set null,
  full_name text not null,
  phone text not null unique,
  status public.rider_status not null default 'offline',
  current_area text,
  completed_deliveries integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint riders_full_name_not_blank check (length(btrim(full_name)) > 0),
  constraint riders_phone_not_blank check (length(btrim(phone)) > 0),
  constraint riders_completed_deliveries_non_negative check (completed_deliveries >= 0)
);

create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  rider_id uuid references public.riders(id) on delete set null,
  status public.order_status not null default 'assigned',
  assigned_at timestamptz not null default now(),
  started_at timestamptz,
  out_for_delivery_at timestamptz,
  delivered_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint deliveries_status_check check (status in ('assigned', 'out_for_delivery', 'delivered', 'cancelled'))
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  body text not null,
  type text not null default 'order_update',
  related_order_id uuid references public.orders(id) on delete cascade,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint notifications_title_not_blank check (length(btrim(title)) > 0),
  constraint notifications_body_not_blank check (length(btrim(body)) > 0)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint audit_logs_action_not_blank check (length(btrim(action)) > 0),
  constraint audit_logs_entity_type_not_blank check (length(btrim(entity_type)) > 0)
);

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  description text not null default '',
  is_public boolean not null default false,
  updated_by uuid references public.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint app_settings_key_format check (key ~ '^[a-z0-9_]+$')
);

create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon;
revoke all on schema private from authenticated;

create or replace function private.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select u.role
  from public.users as u
  where u.id = (select auth.uid())
    and u.is_active = true
  limit 1;
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.current_user_role() = 'admin'::public.user_role, false);
$$;

create or replace function private.is_rider()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.current_user_role() = 'rider'::public.user_role, false);
$$;

create or replace function private.is_cart_owner(target_cart_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.carts as c
    where c.id = target_cart_id
      and c.user_id = (select auth.uid())
  );
$$;

create or replace function private.is_active_cart_owner(target_cart_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.carts as c
    where c.id = target_cart_id
      and c.user_id = (select auth.uid())
      and c.status = 'active'
  );
$$;

create or replace function private.is_order_customer(target_order_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.orders as o
    where o.id = target_order_id
      and o.customer_id = (select auth.uid())
  );
$$;

create or replace function private.is_current_rider(target_rider_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.riders as r
    where r.id = target_rider_id
      and r.user_id = (select auth.uid())
      and r.status <> 'suspended'::public.rider_status
  );
$$;

create or replace function private.is_rider_assigned_to_order(target_order_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.deliveries as d
    join public.riders as r on r.id = d.rider_id
    where d.order_id = target_order_id
      and r.user_id = (select auth.uid())
      and r.status <> 'suspended'::public.rider_status
  );
$$;

create or replace function private.customer_has_rider(target_rider_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.deliveries as d
    join public.orders as o on o.id = d.order_id
    where d.rider_id = target_rider_id
      and o.customer_id = (select auth.uid())
  );
$$;

create or replace function private.is_rider_notification_target(target_order_id uuid, target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.orders as o
    join public.deliveries as d on d.order_id = o.id
    join public.riders as r on r.id = d.rider_id
    where o.id = target_order_id
      and o.customer_id = target_user_id
      and r.user_id = (select auth.uid())
      and r.status <> 'suspended'::public.rider_status
  );
$$;

grant usage on schema private to authenticated;
grant execute on function private.current_user_role() to authenticated;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.is_rider() to authenticated;
grant execute on function private.is_cart_owner(uuid) to authenticated;
grant execute on function private.is_active_cart_owner(uuid) to authenticated;
grant execute on function private.is_order_customer(uuid) to authenticated;
grant execute on function private.is_current_rider(uuid) to authenticated;
grant execute on function private.is_rider_assigned_to_order(uuid) to authenticated;
grant execute on function private.customer_has_rider(uuid) to authenticated;
grant execute on function private.is_rider_notification_target(uuid, uuid) to authenticated;

do $$
declare
  target_table text;
begin
  foreach target_table in array array[
    'users',
    'addresses',
    'categories',
    'products',
    'carts',
    'cart_items',
    'orders',
    'order_items',
    'payments',
    'riders',
    'deliveries',
    'notifications',
    'app_settings'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', target_table, target_table);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      target_table,
      target_table
    );
  end loop;
end $$;
