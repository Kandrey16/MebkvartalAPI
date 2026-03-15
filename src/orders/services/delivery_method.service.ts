import { Injectable } from '@nestjs/common';
import {
  CreateDeliveryMethodType,
  UpdateDeliveryMethodType,
} from '../schema/delivery_method.schema';
import { DeliveryMethodRepository } from '../repository/delivery_method.repository';

@Injectable()
export class DeliveryMethodService {
  constructor(
    private readonly deliveryMethodRepository: DeliveryMethodRepository,
  ) {}

  async create(data: CreateDeliveryMethodType) {
    return this.deliveryMethodRepository.create(data);
  }

  async findAll() {
    return this.deliveryMethodRepository.findAll();
  }

  async findOne(id: number) {
    return this.deliveryMethodRepository.findOne(id);
  }

  async update(id: number, data: UpdateDeliveryMethodType) {
    return this.deliveryMethodRepository.update(id, data);
  }

  async remove(id: number) {
    return this.deliveryMethodRepository.remove(id);
  }
}
