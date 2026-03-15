import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateOrderItemType,
  UpdateOrderItemType,
} from '../schema/order_item.schema';

@Injectable()
export class OrderItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderItemType) {
    await this.prisma.orderItem.create({ data });
  }

  async findAll() {
    await this.prisma.orderItem.findMany();
  }

  async findOne(id: number) {
    await this.prisma.orderItem.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateOrderItemType) {
    await this.prisma.orderItem.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.prisma.orderItem.delete({
      where: { id },
    });
  }
}
