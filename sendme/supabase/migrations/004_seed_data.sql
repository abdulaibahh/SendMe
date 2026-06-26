-- SendMe Sierra Leone seed data.
-- Demo rider rows are operational profiles only. Link them to Auth users later
-- through a protected admin flow by setting riders.user_id and users.role.

insert into public.categories (name, slug, description, sort_order, is_active)
values
  ('Vegetables', 'vegetables', 'Fresh market vegetables sourced from Freetown markets.', 10, true),
  ('Fruits', 'fruits', 'Seasonal fruits for homes and offices.', 20, true),
  ('Rice', 'rice', 'Everyday rice options for families and small businesses.', 30, true),
  ('Meat', 'meat', 'Fresh meat packs prepared for delivery.', 40, true),
  ('Fish', 'fish', 'Fresh and smoked fish options from trusted sellers.', 50, true),
  ('Cooking Ingredients', 'cooking-ingredients', 'Oil, seasoning, pepper, and cooking staples.', 60, true),
  ('Household Items', 'household-items', 'Essential household and cleaning items.', 70, true),
  ('Beverages', 'beverages', 'Soft drinks, water, and refreshment packs.', 80, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.products (
  category_id,
  name,
  slug,
  description,
  price,
  unit,
  stock_quantity,
  image_url,
  is_available
)
select c.id, 'Fresh Tomatoes', 'fresh-tomatoes', 'Fresh tomatoes selected from local market baskets.', 45.00, 'basket', 60, null, true
from public.categories as c
where c.slug = 'vegetables'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.products (category_id, name, slug, description, price, unit, stock_quantity, image_url, is_available)
select c.id, 'Onions Red', 'onions-red', 'Red onions sold by kilogram for everyday cooking.', 25.00, 'kg', 80, null, true
from public.categories as c
where c.slug = 'vegetables'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.products (category_id, name, slug, description, price, unit, stock_quantity, image_url, is_available)
select c.id, 'Cabbage', 'cabbage', 'Fresh cabbage sold by head.', 20.00, 'head', 50, null, true
from public.categories as c
where c.slug = 'vegetables'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.products (category_id, name, slug, description, price, unit, stock_quantity, image_url, is_available)
select c.id, 'Rice', 'rice-bag', 'Family rice bag for regular home meals.', 120.00, 'bag', 45, null, true
from public.categories as c
where c.slug = 'rice'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.products (category_id, name, slug, description, price, unit, stock_quantity, image_url, is_available)
select c.id, 'Fish', 'fish-pack', 'Fresh fish pack selected for home delivery.', 80.00, 'pack', 40, null, true
from public.categories as c
where c.slug = 'fish'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.products (category_id, name, slug, description, price, unit, stock_quantity, image_url, is_available)
select c.id, 'Meat', 'meat-pack', 'Fresh meat pack for stews and family meals.', 100.00, 'pack', 35, null, true
from public.categories as c
where c.slug = 'meat'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.products (category_id, name, slug, description, price, unit, stock_quantity, image_url, is_available)
select c.id, 'Cooking Oil', 'cooking-oil', 'Cooking oil bottle for home and small shop use.', 65.00, 'bottle', 70, null, true
from public.categories as c
where c.slug = 'cooking-ingredients'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.products (category_id, name, slug, description, price, unit, stock_quantity, image_url, is_available)
select c.id, 'Soft Drinks', 'soft-drinks', 'Assorted soft drink pack for family meals and gatherings.', 30.00, 'pack', 90, null, true
from public.categories as c
where c.slug = 'beverages'
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  unit = excluded.unit,
  stock_quantity = excluded.stock_quantity,
  is_available = excluded.is_available,
  updated_at = now();

insert into public.riders (full_name, phone, status, current_area)
values
  ('Ibrahim Kamara', '+23276100001', 'available', 'Lumley'),
  ('Alpha Jalloh', '+23276100002', 'available', 'Aberdeen'),
  ('Amadu Bah', '+23276100003', 'offline', 'Wilberforce'),
  ('Mohamed Kanu', '+23276100004', 'available', 'Congo Cross'),
  ('Sulaiman Turay', '+23276100005', 'busy', 'Hill Station'),
  ('Joseph Conteh', '+23276100006', 'offline', 'Kissy')
on conflict (phone) do update set
  full_name = excluded.full_name,
  status = excluded.status,
  current_area = excluded.current_area,
  updated_at = now();

insert into public.app_settings (key, value, description, is_public)
values
  (
    'currency',
    '{"code":"SLE","symbol":"SLE","minor_unit":2}'::jsonb,
    'Primary currency for SendMe Sierra Leone.',
    true
  ),
  (
    'service_areas',
    '["Lumley","Aberdeen","Wilberforce","Congo Cross","Hill Station","Kissy","Juba","Murray Town"]'::jsonb,
    'Initial SendMe delivery coverage areas in Freetown.',
    true
  ),
  (
    'fees',
    '{"service_fee_rate":0.05,"minimum_service_fee":5,"base_delivery_fee":20,"currency":"SLE"}'::jsonb,
    'Default fee settings used by the mobile app until overridden.',
    false
  ),
  (
    'payment_instructions',
    '{"orange_money":"Enter the Orange Money reference after payment. Add the live merchant number only after official credentials are provided.","afrimoney":"Enter the Afrimoney transaction reference after payment. Add the live merchant number only after official credentials are provided.","cash_on_delivery":"Customer pays the rider or SendMe representative at delivery."}'::jsonb,
    'Public customer payment instructions. Live merchant credentials are intentionally excluded.',
    true
  ),
  (
    'support',
    '{"country":"Sierra Leone","city":"Freetown","email":"support@example.com","phone":"+23200000000"}'::jsonb,
    'Public customer support placeholders to replace before production launch.',
    true
  )
on conflict (key) do update set
  value = excluded.value,
  description = excluded.description,
  is_public = excluded.is_public,
  updated_at = now();
