import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { DbModule } from 'src/db/db.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  imports: [DbModule, ImagesModule],
  exports: [CouponsService],
})
export class CouponsModule {}
