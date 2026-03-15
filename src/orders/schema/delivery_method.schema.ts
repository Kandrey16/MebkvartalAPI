import z from 'zod';

export const DeliveryMethodBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
});

export const CreateDeliveryMethodSchema = DeliveryMethodBaseSchema;

export const UpdateDeliveryMethodSchema =
  DeliveryMethodBaseSchema.partial().extend({
    id: z.number().int().positive(),
  });

export type CreateDeliveryMethodType = z.infer<
  typeof CreateDeliveryMethodSchema
>;
export type UpdateDeliveryMethodType = z.infer<
  typeof UpdateDeliveryMethodSchema
>;
