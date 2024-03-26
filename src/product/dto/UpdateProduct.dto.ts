import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  price?: number;

  @MaxLength(1000)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsObject({ each: true })
  @IsArray()
  @IsOptional()
  Tags?: Array<{ name: string }>;

  @IsOptional()
  couponId?: string;

  @IsOptional()
  discountId?: string;
}
