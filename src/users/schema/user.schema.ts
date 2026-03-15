import z from 'zod';

const UserBaseSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'USER', 'GUEST']).optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  imageUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const UserSchema = UserBaseSchema;

export const LoginUserSchema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const UpdateUserSchema = UserBaseSchema.partial().extend({
  id: z.uuid('ID must be a valid UUID'),
});

export type CreateUserType = z.infer<typeof UserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
