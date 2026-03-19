import z from 'zod';

export const CategoryBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  parentId: z.number().positive().optional(),
});

export const CreateCategorySchema = CategoryBaseSchema;
export const UpdateCategorySchema = CategoryBaseSchema.partial().extend({
  id: z.number().int().positive(),
});

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
