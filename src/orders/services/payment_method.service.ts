import { Injectable } from '@nestjs/common';
import {
  CreatePaymentMethodType,
  UpdatePaymentMethodType,
} from '../schema/payment_method.schema';
import { PaymentMethodRepository } from '../repository/payment_method.repository';

@Injectable()
export class PaymentMethodService {
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async create(data: CreatePaymentMethodType) {
    return this.paymentMethodRepository.create(data);
  }

  async findAll() {
    return this.paymentMethodRepository.findAll();
  }

  async findOne(id: number) {
    return this.paymentMethodRepository.findOne(id);
  }

  async update(id: number, data: UpdatePaymentMethodType) {
    return this.paymentMethodRepository.update(id, data);
  }

  async remove(id: number) {
    return this.paymentMethodRepository.remove(id);
  }
}
