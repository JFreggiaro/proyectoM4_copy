import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { ProductDto } from '../dto/product.dto';
import * as data from '../utils/data.json'


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    try {
      let products = await this.productsRepository.find({
        relations: {
          category: true,
        },
      });
  
      const start = (page - 1) * limit;
      const end = start + limit;
      products = products.slice(start, end);
  
      return products;
      
    } catch (error) {
       throw new BadRequestException("No se encontraron productos");
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return {message:"Producto encontrado" ,product};
      
    } catch (error) {
      throw new BadRequestException("Producto no encontrado");
    }
  }

  getAllProducts(): Promise<Products[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  async addProducts() {
    try {
      const categories = await this.categoriesRepository.find();
      const data = require('../utils/data.json')
  
      data.map(async (element) => {
        const category = categories.find((cat) => cat.name === element.category);
        if (!category) {
          throw new NotFoundException(`Category ${element.category} not found`);
        }
  
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.imgUrl = element.imgUrl;
        product.category = category;
  
        await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
      });
  
      return {message: "Productos agregados"}
      
    } catch (error) {
      throw new BadRequestException("Error al agregar los productos");
    }
  }

  async createProduct() {
    throw new Error('Method not implemented.');
  }

  async updateProductById(id: string, product: Products) {
    try {
      await this.productsRepository.update(id, product);
      const updatedProduct = await this.productsRepository.findOneBy({ id });
      if (!updatedProduct) {
        throw new NotFoundException('Producto no encontrado');
      }
      return {message:"Producto actualizado" ,updatedProduct};
      
    } catch (error) {
      throw new BadRequestException("Error al actualizar el producto");
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      await this.productsRepository.delete({ id });
      return {message:"Producto eliminado" ,product};
      
    } catch (error) {
      throw new BadRequestException("Error al eliminar el producto");
    }
  }


//! IMPLEMENTACION DE CARGA AUTOMATICA
  //*Implementacion de carga automatica
  async seedProduct(): Promise<void> {
    const data = require('../utils/data.json') as ProductDto[];
    await this.addProductsSeed(data);
  }

  async addProductsSeed(products: ProductDto[]): Promise<void> {
    const categories = await this.categoriesRepository.find();
    const existingProducts = await this.productsRepository.find();
    const existingProductNames = new Set(
      existingProducts.map((prod) => prod.name),
    );

    const newProducts = products
      .filter((productDto) => !existingProductNames.has(productDto.name))
      .map((productDto) => {
        const category = categories.find(
          (cat) => cat.name === productDto.category,
        );
        if (!category) {
          throw new Error(`Category ${productDto.category} not found`);
        }
        const newProduct = this.productsRepository.create({
          ...productDto,
          category,
        });
        return newProduct;
      });

    await this.productsRepository.save(newProducts);
  }

}
