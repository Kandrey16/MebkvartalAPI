import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductImageInput {
  @Field(() => String, { description: 'The URL of the product image' })
  url: string;
  @Field(() => Number, { description: 'The position of the product image' })
  position: number;
  @Field(() => Boolean, {
    description: 'Whether the product image is the main image',
  })
  isMain: boolean;
}
