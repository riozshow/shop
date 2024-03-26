import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order, OrderStatus, PaymentStatus } from '@prisma/client';
import { User } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { ReadUserOrder } from './dto/ReadUserOrder.dto';
import { AddressService } from 'src/address/address.service';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { ProductService } from 'src/product/product.service';
import { CouponsService } from 'src/coupons/coupons.service';

@Injectable()
export class OrdersService {
  constructor(
    private db: DbService,
    private addressesService: AddressService,
    private productsService: ProductService,
    private couponsService: CouponsService,
  ) {}

  getAll(): Promise<Order[]> {
    return this.db.order.findMany({
      include: { Products: { include: { Product: true } }, Payment: true },
    });
  }

  getById(id: Order['id']) {
    return this.db.order.findUnique({
      where: { id },
      include: { Products: { include: { Product: true } }, Payment: true },
    });
  }

  getByPaymentId(userId: User['id'], paymentId: Order['paymentId']) {
    return this.db.order.findUnique({
      where: { userId, paymentId },
      include: { Products: { include: { Product: true } }, Payment: true },
    });
  }

  getOwnedOrders(userId: User['id']): Promise<ReadUserOrder[]> {
    return this.db.order.findMany({
      where: { userId },
      include: { Products: { include: { Product: true } }, Payment: true },
    });
  }

  getOwnedById(userId: User['id'], id: Order['id']): Promise<ReadUserOrder> {
    return this.db.order.findUnique({
      where: { id, userId },
      include: { Products: { include: { Product: true } }, Payment: true },
    });
  }

  async create(userId: User['id'], orderData: CreateOrderDTO): Promise<Order> {
    const { addressId, products, message, couponName } = orderData;

    let isCouponValid = false;
    let orderAddress;

    try {
      orderAddress = await this.addressesService
        .getById(addressId, userId)
        .then((address) => {
          return [
            address.street,
            address.number,
            address.postalCode,
            address.city,
          ].join(', ');
        });
      if (!orderAddress) {
        throw new BadRequestException('This address does not exist');
      }
    } catch {
      throw new BadRequestException(
        "Can't find address. Propably using ADMIN account.",
      );
    }

    try {
      if (
        couponName &&
        (await this.couponsService.isCouponUsed(userId, couponName))
      ) {
        isCouponValid = true;
      }
    } catch {}

    const orderProducts = await Promise.all(
      products.map(({ id, amount, message }) =>
        this.productsService.getProductOrder({
          userId,
          id,
          amount,
          message,
          ...(isCouponValid ? { couponName } : {}),
        }),
      ),
    );

    const amount = orderProducts.reduce((total, current) => {
      const productCost = current.cost * current.amount;
      total += productCost - (current.discount / 100) * productCost;
      return total;
    }, 0);

    return this.db.order.create({
      data: {
        message,
        orderAddress,
        User: {
          connect: { id: userId },
        },
        Address: {
          connect: { id: addressId },
        },
        Products: {
          create: orderProducts,
        },
        Payment: {
          create: { amount },
        },
      },
      include: { Products: { include: { Product: true } }, Payment: true },
    });
  }

  async pay(userId: User['id'], id: Order['id']) {
    const order = await this.getById(id);
    if (!order) throw new NotFoundException('This order does not exist');
    if (order.status !== OrderStatus.WAITING_FOR_PAYMENT)
      throw new BadRequestException('This order is already payed');
    return await this.db.order.update({
      where: { id, userId },
      include: { Products: { include: { Product: true } }, Payment: true },
      data: {
        status: OrderStatus.PENDING,
        Payment: {
          update: {
            status: PaymentStatus.PAYED,
          },
        },
      },
    });
  }
}
