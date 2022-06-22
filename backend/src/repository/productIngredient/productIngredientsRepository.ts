import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IProductIngredient, ProductIngredient } from '../../entity';
import { IProductIngredientsRepository } from './productIngredientsRepositoryInterface';

@EntityRepository(ProductIngredient)
class ProductIngredientsRepository extends Repository<ProductIngredient> implements IProductIngredientsRepository {
    public async getAllProductIngredients(): Promise<IProductIngredient[]> {
        return getManager()
            .getRepository(ProductIngredient)
            .find();
    }

    public async getProductIngredientById(id: number): Promise<IProductIngredient | undefined> {
        return getManager()
            .getRepository(ProductIngredient)
            .findOne({ id });
    }

    public async getProductIngredientByName(name: string): Promise<IProductIngredient | undefined> {
        return getManager()
            .getRepository(ProductIngredient)
            .findOne({ productIngredientName: name });
    }

    public async getProductIngredientByPhoto(photo: string): Promise<IProductIngredient | undefined> {
        return getManager()
            .getRepository(ProductIngredient)
            .findOne({ productPhoto: photo });
    }

    public async createProductIngredient(productIngredient: IProductIngredient): Promise<IProductIngredient> {
        return getManager()
            .getRepository(ProductIngredient)
            .save(productIngredient);
    }

    public async updateProductIngredientById(id: number, productIngredientToUpdate: Partial<IProductIngredient>): Promise<UpdateResult> {
        return getManager()
            .getRepository(ProductIngredient)
            .update({ id }, productIngredientToUpdate);
    }

    public async deleteProductIngredientById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(ProductIngredient)
            .delete({ id });
    }
}

export const productIngredientsRepository = new ProductIngredientsRepository();
