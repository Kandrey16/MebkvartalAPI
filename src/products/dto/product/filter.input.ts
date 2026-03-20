import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductFilterInput {
  @Field(() => [String], { nullable: true })
  filters?: string[];
}
