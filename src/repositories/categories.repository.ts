import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories(): Promise<Categories[]> {
    const allCategory = await this.categoriesRepository.find();
    if (!allCategory) {
      throw new HttpException('Categorias no encontradas', HttpStatus.NOT_FOUND);
    }else{
      return allCategory
    }
  }

  async addCategories() {
    const data = require('../utils/data.json'); 
    data.map(async (element) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({
          name: element.category,
        })
        .orIgnore()
        .execute();
    });
      return {message: "Categorias agregadas"}
  }


  async seedCategories(): Promise<void> {
    const data = require('../utils/data.json'); 
    const categories = [...new Set(data.map(product => product.category))].map(name => ({ name }));
    const existingCategories = await this.categoriesRepository.find();
    const existingCategoryNames = existingCategories.map(category => category.name);
    const newCategoryDtos = categories.filter(category => {
      const categoryName = category.name as string; // Type assertion
      return !existingCategoryNames.includes(categoryName);
    });

    const newCategories = newCategoryDtos.map(categoryDto => {
      const newCategory = this.categoriesRepository.create();
      newCategory.name = categoryDto.name as string;
      return newCategory;
    });

    await this.categoriesRepository.save(newCategories);
  }
}
