import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Category, Discount, Product } from '@prisma/client';
import { CreateDiscountDTO } from './dto/CreateDiscount.dto';
import { ImagesService } from 'src/images/images.service';
import { UpdateDiscountDTO } from './dto/UpdateDiscount.dto';

@Injectable()
export class DiscountsService {
  constructor(
    private db: DbService,
    private imagesService: ImagesService,
  ) {}

  includeParam = {
    DiscountOnCategory: { include: { Category: true } },
    DiscountOnProduct: { include: { Product: true } },
  };

  getAll(onlyActual: boolean = false): Promise<Discount[]> {
    const selector = { expires: { gte: new Date(Date.now()) } };
    return this.db.discount.findMany({
      where: onlyActual ? selector : {},
      include: {
        DiscountOnCategory: { include: { Category: true } },
        DiscountOnProduct: { include: { Product: true } },
      },
    });
  }

  async getDiscountPercentByCategory(
    categoryId: Category['id'],
  ): Promise<number> {
    const discountsOnCategory = await this.db.discountOnCategory.findMany({
      where: { categoryId },
      include: { Discount: true },
    });

    const currentDiscount = discountsOnCategory.find(
      (d) => d.Discount.expires > new Date(Date.now()),
    );

    return currentDiscount ? currentDiscount.Discount.percent : 0;
  }

  async getDiscountPercentByProduct(productId: Product['id']): Promise<number> {
    const discountsOnProduct = await this.db.discountOnProduct.findMany({
      where: { productId },
      include: { Discount: true },
    });

    const currentDiscount = discountsOnProduct.find(
      (d) => d.Discount.expires > new Date(Date.now()),
    );

    return currentDiscount ? currentDiscount.Discount.percent : 0;
  }

  async create(body: CreateDiscountDTO) {
    const { DiscountOnCategory, DiscountOnProduct, ...discountData } = body;

    const discount = await this.db.discount.create({ data: discountData });

    if (DiscountOnCategory) {
      await Promise.all(
        DiscountOnCategory.map((discountOnCategory) =>
          this.createCategoryDiscount(
            discount.id,
            discountOnCategory.categoryId,
          ),
        ),
      );
    }

    if (DiscountOnProduct) {
      await Promise.all(
        DiscountOnProduct.map((discountOnProduct) =>
          this.createProductDiscount(discount.id, discountOnProduct.productId),
        ),
      );
    }

    return await this.db.discount.findUnique({
      where: { id: discount.id },
      include: this.includeParam,
    });
  }

  createProductDiscount(discountId: Discount['id'], productId: Product['id']) {
    return this.db.discountOnProduct.create({
      data: {
        discountId,
        productId,
      },
    });
  }

  createCategoryDiscount(
    discountId: Discount['id'],
    categoryId: Category['id'],
  ) {
    return this.db.discountOnCategory.create({
      data: { discountId, categoryId },
    });
  }

  async delete(id: Discount['id']) {
    try {
      const discount = await this.db.discount.delete({
        where: { id },
        include: { Images: true },
      });

      await Promise.all(
        discount.Images.map((image) => this.imagesService.delete(image.id)),
      );
      return discount;
    } catch {
      throw new BadRequestException('This discount does not exist');
    }
  }

  async update(id: Discount['id'], body: UpdateDiscountDTO) {
    const { DiscountOnCategory, DiscountOnProduct, ...discount } = body;

    if (DiscountOnCategory) {
      await this.db.discountOnCategory.deleteMany({
        where: { discountId: id },
      });
      await Promise.all(
        DiscountOnCategory.map((discountOnCategory) =>
          this.createCategoryDiscount(id, discountOnCategory.categoryId),
        ),
      );
    }

    if (DiscountOnProduct) {
      await this.db.discountOnProduct.deleteMany({
        where: { discountId: id },
      });
      await Promise.all(
        DiscountOnProduct.map((discountOnProduct) =>
          this.createProductDiscount(id, discountOnProduct.productId),
        ),
      );
    }

    return this.db.discount.update({
      where: { id },
      data: discount,
      include: this.includeParam,
    });
  }
}
