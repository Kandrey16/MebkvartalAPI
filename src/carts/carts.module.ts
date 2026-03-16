import { Module } from '@nestjs/common';
import { CartResolver } from './resolvers/cart.resolver';
import { CartItemResolver } from './resolvers/cart_item.resolver';
import { CartService } from './services/cart.service';
import { CartItemService } from './services/cart_item.service';
import { CartRepository } from './repository/cart.repository';
import { CartItemRepository } from './repository/cart_item.repository';

@Module({
  providers: [
    CartRepository,
    CartItemRepository,
    CartResolver,
    CartItemResolver,
    CartService,
    CartItemService,
  ],
})
export class CartsModule {}
