import z from 'zod';

export const AttributeGroupBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const CreateAttributeGroupSchema = AttributeGroupBaseSchema;

export const UpdateAttributeGroupSchema =
  AttributeGroupBaseSchema.partial().extend({
    id: z.number().int().positive(),
  });

export type CreateAttributeGroupType = z.infer<
  typeof CreateAttributeGroupSchema
>;
export type UpdateAttributeGroupType = z.infer<
  typeof UpdateAttributeGroupSchema
>;
