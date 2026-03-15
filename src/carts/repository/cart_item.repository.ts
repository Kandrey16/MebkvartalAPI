import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCartItemType,
  UpdateCartItemType,
} from '../schema/cart_item.schema';

@Injectable()
export class CartItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCartItemType) {
    return this.prisma.cartItem.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.cartItem.findMany();
  }

  async findOne(id: number) {
    return this.prisma.cartItem.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCartItemType) {
    return this.prisma.cartItem.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }
}
