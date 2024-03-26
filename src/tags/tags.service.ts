import { Injectable } from '@nestjs/common';
import { Category, Product, Tag } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TagsService {
  constructor(private db: DbService) {}

  getByProductId(productId: Product['id']): Promise<Tag['name'][]> {
    return this.db.tagOnProduct
      .findMany({
        where: { productId },
        include: { Tag: true },
      })
      .then((tags) => tags.map((tag) => tag.Tag.name));
  }

  async getByCategoryId(categoryId: Category['id']): Promise<Tag['name'][]> {
    const tags = await Promise.all(
      await this.db.product
        .findMany({ where: { categoryId } })
        .then((products) =>
          products.map((product) => this.getByProductId(product.id)),
        ),
    );
    return tags.flat();
  }

  async createTags(tags: Array<{ name: string }>): Promise<void> {
    await this.db.tag.createMany({
      data: tags,
      skipDuplicates: true,
    });
  }
}
