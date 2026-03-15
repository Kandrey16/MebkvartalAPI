import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateCollectionType,
  UpdateCollectionType,
} from '../schema/collection.schema';

@Injectable()
export class CollectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCollectionType) {
    return this.prisma.collection.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.collection.findMany();
  }

  async findOne(id: number) {
    return this.prisma.collection.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCollectionType) {
    return this.prisma.collection.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.collection.delete({
      where: { id },
    });
  }
}
