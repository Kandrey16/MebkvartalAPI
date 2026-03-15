import z from 'zod';

export const OrderItemBaseSchema = z.object({
  orderId: z.uuid('Order ID must be a valid UUID'),
  productId: z.uuid('Product ID must be a valid UUID'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  price: z.number().positive('Price must be positive'),
});

export const CreateOrderItemSchema = OrderItemBaseSchema;

export const UpdateOrderItemSchema = OrderItemBaseSchema.partial().extend({
  id: z.number().int().positive(),
});

export type CreateOrderItemType = z.infer<typeof CreateOrderItemSchema>;
export type UpdateOrderItemType = z.infer<typeof UpdateOrderItemSchema>;
