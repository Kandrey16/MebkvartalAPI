import z from 'zod';

export const ProductAttributeValueBaseSchema = z.object({
  productId: z.string().uuid('Product ID must be a valid UUID'),
  attributeValueId: z
    .number()
    .int()
    .positive('Attribute value ID must be a positive integer'),
});

export const CreateProductAttributeValueSchema =
  ProductAttributeValueBaseSchema;

export const DeleteProductAttributeValueSchema =
  ProductAttributeValueBaseSchema;

export type CreateProductAttributeValueType = z.infer<
  typeof CreateProductAttributeValueSchema
>;
export type DeleteProductAttributeValueType = z.infer<
  typeof DeleteProductAttributeValueSchema
>;
