import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => Number, { nullable: true })
  parentId?: number;
}
