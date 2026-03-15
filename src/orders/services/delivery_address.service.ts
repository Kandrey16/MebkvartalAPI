import { Injectable } from '@nestjs/common';
import {
  CreateDeliveryAddressType,
  UpdateDeliveryAddressType,
} from '../schema/delivery_address.schema';
import { DeliveryAddressRepository } from '../repository/delivery_address.repository';

@Injectable()
export class DeliveryAddressService {
  constructor(
    private readonly deliveryAddressRepository: DeliveryAddressRepository,
  ) {}

  async create(data: CreateDeliveryAddressType) {
    return this.deliveryAddressRepository.create(data);
  }

  async findAll() {
    return this.deliveryAddressRepository.findAll();
  }

  async findOne(id: number) {
    return this.deliveryAddressRepository.findOne(id);
  }

  async update(id: number, data: UpdateDeliveryAddressType) {
    return this.deliveryAddressRepository.update(id, data);
  }

  async remove(id: number) {
    return this.deliveryAddressRepository.remove(id);
  }
}
