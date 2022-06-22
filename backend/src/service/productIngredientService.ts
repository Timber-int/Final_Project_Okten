import { DeleteResult, UpdateResult } from 'typeorm';
import { IProductIngredient } from '../entity';
import { productIngredientsRepository } from '../repository';

class ProductIngredientService {
    public async getAllProductIngredients(): Promise<IProductIngredient[]> {
        return productIngredientsRepository.getAllProductIngredients();
    }

    public async getProductIngredientById(id: number): Promise<IProductIngredient | undefined> {
        return productIngredientsRepository.getProductIngredientById(id);
    }

    public async getProductIngredientByName(name: string): Promise<IProductIngredient | undefined> {
        return productIngredientsRepository.getProductIngredientByName(name);
    }

    public async getProductIngredientByPhoto(photo: string): Promise<IProductIngredient | undefined> {
        return productIngredientsRepository.getProductIngredientByPhoto(photo);
    }

    public async createProductIngredient(productIngredient: IProductIngredient): Promise<IProductIngredient> {
        return productIngredientsRepository.createProductIngredient(productIngredient);
    }

    public async updateProductIngredientById(id: number, productIngredientToUpdate: Partial<IProductIngredient>): Promise<UpdateResult> {
        return productIngredientsRepository.updateProductIngredientById(id, productIngredientToUpdate);
    }

    public async deleteProductIngredientById(id: number): Promise<DeleteResult> {
        return productIngredientsRepository.deleteProductIngredientById(id);
    }
}

export const productIngredientService = new ProductIngredientService();
