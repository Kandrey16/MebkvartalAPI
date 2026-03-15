import z from 'zod';

export const BrandBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
});

export const UpdateBrandSchema = BrandBaseSchema.partial().extend({
  id: z.int({ message: 'ID must be a number' }),
});

export type CreateBrandType = z.infer<typeof BrandBaseSchema>;
export type UpdateBrandType = z.infer<typeof UpdateBrandSchema>;
