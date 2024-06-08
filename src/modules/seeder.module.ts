import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from '../services/seeder.service';
import { CategoriesModule } from './categories.module';
import { ProductsModule } from './products.module';
import { Categories } from '../entities/categories.entity';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { UsersModule } from './users.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Products, Users]),
    CategoriesModule,
    ProductsModule,
    UsersModule
  ],
  providers: [SeederService],
})
export class SeederModule {}