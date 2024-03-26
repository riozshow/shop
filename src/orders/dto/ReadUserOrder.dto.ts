import { ProductOnOrder, OrderStatus, Payment } from '@prisma/client';

export class ReadUserOrder {
  id: string;
  status: OrderStatus;
  message: string;

  Products: ProductOnOrder[];
  Payment: Payment;

  createdAt: Date;
  updatedAt: Date;
}
