import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentType, UpdateCommentType } from '../schema/comment.schema';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentType) {
    return this.prisma.comment.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCommentType) {
    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
