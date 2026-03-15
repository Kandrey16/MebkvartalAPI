import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartType, UpdateCartType } from '../schema/cart.schema';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCartType) {
    return this.prisma.cart.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.cart.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.cart.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCartType) {
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.cart.delete({
      where: { id },
    });
  }
}
