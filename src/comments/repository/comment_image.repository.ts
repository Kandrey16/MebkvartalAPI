import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCommentImageType,
  UpdateCommentImageType,
} from '../schema/comment_image.schema';

@Injectable()
export class CommentImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentImageType) {
    return this.prisma.commentImage.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.commentImage.findMany();
  }

  async findOne(id: number) {
    return this.prisma.commentImage.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCommentImageType) {
    return this.prisma.commentImage.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.commentImage.delete({
      where: { id },
    });
  }
}
