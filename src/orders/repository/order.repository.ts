import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderType, UpdateOrderType } from '../schema/order.schema';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderType) {
    await this.prisma.order.create({
      data: {
        ...data,
        status: data.status ?? 'PENDING',
      },
    });
  }

  async findAll() {
    await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    await this.prisma.order.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateOrderType) {
    await this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
