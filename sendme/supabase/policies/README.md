# SendMe Supabase Policies

The canonical row-level security definitions live in:

- `../migrations/002_rls_policies.sql`
- `../migrations/005_storage_and_devices.sql`

Policy summary:

- Customers can read and mutate only their own profile, addresses, cart, orders, payments, notifications, and devices.
- Public registration can create only `customer` profiles.
- Riders can read assigned deliveries and update assigned delivery/order status.
- Admins can manage operational data, verify payments, assign riders, manage catalog records, and read audit logs.
- Product and category reads are public only for active, available records.
- No mobile-facing policy requires or exposes a Supabase service-role key.
