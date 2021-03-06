import { UpdateResult, DeleteResult } from 'typeorm';
import { ICategory } from '../entity';
import { categoryRepository } from '../repository';

class CategoryService {
    public async getAllCategories(): Promise<ICategory[]> {
        return categoryRepository.getAllCategories();
    }

    public async getCategoryByName(name: string): Promise<ICategory | undefined> {
        return categoryRepository.getCategoryByName(name);
    }

    public async getCategoryByLogo(logo: string): Promise<ICategory | undefined> {
        return categoryRepository.getCategoryByLogo(logo);
    }

    public async getCategoryById(id: number): Promise<ICategory | undefined> {
        return categoryRepository.getCategoryById(id);
    }

    public async createCategory(category: ICategory): Promise<ICategory> {
        return categoryRepository.createCategory(category);
    }

    public async deleteCategoryById(id: number): Promise<DeleteResult> {
        return categoryRepository.deleteCategoryById(id);
    }

    public async updateCategoryById(id: number, nameCategory: string): Promise<UpdateResult> {
        return categoryRepository.updateCategoryById(id, nameCategory);
    }
}

export const categoryService = new CategoryService();
