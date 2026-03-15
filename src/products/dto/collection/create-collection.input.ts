import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field(() => String, { description: 'The name of the collection' })
  name: string;

  @Field(() => String, { description: 'The slug of the collection' })
  slug: string;

  @Field(() => String, {
    description: 'The description of the collection',
    nullable: true,
  })
  description?: string;
}
