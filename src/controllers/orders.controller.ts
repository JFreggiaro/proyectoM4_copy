import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/order.dto';
import { AuthGuard } from '../guards/auth.guard';
import { OrdersService } from '../services/orders.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role.enum';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Obtener pedido por id' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin && Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrderById(id);
  }

  @ApiOperation({ summary: 'Crear pedido' })
  @ApiResponse({ status: 201, description: 'Detalle de la orden creada' })
  @ApiResponse({ status: 400, description: 'Error al crear la orden' })
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin && Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async addOrder(@Body() addOrder: CreateOrderDto) {
    return await this.ordersService.addOrder(addOrder);
  }
}
