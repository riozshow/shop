import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  Max,
  Min,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { IsAfterNow } from 'src/utils/afterNow.decorator';

export class CreateCouponDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Max(99)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  percent: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsAfterNow()
  @IsNotEmpty()
  expires: Date;

  @IsArray()
  @IsOptional()
  CouponOnCategory?: {
    categoryId: string;
    couponId: string;
  }[];

  @IsArray()
  @IsOptional()
  CouponOnProduct?: {
    productId: string;
    couponId: string;
  }[];
}
