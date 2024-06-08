import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from '../config/cloudinary';
import { FileController } from '../controllers/file.controller';
import { Products } from '../entities/products.entity';
import { FileRepository } from '../repositories/file.repository';
import { FileService } from '../services/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileController],
  providers: [FileService, FileRepository, CloudinaryConfig],
  exports: [],
})
export class FileModule {}
