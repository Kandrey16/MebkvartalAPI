import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartItemService } from '../services/cart_item.service';
import { CartItem } from '../model/cart_item.model';
import { CreateCartItemInput } from '../dto/cart_item/create-cart_item.input';
import { UpdateCartItemInput } from '../dto/cart_item/update-cart_item.input';
import {
  CartItemBaseSchema,
  UpdateCartItemSchema,
} from '../schema/cart_item.schema';

@Resolver(() => CartItem)
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) {}

  @Query(() => [CartItem], { name: 'cartItems' })
  findAll() {
    return this.cartItemService.findAll();
  }

  @Query(() => CartItem, { name: 'cartItem', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartItemService.findOne(id);
  }

  @Mutation(() => CartItem)
  createCartItem(@Args('input') input: CreateCartItemInput) {
    const data = CartItemBaseSchema.parse(input);
    return this.cartItemService.create(data);
  }

  @Mutation(() => CartItem)
  updateCartItem(@Args('input') input: UpdateCartItemInput) {
    const data = UpdateCartItemSchema.parse(input);
    return this.cartItemService.update(data.id, data);
  }

  @Mutation(() => CartItem)
  removeCartItem(@Args('id', { type: () => Int }) id: number) {
    return this.cartItemService.remove(id);
  }
}
