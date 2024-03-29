import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Delete,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { UpdateCategoryDTO } from './dto/UpdateCategory.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  createCategory(@Body() body: UpdateCategoryDTO) {
    return this.categoryService.create(body);
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id) {
    return this.categoryService.getById(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  updateCategory(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() body: UpdateCategoryDTO,
  ) {
    return this.categoryService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteProduct(@Param('id', new ParseUUIDPipe()) id) {
    return this.categoryService.delete(id);
  }
}
