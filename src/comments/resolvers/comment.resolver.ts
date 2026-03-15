import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from '../services/comment.service';
import { Comment } from '../model/comment.model';
import { CreateCommentInput } from '../dto/comment/create-comment.input';
import { UpdateCommentInput } from '../dto/comment/update-comment.input';
import {
  CommentBaseSchema,
  UpdateCommentSchema,
} from '../schema/comment.schema';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { name: 'comment', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  createComment(@Args('input') input: CreateCommentInput) {
    const data = CommentBaseSchema.parse(input);
    return this.commentService.create(data);
  }

  @Mutation(() => Comment)
  updateComment(@Args('input') input: UpdateCommentInput) {
    const data = UpdateCommentSchema.parse(input);
    return this.commentService.update(data.id, data);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }
}
