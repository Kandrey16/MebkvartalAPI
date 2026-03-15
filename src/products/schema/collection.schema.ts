import z from 'zod';

export const CollectionBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
});

export const UpdateCollectionSchema = CollectionBaseSchema.partial().extend({
  id: z.int({ message: 'ID must be a number' }),
});

export type CreateCollectionType = z.infer<typeof CollectionBaseSchema>;
export type UpdateCollectionType = z.infer<typeof UpdateCollectionSchema>;
