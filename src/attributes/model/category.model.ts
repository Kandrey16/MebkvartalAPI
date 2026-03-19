import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  parentId?: number;
}
