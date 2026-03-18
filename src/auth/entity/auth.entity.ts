import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/model/user.model';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export type JwtPayload = {
  id: string;
  email: string;
  isActivated: boolean;
  role?: string;
};

@ObjectType()
export class Auth {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class LogOutPayload {
  @Field(() => String)
  message: string;
}
