-- SendMe row-level security policies.
-- Public signup can only create customer profiles. Rider and admin access must
-- come from protected admin/service-role operations outside the mobile client.

grant usage on schema public to anon, authenticated;

grant select on public.categories, public.products, public.app_settings to anon;

grant select, insert, update on public.users to authenticated;
grant select, insert, update, delete on public.addresses to authenticated;
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, insert, update, delete on public.carts to authenticated;
grant select, insert, update, delete on public.cart_items to authenticated;
grant select, insert, update on public.orders to authenticated;
grant select, insert, update, delete on public.order_items to authenticated;
grant select, insert, update on public.payments to authenticated;
grant select, insert, update, delete on public.riders to authenticated;
grant select, insert, update, delete on public.deliveries to authenticated;
grant select, insert, update, delete on public.notifications to authenticated;
grant select, insert on public.audit_logs to authenticated;
grant select, insert, update, delete on public.app_settings to authenticated;

alter table public.users enable row level security;
alter table public.addresses enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.riders enable row level security;
alter table public.deliveries enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.app_settings enable row level security;

create policy "users_select_own_or_admin"
on public.users
for select
to authenticated
using (
  id = (select auth.uid())
  or (select private.is_admin())
);

create policy "users_insert_customer_profile"
on public.users
for insert
to authenticated
with check (
  id = (select auth.uid())
  and role = 'customer'::public.user_role
  and is_active = true
);

create policy "users_admin_insert"
on public.users
for insert
to authenticated
with check ((select private.is_admin()));

create policy "users_update_own_profile"
on public.users
for update
to authenticated
using (id = (select auth.uid()))
with check (
  id = (select auth.uid())
  and role = (select private.current_user_role())
);

create policy "users_admin_update"
on public.users
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "addresses_select_own_or_admin"
on public.addresses
for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "addresses_insert_own"
on public.addresses
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "addresses_update_own_or_admin"
on public.addresses
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

create policy "addresses_delete_own_or_admin"
on public.addresses
for delete
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "categories_public_select_active"
on public.categories
for select
to anon
using (is_active = true);

create policy "categories_authenticated_select"
on public.categories
for select
to authenticated
using (
  is_active = true
  or (select private.is_admin())
);

create policy "categories_admin_insert"
on public.categories
for insert
to authenticated
with check ((select private.is_admin()));

create policy "categories_admin_update"
on public.categories
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "categories_admin_delete"
on public.categories
for delete
to authenticated
using ((select private.is_admin()));

create policy "products_public_select_available"
on public.products
for select
to anon
using (
  is_available = true
  and archived_at is null
);

create policy "products_authenticated_select"
on public.products
for select
to authenticated
using (
  (is_available = true and archived_at is null)
  or (select private.is_admin())
);

create policy "products_admin_insert"
on public.products
for insert
to authenticated
with check ((select private.is_admin()));

create policy "products_admin_update"
on public.products
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "products_admin_delete"
on public.products
for delete
to authenticated
using ((select private.is_admin()));

create policy "carts_select_own_or_admin"
on public.carts
for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "carts_insert_own"
on public.carts
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "carts_update_own_or_admin"
on public.carts
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

create policy "carts_delete_own_or_admin"
on public.carts
for delete
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "cart_items_select_own_or_admin"
on public.cart_items
for select
to authenticated
using (
  (select private.is_cart_owner(cart_id))
  or (select private.is_admin())
);

create policy "cart_items_insert_own"
on public.cart_items
for insert
to authenticated
with check (
  (select private.is_active_cart_owner(cart_id))
);

create policy "cart_items_update_own_or_admin"
on public.cart_items
for update
to authenticated
using (
  (select private.is_cart_owner(cart_id))
  or (select private.is_admin())
)
with check (
  (select private.is_cart_owner(cart_id))
  or (select private.is_admin())
);

create policy "cart_items_delete_own_or_admin"
on public.cart_items
for delete
to authenticated
using (
  (select private.is_cart_owner(cart_id))
  or (select private.is_admin())
);

create policy "orders_select_by_role"
on public.orders
for select
to authenticated
using (
  customer_id = (select auth.uid())
  or (select private.is_admin())
  or (select private.is_rider_assigned_to_order(id))
);

create policy "orders_insert_customer"
on public.orders
for insert
to authenticated
with check (
  customer_id = (select auth.uid())
  and status = 'pending'::public.order_status
);

create policy "orders_customer_cancel_pending"
on public.orders
for update
to authenticated
using (
  customer_id = (select auth.uid())
  and status = 'pending'::public.order_status
)
with check (
  customer_id = (select auth.uid())
  and status = 'cancelled'::public.order_status
);

