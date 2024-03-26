import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDTO } from 'src/product/dto/CreateProduct.dto';

export class CheckCouponDTO {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products: OrderProductDTO[];
}
