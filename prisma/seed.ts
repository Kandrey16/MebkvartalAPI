import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { OrderStatus, PrismaClient, Role } from '@prisma/client';

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
    skipDuplicates: true,
  });

  const allUsers = await prisma.user.findMany();

  // Categories
  await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: 'Мебель',
        slug: 'furniture',
      },
      {
        id: 2,
        name: 'Диваны',
        slug: 'sofas',
        parentId: 1,
      },
      {
        id: 3,
        name: 'Кровати',
        slug: 'beds',
        parentId: 1,
      },
    ],
    skipDuplicates: true,
  });

  const allCategories = await prisma.category.findMany();

  // Brands
  await prisma.brand.createMany({
    data: [
      { name: 'IKEA', slug: 'ikea' },
      { name: 'Herman Miller', slug: 'herman-miller' },
      { name: 'Muuto', slug: 'muuto' },
      { name: 'FurniCo', slug: 'funrico' },
      { name: 'Nordwood', slug: 'nordwood' },
    ],
    skipDuplicates: true,
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
    skipDuplicates: true,
  });

  const allCollections = await prisma.collection.findMany();

  /*
   * 1. CATEGORY
   */
  await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: 'Мебель',
        slug: 'furniture',
      },
      {
        id: 2,
        name: 'Диваны',
        slug: 'sofas',
        parentId: 1,
      },
      {
        id: 3,
        name: 'Кровати',
        slug: 'beds',
        parentId: 1,
      },
    ],
    skipDuplicates: true,
  });

  /*
   * 2. ATTRIBUTE GROUPS
   */
  await prisma.attributeGroup.createMany({
    data: [
      {
        id: 1,
        name: 'Основные характеристики',
        slug: 'basic',
      },
      {
        id: 2,
        name: 'Материалы',
        slug: 'materials',
      },
      {
        id: 3,
        name: 'Дополнительно',
        slug: 'additional',
      },
    ],
    skipDuplicates: true,
  });

  /*
   * 3. CATEGORY <-> ATTRIBUTE GROUP
   */
  await prisma.categoryAttributeGroup.createMany({
    data: [
      { categoryId: 2, attributeGroupId: 1 },
      { categoryId: 2, attributeGroupId: 2 },
      { categoryId: 2, attributeGroupId: 3 },

      { categoryId: 3, attributeGroupId: 1 },
      { categoryId: 3, attributeGroupId: 2 },
      { categoryId: 3, attributeGroupId: 3 },
    ],
    skipDuplicates: true,
  });

  /*
   * 4. ATTRIBUTES
   */
  await prisma.attribute.createMany({
    data: [
      {
        id: 1,
        name: 'Тип мебели',
        slug: 'type',
        attributeGroupId: 1,
      },
      {
        id: 2,
        name: 'Цвет',
        slug: 'color',
        attributeGroupId: 1,
      },
      {
        id: 3,
        name: 'Материал каркаса',
        slug: 'frame_material',
        attributeGroupId: 2,
      },
      {
        id: 4,
        name: 'Материал обивки',
        slug: 'upholstery',
        attributeGroupId: 2,
      },
      {
        id: 5,
        name: 'Наличие ящика',
        slug: 'has_storage',
        attributeGroupId: 3,
      },
    ],
    skipDuplicates: true,
  });

  /*
   * 5. ATTRIBUTE VALUES
   */
  await prisma.attributeValue.createMany({
    data: [
      // Тип мебели
      { id: 1, value: 'Диван', slug: 'sofa', attributeId: 1 },
      { id: 2, value: 'Кровать', slug: 'bed', attributeId: 1 },

      // Цвет
      { id: 3, value: 'Серый', slug: 'gray', attributeId: 2 },
      { id: 4, value: 'Бежевый', slug: 'beige', attributeId: 2 },
      { id: 5, value: 'Синий', slug: 'blue', attributeId: 2 },

      // Материал каркаса
      { id: 6, value: 'Массив дерева', slug: 'solid-wood', attributeId: 3 },
      { id: 7, value: 'Металл', slug: 'metal', attributeId: 3 },

      // Обивка
      { id: 8, value: 'Ткань', slug: 'fabric', attributeId: 4 },
      { id: 9, value: 'Экокожа', slug: 'eco-leather', attributeId: 4 },

      // Наличие ящика (у тебя нет boolean → костыль через select)
      { id: 10, value: 'Да', slug: 'yes', attributeId: 5 },
      { id: 11, value: 'Нет', slug: 'no', attributeId: 5 },
    ],
    skipDuplicates: true,
  });

  // Products
  const productsSeed = [
    {
      name: 'Oak Kitchen Dining Chair',
      slug: 'oak-kitchen-dining-chair',
      description:
        'Comfortable dining chair with durable oak frame and easy-care upholstery.',
    },
    {
      name: 'Modern Minimal Desk (Steel Frame)',
      slug: 'modern-minimal-desk-steel-frame',
      description:
        'Minimal desk with a steel frame and stable base for everyday office work.',
    },
    {
      name: 'Scandinavian Lounge Table',
      slug: 'scandinavian-lounge-table',
      description:
        'Lightweight design with walnut accents and a clean Scandinavian silhouette.',
    },
    {
      name: 'Industrial Glass Coffee Table',
      slug: 'industrial-glass-coffee-table',
      description:
        'Industrial style coffee table with tempered glass top and sturdy steel legs.',
    },
    {
      name: 'Outdoor Foldable Bench (Plastic)',
      slug: 'outdoor-foldable-bench-plastic',
      description:
        'Foldable outdoor bench: lightweight, waterproof coating, and easy to clean.',
    },
  ];

  await prisma.product.createMany({
    data: productsSeed.map((p, i) => ({
      name: p.name,
      slug: p.slug,
      price: (129.99 + i * 58.5).toFixed(2),
      description: p.description,
      availableQuantity: 8 + i * 6,
      isActive: true,
      brandId: allBrands[i % allBrands.length].id,
      categoryId: allCategories[i % allCategories.length].id,
    })),
    skipDuplicates: true,
  });

  const products = await prisma.product.findMany({
    where: { slug: { in: productsSeed.map((p) => p.slug) } },
  });

  // Pick categories by index for deterministic usage mapping
  const productsByIndex = productsSeed.map(
    (p) => products.find((x) => x.slug === p.slug)!,
  );

  // ProductImages
  await prisma.productImage.createMany({
    data: productsByIndex.map((product, index) => ({
      url: `https://example.com/product-${index + 1}.jpg`,
      position: 0,
      isMain: true,
      productId: product.id,
    })),
    skipDuplicates: true,
  });

  // ProductCollections
  await prisma.productCollection.createMany({
    data: productsByIndex.map((product, index) => ({
      productId: product.id,
      collectionId: allCollections[index % allCollections.length].id,
    })),
    skipDuplicates: true,
  });

  // Carts
  await prisma.cart.createMany({
    data: allUsers.slice(0, 5).map((user) => ({
      userId: user.id,
    })),
    skipDuplicates: true,
  });

  const carts = await prisma.cart.findMany();

  // CartItems
  await prisma.cartItem.createMany({
    data: carts.slice(0, 5).map((cart, index) => ({
      cartId: cart.id,
      productId: products[index % products.length].id,
      quantity: 1 + index,
    })),
    skipDuplicates: true,
  });

  // WishlistItems
  await prisma.wishlistItem.createMany({
    data: allUsers.slice(0, 5).map((user, index) => ({
      userId: user.id,
      productId: products[index % products.length].id,
    })),
    skipDuplicates: true,
  });

  // DeliveryAddresses
  await prisma.deliveryAddress.createMany({
    data: allUsers.slice(0, 5).map((user, index) => ({
      userId: user.id,
      address: `Test Street ${index + 1}`,
    })),
    skipDuplicates: true,
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
    skipDuplicates: true,
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
    skipDuplicates: true,
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
    skipDuplicates: true,
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
    skipDuplicates: true,
  });

  // Comments
  await prisma.comment.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      mark: (i % 5) + 1,
      description: `Comment ${i + 1}`,
      userId: allUsers[i % allUsers.length].id,
      productId: products[i % products.length].id,
    })),
    skipDuplicates: true,
  });

  const comments = await prisma.comment.findMany();

  // CommentImages
  await prisma.commentImage.createMany({
    data: comments.slice(0, 5).map((comment, index) => ({
      url: `https://example.com/comment-${index + 1}.jpg`,
      commentId: comment.id,
    })),
    skipDuplicates: true,
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
