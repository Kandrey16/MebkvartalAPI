import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order.model';
import { CreateOrderInput } from '../dto/order/create-order.input';
import { UpdateOrderInput } from '../dto/order/update-order.input';
import { OrderBaseSchema, UpdateOrderSchema } from '../schema/order.schema';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  createOrder(@Args('input') input: CreateOrderInput) {
    const data = OrderBaseSchema.parse(input);
    return this.orderService.create(data);
  }

  @Mutation(() => Order)
  updateOrder(@Args('input') input: UpdateOrderInput) {
    const data = UpdateOrderSchema.parse(input);
    return this.orderService.update(data.id, data);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => ID }) id: string) {
    return this.orderService.remove(id);
  }
}
