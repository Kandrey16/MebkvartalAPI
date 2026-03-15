import { Injectable } from '@nestjs/common';
import { CollectionRepository } from '../repository/collection.repository';
import {
  CreateCollectionType,
  UpdateCollectionType,
} from '../schema/collection.schema';

@Injectable()
export class CollectionService {
  constructor(private readonly collectionRepository: CollectionRepository) {}

  async create(data: CreateCollectionType) {
    return this.collectionRepository.create(data);
  }

  async findAll() {
    return this.collectionRepository.findAll();
  }

  async findOne(id: number) {
    return this.collectionRepository.findOne(id);
  }

  async update(id: number, data: UpdateCollectionType) {
    return this.collectionRepository.update(id, data);
  }

  async remove(id: number) {
    return this.collectionRepository.remove(id);
  }
}
