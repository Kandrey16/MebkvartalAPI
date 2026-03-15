import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
  @Field(() => String, { description: 'The name of the brand' })
  name: string;

  @Field(() => String, { description: 'The slug of the brand' })
  slug: string;
}
