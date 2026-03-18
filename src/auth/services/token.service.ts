import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '../repository/token.repository';
import { ITokens } from '../entity/auth.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  generateTokens(payload: {
    id: string;
    email: string;
    isActivated: boolean;
    role: string;
  }): ITokens {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30s',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      return null;
    }
  }

  validateAccessToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch {
      return null;
    }
  }

  async createToken(
    userId: string,
    refreshToken: string,
    userAgent?: string,
    deviceId?: string,
  ) {
    return this.tokenRepository.createToken(
      userId,
      refreshToken,
      userAgent,
      deviceId,
    );
  }

  async rotateToken(
    tokenId: string,
    refreshToken: string,
    userAgent?: string,
    deviceId?: string,
  ) {
    return this.tokenRepository.rotateTokenById(
      tokenId,
      refreshToken,
      userAgent,
      deviceId,
    );
  }

  async findToken(refreshToken: string) {
    const tokenData =
      await this.tokenRepository.findByRefreshToken(refreshToken);
    return tokenData;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.removeToken(refreshToken);
    return tokenData;
  }
}
