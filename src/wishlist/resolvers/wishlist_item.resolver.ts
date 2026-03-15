import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WishlistItemService } from '../services/wishlist_item.service';
import { WishlistItem } from '../model/wishlist_item.model';
import { CreateWishlistItemInput } from '../dto/wishlist_item/create-wishlist_item.input';
import { DeleteWishlistItemInput } from '../dto/wishlist_item/delete-wishlist_item.input';
import {
  WishlistItemBaseSchema,
  DeleteWishlistItemSchema,
} from '../schema/wishlist_item.schema';

@Resolver(() => WishlistItem)
export class WishlistItemResolver {
  constructor(private readonly wishlistItemService: WishlistItemService) {}

  @Query(() => [WishlistItem], { name: 'wishlistItems' })
  findAll() {
    return this.wishlistItemService.findAll();
  }

  @Query(() => WishlistItem, { name: 'wishlistItem', nullable: true })
  findOne(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('productId', { type: () => ID }) productId: string,
  ) {
    return this.wishlistItemService.findOne(userId, productId);
  }

  @Mutation(() => WishlistItem)
  createWishlistItem(@Args('input') input: CreateWishlistItemInput) {
    const data = WishlistItemBaseSchema.parse(input);
    return this.wishlistItemService.create(data);
  }

  @Mutation(() => WishlistItem)
  removeWishlistItem(@Args('input') input: DeleteWishlistItemInput) {
    const data = DeleteWishlistItemSchema.parse(input);
    return this.wishlistItemService.remove(data.userId, data.productId);
  }
}
