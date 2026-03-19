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
import { AttributeGroupRepository } from './repository/attribute_group.repository';
import { CategoryAttributeGroupRepository } from './repository/category_attribute_group.repository';
import { AttributeRepository } from './repository/attribute.repository';
import { AttributeValueRepository } from './repository/attribute_value.repository';
import { ProductAttributeValueRepository } from './repository/product_attribute_value.repository';
import { CategoryRepository } from './repository/category.repository';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryService } from './services/category.service';

@Module({
  providers: [
    AttributeGroupRepository,
    CategoryAttributeGroupRepository,
    AttributeRepository,
    AttributeValueRepository,
    ProductAttributeValueRepository,
    CategoryRepository,

    AttributeGroupResolver,
    CategoryAttributeGroupResolver,
    AttributeResolver,
    AttributeValueResolver,
    ProductAttributeValueResolver,
    CategoryResolver,

    AttributeGroupService,
    CategoryAttributeGroupService,
    AttributeService,
    AttributeValueService,
    ProductAttributeValueService,
    CategoryService,
  ],
  exports: [
    AttributeGroupService,
    CategoryAttributeGroupService,
    AttributeService,
    AttributeValueService,
    ProductAttributeValueService,
    CategoryService,
  ],
})
export class AttributesModule {}
