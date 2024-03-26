import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [DbModule],
  exports: [AddressService],
})
export class AddressModule {}
