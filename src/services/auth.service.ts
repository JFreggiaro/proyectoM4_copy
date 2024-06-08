import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUsersDto } from '../dto/user.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAllAuth() {
    return 'Autenticacion';
  }

  // async loginUser(email: string, password: string): Promise<Partial<Users>> {
  //   if (!email || !password) {
  //     throw new HttpException(
  //       'Email y password son requeridos',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const user = await this.usersRepository.loginUserByEmail(email);

  //   if (!user) {
  //     throw new HttpException(
  //       'Email o password incorrectos',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   if (user.password !== password) {
  //     throw new HttpException(
  //       'Email o password incorrectos',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }

  //   const { password: pass, ...userWithOutPassword } = user;

  //   return userWithOutPassword;
  // }

  //? Proceso de registro del usuario
  async signUpUser(user: CreateUsersDto) {
    //? Verifico si el email esta registrado
    const userExists = await this.usersRepository.loginUserByEmail(user.email);

    if (userExists) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    //? Encripto la contraseña
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Password no pudo ser hasheado');
    }

    //? Creo y guardo en la base de datos el usuario
    const newUser = this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    return { message: 'Usuario creado', newUser };
  }

  //? Proceso de inicio de sesion del usuario
  async signInUser(email: string, password: string) {
    const user = await this.usersRepository.loginUserByEmail(email);

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
    }

    //? Comparo las contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Email o password incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      // roles: [user.isAdmin ? Role.Admin : Role.User],
      role: user.role,
    };

    //? Generar el token
    const token =  this.jwtService.sign(userPayload);

    return {
      message: 'Login exitoso',
      token: token,
    };
  }
}
