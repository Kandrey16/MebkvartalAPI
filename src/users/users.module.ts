import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { UserRepository } from './repository/user.repository';

@Module({
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService],
})
export class UsersModule {}
