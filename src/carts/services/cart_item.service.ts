import { Injectable } from '@nestjs/common';
import {
  CreateCartItemType,
  UpdateCartItemType,
} from '../schema/cart_item.schema';
import { CartItemRepository } from '../repository/cart_item.repository';

@Injectable()
export class CartItemService {
  constructor(private readonly cartItemRepository: CartItemRepository) {}

  async create(data: CreateCartItemType) {
    return this.cartItemRepository.create(data);
  }

  async findAll() {
    return this.cartItemRepository.findAll();
  }

  async findOne(id: number) {
    return this.cartItemRepository.findOne(id);
  }

  async update(id: number, data: UpdateCartItemType) {
    return this.cartItemRepository.update(id, data);
  }

  async remove(id: number) {
    return this.cartItemRepository.remove(id);
  }
}
