-- SendMe query and RLS performance indexes.
-- Foreign keys are indexed explicitly because PostgreSQL does not create those
-- indexes automatically.

create extension if not exists pg_trgm;

create unique index if not exists users_phone_unique_idx
on public.users (phone)
where phone is not null;

create index if not exists users_role_active_idx
on public.users (role, is_active);

create index if not exists addresses_user_id_idx
on public.addresses (user_id);

create index if not exists addresses_user_default_idx
on public.addresses (user_id)
where is_default = true;

create index if not exists addresses_area_idx
on public.addresses (area);

create index if not exists categories_active_sort_idx
on public.categories (sort_order, name)
where is_active = true;

create index if not exists products_category_id_idx
on public.products (category_id);

create index if not exists products_available_category_idx
on public.products (category_id, name)
where is_available = true and archived_at is null;

create index if not exists products_name_trgm_idx
on public.products using gin (name gin_trgm_ops);

create index if not exists carts_user_id_idx
on public.carts (user_id);

create unique index if not exists carts_one_active_per_user_idx
on public.carts (user_id)
where status = 'active';

create index if not exists cart_items_cart_id_idx
on public.cart_items (cart_id);

create index if not exists cart_items_product_id_idx
on public.cart_items (product_id);

create index if not exists orders_customer_id_idx
on public.orders (customer_id);

create index if not exists orders_address_id_idx
on public.orders (address_id);

create index if not exists orders_status_created_idx
on public.orders (status, created_at desc);

create index if not exists orders_customer_status_idx
on public.orders (customer_id, status, created_at desc);

create index if not exists orders_pending_idx
on public.orders (created_at desc)
where status in ('pending', 'confirmed', 'processing', 'assigned', 'out_for_delivery');

create index if not exists order_items_order_id_idx
on public.order_items (order_id);

create index if not exists order_items_product_id_idx
on public.order_items (product_id);

create index if not exists payments_order_id_idx
on public.payments (order_id);

create index if not exists payments_customer_id_idx
on public.payments (customer_id);

create index if not exists payments_status_created_idx
on public.payments (status, created_at desc);

create index if not exists payments_provider_reference_idx
on public.payments (provider_reference)
where provider_reference is not null;

create index if not exists riders_user_id_idx
on public.riders (user_id);

create index if not exists riders_status_area_idx
on public.riders (status, current_area);

create index if not exists deliveries_order_id_idx
on public.deliveries (order_id);

create index if not exists deliveries_rider_id_idx
on public.deliveries (rider_id);

create index if not exists deliveries_status_idx
on public.deliveries (status, assigned_at desc);

create index if not exists notifications_user_unread_idx
on public.notifications (user_id, created_at desc)
where is_read = false;

create index if not exists notifications_related_order_id_idx
on public.notifications (related_order_id);

create index if not exists audit_logs_actor_id_idx
on public.audit_logs (actor_id);

create index if not exists audit_logs_entity_idx
on public.audit_logs (entity_type, entity_id);

create index if not exists audit_logs_created_at_idx
on public.audit_logs (created_at desc);

create index if not exists app_settings_public_idx
on public.app_settings (key)
where is_public = true;
