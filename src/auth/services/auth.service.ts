import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/schema/user.schema';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { Role } from '@prisma/client';
import { TokenService } from './token.service';
import { UserMapper } from 'src/users/dto/user.mapper';
import { UserService } from 'src/users/services/user.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(data: CreateUserType) {
    const candidate = await this.userService.findByEmail(data.email);

    if (candidate) {
      throw new Error('User with this email already exists');
    }

    const hashPassword = await argon2.hash(data.password);

    const activationLink = randomUUID();

    const user = await this.userService.create({
      ...data,
      password: hashPassword,
      activationLink,
      role: Role.USER,
    });

    await this.mailService.sendActivationMail(user.email, activationLink);

    const tokens = this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
      isActivated: user.isActivated,
    });

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user: UserMapper.toResponse(user) };
  }

  async activate(activationLink: string) {
    const user = await this.userService.findByActivationLink(activationLink);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userService.activateByLink(activationLink);

    return { message: 'User activated successfully' };
  }
}
