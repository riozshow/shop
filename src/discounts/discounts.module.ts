import { Module } from '@nestjs/common';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { DbModule } from 'src/db/db.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService],
  imports: [DbModule, ImagesModule],
  exports: [DiscountsService],
})
export class DiscountsModule {}
