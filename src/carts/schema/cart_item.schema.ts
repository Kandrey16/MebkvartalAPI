import z from 'zod';

export const CartItemBaseSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
  productId: z.uuid('Product ID must be a valid UUID'),
  cartId: z.number().int().positive('Cart ID must be a positive integer'),
});

export const CreateCartItemSchema = CartItemBaseSchema;

export const UpdateCartItemSchema = CartItemBaseSchema.partial().extend({
  id: z.number().int().positive(),
});

export type CreateCartItemType = z.infer<typeof CreateCartItemSchema>;
export type UpdateCartItemType = z.infer<typeof UpdateCartItemSchema>;
