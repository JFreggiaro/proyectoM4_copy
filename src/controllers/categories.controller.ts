import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from 'src/services/categories.service';
import productsData from '../utils/data.json';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Obtiene todas las categorias' })
  @ApiResponse({ status: 200, description: 'Categorias encontradas' })
  @ApiResponse({ status: 404, description: 'Categorias no encontradas' })
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin && Role.User)
  @UseGuards(AuthGuard,RolesGuard)
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: 'Crea categorias' })
  @ApiResponse({ status: 200, description: 'Categorias creadas' })
  @ApiResponse({ status: 404, description: 'Categorias no encontradas' })
  @Get('seeder')
  async addCategCategories(): Promise<void> {
    return await this.categoriesService.addCategories();
  }
}
