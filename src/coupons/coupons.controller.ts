import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Session,
  Delete,
  Param,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { CreateCouponDTO } from './dto/CreateCoupon.dto';
import { Roles, User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CheckCouponDTO } from './dto/CheckCoupon.dto';
import { UpdateCouponDTO } from './dto/UpdateCoupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @UseGuards(AdminGuard)
  @Post()
  createCoupon(@Body() body: CreateCouponDTO) {
    return this.couponsService.create(body);
  }

  @Get()
  getCoupons(@Session() session) {
    if (session.passport?.user.role === Roles.ADMIN) {
      return this.couponsService.getAll();
    }
    return this.couponsService.getAll(true);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/check/:phrase')
  checkCoupon(
    @Session() session,
    @Body() body: CheckCouponDTO,
    @Param('phrase') phrase: string,
  ) {
    const user: User = session.passport.user;
    return this.couponsService.checkOrder(user, body, phrase);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  updateCoupon(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() body: UpdateCouponDTO,
  ) {
    return this.couponsService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteProduct(@Param('id', new ParseUUIDPipe()) id) {
    return this.couponsService.delete(id);
  }
}
