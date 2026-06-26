export type UserRole = 'customer' | 'rider' | 'admin';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'assigned'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'orange_money' | 'afrimoney' | 'cash_on_delivery';

export type PaymentStatus =
  | 'pending'
  | 'awaiting_verification'
  | 'verified'
  | 'failed'
  | 'cash_on_delivery_pending'
  | 'refunded';

export type RiderStatus = 'offline' | 'available' | 'busy' | 'suspended';

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stockQuantity: number;
  isAvailable: boolean;
  imageUrl?: string;
};

export type CartLine = {
  product: Product;
  quantity: number;
};

export type CartSummary = {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  total: number;
};

export type Address = {
  id: string;
  label: string;
  area: string;
  street: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
};

export type TimelineStep = {
  status: OrderStatus;
  label: string;
  description: string;
  completed: boolean;
};

export type Rider = {
  id: string;
  fullName: string;
  phone: string;
  status: RiderStatus;
};
