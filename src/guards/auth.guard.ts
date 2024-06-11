import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from '../role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Obtener el token de la cabecera de la petición (Authorization: ["Bearer" , "<token>"])
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      // Convertir la fecha de expiración a milisegundos
      payload.exp = new Date(payload.exp * 1000);

      // Convertir la fecha de emisión a milisegundos
      payload.iat = new Date(payload.iat * 1000);

      // Asignar el usuario al request
      request.user = payload;
      
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
