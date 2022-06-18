import { DeleteResult, UpdateResult } from 'typeorm';
import { IProduct } from '../entity';
import { IPaginationResponse } from '../interface';
import { productRepository } from '../repository';

class ProductService {
    public async getAllProducts(filterObject: Partial<IProduct>, page: number, perPage: number): Promise<IPaginationResponse<IProduct>> {
        return productRepository.getAllProducts(filterObject, perPage, page);
    }

    public async getProductById(id: number): Promise<IProduct | undefined> {
        return productRepository.getProductById(id);
    }

    public async getProductByName(name: string): Promise<IProduct | undefined> {
        return productRepository.getProductByName(name);
    }

    public async getProductByPhoto(photo: string): Promise<IProduct | undefined> {
        return productRepository.getProductByPhoto(photo);
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
