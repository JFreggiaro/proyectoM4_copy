import { Injectable } from '@nestjs/common';
import { Categories } from '../entities/categories.entity';
import { CategoriesRepository } from '../repositories/categories.repository';


@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async getCategories(): Promise<Categories[]> {
    const allCategory = await this.categoryRepository.getCategories();
    return allCategory;
  }

  async addCategories() {
    await this.categoryRepository.addCategories();
  }

  async seedCategories(): Promise<void> {
    this.categoryRepository.seedCategories();
  }
}
