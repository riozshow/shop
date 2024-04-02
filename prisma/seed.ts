import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getRandomDate(): Date {
  return new Date(Date.now() + Math.random() * 1000 * 1 * 60 * 60 * 24 * 7);
}

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
`;

const categories = [
  { id: '40fd1590-d5fc-4b3d-97b2-b9cd18cd22cb', name: 'Telewizory' },
  { id: '05e191b4-cb31-4b27-9c8a-dd61a6fff65d', name: 'Motoryzacja' },
  { id: '28057797-4133-4c16-928e-4c5bf3408e55', name: 'Prasa' },
  { id: '1d812aaf-4c9a-4fdd-a57d-8aab0f9a9ca0', name: 'Numizmaty' },
];

const coupons = [
  {
    id: 'a88bf425-6b89-4c83-9608-5a9c8fea388e',
    name: 'KIEDYS_TO_BYLO',
    percent: 30,
    description: "30% rabatu na wszystkie produkty z kategorii 'Prasa'!",
    isPublic: true,
  },
  {
    id: '5a2969f9-2f0c-4dce-8dd8-223f05bc8abf',
    name: 'RUBIN_ON_RAILS',
    percent: 25,
    description: '25% rabatu na LG OLED 55"!',
    isPublic: true,
  },
];

const couponsOnCategory = [
  {
    couponId: 'a88bf425-6b89-4c83-9608-5a9c8fea388e',
    categoryId: '28057797-4133-4c16-928e-4c5bf3408e55',
  },
];

const couponsOnProduct = [
  {
    couponId: '5a2969f9-2f0c-4dce-8dd8-223f05bc8abf',
    productId: '55682e36-b2b7-4b85-b3c8-ddaa001e9685',
  },
];

const discounts = [
  {
    id: '0e5bc518-d683-4871-aea7-890d35997e4e',
    percent: 15,
    description: '15% Rabatu!',
    expires: getRandomDate(),
  },
];

const discountsOnCategory = [
  {
    categoryId: '1d812aaf-4c9a-4fdd-a57d-8aab0f9a9ca0',
    discountId: '0e5bc518-d683-4871-aea7-890d35997e4e',
  },
];

const products = [
  {
    id: '55682e36-b2b7-4b85-b3c8-ddaa001e9685',
    name: 'LG OLED C3 55"',
    description: loremIpsum,
    price: 3999,
    categoryId: '40fd1590-d5fc-4b3d-97b2-b9cd18cd22cb',
  },
  {
    id: '0d49fa05-4670-45ec-8068-ae1b9afa68bd',
    name: 'Kołpaki 15"',
    description: loremIpsum,
    price: 39,
    categoryId: '05e191b4-cb31-4b27-9c8a-dd61a6fff65d',
  },
  {
    id: 'a57d9569-5776-4640-a5e3-b18d28f1f658',
    name: 'Komputer Świat Ekspert 1/2005',
    description: loremIpsum,
    price: 9.99,
    categoryId: '28057797-4133-4c16-928e-4c5bf3408e55',
  },
  {
    id: '206031aa-aa1d-4d9a-a7d4-604722bc7291',
    name: 'Bolesław Chrobry 2013',
    description: loremIpsum,
    price: 499,
    categoryId: '1d812aaf-4c9a-4fdd-a57d-8aab0f9a9ca0',
  },
];

const tags = [
  { name: 'OLED' },
  { name: '120Hz' },
  { name: 'Citroen' },
  { name: 'C5' },
  { name: 'Informatyka' },
  { name: 'Zainteresowania' },
  { name: 'Królowie' },
  { name: 'Złoto' },
];

const tagsOnProduct = [
  {
    name: 'OLED',
    productId: '55682e36-b2b7-4b85-b3c8-ddaa001e9685',
  },
  {
    name: '120Hz',
    productId: '55682e36-b2b7-4b85-b3c8-ddaa001e9685',
  },

  {
    name: 'Citroen',
    productId: '0d49fa05-4670-45ec-8068-ae1b9afa68bd',
  },
  {
    name: 'C5',
    productId: '0d49fa05-4670-45ec-8068-ae1b9afa68bd',
  },

  {
    name: 'Informatyka',
    productId: 'a57d9569-5776-4640-a5e3-b18d28f1f658',
  },
  {
    name: 'Zainteresowania',
    productId: 'a57d9569-5776-4640-a5e3-b18d28f1f658',
  },

  {
    name: 'Królowie',
    productId: '206031aa-aa1d-4d9a-a7d4-604722bc7291',
  },
  {
    name: 'Złoto',
    productId: '206031aa-aa1d-4d9a-a7d4-604722bc7291',
  },
];

async function seed() {
  await Promise.all(
    categories.map((category) => db.category.create({ data: category })),
  );

  await Promise.all(
    products.map((product) => db.product.create({ data: product })),
  );

  await Promise.all(
    coupons.map((coupon) =>
      db.coupon.create({
        data: {
          ...coupon,
          expires: getRandomDate(),
        },
      }),
    ),
  );
  await Promise.all(
    couponsOnProduct.map((tp) => db.couponOnProduct.create({ data: tp })),
  );

  await Promise.all(
    couponsOnCategory.map((tp) => db.couponOnCategory.create({ data: tp })),
  );

  await Promise.all(
    discounts.map((discount) => db.discount.create({ data: discount })),
  );

  await Promise.all(
    discountsOnCategory.map((dc) => db.discountOnCategory.create({ data: dc })),
  );

  await Promise.all(tags.map((tag) => db.tag.create({ data: tag })));

  await Promise.all(
    tagsOnProduct.map((tp) => db.tagOnProduct.create({ data: tp })),
  );
}

seed();
