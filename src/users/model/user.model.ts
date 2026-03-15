import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from './role.enum';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Role)
  role: Role;

  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String)
  phone: string;
}
