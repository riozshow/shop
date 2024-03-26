import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { ImagesService } from 'src/images/images.service';
import { UpdateCategoryDTO } from './dto/UpdateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    private db: DbService,
    private imagesService: ImagesService,
  ) {}

  async isExist(id: Category['id']) {
    const category = await this.getById(id);
    return category !== null;
  }

  getAll(): Promise<Category[]> {
    return this.db.category.findMany({ include: { Images: true } });
  }

  getById(id: Category['id']): Promise<Category> {
    return this.db.category.findUnique({
      where: { id },
      include: {
        DiscountOnCategory: { include: { Discount: true } },
        Images: true,
      },
    });
  }

  async getByProductId(productId: Product['id']): Promise<Category> {
    const product = await this.db.product.findUnique({
      where: { id: productId },
      include: { Category: true },
    });
    return product.Category;
  }

  async delete(id: Category['id']) {
    try {
      const category = await this.db.category.delete({
        where: { id },
        include: { Images: true },
      });

      await Promise.all(
        category.Images.map((image) => this.imagesService.delete(image.id)),
      );

      return category;
    } catch {
      throw new BadRequestException('This category does not exist');
    }
  }

  async create(body: UpdateCategoryDTO) {
    try {
      return this.db.category.create({ data: body, include: { Images: true } });
    } catch {
      throw new BadRequestException("Can't create category");
    }
  }

  async update(id: Category['id'], body: UpdateCategoryDTO) {
    return this.db.category.update({
      where: { id },
      data: body,
      include: { Images: true },
    });
  }
}
