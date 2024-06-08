import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from 'src/services/categories.service';
import productsData from '../utils/data.json';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Obtiene todas las categorias' })
  @ApiResponse({ status: 200, description: 'Categorias encontradas' })
  @ApiResponse({ status: 404, description: 'Categorias no encontradas' })
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  // @Get('seeder')
  // async addCategories(): Promise<void> {
  //   await this.categoriesService.seedCategories();
  //   await this.categoriesService.addCategories()
  // }

  @ApiOperation({ summary: 'Crea categorias' })
  @ApiResponse({ status: 200, description: 'Categorias creadas' })
  @ApiResponse({ status: 404, description: 'Categorias no encontradas' })
  @Get('seeder')
  async addCategCategories(): Promise<void> {
    return await this.categoriesService.addCategories();
  }
}
