import {
    DeleteResult,
    EntityRepository, getManager, Repository, UpdateResult,
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

    public async getAllTotalOrderCountById(id: number): Promise<ITotalOrderCount | undefined> {
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

    public async deleteAllTotalOrderCount(): Promise<void> {
        await getManager()
            .getRepository(TotalOrderCount)
            .find()
            .then((data) => data.forEach((element) => getManager()
                .getRepository(TotalOrderCount)
                .delete({ id: element.id })));
    }
}

export const totalOrderCountRepository = new TotalOrderCountRepository();
