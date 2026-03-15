import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDeliveryAddressType,
  UpdateDeliveryAddressType,
} from '../schema/delivery_address.schema';

@Injectable()
export class DeliveryAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDeliveryAddressType) {
    return this.prisma.deliveryAddress.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.deliveryAddress.findMany();
  }

  async findOne(id: number) {
    return this.prisma.deliveryAddress.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateDeliveryAddressType) {
    return this.prisma.deliveryAddress.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.deliveryAddress.delete({
      where: { id },
    });
  }
}
