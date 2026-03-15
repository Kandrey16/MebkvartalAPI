import z from 'zod';

export const CategoryAttributeGroupBaseSchema = z.object({
  categoryId: z
    .number()
    .int()
    .positive('Category ID must be a positive integer'),
  attributeGroupId: z
    .number()
    .int()
    .positive('Attribute group ID must be a positive integer'),
});

export const CreateCategoryAttributeGroupSchema =
  CategoryAttributeGroupBaseSchema;

export const DeleteCategoryAttributeGroupSchema =
  CategoryAttributeGroupBaseSchema;

export type CreateCategoryAttributeGroupType = z.infer<
  typeof CreateCategoryAttributeGroupSchema
>;
export type DeleteCategoryAttributeGroupType = z.infer<
  typeof DeleteCategoryAttributeGroupSchema
>;
