import z from 'zod';

export const CommentImageBaseSchema = z.object({
  url: z.url({ message: 'URL must be a valid URL' }),
  commentId: z.number().int().positive('Comment ID must be a positive integer'),
});

export const CreateCommentImageSchema = CommentImageBaseSchema;

export const UpdateCommentImageSchema = CommentImageBaseSchema.partial().extend(
  {
    id: z.number().int().positive('ID must be a positive integer'),
  },
);

export type CreateCommentImageType = z.infer<typeof CreateCommentImageSchema>;
export type UpdateCommentImageType = z.infer<typeof UpdateCommentImageSchema>;
