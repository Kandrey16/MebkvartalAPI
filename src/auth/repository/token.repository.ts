import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { userId: string; refreshToken: string }) {
    return this.prisma.token.create({ data });
  }

  async createToken(
    userId: string,
    refreshToken: string,
    userAgent?: string,
    deviceId?: string,
  ) {
    if (userAgent && deviceId) {
      const existing = await this.prisma.token.findFirst({
        where: { userId, userAgent, deviceId } as any,
      });

      if (existing) {
        return this.prisma.token.update({
          where: { id: existing.id },
          data: {
            refreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });
      }
    }

    // Limit to 5 devices per user
    // Add derceasing order to get the oldest token first
    const maxTokens = 5;
    const tokenCount = await this.prisma.token.count({ where: { userId } });

    const overflow = tokenCount - (maxTokens - 1); // Calculate how many tokens to remove
    if (overflow > 0) {
      const olderstTokens = await this.prisma.token.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        take: overflow,
      });

      await this.prisma.token.deleteMany({
        where: { id: { in: olderstTokens.map((t) => t.id) } },
      });
    }

    return this.prisma.token.create({
      data: {
        userId,
        refreshToken,
        userAgent,
        deviceId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiration to 30 days
      },
    });
  }

  async rotateTokenById(
    tokenId: string,
    refreshToken: string,
    userAgent?: string,
    deviceId?: string,
  ) {
    return this.prisma.token.update({
      where: { id: tokenId },
      data: {
        refreshToken: refreshToken,
        userAgent: userAgent,
        deviceId: deviceId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiration to 30 days
      },
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return this.prisma.token.findFirst({
      where: { refreshToken },
    });
  }

  async removeToken(refreshToken: string) {
    return this.prisma.token.deleteMany({
      where: { refreshToken },
    });
  }
}
