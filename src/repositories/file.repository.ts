import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import toStream = require('buffer-to-stream');

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(Products)
    private readonly producRepository: Repository<Products>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
     const upload =  cloudinary.uploader.upload_stream({resource_type: 'auto'},
        (error, result) => (error ? reject(error) : resolve(result)),
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
