import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserType, LoginUserType } from 'src/users/schema/user.schema';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { Role, User } from '@prisma/client';
import { TokenService } from './token.service';
import { UserMapper } from 'src/users/dto/user.mapper';
import { UserService } from 'src/users/services/user.service';
import { MailService } from 'src/mail/mail.service';
import { IDeviceInfo } from '../types/device.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  private async issueTokens(user: User, deviceInfo: IDeviceInfo) {
    const tokens = this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
      isActivated: user.isActivated,
      role: user.role,
    });
    await this.tokenService.createToken(
      user.id,
      tokens.refreshToken,
      deviceInfo.userAgent,
      deviceInfo.deviceId,
    );

    return { ...tokens, user: UserMapper.toResponse(user) };
  }

  async registration(data: CreateUserType, deviceInfo: IDeviceInfo) {
    const candidate = await this.userService.findByEmail(data.email);
    if (candidate) {
      throw new BadRequestException('User with this email already exists');
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

    return this.issueTokens(user, deviceInfo);
  }

  async login(data: LoginUserType, deviceInfo: IDeviceInfo) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, data.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.issueTokens(user, deviceInfo);
  }

  async activate(activationLink: string) {
    const user = await this.userService.findByActivationLink(activationLink);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userService.activateByLink(activationLink);
    return { message: 'User activated successfully' };
  }

  async refresh(refreshToken: string, deviceInfo: IDeviceInfo) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }
    if (!deviceInfo.userAgent || !deviceInfo.deviceId) {
      throw new BadRequestException('Invalid device information');
    }

    const payload = this.tokenService.validateRefreshToken(refreshToken);
    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!tokenFromDb) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findOne(tokenFromDb.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const tokens = this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
      isActivated: user.isActivated,
      role: user.role,
    });

    await this.tokenService.rotateToken(
      tokenFromDb.id,
      tokens.refreshToken,
      deviceInfo.userAgent,
      deviceInfo.deviceId,
    );

    return { ...tokens, user: UserMapper.toResponse(user) };
  }

  async logOut(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken);
    return { message: 'User logged out successfully' };
  }
}
