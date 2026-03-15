import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from '../services/cart.service';
import { Cart } from '../model/cart.model';
import { CreateCartInput } from '../dto/cart/create-cart.input';
import { UpdateCartInput } from '../dto/cart/update-cart.input';
import { CartBaseSchema, UpdateCartSchema } from '../schema/cart.schema';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => [Cart], { name: 'carts' })
  findAll() {
    return this.cartService.findAll();
  }

  @Query(() => Cart, { name: 'cart', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.findOne(id);
  }

  @Mutation(() => Cart)
  createCart(@Args('input') input: CreateCartInput) {
    const data = CartBaseSchema.parse(input);
    return this.cartService.create(data);
  }

  @Mutation(() => Cart)
  updateCart(@Args('input') input: UpdateCartInput) {
    const data = UpdateCartSchema.parse(input);
    return this.cartService.update(data.id, data);
  }

  @Mutation(() => Cart)
  removeCart(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.remove(id);
  }
}
