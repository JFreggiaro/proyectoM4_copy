import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from '../controllers/categories.controller';
import { Categories } from '../entities/categories.entity';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CategoriesService } from '../services/categories.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Categories])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
