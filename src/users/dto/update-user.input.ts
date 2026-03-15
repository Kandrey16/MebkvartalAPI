import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { SignInInput } from '../../auth/dto/signIn.input';

@InputType()
export class UpdateUserInput extends PartialType(SignInInput) {
  @Field(() => ID)
  id: string;
}
