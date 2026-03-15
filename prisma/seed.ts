import { PrismaClient } from './generated/prisma/client';
import { OrderStatus, Role } from './generated/prisma/enums';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  // Users
  await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        password: 'password1',
        role: Role.USER,
        name: 'User',
        surname: 'One',
      },
      {
        email: 'user2@example.com',
        password: 'password2',
        role: Role.USER,
        name: 'User',
        surname: 'Two',
      },
      {
        email: 'user3@example.com',
        password: 'password3',
        role: Role.USER,
      },
      {
        email: 'admin1@example.com',
        password: 'password4',
        role: Role.ADMIN,
        name: 'Admin',
        surname: 'One',
      },
      {
        email: 'guest1@example.com',
        password: 'password5',
        role: Role.GUEST,
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  // Categories
  await prisma.category.createMany({
    data: [
      { name: 'Living Room', slug: 'living-room' },
      { name: 'Bedroom', slug: 'bedroom' },
      { name: 'Kitchen', slug: 'kitchen' },
      { name: 'Office', slug: 'office' },
      { name: 'Outdoor', slug: 'outdoor' },
    ],
  });

  const allCategories = await prisma.category.findMany();

  // Brands
  await prisma.brand.createMany({
    data: [
      { name: 'Brand A', slug: 'brand-a' },
      { name: 'Brand B', slug: 'brand-b' },
      { name: 'Brand C', slug: 'brand-c' },
      { name: 'Brand D', slug: 'brand-d' },
      { name: 'Brand E', slug: 'brand-e' },
    ],
  });

  const allBrands = await prisma.brand.findMany();

  // Collections
  await prisma.collection.createMany({
    data: [
      { name: 'Modern', slug: 'modern' },
      { name: 'Classic', slug: 'classic' },
      { name: 'Minimal', slug: 'minimal' },
      { name: 'Industrial', slug: 'industrial' },
      { name: 'Scandinavian', slug: 'scandinavian' },
    ],
  });

  const allCollections = await prisma.collection.findMany();

  // Attribute Groups
  await prisma.attributeGroup.createMany({
    data: [
      { name: 'Size' },
      { name: 'Color' },
      { name: 'Material' },
      { name: 'Style' },
      { name: 'Usage' },
    ],
  });

  const attributeGroups = await prisma.attributeGroup.findMany();

  // Attributes (attach to first 2 groups)
  await prisma.attribute.createMany({
    data: [
      { name: 'Small', attributeGroupId: attributeGroups[0].id },
      { name: 'Medium', attributeGroupId: attributeGroups[0].id },
      { name: 'Large', attributeGroupId: attributeGroups[0].id },
      { name: 'Red', attributeGroupId: attributeGroups[1].id },
      { name: 'Blue', attributeGroupId: attributeGroups[1].id },
    ],
  });

  const attributes = await prisma.attribute.findMany();

  // Attribute values
  await prisma.attributeValue.createMany({
    data: [
      { value: 'Small', slug: 'small', attributeId: attributes[0].id },
      { value: 'Medium', slug: 'medium', attributeId: attributes[1].id },
      { value: 'Large', slug: 'large', attributeId: attributes[2].id },
      { value: 'Red', slug: 'red', attributeId: attributes[3].id },
      { value: 'Blue', slug: 'blue', attributeId: attributes[4].id },
    ],
  });

  const attributeValues = await prisma.attributeValue.findMany();

  await prisma.categoryAttributeGroup.createMany({
    data: [
      {
        categoryId: allCategories[0].id,
        attributeGroupId: attributeGroups[0].id,
      },
      {
        categoryId: allCategories[0].id,
        attributeGroupId: attributeGroups[1].id,
      },
      {
        categoryId: allCategories[1].id,
        attributeGroupId: attributeGroups[0].id,
      },
      {
        categoryId: allCategories[1].id,
        attributeGroupId: attributeGroups[1].id,
      },
      {
        categoryId: allCategories[2].id,
        attributeGroupId: attributeGroups[2].id,
      },
    ],
  });

  // Products
  await prisma.product.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      name: `Product ${i + 1}`,
      slug: `product-${i + 1}`,
      price: (100 + i * 10).toString(),
      description: `Description for product ${i + 1}`,
      brandId: allBrands[i % allBrands.length].id,
      categoryId: allCategories[i % allCategories.length].id,
    })),
  });

  const products = await prisma.product.findMany();

  // ProductImages
  await prisma.productImage.createMany({
    data: products.slice(0, 5).map((product, index) => ({
      url: `https://example.com/product-${index + 1}.jpg`,
      position: 0,
      isMain: true,
      productId: product.id,
    })),
  });

  // ProductCollections
  await prisma.productCollection.createMany({
    data: products.slice(0, 5).map((product, index) => ({
      productId: product.id,
      collectionId: allCollections[index % allCollections.length].id,
    })),
  });

  // ProductAttributeValues
  await prisma.productAttributeValue.createMany({
    data: products.slice(0, 5).map((product, index) => ({
      productId: product.id,
      attributeValueId: attributeValues[index % attributeValues.length].id,
    })),
  });

  // Carts
  await prisma.cart.createMany({
    data: allUsers.slice(0, 5).map((user) => ({
      userId: user.id,
    })),
  });

  const carts = await prisma.cart.findMany();

  // CartItems
  await prisma.cartItem.createMany({
    data: carts.slice(0, 5).map((cart, index) => ({
      cartId: cart.id,
      productId: products[index % products.length].id,
      quantity: 1 + index,
    })),
  });

  // WishlistItems
  await prisma.wishlistItem.createMany({
    data: allUsers.slice(0, 5).map((user, index) => ({
      userId: user.id,
      productId: products[index % products.length].id,
    })),
  });

  // DeliveryAddresses
  await prisma.deliveryAddress.createMany({
    data: allUsers.slice(0, 5).map((user, index) => ({
      userId: user.id,
      address: `Test Street ${index + 1}`,
    })),
  });

  const addresses = await prisma.deliveryAddress.findMany();

  // PaymentMethods
  await prisma.paymentMethod.createMany({
    data: [
      { name: 'Card' },
      { name: 'Cash' },
      { name: 'Bank Transfer' },
      { name: 'Apple Pay' },
      { name: 'Google Pay' },
    ],
  });

  const paymentMethods = await prisma.paymentMethod.findMany();

  // DeliveryMethods
  await prisma.deliveryMethod.createMany({
    data: [
      { name: 'Courier', price: '300' },
      { name: 'Pickup', price: '0' },
      { name: 'Express', price: '500' },
      { name: 'Post', price: '200' },
      { name: 'Drone', price: '1000' },
    ],
  });

  const deliveryMethods = await prisma.deliveryMethod.findMany();

  // Orders
  await prisma.order.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      number: `ORD-${1000 + i}`,
      totalPrice: (1000 + i * 100).toString(),
      status: OrderStatus.PENDING,
      userId: allUsers[i % allUsers.length].id,
      addressId: addresses[i % addresses.length].id,
      paymentMethodId: paymentMethods[i % paymentMethods.length].id,
      deliveryMethodId: deliveryMethods[i % deliveryMethods.length].id,
    })),
  });

  const orders = await prisma.order.findMany();

  // OrderItems
  await prisma.orderItem.createMany({
    data: orders.slice(0, 5).map((order, index) => ({
      orderId: order.id,
      productId: products[index % products.length].id,
      quantity: 1 + index,
      price: (100 + index * 10).toString(),
    })),
  });

  // Comments
  await prisma.comment.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      mark: (i % 5) + 1,
      description: `Comment ${i + 1}`,
      userId: allUsers[i % allUsers.length].id,
      productId: products[i % products.length].id,
    })),
  });

  const comments = await prisma.comment.findMany();

  // CommentImages
  await prisma.commentImage.createMany({
    data: comments.slice(0, 5).map((comment, index) => ({
      url: `https://example.com/comment-${index + 1}.jpg`,
      commentId: comment.id,
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
