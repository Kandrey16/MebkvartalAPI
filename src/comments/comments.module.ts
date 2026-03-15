import { Module } from '@nestjs/common';
import { CommentResolver } from './resolvers/comment.resolver';
import { CommentImageResolver } from './resolvers/comment_image.resolver';
import { CommentService } from './services/comment.service';
import { CommentImageService } from './services/comment_image.service';

@Module({
  providers: [
    CommentResolver,
    CommentImageResolver,

    CommentService,
    CommentImageService,
  ],
})
export class CommentsModule {}
