import { DeleteResult } from 'typeorm';

import { ICity } from '../entity';
import { cityRepository } from '../repository';

class CityService {
    public async getAllCities(): Promise<ICity[]> {
        return cityRepository.getAllCities();
    }

    public async getCityById(id: number): Promise<ICity | undefined> {
        return cityRepository.getCityById(id);
    }

    public async getCityByName(cityName: string): Promise<ICity | undefined> {
        return cityRepository.getCityByName(cityName);
    }

    public async createCity(cityBody: ICity): Promise<ICity> {
        return cityRepository.createCity(cityBody);
    }

    public async deleteCityById(id: number): Promise<DeleteResult> {
        return cityRepository.deleteCityById(id);
    }
}

export const cityService = new CityService();
