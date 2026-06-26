import { z } from 'zod';

import { SERVICE_AREAS } from '../constants/market';

export const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Select a delivery address.'),
  area: z.enum(SERVICE_AREAS),
  deliveryNotes: z.string().max(500).optional(),
  paymentMethod: z.enum(['orange_money', 'afrimoney', 'cash_on_delivery']),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
