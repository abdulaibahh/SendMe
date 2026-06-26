-- SendMe storage buckets, storage RLS policies, and user push device registry.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('profile-images', 'profile-images', false, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('payment-receipts', 'payment-receipts', false, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.user_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  expo_push_token text,
  fcm_token text,
  platform text not null,
  device_name text,
  app_version text,
  last_seen_at timestamptz not null default now(),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_devices_platform_check check (platform in ('android', 'ios', 'web')),
  constraint user_devices_token_required check (expo_push_token is not null or fcm_token is not null)
);

drop trigger if exists set_user_devices_updated_at on public.user_devices;
create trigger set_user_devices_updated_at
before update on public.user_devices
for each row execute function public.set_updated_at();

create index if not exists user_devices_user_id_idx
on public.user_devices (user_id);

create unique index if not exists user_devices_expo_push_token_unique_idx
on public.user_devices (expo_push_token)
where expo_push_token is not null;

create unique index if not exists user_devices_fcm_token_unique_idx
on public.user_devices (fcm_token)
where fcm_token is not null;

create index if not exists user_devices_active_idx
on public.user_devices (user_id, last_seen_at desc)
where is_active = true;

grant select, insert, update, delete on public.user_devices to authenticated;

alter table public.user_devices enable row level security;

create policy "user_devices_select_own_or_admin"
on public.user_devices
for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "user_devices_insert_own"
on public.user_devices
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "user_devices_update_own_or_admin"
on public.user_devices
for update
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
)
with check (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "user_devices_delete_own_or_admin"
on public.user_devices
for delete
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

alter table storage.objects enable row level security;

create policy "product_images_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

create policy "product_images_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and (select private.is_admin())
);

create policy "product_images_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and (select private.is_admin())
)
with check (
  bucket_id = 'product-images'
  and (select private.is_admin())
);

create policy "product_images_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and (select private.is_admin())
);

create policy "profile_images_owner_or_admin_read"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'profile-images'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
);

create policy "profile_images_owner_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'profile-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "profile_images_owner_or_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'profile-images'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
)
with check (
  bucket_id = 'profile-images'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
);

create policy "profile_images_owner_or_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'profile-images'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
);

create policy "payment_receipts_owner_or_admin_read"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'payment-receipts'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
);

create policy "payment_receipts_owner_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'payment-receipts'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "payment_receipts_owner_or_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'payment-receipts'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
)
with check (
  bucket_id = 'payment-receipts'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
);

create policy "payment_receipts_owner_or_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'payment-receipts'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or (select private.is_admin())
  )
);
