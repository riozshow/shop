import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [DbModule],
  exports: [TagsService],
})
export class TagsModule {}
