import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  //? Extraemos los metadatos del Reflector en tiempo de ejecucion
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    
    //? Obtenemos el rol desde la metadata del reflector y devuelve un array de Role[]
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);


    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //? Verificamos si el usuario tiene el rol requerido
    const hasRole = () => requiredRoles.some((role) => user?.role?.includes(role));
    
    const valid = user && user.role && hasRole();

    if (!valid) {
      throw new ForbiddenException('No autorizado');
    }
    return valid;
  }
}
