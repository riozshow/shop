import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UploadImageDTO {
  @IsUUID()
  @IsString()
  @IsOptional()
  productId?: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  discountId?: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  couponId?: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  categoryId?: string;
}
