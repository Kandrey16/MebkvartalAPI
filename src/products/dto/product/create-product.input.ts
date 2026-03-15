import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'The name of the product' })
  name: string;

  @Field(() => String, { description: 'The slug of the product' })
  slug: string;

  @Field(() => Number, { description: 'The price of the product' })
  price: number;

  @Field(() => String, {
    description: 'The description of the product',
    nullable: true,
  })
  description?: string;

  @Field(() => Number, {
    description: 'The available quantity of the product',
    nullable: true,
  })
  availableQuantity?: number;

  @Field(() => Boolean, {
    description: 'Whether the product is active',
    nullable: true,
  })
  isActive?: boolean;

  @Field(() => Int, { description: 'The ID of the brand' })
  brandId: number;

  @Field(() => Int, { description: 'The ID of the category' })
  categoryId: number;
}
