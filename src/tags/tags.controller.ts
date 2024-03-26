import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('/category/:categoryId')
  getTagsByCategory(@Param('categoryId', new ParseUUIDPipe()) categoryId) {
    return this.tagsService.getByCategoryId(categoryId);
  }
}
