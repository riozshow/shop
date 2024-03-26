import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Category, User } from '@prisma/client';
import { Product } from '@prisma/client';
import { Coupon } from '@prisma/client';
import { CreateCouponDTO } from './dto/CreateCoupon.dto';
import { ImagesService } from 'src/images/images.service';
import { UpdateCouponDTO } from './dto/UpdateCoupon.dto';
import { CheckCouponDTO } from './dto/CheckCoupon.dto';
import { OrderProductDTO } from 'src/product/dto/CreateProduct.dto';

@Injectable()
export class CouponsService {
  constructor(
    private db: DbService,
    private imagesService: ImagesService,
  ) {}

  includeParam = {
    CouponOnCategory: { include: { Category: true } },
    CouponOnProduct: { include: { Product: true } },
  };

  getAll(onlyActual: boolean = false): Promise<Coupon[]> {
    const selector = { expires: { gte: new Date(Date.now()) }, isPublic: true };
    return this.db.coupon.findMany({
      where: onlyActual ? selector : {},
      include: this.includeParam,
    });
  }

  async isCouponUsed(userId: User['id'], couponName: Coupon['name']) {
    const coupon = await this.db.coupon.findUnique({
      where: { name: couponName },
    });

    if (!coupon) return;

    const couponOnUser = await this.db.couponOnUser.findFirst({
      where: { couponId: coupon.id, userId },
    });

    if (couponOnUser)
      throw new ForbiddenException('You already used this coupon');

    return true;
  }

  async useCoupon(userId: string, couponName: string): Promise<void> {
    const coupon = await this.db.coupon.findUnique({
      where: { name: couponName },
    });

    if (!coupon) throw new BadRequestException('This coupon does not exist!');
    if (coupon.expires < new Date(Date.now()))
      throw new BadRequestException('This coupon is no longer valid');

    await this.useCouponOnUser(coupon.id, userId);
  }

  async useCouponOnUser(couponId: Coupon['id'], userId: User['id']) {
    return this.db.couponOnUser.create({
      data: { couponId, userId },
    });
  }

  async getDiscountPercentByCategory(
    couponName: Coupon['name'],
    categoryId: Category['id'],
  ): Promise<number> {
    const coupon = await this.db.coupon.findUnique({
      where: { name: couponName },
    });
    if (!coupon) return 0;
    const currentDiscount = await this.db.couponOnCategory.findFirst({
      where: { categoryId, couponId: coupon.id },
      include: { Coupon: true },
    });

    return currentDiscount ? currentDiscount.Coupon.percent : 0;
  }

  async getDiscountPercentByProduct(
    couponName: Coupon['name'],
    productId: Product['id'],
  ): Promise<number> {
    const coupon = await this.db.coupon.findUnique({
      where: { name: couponName },
    });
    if (!coupon) return 0;
    const currentDiscount = await this.db.couponOnProduct.findFirst({
      where: { productId, couponId: coupon.id },
      include: { Coupon: true },
    });

    return currentDiscount ? currentDiscount.Coupon.percent : 0;
  }

  async create(body: CreateCouponDTO) {
    const { CouponOnCategory, CouponOnProduct, ...couponData } = body;

    const coupon = await this.db.coupon.create({ data: couponData });

    if (CouponOnCategory) {
      await Promise.all(
        CouponOnCategory.map((couponOnCategory) =>
          this.createCategoryDiscount(coupon.id, couponOnCategory.categoryId),
        ),
      );
    }

    if (CouponOnProduct) {
      await Promise.all(
        CouponOnProduct.map((couponOnProduct) =>
          this.createProductDiscount(coupon.id, couponOnProduct.productId),
        ),
      );
    }

    return await this.db.coupon.findUnique({
      where: { id: coupon.id },
      include: this.includeParam,
    });
  }

  async update(id: Coupon['id'], body: UpdateCouponDTO) {
    const { CouponOnCategory, CouponOnProduct, ...coupon } = body;

    if (CouponOnCategory) {
      await this.db.couponOnCategory.deleteMany({
        where: { couponId: id },
      });
      await Promise.all(
        CouponOnCategory.map((couponOnCategory) =>
          this.createCategoryDiscount(id, couponOnCategory.categoryId),
        ),
      );
    }

    if (CouponOnProduct) {
      await this.db.couponOnProduct.deleteMany({
        where: { couponId: id },
      });
      await Promise.all(
        CouponOnProduct.map((couponOnProduct) =>
          this.createProductDiscount(id, couponOnProduct.productId),
        ),
      );
    }

    return this.db.coupon.update({
      where: { id },
      data: coupon,
      include: this.includeParam,
    });
  }

  createProductDiscount(couponId: Coupon['id'], productId: Product['id']) {
    return this.db.couponOnProduct.create({
      data: {
        Coupon: { connect: { id: couponId } },
        Product: { connect: { id: productId } },
      },
    });
  }

  createCategoryDiscount(couponId: Coupon['id'], categoryId: Category['id']) {
    return this.db.couponOnCategory.create({
      data: {
        Coupon: { connect: { id: couponId } },
        Category: { connect: { id: categoryId } },
      },
    });
  }

  async checkOrder(user: User, order: CheckCouponDTO, couponName: string) {
    await this.isCouponUsed(user.id, couponName);
    const { products } = order;
    return await Promise.all(
      products.map(async (product: OrderProductDTO) => {
        let discount = 0;
        const categoryId = (
          await this.db.product.findUnique({
            where: { id: product.id },
            select: { categoryId: true },
          })
        ).categoryId;
        discount += await this.getDiscountPercentByCategory(
          couponName,
          categoryId,
        );

        discount += await this.getDiscountPercentByProduct(
          couponName,
          product.id,
        );
        return { id: product.id, discount };
      }),
    );
  }

  async delete(id: Coupon['id']) {
    try {
      const coupon = await this.db.coupon.delete({
        where: { id },
        include: { Images: true },
      });

      await Promise.all(
        coupon.Images.map((image) => this.imagesService.delete(image.id)),
      );

      return coupon;
    } catch {
      throw new BadRequestException('This coupon does not exist');
    }
  }
}
