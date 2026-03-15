import z from 'zod';

export const CartBaseSchema = z.object({
  userId: z.uuid('User ID must be a valid UUID'),
});

export const CreateCartSchema = CartBaseSchema;

export const UpdateCartSchema = CartBaseSchema.partial().extend({
  id: z.number().int().positive(),
});

export type CreateCartType = z.infer<typeof CreateCartSchema>;
export type UpdateCartType = z.infer<typeof UpdateCartSchema>;
