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

  
  async signUpUser(user: CreateUsersDto) {

    const userExists = await this.usersRepository.loginUserByEmail(user.email);

    if (userExists) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Password no pudo ser hasheado');
    }

 
    const newUser = this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    if(newUser){
      return newUser;
    }else {
      throw new BadRequestException('Error al crear el usuario')
    }
  }

  
  async signInUser(email: string, password: string) {
    const user = await this.usersRepository.loginUserByEmail(email);

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
    }

    
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
      role: user.role,
    };

    
    const token =  this.jwtService.sign(userPayload);

    return {
      message: 'Login exitoso',
      token: token,
    };
  }
}
