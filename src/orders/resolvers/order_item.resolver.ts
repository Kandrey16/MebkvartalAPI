import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderItemService } from '../services/order_item.service';
import { OrderItem } from '../model/order_item.model';
import { CreateOrderItemInput } from '../dto/order_item/create-order_item.input';
import { UpdateOrderItemInput } from '../dto/order_item/update-order_item.input';
import {
  OrderItemBaseSchema,
  UpdateOrderItemSchema,
} from '../schema/order_item.schema';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Query(() => [OrderItem], { name: 'orderItems' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Query(() => OrderItem, { name: 'orderItem', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemService.findOne(id);
  }

  @Mutation(() => OrderItem)
  createOrderItem(@Args('input') input: CreateOrderItemInput) {
    const data = OrderItemBaseSchema.parse(input);
    return this.orderItemService.create(data);
  }

  @Mutation(() => OrderItem)
  updateOrderItem(@Args('input') input: UpdateOrderItemInput) {
    const data = UpdateOrderItemSchema.parse(input);
    return this.orderItemService.update(data.id, data);
  }

  @Mutation(() => OrderItem)
  removeOrderItem(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemService.remove(id);
  }
}
