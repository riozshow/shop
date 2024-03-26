import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Session,
  Delete,
  Param,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { CreateDiscountDTO } from './dto/CreateDiscount.dto';
import { DiscountsService } from './discounts.service';
import { Roles } from '@prisma/client';
import { UpdateDiscountDTO } from './dto/UpdateDiscount.dto';

@Controller('discounts')
export class DiscountsController {
  constructor(private discountsService: DiscountsService) {}

  @UseGuards(AdminGuard)
  @Post()
  createDiscount(@Body() body: CreateDiscountDTO) {
    return this.discountsService.create(body);
  }

  @Get()
  getDiscounts(@Session() session) {
    if (session.passport?.user.role === Roles.ADMIN) {
      return this.discountsService.getAll();
    }
    return this.discountsService.getAll(true);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  updateCoupon(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() body: UpdateDiscountDTO,
  ) {
    return this.discountsService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteProduct(@Param('id', new ParseUUIDPipe()) id) {
    return this.discountsService.delete(id);
  }
}
