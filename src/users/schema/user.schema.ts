import z from 'zod';

const UserBaseSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'USER', 'GUEST']).optional(),
  activationLink: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  imageUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const LoginUserSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const RegistrationSchema = UserBaseSchema.extend({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const UpdateUserSchema = UserBaseSchema.partial().extend({
  id: z.uuid('ID must be a valid UUID'),
});

export type CreateUserType = z.infer<typeof RegistrationSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
