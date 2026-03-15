import z from 'zod';

export const DeliveryAddressBaseSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  entrance: z.string().optional(),
  floor: z.string().optional(),
  intercom: z.string().optional(),
  userId: z.uuid('User ID must be a valid UUID'),
});

export const CreateDeliveryAddressSchema = DeliveryAddressBaseSchema;

export const UpdateDeliveryAddressSchema =
  DeliveryAddressBaseSchema.partial().extend({
    id: z.number().int().positive(),
  });

export type CreateDeliveryAddressType = z.infer<
  typeof CreateDeliveryAddressSchema
>;
export type UpdateDeliveryAddressType = z.infer<
  typeof UpdateDeliveryAddressSchema
>;
