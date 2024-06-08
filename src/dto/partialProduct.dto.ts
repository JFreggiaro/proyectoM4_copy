import { IsUUID, IsNotEmpty } from 'class-validator';

export class PartialProductDto {
  /** ID del producto @example 43caf0b2-beb0-4c99-8e38-5fbe3059c2f5 */
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
