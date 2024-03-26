import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class OrderProductDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @MaxLength(1000)
  @IsString()
  @IsOptional()
  message?: string;
}

export class CreateProductDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  price: number;

  @MaxLength(1000)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsObject({ each: true })
  @IsArray()
  @IsOptional()
  Tags?: Array<{ name: string }>;
}
