import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DbModule } from 'src/db/db.module';
import { AddressModule } from 'src/address/address.module';
import { ProductModule } from 'src/product/product.module';
import { CouponsModule } from 'src/coupons/coupons.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [DbModule, AddressModule, ProductModule, CouponsModule],
})
export class OrdersModule {}
