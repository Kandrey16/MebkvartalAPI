import z from 'zod';

export const PaymentMethodBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const CreatePaymentMethodSchema = PaymentMethodBaseSchema;

export const UpdatePaymentMethodSchema =
  PaymentMethodBaseSchema.partial().extend({
    id: z.number().int().positive(),
  });

export type CreatePaymentMethodType = z.infer<typeof CreatePaymentMethodSchema>;
export type UpdatePaymentMethodType = z.infer<typeof UpdatePaymentMethodSchema>;
