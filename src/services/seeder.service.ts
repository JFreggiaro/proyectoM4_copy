import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    console.log('Running Seeder...');
    await this.categoriesService.seedCategories();
    await this.productsService.seedProducts();
    await this.usersService.seedUsers();
  }
}