import z from 'zod';

export const WishlistItemBaseSchema = z.object({
  userId: z.string().uuid('User ID must be a valid UUID'),
  productId: z.string().uuid('Product ID must be a valid UUID'),
});

export const CreateWishlistItemSchema = WishlistItemBaseSchema;

export const DeleteWishlistItemSchema = WishlistItemBaseSchema;

export type CreateWishlistItemType = z.infer<typeof CreateWishlistItemSchema>;
export type DeleteWishlistItemType = z.infer<typeof DeleteWishlistItemSchema>;
