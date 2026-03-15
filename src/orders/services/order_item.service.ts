import { Injectable } from '@nestjs/common';
import {
  CreateOrderItemType,
  UpdateOrderItemType,
} from '../schema/order_item.schema';
import { OrderItemRepository } from '../repository/order_item.repository';

@Injectable()
export class OrderItemService {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async create(data: CreateOrderItemType) {
    return this.orderItemRepository.create(data);
  }

  async findAll() {
    return this.orderItemRepository.findAll();
  }

  async findOne(id: number) {
    return this.orderItemRepository.findOne(id);
  }

  async update(id: number, data: UpdateOrderItemType) {
    return this.orderItemRepository.update(id, data);
  }

  async remove(id: number) {
    return this.orderItemRepository.remove(id);
  }
}
