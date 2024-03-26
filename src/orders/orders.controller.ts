import {
  Controller,
  Get,
  ParseUUIDPipe,
  Session,
  UseGuards,
  Param,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { User } from '@prisma/client';
import { Roles } from '@prisma/client';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/CreateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  getAllOrders(@Session() session, @Query('paymentId') paymentId?: string) {
    const user: User = session.passport.user;
    if (user.role === Roles.ADMIN) {
      return this.ordersService.getAll();
    }
    if (paymentId) {
      return this.ordersService.getByPaymentId(user.id, paymentId);
    }
    return this.ordersService.getOwnedOrders(user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getOrder(@Param('id', new ParseUUIDPipe()) id, @Session() session) {
    const user: User = session.passport.user;
    if (user.role === Roles.ADMIN) {
      return this.ordersService.getById(id);
    }
    return this.ordersService.getOwnedById(user.id, id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  createOrder(@Body() body: CreateOrderDTO, @Session() session) {
    const user: User = session.passport.user;
    return this.ordersService.create(user.id, body);
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/pay')
  payOrder(@Session() session, @Param('id') id) {
    const user: User = session.passport.user;
    return this.ordersService.pay(user.id, id);
  }
}
