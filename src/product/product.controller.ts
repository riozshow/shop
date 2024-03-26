import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Body,
  Post,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('category/:categoryId')
  getByCategory(@Param('categoryId', new ParseUUIDPipe()) categoryId) {
    return this.productService.getByCategory(categoryId);
  }

  @Get('topSellers')
  getTopSellers() {
    return this.productService.getTopSellers();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id) {
    return this.productService.getById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  addProduct(@Body() body: CreateProductDTO) {
    return this.productService.create(body);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() body: UpdateProductDTO,
  ) {
    return this.productService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteProduct(@Param('id', new ParseUUIDPipe()) id) {
    return this.productService.delete(id);
  }
}
