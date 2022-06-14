import { DeleteResult, UpdateResult } from 'typeorm';
import { IProductInformation } from '../entity';
import { productInformationRepository } from '../repository';

class ProductInformationService {
    public async getAllProductInformation(): Promise<IProductInformation[]> {
        return productInformationRepository.getAllProductInformation();
    }

    public async getProductInformationById(id: number): Promise<IProductInformation | undefined> {
        return productInformationRepository.getProductInformationById(id);
    }

    public async createProductInformation(productInfo: IProductInformation): Promise<IProductInformation> {
        return productInformationRepository.createProductInformation(productInfo);
    }

    public async updateProductInformationById(id: number, productInfoUpdateData: Partial<IProductInformation>): Promise<UpdateResult> {
        return productInformationRepository.updateProductInformationById(id, productInfoUpdateData);
    }

    public async deleteProductInformationById(id: number): Promise<DeleteResult> {
        return productInformationRepository.deleteProductInformationById(id);
    }
}

export const productInformationService = new ProductInformationService();
