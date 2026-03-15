import { Module } from '@nestjs/common';
import { WishlistItemResolver } from './resolvers/wishlist_item.resolver';
import { WishlistItemService } from './services/wishlist_item.service';
import { WishlistItemRepository } from './repository/wishlist_item.repository';

@Module({
  providers: [
    WishlistItemResolver,
    WishlistItemService,
    WishlistItemRepository,
  ],
})
export class WishlistModule {}
