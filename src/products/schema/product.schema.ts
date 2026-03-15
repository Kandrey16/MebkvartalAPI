import z from 'zod';

export const ProductBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  price: z.number().positive('Price must be a positive number'),
  description: z.string().optional(),
  availableQuantity: z.number().optional(),
  isActive: z.boolean().optional(),
  brandId: z
    .number('Category ID must be a number')
    .int()
    .positive('Category ID must be a positive integer'),
  categoryId: z
    .number('Category ID must be a number')
    .int()
    .positive('Category ID must be a positive integer'),
});

export const UpdateProductSchema = ProductBaseSchema.partial().extend({
  id: z.uuid(),
});

export type CreateProductType = z.infer<typeof ProductBaseSchema>;
export type UpdateProductType = z.infer<typeof UpdateProductSchema>;
