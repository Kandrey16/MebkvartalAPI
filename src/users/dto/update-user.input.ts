import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { SignUpInput } from '../../auth/dto/signUp.input';

@InputType()
export class UpdateUserInput extends PartialType(SignUpInput) {
  @Field(() => ID)
  id: string;
}
