import { DeleteResult } from 'typeorm';

import { ICityAddress } from '../entity';
import { cityAddressRepository } from '../repository';

class CityAddressService {
    public async getAllCitiesAddress(): Promise<ICityAddress[]> {
        return cityAddressRepository.getAllCitiesAddress();
    }

    public async getCityAddressById(id: number): Promise<ICityAddress | undefined> {
        return cityAddressRepository.getCityAddressById(id);
    }

    public async getCityAddressByName(addressName: string): Promise<ICityAddress | undefined> {
        return cityAddressRepository.getCityAddressByName(addressName);
    }

    public async createCityAddress(cityAddressBody: ICityAddress): Promise<ICityAddress> {
        return cityAddressRepository.createCityAddress(cityAddressBody);
    }

    public async deleteCityAddressById(id: number): Promise<DeleteResult> {
        return cityAddressRepository.deleteCityAddressById(id);
    }
}

export const cityAddressService = new CityAddressService();
