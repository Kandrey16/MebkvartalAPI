import { Injectable } from '@nestjs/common';
import {
  CreateCommentImageType,
  UpdateCommentImageType,
} from '../schema/comment_image.schema';
import { CommentImageRepository } from '../repository/comment_image.repository';

@Injectable()
export class CommentImageService {
  constructor(
    private readonly commentImageRepository: CommentImageRepository,
  ) {}

  async create(data: CreateCommentImageType) {
    return this.commentImageRepository.create(data);
  }

  async findAll() {
    return this.commentImageRepository.findAll();
  }

  async findOne(id: number) {
    return this.commentImageRepository.findOne(id);
  }

  async update(id: number, data: UpdateCommentImageType) {
    return this.commentImageRepository.update(id, data);
  }

  async remove(id: number) {
    return this.commentImageRepository.remove(id);
  }
}
