import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentImageService } from '../services/comment_image.service';
import { CommentImage } from '../model/comment_image.model';
import { CreateCommentImageInput } from '../dto/comment_image/create-comment_image.input';
import { UpdateCommentImageInput } from '../dto/comment_image/update-comment_image.input';
import {
  CommentImageBaseSchema,
  UpdateCommentImageSchema,
} from '../schema/comment_image.schema';

@Resolver(() => CommentImage)
export class CommentImageResolver {
  constructor(private readonly commentImageService: CommentImageService) {}

  @Query(() => [CommentImage], { name: 'commentImages' })
  findAll() {
    return this.commentImageService.findAll();
  }

  @Query(() => CommentImage, { name: 'commentImage', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentImageService.findOne(id);
  }

  @Mutation(() => CommentImage)
  createCommentImage(@Args('input') input: CreateCommentImageInput) {
    const data = CommentImageBaseSchema.parse(input);
    return this.commentImageService.create(data);
  }

  @Mutation(() => CommentImage)
  updateCommentImage(@Args('input') input: UpdateCommentImageInput) {
    const data = UpdateCommentImageSchema.parse(input);
    return this.commentImageService.update(data.id, data);
  }

  @Mutation(() => CommentImage)
  removeCommentImage(@Args('id', { type: () => Int }) id: number) {
    return this.commentImageService.remove(id);
  }
}
