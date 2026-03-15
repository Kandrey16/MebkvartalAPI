import z from 'zod';

export const ProductImageBaseSchema = z.object({
  url: z.url({ message: 'URL must be a valid URL' }).max(200),
  position: z.number().int().min(0, 'Position must be a non-negative integer'),
  isMain: z.boolean().default(false),
  productId: z.uuid({ message: 'Product ID must be a valid UUID' }),
});

export const CreateProductImageSchema = ProductImageBaseSchema;
export const UpdateProductImageSchema = ProductImageBaseSchema.partial().extend(
  { id: z.uuid({ message: 'ID must be a valid UUID' }) },
);

export type CreateProductImageType = z.infer<typeof CreateProductImageSchema>;
export type UpdateProductImageType = z.infer<typeof UpdateProductImageSchema>;
