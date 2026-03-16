import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/model/user.model';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

@ObjectType()
export class Auth {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => User)
  user: User;
}
