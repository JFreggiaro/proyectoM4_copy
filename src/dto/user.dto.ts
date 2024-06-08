import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../decorators/matchPassword.decorator';

export class CreateUsersDto {
  /** Nombre del usuario @example John */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /** Email del usuario @example johndoe@mail.com */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** Contraseña del usuario @example Password123! */
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'Password invalida. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial (!@#$%^&*)',
  })
  password: string;

  /** Confirma la contraseña del usuario @example Password123! */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /** Direccion del usuario @example Belgrano,15 */
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  address: string;

  /** Telefono del usuario @example 123456789 */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /** Pais del usuario @example Argentina */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /** Ciudad del usuario @example Campana */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
