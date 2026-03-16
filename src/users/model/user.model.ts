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

  @Field(() => Boolean)
  isActivated: boolean;

  @Field(() => Role)
  role: Role;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;
}