create policy "orders_rider_update_assigned"
on public.orders
for update
to authenticated
using (
  (select private.is_rider_assigned_to_order(id))
)
with check (
  status in ('assigned', 'out_for_delivery', 'delivered')
  and (select private.is_rider_assigned_to_order(id))
);

create policy "orders_admin_update"
on public.orders
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "order_items_select_by_order_role"
on public.order_items
for select
to authenticated
using (
  (select private.is_order_customer(order_id))
  or (select private.is_admin())
  or (select private.is_rider_assigned_to_order(order_id))
);

create policy "order_items_insert_customer_order"
on public.order_items
for insert
to authenticated
with check (
  (select private.is_order_customer(order_id))
  or (select private.is_admin())
);

create policy "order_items_admin_update"
on public.order_items
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "order_items_admin_delete"
on public.order_items
for delete
to authenticated
using ((select private.is_admin()));

create policy "payments_select_by_role"
on public.payments
for select
to authenticated
using (
  customer_id = (select auth.uid())
  or (select private.is_admin())
  or (select private.is_rider_assigned_to_order(order_id))
);

create policy "payments_insert_customer"
on public.payments
for insert
to authenticated
with check (
  customer_id = (select auth.uid())
  and (select private.is_order_customer(order_id))
  and (
    (method in ('orange_money', 'afrimoney') and status = 'awaiting_verification'::public.payment_status)
    or (method = 'cash_on_delivery' and status = 'cash_on_delivery_pending'::public.payment_status)
  )
);

create policy "payments_update_customer_reference"
on public.payments
for update
to authenticated
using (
  customer_id = (select auth.uid())
  and status in ('pending', 'awaiting_verification', 'cash_on_delivery_pending')
)
with check (
  customer_id = (select auth.uid())
  and status in ('pending', 'awaiting_verification', 'cash_on_delivery_pending')
);

create policy "payments_admin_update"
on public.payments
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "riders_select_by_role"
on public.riders
for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
  or (select private.customer_has_rider(id))
);

create policy "riders_admin_insert"
on public.riders
for insert
to authenticated
with check ((select private.is_admin()));

create policy "riders_update_self_or_admin"
on public.riders
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

create policy "riders_admin_delete"
on public.riders
for delete
to authenticated
using ((select private.is_admin()));

create policy "deliveries_select_by_role"
on public.deliveries
for select
to authenticated
using (
  (select private.is_admin())
  or (select private.is_current_rider(rider_id))
  or (select private.is_order_customer(order_id))
);

create policy "deliveries_admin_insert"
on public.deliveries
for insert
to authenticated
with check ((select private.is_admin()));

create policy "deliveries_rider_update_assigned"
on public.deliveries
for update
to authenticated
using (
  (select private.is_current_rider(rider_id))
)
with check (
  status in ('assigned', 'out_for_delivery', 'delivered')
  and (select private.is_current_rider(rider_id))
);

create policy "deliveries_admin_update"
on public.deliveries
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "deliveries_admin_delete"
on public.deliveries
for delete
to authenticated
using ((select private.is_admin()));

create policy "notifications_select_own_or_admin"
on public.notifications
for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "notifications_insert_admin"
on public.notifications
for insert
to authenticated
with check ((select private.is_admin()));

create policy "notifications_insert_rider_order_update"
on public.notifications
for insert
to authenticated
with check (
  related_order_id is not null
  and (select private.is_rider_notification_target(related_order_id, user_id))
);

create policy "notifications_update_own_or_admin"
on public.notifications
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

create policy "notifications_delete_admin"
on public.notifications
for delete
to authenticated
using ((select private.is_admin()));

create policy "audit_logs_select_admin"
on public.audit_logs
for select
to authenticated
using ((select private.is_admin()));

create policy "audit_logs_insert_actor_or_admin"
on public.audit_logs
for insert
to authenticated
with check (
  actor_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "app_settings_public_select"
on public.app_settings
for select
to anon
using (is_public = true);

create policy "app_settings_authenticated_select"
on public.app_settings
for select
to authenticated
using (
  is_public = true
  or (select private.is_admin())
);

create policy "app_settings_admin_insert"
on public.app_settings
for insert
to authenticated
with check ((select private.is_admin()));

create policy "app_settings_admin_update"
on public.app_settings
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "app_settings_admin_delete"
on public.app_settings
for delete
to authenticated
using ((select private.is_admin()));
