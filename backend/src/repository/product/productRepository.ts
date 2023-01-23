import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IProduct, Product } from '../../entity';
import { IProductRepository } from './productRepositoryInterface';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> implements IProductRepository {
    public async getAllProducts(): Promise<IProduct[]> {
        return getManager()
            .getRepository(Product)
            .find();
    }

    public async getProductById(id: number): Promise<IProduct | undefined> {
        return getManager()
            .getRepository(Product)
            .findOne({ id }, { relations: ['productInformation'] });
    }

    public async getProductByName(name: string): Promise<IProduct | undefined> {
        return getManager()
            .getRepository(Product)
            .findOne({ productName: name });
    }

    public async createProduct(product: IProduct): Promise<IProduct> {
        return getManager()
            .getRepository(Product)
            .save(product);
    }

    public async updateProductById(id: number, productToUpdate: Partial<IProduct>): Promise<UpdateResult> {
        return getManager()
            .getRepository(Product)
            .update({ id }, productToUpdate);
    }

    public async deleteProductById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(Product)
            .delete({ id });
    }
}

export const productRepository = new ProductRepository();
