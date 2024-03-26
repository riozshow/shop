import { Transform } from 'class-transformer';
import {
  MinLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { IsAfterNow } from 'src/utils/afterNow.decorator';

export class UpdateCouponDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @Max(99)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  percent?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsAfterNow()
  @IsNotEmpty()
  @IsOptional()
  expires?: Date;

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
