import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { FileRepository } from '../repositories/file.repository';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository,
    @InjectRepository(Products) private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadFile(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    const uploadImage = await this.fileRepository.uploadFile(file)
    const updateProduct = await this.productsRepository.update(productId, { imgUrl: uploadImage.secure_url })

    return {message: "Imagen cargada",updateProduct};
  }

}


