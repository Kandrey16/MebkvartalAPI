import { Injectable } from '@nestjs/common';
import { CreateWishlistItemType } from '../schema/wishlist_item.schema';
import { WishlistItemRepository } from '../repository/wishlist_item.repository';

@Injectable()
export class WishlistItemService {
  constructor(
    private readonly wishlistItemRepository: WishlistItemRepository,
  ) {}

  async create(data: CreateWishlistItemType) {
    return this.wishlistItemRepository.create(data);
  }

  async findAll() {
    return this.wishlistItemRepository.findAll();
  }

  async findOne(userId: string, productId: string) {
    return this.wishlistItemRepository.findOne(userId, productId);
  }

  async remove(userId: string, productId: string) {
    return this.wishlistItemRepository.remove(userId, productId);
  }
}
