import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { Auth } from '../entity/auth.entity';
import { SignUpInput } from '../dto/signUp.input';
import { RegistrationSchema } from 'src/users/schema/user.schema';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signUp(
    @Args('input') input: SignUpInput,
    @Context() ctx: { res: Response },
  ) {
    const data = RegistrationSchema.parse(input);
    const userData = await this.authService.registration(data);
    ctx.res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return userData;
  }
}
