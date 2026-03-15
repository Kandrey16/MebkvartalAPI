import { Injectable } from '@nestjs/common';
import { CreateOrderType, UpdateOrderType } from '../schema/order.schema';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(data: CreateOrderType) {
    return this.orderRepository.create(data);
  }

  async findAll() {
    return this.orderRepository.findAll();
  }

  async findOne(id: string) {
    return this.orderRepository.findOne(id);
  }

  async update(id: string, data: UpdateOrderType) {
    return this.orderRepository.update(id, data);
  }

  async remove(id: string) {
    return this.orderRepository.remove(id);
  }
}
