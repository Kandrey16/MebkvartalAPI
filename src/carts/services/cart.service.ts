import { Injectable } from '@nestjs/common';
import { CreateCartType, UpdateCartType } from '../schema/cart.schema';
import { CartRepository } from '../repository/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async create(data: CreateCartType) {
    return this.cartRepository.create(data);
  }

  async findAll() {
    return this.cartRepository.findAll();
  }

  async findOne(id: number) {
    return this.cartRepository.findOne(id);
  }

  async update(id: number, data: UpdateCartType) {
    return this.cartRepository.update(id, data);
  }

  async remove(id: number) {
    return this.cartRepository.remove(id);
  }
}
