import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UsersModule } from './user/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TagsModule } from './tags/tags.module';
import { AddressModule } from './address/address.module';
import { OrdersModule } from './orders/orders.module';
import { DiscountsModule } from './discounts/discounts.module';
import { CouponsModule } from './coupons/coupons.module';
import { PaymentsModule } from './payments/payments.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'client', 'build'),
    }),
    AuthModule,
    DbModule,
    UsersModule,
    CategoryModule,
    ProductModule,
    TagsModule,
    AddressModule,
    OrdersModule,
    DiscountsModule,
    CouponsModule,
    PaymentsModule,
    ImagesModule,
  ],
})
export class AppModule {}
