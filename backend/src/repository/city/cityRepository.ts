import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { City, ICity } from '../../entity';
import { ICityRepository } from './cityRepositoryInterface';

@EntityRepository(City)
class CityRepository extends Repository<City> implements ICityRepository {
    public async getAllCities(): Promise<ICity[]> {
        return getManager()
            .getRepository(City)
            .find();
    }

    public async getCityById(id: number): Promise<ICity | undefined> {
        return getManager()
            .getRepository(City)
            .findOne({ id }, { relations: ['cityAddress'] });
    }

    public async getCityByName(cityName: string): Promise<ICity | undefined> {
        return getManager()
            .getRepository(City)
            .findOne({ cityName });
    }

    public async createCity(cityBody: ICity): Promise<ICity> {
        return getManager()
            .getRepository(City)
            .save(cityBody);
    }

    public async deleteCityById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(City)
            .delete(id);
    }
}

export const cityRepository = new CityRepository();
