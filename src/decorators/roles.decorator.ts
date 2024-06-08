import { SetMetadata } from "@nestjs/common";
import { Role } from "../role.enum";

//? la metadata es una especie de diccionario de datos asociado a cada peticion que recibimos
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)
