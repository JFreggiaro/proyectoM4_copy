import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from '../config/cloudinary';
import { ProductsController } from '../controllers/products.controller';
import { Categories } from '../entities/categories.entity';
import { Products } from '../entities/products.entity';
import { FileRepository } from '../repositories/file.repository';
import { ProductsRepository } from '../repositories/products.repository';
import { CloudinaryService } from '../services/cloudinary.service';
import { ProductsService } from '../services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    CloudinaryService,
    CloudinaryConfig,
    FileRepository
  ],
  exports: [ProductsService]
})
export class ProductsModule {}
