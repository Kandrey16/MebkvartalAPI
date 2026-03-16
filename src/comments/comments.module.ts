import { Module } from '@nestjs/common';
import { CommentResolver } from './resolvers/comment.resolver';
import { CommentImageResolver } from './resolvers/comment_image.resolver';
import { CommentService } from './services/comment.service';
import { CommentImageService } from './services/comment_image.service';
import { CommentRepository } from './repository/comment.repository';
import { CommentImageRepository } from './repository/comment_image.repository';

@Module({
  providers: [
    CommentRepository,
    CommentImageRepository,

    CommentResolver,
    CommentImageResolver,

    CommentService,
    CommentImageService,
  ],
})
export class CommentsModule {}
