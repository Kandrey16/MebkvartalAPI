import z from 'zod';

export const CommentBaseSchema = z.object({
  mark: z
    .number()
    .int()
    .min(1, 'Mark must be at least 1')
    .max(5, 'Mark must be at most 5'),
  description: z.string().optional(),
  userId: z.string().min(1, 'User ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
});

export const CreateCommentSchema = CommentBaseSchema;

export const UpdateCommentSchema = CommentBaseSchema.partial().extend({
  id: z.number().int().positive(),
});

export type CreateCommentType = z.infer<typeof CreateCommentSchema>;
export type UpdateCommentType = z.infer<typeof UpdateCommentSchema>;
