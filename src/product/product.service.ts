import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, Product, Coupon, User } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { ReadUserCategoryProducts } from './dto/ReadUserCategoryProducts';
import { ReadUserProductDTO } from './dto/ReadUserProduct.dto';
import { TagsService } from 'src/tags/tags.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { DiscountsService } from 'src/discounts/discounts.service';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { CategoryService } from 'src/category/category.service';
import { ImagesService } from 'src/images/images.service';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    private db: DbService,
    private tagsService: TagsService,
    private couponsService: CouponsService,
    private discountsService: DiscountsService,
    private categoryService: CategoryService,
    private imagesService: ImagesService,
  ) {}

  selectProperties = {
    id: true,
    name: true,
    price: true,
    description: true,
    categoryId: true,
    createdAt: true,
    updatedAt: true,
    Category: { select: { name: true } },
    Images: { select: { id: true, isDefault: true } },
    Tags: { select: { name: true } },
    DiscountOnProduct: { select: { discountId: true } },
    CouponOnProduct: { select: { couponId: true } },
  };

  getByCategory(
    categoryId: Category['id'],
  ): Promise<ReadUserCategoryProducts[]> {
    return this.db.product.findMany({
      where: { categoryId },
      select: this.selectProperties,
    });
  }

  async getById(id: Product['id']): Promise<ReadUserProductDTO> {
    const product = await this.db.product.findUnique({
      where: { id },
      select: this.selectProperties,
    });
    if (!product) throw new BadRequestException(`Product ${id} does not exist`);
    return product;
  }

  async getTopSellers() {
    const topSellers = await this.db.productOnOrder.groupBy({
      by: ['productId'],
      _count: { productId: true },
      orderBy: {
        _count: { productId: 'desc' },
      },
      take: 5,
    });

    return Promise.all(
      topSellers.map((ts: { productId: string }) => this.getById(ts.productId)),
    );
  }

  async getProductOrder({
    userId,
    id,
    amount,
    couponName,
    message,
  }: {
    userId: User['id'];
    id: Product['id'];
    amount: number;
    couponName?: Coupon['name'];
    message?: string;
  }) {
    const product = await this.getById(id);

    const discount = await this.getProductDiscount(
      userId,
      id,
      product.categoryId,
      couponName,
    );

    return {
      productId: id,
      message,
      cost: product.price,
      amount,
      discount,
    };
  }

  async getProductDiscount(
    userId,
    productId,
    categoryId,
    couponName?,
  ): Promise<number> {
    const categoryDiscount =
      await this.discountsService.getDiscountPercentByCategory(categoryId);

    const productDiscount =
      await this.discountsService.getDiscountPercentByProduct(productId);

    let couponCategoryDiscount = 0;
    let couponProductDiscount = 0;

    if (couponName) {
      couponCategoryDiscount =
        await this.couponsService.getDiscountPercentByCategory(
          couponName,
          categoryId,
        );

      couponProductDiscount =
        await this.couponsService.getDiscountPercentByProduct(
          couponName,
          productId,
        );

      if (couponCategoryDiscount + couponProductDiscount > 0) {
        await this.couponsService.useCoupon(userId, couponName);
      }
    }

    const totalDiscount =
      categoryDiscount +
      productDiscount +
      couponCategoryDiscount +
      couponProductDiscount;

    return totalDiscount > 90 ? 90 : totalDiscount;
  }

  async create(body: CreateProductDTO): Promise<Product> {
    const { Tags = [], categoryId, ...product } = body;

    if (!(await this.categoryService.isExist(categoryId))) {
      throw new BadRequestException('This category does not exist');
    }

    await this.tagsService.createTags(Tags);

    const newProduct = await this.db.product.create({
      data: {
        ...product,
        Tags: {
          connectOrCreate: Tags.map((tag) => ({
            where: tag,
            create: tag,
          })),
        },
        Category: {
          connect: { id: categoryId },
        },
      },
      select: this.selectProperties,
    });

    return newProduct;
  }

  async update(id: Product['id'], body: UpdateProductDTO): Promise<Product> {
    const { Tags = [], categoryId, couponId, discountId, ...product } = body;

    if (!(await this.categoryService.isExist(categoryId))) {
      throw new BadRequestException('This category does not exist');
    }

    await this.tagsService.createTags(Tags);

    return await this.db.product.update({
      where: { id },
      data: {
        ...product,
        Tags: {
          connectOrCreate: Tags.map((tag) => ({
            where: tag,
            create: tag,
          })),
        },
        Category: {
          connect: { id: categoryId },
        },
      },
      select: this.selectProperties,
    });
  }

  async delete(id: Product['id']) {
    try {
      const product = await this.db.product.delete({
        where: { id },
        include: { Images: true },
      });

      await Promise.all(
        product.Images.map((image) => this.imagesService.delete(image.id)),
      );

      return product;
    } catch {
      throw new BadRequestException('This product does not exist');
    }
  }
}
