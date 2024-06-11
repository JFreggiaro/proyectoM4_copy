import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UsersService } from '../services/users.service';
import { CreateUsersDto } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}



  // @ApiBearerAuth()
  // @Get()
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  // getAllUsers() {
  //   return this.usersService.getAllUsers();
  // }

  @ApiOperation({ summary: 'Obtener usuarios con limite y paginacion' })
  @ApiResponse({ status: 200, description: 'Usuarios encontrados' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    if (page && limit) return this.usersService.getUsers(page, limit);

    return this.usersService.getUsers(page, limit);
  }


  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUsersById(id);
  }

  @ApiOperation({ summary: 'Actualizar usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Partial<CreateUsersDto>) {
    return this.usersService.updateUsers(id, user);
  }


  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUsers(id);
  }
}
