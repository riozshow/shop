import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DbModule } from 'src/db/db.module';
import { TagsModule } from 'src/tags/tags.module';
import { CouponsModule } from 'src/coupons/coupons.module';
import { DiscountsModule } from 'src/discounts/discounts.module';
import { CategoryModule } from 'src/category/category.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    DbModule,
    TagsModule,
    CouponsModule,
    DiscountsModule,
    CategoryModule,
    ImagesModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
