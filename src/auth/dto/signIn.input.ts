import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../users/model/role.enum';

@InputType()
export class SignInInput {
  @Field(() => String, { description: 'The email of the user' })
  email: string;

  @Field(() => String, { description: 'The password of the user' })
  password: string;

  @Field(() => String, { description: 'The name of the user', nullable: true })
  name?: string;

  @Field(() => String, {
    description: 'The surname of the user',
    nullable: true,
  })
  surname?: string;

  @Field(() => Role, {
    description: 'The role of the user',
    nullable: true,
  })
  role?: Role;

  @Field(() => String, {
    description: 'The image URL of the user',
    nullable: true,
  })
  imageUrl?: string;

  @Field(() => String, {
    description: 'The phone number of the user',
    nullable: true,
  })
  phoneNumber?: string;
}
