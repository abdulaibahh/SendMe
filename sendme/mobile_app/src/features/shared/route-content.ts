import type { FeatureRouteSection } from './feature-route-screen';

type RouteContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: FeatureRouteSection[];
};

export const routeContent = {
  authLogin: {
    eyebrow: 'Authentication',
    title: 'Customer, rider, and admin login',
    description: 'Supabase Auth will power secure sign-in, session restore, and role routing.',
    sections: [
      {
        title: 'Phase 2 route contract',
        items: ['Email and password form surface', 'Password reset link', 'Role-aware redirect target'],
      },
    ],
  },
  authRegister: {
    eyebrow: 'Authentication',
    title: 'Customer registration',
    description: 'Public registration will always create customer accounts only.',
    sections: [
      {
        title: 'Security rules',
        items: ['No public admin or rider signup', 'Customer profile created after Supabase signup'],
      },
    ],
  },
  authForgotPassword: {
    eyebrow: 'Authentication',
    title: 'Password reset',
    description: 'Customers and operators can request Supabase password recovery emails.',
    sections: [
      {
        title: 'Recovery flow',
        items: ['Email capture', 'Recovery status message', 'Return to login route'],
      },
    ],
  },
  authOtp: {
    eyebrow: 'Authentication',
    title: 'OTP verification',
    description: 'Prepared route for phone or email verification once provider settings are live.',
    sections: [
      {
        title: 'Verification surface',
        items: ['Code entry', 'Resend action', 'Safe pending state'],
      },
    ],
  },
  customerHome: {
    eyebrow: 'Customer',
    title: 'Fresh market home',
    description: 'Entry point for shoppers to pick an area, browse categories, and find fresh items.',
    sections: [
      {
        title: 'Expected data',
        items: ['Greeting and area selector', 'Category cards', 'Fresh picks and popular products'],
      },
    ],
  },
  customerProducts: {
    eyebrow: 'Customer',
    title: 'Product browsing',
    description: 'Search and filter products by market category with prices in SLE.',
    sections: [
      {
        title: 'Catalog workflow',
        items: ['Category filter', 'Search by product name', 'Stock and availability status'],
      },
    ],
  },
  customerProductDetails: {
    eyebrow: 'Customer',
    title: 'Product details',
    description: 'Product quantity selection and add-to-cart path for a single market item.',
    sections: [
      {
        title: 'Detail workflow',
        items: ['Price and unit display', 'Quantity controls', 'Add to cart action'],
      },
    ],
  },
  customerCart: {
    eyebrow: 'Customer',
    title: 'Cart',
    description: 'Local-first cart state for market items before Supabase cart persistence.',
    sections: [
      {
        title: 'Cart math',
        items: ['Subtotal', 'Service fee', 'Delivery fee', 'Total in SLE'],
      },
    ],
  },
  customerCheckout: {
    eyebrow: 'Customer',
    title: 'Checkout',
    description: 'Address selection, delivery notes, payment method, and order summary.',
    sections: [
      {
        title: 'Checkout workflow',
        items: ['Saved address selector', 'Delivery note capture', 'Payment method selector'],
      },
    ],
  },
  customerPaymentInstructions: {
    eyebrow: 'Customer',
    title: 'Payment instructions',
    description: 'Manual Orange Money and Afrimoney reference capture before admin verification.',
    sections: [
      {
        title: 'Payment states',
        items: ['Awaiting verification for mobile money', 'Cash on delivery pending for COD'],
      },
    ],
  },
  customerOrders: {
    eyebrow: 'Customer',
    title: 'Order history',
    description: 'Customer order list with status, totals, and delivery progress.',
    sections: [
      {
        title: 'Order visibility',
        items: ['Own orders only', 'Status refresh', 'Tap through to tracking'],
      },
    ],
  },
  customerOrderTracking: {
    eyebrow: 'Customer',
    title: 'Order tracking',
    description: 'Timeline route for order status and rider delivery events.',
    sections: [
      {
        title: 'Timeline',
        items: ['Pending', 'Confirmed', 'Assigned', 'Out for delivery', 'Delivered'],
      },
    ],
  },
  customerNotifications: {
    eyebrow: 'Customer',
    title: 'Notifications',
    description: 'Customer notifications for payment, rider assignment, and delivery status.',
    sections: [
      {
        title: 'Notification sources',
        items: ['Supabase notification rows', 'Expo push tokens', 'Foreground notification handling'],
      },
    ],
  },
  customerProfile: {
    eyebrow: 'Customer',
    title: 'Customer profile',
    description: 'Account details, phone number, preferred area, and session actions.',
    sections: [
      {
        title: 'Profile data',
        items: ['Full name', 'Phone number', 'Default delivery area'],
      },
    ],
  },
  customerAddresses: {
    eyebrow: 'Customer',
    title: 'Delivery addresses',
    description: 'Saved delivery locations across Freetown areas for future orders.',
    sections: [
      {
        title: 'Address fields',
        items: ['Area', 'Street address', 'Landmark', 'Latitude and longitude'],
      },
    ],
  },
  riderDashboard: {
    eyebrow: 'Rider',
    title: 'Assigned deliveries',
    description: 'Riders see only orders assigned to them and update delivery progress.',
    sections: [
      {
        title: 'Rider queue',
        items: ['Assigned orders', 'Customer area', 'Payment status', 'Delivery notes'],
      },
    ],
  },
  riderOrderDetails: {
    eyebrow: 'Rider',
    title: 'Delivery order details',
    description: 'Rider view for customer address, items, total, and status controls.',
    sections: [
      {
        title: 'Status buttons',
        items: ['Start delivery', 'Mark out for delivery', 'Mark delivered'],
      },
    ],
  },
  riderProfile: {
    eyebrow: 'Rider',
    title: 'Rider profile',
    description: 'Rider identity, availability state, and completed delivery stats.',
    sections: [
      {
        title: 'Rider state',
        items: ['Offline', 'Available', 'Busy', 'Suspended'],
      },
    ],
  },
  adminDashboard: {
    eyebrow: 'Admin',
    title: 'Operations dashboard',
    description: 'Daily operational snapshot for SendMe order, revenue, and delivery activity.',
    sections: [
      {
        title: 'Dashboard metrics',
        items: ["Today's orders", 'Revenue', 'Active deliveries', 'Customer count'],
      },
    ],
  },
  adminOrders: {
    eyebrow: 'Admin',
    title: 'Order management',
    description: 'Search, filter, assign riders, verify payments, and cancel orders safely.',
    sections: [
      {
        title: 'Admin actions',
        items: ['Change order status', 'Assign rider', 'Verify manual payment', 'Cancel order'],
      },
    ],
  },
  adminOrderDetails: {
    eyebrow: 'Admin',
    title: 'Admin order details',
    description: 'Operational order record with customer, items, payment, rider, and audit context.',
    sections: [
      {
        title: 'Detail panels',
        items: ['Order items', 'Payment record', 'Delivery assignment', 'Audit trail'],
      },
    ],
  },
  adminProducts: {
    eyebrow: 'Admin',
    title: 'Product management',
    description: 'Create, edit, archive, and manage market item availability.',
    sections: [
      {
        title: 'Product controls',
        items: ['Price', 'Unit', 'Category', 'Stock', 'Image URL', 'Availability'],
      },
    ],
  },
  adminProductForm: {
    eyebrow: 'Admin',
    title: 'Product form',
    description: 'Structured product editing route with validation before Supabase writes.',
    sections: [
      {
        title: 'Validated fields',
        items: ['Name', 'Description', 'Price', 'Unit', 'Category', 'Stock'],
      },
    ],
  },
  adminCategories: {
    eyebrow: 'Admin',
    title: 'Category management',
    description: 'Manage the market category list shown to customers.',
    sections: [
      {
        title: 'Categories',
        items: ['Vegetables', 'Fruits', 'Rice', 'Meat', 'Fish', 'Household Items'],
      },
    ],
  },
  adminCustomers: {
    eyebrow: 'Admin',
    title: 'Customer management',
    description: 'View customer accounts and operational status.',
    sections: [
      {
        title: 'Customer controls',
        items: ['View details', 'Activate account', 'Suspend account'],
      },
    ],
  },
  adminRiders: {
    eyebrow: 'Admin',
    title: 'Rider management',
    description: 'Create rider profiles, set rider status, and assign deliveries.',
    sections: [
      {
        title: 'Rider controls',
        items: ['Create profile', 'Set availability', 'Assign to order'],
      },
    ],
  },
  adminReports: {
    eyebrow: 'Admin',
    title: 'Reports',
    description: 'Operational reporting for revenue, order status, customers, and riders.',
    sections: [
      {
        title: 'Report cards',
        items: ['Total revenue', 'Orders by status', 'Customer count', 'Completed deliveries'],
      },
    ],
  },
  adminAuditLogs: {
    eyebrow: 'Admin',
    title: 'Audit logs',
    description: 'Immutable operational events for payment, assignment, product, and order changes.',
    sections: [
      {
        title: 'Logged events',
        items: ['Payment verification', 'Rider assignment', 'Product changes', 'Order cancellation'],
      },
    ],
  },
  adminSettings: {
    eyebrow: 'Admin',
    title: 'Settings',
    description: 'Application settings for fees, service areas, and operational toggles.',
    sections: [
      {
        title: 'Settings groups',
        items: ['Service fee', 'Delivery fee', 'Supported areas', 'Maintenance notices'],
      },
    ],
  },
} satisfies Record<string, RouteContent>;
