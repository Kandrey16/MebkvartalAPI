import z from 'zod';

const orderStatusEnum = z.enum([
  'PENDING',
  'PAID',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'PROCESSING',
  'READY_FOR_PICKUP',
  'RETURNED',
]);

export const OrderBaseSchema = z.object({
  number: z.string().min(1, 'Order number is required'),
  totalPrice: z.number().positive('Total price must be positive'),
  status: orderStatusEnum.optional(),
  userId: z.uuid('User ID must be a valid UUID'),
  addressId: z.number().int().positive('Address ID must be a positive integer'),
  paymentMethodId: z
    .number()
    .int()
    .positive('Payment method ID must be a positive integer'),
  deliveryMethodId: z
    .number()
    .int()
    .positive('Delivery method ID must be a positive integer'),
});

export const CreateOrderSchema = OrderBaseSchema;

export const UpdateOrderSchema = OrderBaseSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateOrderType = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderType = z.infer<typeof UpdateOrderSchema>;
