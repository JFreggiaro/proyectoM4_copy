import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from '../dto/loginUser.dto';
import { CreateUsersDto } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  @ApiResponse({ status: 200, description: "Usuario creado" })
  @ApiResponse({ status: 400, description: "Email ya registrado" })
  @Post('signup')
  async signUpUser(@Body() user: CreateUsersDto): Promise<any> {
    return this.authService.signUpUser(user);
  }

  @ApiOperation({ summary: 'Inicia sesion' })
  @ApiResponse({ status: 200, description: "Login exitoso" })
  @ApiResponse({ status: 401, description: "Email o password incorrectos" })
  @Post('signin')
  async logginUser(@Body() credential: LoginUserDto): Promise<any> {
    const { email, password } = credential;
    if (!email || !password) {
      throw new HttpException(
        'Email y password son requeridos',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.authService.signInUser(email, password);

    if (!result) {
      throw new HttpException(
        'Email o password incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return result;
  }
}
