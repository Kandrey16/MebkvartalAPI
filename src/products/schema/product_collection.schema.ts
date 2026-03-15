import z from 'zod';

export const ProductCollectionBaseSchema = z.object({
  productId: z.uuid({ message: 'Product ID must be a valid UUID' }),
  collectionId: z
    .number('Collection ID must be a number')
    .int()
    .positive('Collection ID must be a positive integer'),
});

export type CreateProductCollectionType = z.infer<
  typeof ProductCollectionBaseSchema
>;

export const DeleteProductCollectionSchema = ProductCollectionBaseSchema;
export type DeleteProductCollectionType = CreateProductCollectionType;
