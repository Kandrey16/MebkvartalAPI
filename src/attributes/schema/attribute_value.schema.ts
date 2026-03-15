import z from 'zod';

export const AttributeValueBaseSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  slug: z.string().min(1, 'Slug is required'),
  attributeId: z
    .number()
    .int()
    .positive('Attribute ID must be a positive integer'),
});

export const CreateAttributeValueSchema = AttributeValueBaseSchema;

export const UpdateAttributeValueSchema =
  AttributeValueBaseSchema.partial().extend({
    id: z.number().int().positive(),
  });

export type CreateAttributeValueType = z.infer<
  typeof CreateAttributeValueSchema
>;
export type UpdateAttributeValueType = z.infer<
  typeof UpdateAttributeValueSchema
>;
