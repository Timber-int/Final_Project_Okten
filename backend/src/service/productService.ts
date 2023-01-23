import { DeleteResult, UpdateResult } from 'typeorm';
import { IProduct } from '../entity';
import { productRepository } from '../repository';

class ProductService {
    public async getAllProducts(): Promise<IProduct[]> {
        return productRepository.getAllProducts();
    }

    public async getProductById(id: number): Promise<IProduct | undefined> {
        return productRepository.getProductById(id);
    }

    public async getProductByName(name: string): Promise<IProduct | undefined> {
        return productRepository.getProductByName(name);
    }

    public async createProduct(product: IProduct): Promise<IProduct> {
        return productRepository.createProduct(product);
    }

    public async updateProductById(id: number, productToUpdate: Partial<IProduct>): Promise<UpdateResult> {
        return productRepository.updateProductById(id, productToUpdate);
    }

    public async deleteProductById(id: number): Promise<DeleteResult> {
        return productRepository.deleteProductById(id);
    }
}

export const productService = new ProductService();
