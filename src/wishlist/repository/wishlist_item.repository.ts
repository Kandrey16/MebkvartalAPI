import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWishlistItemType } from '../schema/wishlist_item.schema';

@Injectable()
export class WishlistItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWishlistItemType) {
    return this.prisma.wishlistItem.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.wishlistItem.findMany();
  }

  async findOne(userId: string, productId: string) {
    return this.prisma.wishlistItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }

  async remove(userId: string, productId: string) {
    return this.prisma.wishlistItem.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }
}
