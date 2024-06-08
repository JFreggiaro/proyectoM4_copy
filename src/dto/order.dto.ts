import { ArrayNotEmpty, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialProductDto } from './partialProduct.dto';


export class CreateOrderDto {
  /** ID del usuario @example 091f4020-10e6-4b7f-aa37-924a5dd7409d */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ArrayNotEmpty()
  // @ValidateNested({ each: true })
  // @Type(() => PartialProductDto)
  products: PartialProductDto[];

  }
  