import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {
    /** Email del usuario @example josefre@mail.com */
    @IsNotEmpty()
    @IsEmail()
    email: string

    /** Contraseña del usuario @example Hola12345@ */
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
      message: 'Password invalida. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial (!@#$%^&*)',
    })
    password: string
}