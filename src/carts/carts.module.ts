import { Module } from '@nestjs/common';
import { CartResolver } from './resolvers/cart.resolver';
import { CartItemResolver } from './resolvers/cart_item.resolver';
import { CartService } from './services/cart.service';
import { CartItemService } from './services/cart_item.service';

@Module({
  providers: [CartResolver, CartItemResolver, CartService, CartItemService],
})
export class CartsModule {}
