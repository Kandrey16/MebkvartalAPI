import z from 'zod';

export const AttributeBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  attributeGroupId: z
    .number()
    .int()
    .positive('Attribute group ID must be a positive integer'),
});

export const CreateAttributeSchema = AttributeBaseSchema;

export const UpdateAttributeSchema = AttributeBaseSchema.partial().extend({
  id: z.number().int().positive(),
});

export type CreateAttributeType = z.infer<typeof CreateAttributeSchema>;
export type UpdateAttributeType = z.infer<typeof UpdateAttributeSchema>;
