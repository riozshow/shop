import { Tag } from '@prisma/client';

export class ReadUserProductDTO {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  Tags: Tag[];
  Images: { id: string; isDefault: boolean }[];
  Category: { name: string };
  DiscountOnProduct?: { discountId?: string }[];
  CouponOnProduct?: { couponId?: string }[];
}
