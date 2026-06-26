-- SendMe auth profile creation.
-- Public signup always creates customer profiles. Admin and rider roles must be
-- assigned later by a protected admin/service-role process.

create schema if not exists private;

create or replace function private.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (
    id,
    role,
    full_name,
    phone,
    email,
    is_active
  )
  values (
    new.id,
    'customer'::public.user_role,
    coalesce(nullif(btrim(new.raw_user_meta_data ->> 'full_name'), ''), 'SendMe Customer'),
    nullif(btrim(new.raw_user_meta_data ->> 'phone'), ''),
    new.email,
    true
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = case
      when public.users.role = 'customer'::public.user_role then excluded.full_name
      else public.users.full_name
    end,
    phone = case
      when public.users.role = 'customer'::public.user_role then excluded.phone
      else public.users.phone
    end,
    updated_at = now();

  return new;
end;
$$;

revoke all on function private.handle_new_auth_user() from public;
revoke all on function private.handle_new_auth_user() from anon;
revoke all on function private.handle_new_auth_user() from authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_auth_user();
