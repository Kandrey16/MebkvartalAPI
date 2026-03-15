import { Module } from '@nestjs/common';
import { AttributeGroupResolver } from './resolvers/attribute_group.resolver';
import { CategoryAttributeGroupResolver } from './resolvers/category_attribute_group.resolver';
import { AttributeResolver } from './resolvers/attribute.resolver';
import { AttributeValueResolver } from './resolvers/attribute_value.resolver';
import { ProductAttributeValueResolver } from './resolvers/product_attribute_value.resolver';
import { AttributeGroupService } from './services/attribute_group.service';
import { CategoryAttributeGroupService } from './services/category_attribute_group.service';
import { AttributeService } from './services/attribute.service';
import { AttributeValueService } from './services/attribute_value.service';
import { ProductAttributeValueService } from './services/product_attribute_value.service';

@Module({
  providers: [
    AttributeGroupResolver,
    CategoryAttributeGroupResolver,
    AttributeResolver,
    AttributeValueResolver,
    ProductAttributeValueResolver,

    AttributeGroupService,
    CategoryAttributeGroupService,
    AttributeService,
    AttributeValueService,
    ProductAttributeValueService,
  ],
})
export class AttributesModule {}
