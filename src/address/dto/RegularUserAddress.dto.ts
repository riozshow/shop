import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegularUserAddressDTO {
  id: string;

  @MaxLength(40)
  @IsNotEmpty()
  @IsString()
  street: string;

  @MaxLength(10)
  @IsNotEmpty()
  @IsString()
  number: string;

  @MaxLength(10)
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @MaxLength(40)
  @IsNotEmpty()
  @IsString()
  city: string;
}
