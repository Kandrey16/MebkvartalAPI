import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Brand {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;
}
