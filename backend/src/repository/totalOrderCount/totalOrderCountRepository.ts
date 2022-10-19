import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { ITotalOrderCount, TotalOrderCount } from '../../entity';
import { ITotalOrderCountRepository } from './totalOrderCountRepositoryInterface';

@EntityRepository(TotalOrderCount)
class TotalOrderCountRepository extends Repository<TotalOrderCount> implements ITotalOrderCountRepository {
    public async getAllTotalOrderCount(): Promise<ITotalOrderCount[]> {
        return getManager()
            .getRepository(TotalOrderCount)
            .find();
    }

    public async getTotalOrderCountById(id: number): Promise<ITotalOrderCount | undefined> {
        return getManager()
            .getRepository(TotalOrderCount)
            .findOne({ id });
    }

    public async getTotalCountByUniqueData(productUniqueData: string): Promise<ITotalOrderCount | undefined> {
        return getManager()
            .getRepository(TotalOrderCount)
            .findOne({ productUniqueData });
    }

    public async updateTotalOrderCountById(id: number, dataToUpdate: ITotalOrderCount, priceBeforeUpdate: number): Promise<UpdateResult> {
        return getManager()
            .getRepository(TotalOrderCount)
            .update({ id }, {
                ...dataToUpdate,
                productPrice: dataToUpdate.productPrice + priceBeforeUpdate,
            });
    }

    public async plusTotalOrderCountById(id: number, dataToUpdate: ITotalOrderCount, priceBeforeUpdate: number): Promise<UpdateResult> {
        return getManager()
            .getRepository(TotalOrderCount)
            .update({ id }, {
                ...dataToUpdate,
                productPrice: dataToUpdate.productPrice + priceBeforeUpdate,
            });
    }

    public async minusTotalOrderCountById(id: number, dataToUpdate: ITotalOrderCount, priceBeforeUpdate: number): Promise<UpdateResult> {
        return getManager()
            .getRepository(TotalOrderCount)
            .update({ id }, {
                ...dataToUpdate,
                productPrice: priceBeforeUpdate - dataToUpdate.productPrice,
            });
    }

    public async createTotalOrderCount(data: ITotalOrderCount): Promise<ITotalOrderCount> {
        return getManager()
            .getRepository(TotalOrderCount)
            .save(data);
    }

    public async deleteTotalOrderCount(deletePath: string): Promise<DeleteResult> {
        return getManager()
            .getRepository(TotalOrderCount)
            .delete({ productUniqueData: deletePath });
    }

    public async deleteAllTotalOrderCount(): Promise<DeleteResult> {
        return getManager()
            .getRepository(TotalOrderCount)
            .delete({});
    }
}

export const totalOrderCountRepository = new TotalOrderCountRepository();
