import { Body, Injectable, Param } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    const products = this.productRepository.getProducts(page, limit);
    return products;
  }
  getProductsById(@Param('id') id: string) {
    return this.productRepository.getProductById(id);
  }

  getAllProducts() {
    return this.productRepository.getAllProducts();
  }

  addProducts() {
    return this.productRepository.addProducts();
  }
  createProducts() {
    return this.productRepository.createProduct();
  }
  updateProductsById(@Param('id') id: string, @Body() product: Products) {
    return this.productRepository.updateProductById(id, product);
  }
  deleteProducts(id: string) {
    return this.productRepository.deleteProduct(id);
  }


  //! IMPLEMENTACION DE CARGA AUTOMATICA
  //* Implementacion de carga automatica
  seedProducts(): Promise<void> {
    return this.productRepository.seedProduct();
  }
}
