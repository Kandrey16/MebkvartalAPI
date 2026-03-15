import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Collection {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field({ nullable: true })
  description: string;
}
