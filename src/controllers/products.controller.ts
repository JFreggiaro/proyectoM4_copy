import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ProductsService } from '../services/products.service';
import * as productsData from '../utils/data.json'; // Importar el archivo JSON
import { Products } from '../entities/products.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role.enum';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @ApiBearerAuth()
  // @Get()
  // @UseGuards(AuthGuard)
  // @HttpCode(200)
  // getAllProducts() {
  //   return this.productsService.getAllProducts();
  // }


  @ApiOperation({ summary: 'Obtener productos con limite y paginacion' })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos' })
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin && Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page && limit) return this.productsService.getProducts(page, limit);

    return this.productsService.getProducts(page, limit);
  }

  @ApiOperation({ summary: 'Obtener productos' })
  @ApiResponse({ status: 200, description: 'Productos agregados' })
  @ApiResponse({ status: 404, description: 'Error al agregar los productos' })
  @Get('seeder')
  async addProducts() {
    return await this.productsService.addProducts();
  }

  @ApiOperation({ summary: 'Obtener un producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin && Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductsById(id);
  }

  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 404, description: 'Error al actualizar el producto' })
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  updateProductById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Products,
  ) {
    return this.productsService.updateProductsById(id, product);
  }

  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Error al eliminar el producto' })
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProducts(id);
  }


}
