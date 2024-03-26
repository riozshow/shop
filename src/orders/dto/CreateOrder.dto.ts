import { Address, Coupon } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDTO } from 'src/product/dto/CreateProduct.dto';

export class CreateOrderDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  addressId: Address['id'];

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products: OrderProductDTO[];

  @IsString()
  @IsOptional()
  couponName?: Coupon['name'];

  @MaxLength(1000)
  @IsString()
  @IsOptional()
  message?: string;
}
