import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { SignInInput } from '../../auth/dto/signIn.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UpdateUserSchema, UserSchema } from '../schema/user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'currentUser', nullable: true })
  findByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Mutation(() => User)
  signIn(@Args('input') input: SignInInput) {
    const data = UserSchema.parse(input);
    return this.userService.signIn(data);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    const data = UpdateUserSchema.parse(input);
    return this.userService.update(data.id, data);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }
}
