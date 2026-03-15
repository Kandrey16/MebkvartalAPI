import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDeliveryMethodType,
  UpdateDeliveryMethodType,
} from '../schema/delivery_method.schema';

@Injectable()
export class DeliveryMethodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDeliveryMethodType) {
    await this.prisma.deliveryMethod.create({ data });
  }

  async findAll() {
    await this.prisma.deliveryMethod.findMany();
  }

  async findOne(id: number) {
    await this.prisma.deliveryMethod.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateDeliveryMethodType) {
    await this.prisma.deliveryMethod.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.prisma.deliveryMethod.delete({
      where: { id },
    });
  }
}
