import {
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { IsAfterNow } from 'src/utils/afterNow.decorator';
import { Transform } from 'class-transformer';

export class UpdateDiscountDTO {
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

  @IsAfterNow()
  @IsNotEmpty()
  @IsOptional()
  expires?: Date;

  @IsArray()
  @IsOptional()
  DiscountOnCategory?: {
    categoryId: string;
    couponId: string;
  }[];

  @IsArray()
  @IsOptional()
  DiscountOnProduct?: {
    productId: string;
    couponId: string;
  }[];
}
