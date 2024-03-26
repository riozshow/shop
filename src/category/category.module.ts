import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DbModule } from 'src/db/db.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [DbModule, ImagesModule],
  exports: [CategoryService],
})
export class CategoryModule {}
