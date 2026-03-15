import { Injectable } from '@nestjs/common';
import { CreateCommentType, UpdateCommentType } from '../schema/comment.schema';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(data: CreateCommentType) {
    return this.commentRepository.create(data);
  }

  async findAll() {
    return this.commentRepository.findAll();
  }

  async findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  async update(id: number, data: UpdateCommentType) {
    return this.commentRepository.update(id, data);
  }

  async remove(id: number) {
    return this.commentRepository.remove(id);
  }
}
