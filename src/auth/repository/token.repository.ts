import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { userId: string; refreshToken: string }) {
    return this.prisma.token.create({ data });
  }

  async findToken(userId: string) {
    return this.prisma.token.findFirst({
      where: { userId },
    });
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.findToken(userId);
    if (tokenData) {
      return this.prisma.token.update({
        where: { id: tokenData.id },
        data: { refreshToken },
      });
    }
    return this.create({ userId, refreshToken });
  }
}
