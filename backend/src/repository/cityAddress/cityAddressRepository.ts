import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { CityAddress, ICityAddress } from '../../entity';
import { ICityAddressRepository } from './cityAddressRepositoryInterface';

@EntityRepository(CityAddress)
class CityAddressRepository extends Repository<CityAddress> implements ICityAddressRepository {
    public async getAllCitiesAddress(): Promise<ICityAddress[]> {
        return getManager()
            .getRepository(CityAddress)
            .find();
    }

    public async getCityAddressById(id: number): Promise<ICityAddress | undefined> {
        return getManager()
            .getRepository(CityAddress)
            .findOne({ id });
    }

    public async getCityAddressByName(addressName: string): Promise<ICityAddress | undefined> {
        return getManager()
            .getRepository(CityAddress)
            .findOne({ addressName });
    }

    public async createCityAddress(cityAddressBody: ICityAddress): Promise<ICityAddress> {
        return getManager()
            .getRepository(CityAddress)
            .save(cityAddressBody);
    }

    public async deleteCityAddressById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(CityAddress)
            .delete(id);
    }
}

export const cityAddressRepository = new CityAddressRepository();
