import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { Category, ICategory } from '../../entity';
import { ICategoryRepository } from './categoryRepositoryInterface';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> implements ICategoryRepository {
    public async getAllCategories(): Promise<Category[]> {
        return getManager()
            .getRepository(Category)
            .find({ relations: ['products'] });
    }

    public async getCategoryByName(name: string): Promise<Category | undefined> {
        return getManager()
            .getRepository(Category)
            .findOne({ name });
    }

    public async getCategoryByLogo(logo: string): Promise<Category | undefined> {
        return getManager()
            .getRepository(Category)
            .findOne({ logo });
    }

    public async getCategoryById(id: number): Promise<Category | undefined> {
        return getManager()
            .getRepository(Category)
            .findOne({ id }, { relations: ['products'] });
    }

    public async createCategory(category: ICategory): Promise<Category> {
        return getManager()
            .getRepository(Category)
            .save(category);
    }

    public async deleteCategoryById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(Category)
            .delete({ id });
    }

    public async updateCategoryById(id: number, nameCategory: string): Promise<UpdateResult> {
        return getManager()
            .getRepository(Category)
            .update({ id }, { name: nameCategory });
    }
}

export const categoryRepository = new CategoryRepository();
