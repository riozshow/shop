import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [DbModule],
  exports: [ImagesService],
})
export class ImagesModule {}
