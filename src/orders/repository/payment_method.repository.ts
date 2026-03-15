import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePaymentMethodType,
  UpdatePaymentMethodType,
} from '../schema/payment_method.schema';

@Injectable()
export class PaymentMethodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePaymentMethodType) {
    return this.prisma.paymentMethod.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.paymentMethod.findMany();
  }

  async findOne(id: number) {
    return this.prisma.paymentMethod.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdatePaymentMethodType) {
    return this.prisma.paymentMethod.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
