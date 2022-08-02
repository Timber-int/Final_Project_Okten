import { DeleteResult, UpdateResult } from 'typeorm';
import { ITotalOrderCount, TotalOrderCount } from '../entity';
import { totalOrderCountRepository } from '../repository';

class TotalOrderCountService {
    public async getAllTotalOrderCount(): Promise<ITotalOrderCount[]> {
        return totalOrderCountRepository.getAllTotalOrderCount();
    }

    public async getAllTotalOrderCountById(id: number): Promise<ITotalOrderCount | undefined> {
        return totalOrderCountRepository.getAllTotalOrderCountById(id);
    }

    public async createTotalOrderCount(data: TotalOrderCount): Promise<ITotalOrderCount> {
        return totalOrderCountRepository.createTotalOrderCount(data);
    }

    public async getTotalCountByUniqueData(productUniqueData: string): Promise<ITotalOrderCount | undefined> {
        return totalOrderCountRepository.getTotalCountByUniqueData(productUniqueData);
    }

    public async updateTotalOrderCountById(id: number, dataToUpdate: ITotalOrderCount, priceBeforeUpdate: number): Promise<UpdateResult> {
        return totalOrderCountRepository.updateTotalOrderCountById(id, dataToUpdate, priceBeforeUpdate);
    }

    public async deleteTotalOrderCount(deletePath: string): Promise<DeleteResult> {
        return totalOrderCountRepository.deleteTotalOrderCount(deletePath);
    }
}

export const totalOrderCountService = new TotalOrderCountService();
