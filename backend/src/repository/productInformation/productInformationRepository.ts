import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IProductInformation, ProductInformation } from '../../entity';
import { IProductInformationRepository } from './productInformationRepositoryInterface';

@EntityRepository(ProductInformation)
class ProductInformationRepository extends Repository<ProductInformation> implements IProductInformationRepository {
    public async getAllProductInformation(): Promise<IProductInformation[]> {
        return getManager()
            .getRepository(ProductInformation)
            .find();
    }

    public async getProductInformationById(id: number): Promise<IProductInformation | undefined> {
        return getManager()
            .getRepository(ProductInformation)
            .findOne({ id });
    }

    public async createProductInformation(productInfo: IProductInformation): Promise<IProductInformation> {
        return getManager()
            .getRepository(ProductInformation)
            .save(productInfo);
    }

    public async updateProductInformationById(id: number, productInfoUpdateData: Partial<IProductInformation>): Promise<UpdateResult> {
        return getManager()
            .getRepository(ProductInformation)
            .update({ id }, productInfoUpdateData);
    }

    public async deleteProductInformationById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(ProductInformation)
            .delete({ id });
    }
}

export const productInformationRepository = new ProductInformationRepository();
