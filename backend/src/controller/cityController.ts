import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface';
import { cityService } from '../service/cityService';
import { cityAddressService } from '../service';

class CityController {
    public async getAllCities(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const cities = await cityService.getAllCities();

            res.json({ data: cities });
        } catch (e) {
            next(e);
        }
    }

    public async getCityById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const city = await cityService.getCityById(Number(id));

            res.json({ data: city });
        } catch (e) {
            next(e);
        }
    }

    public async getCityByName(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { cityName } = req.params;

            const city = await cityService.getCityByName(cityName);

            const cityAddress = await cityAddressService.getAllCitiesAddress();

            const filterCityAddress = cityAddress.filter((address) => address.cityId === city?.id);

            res.json({
                data: city,
                filterCityAddress,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createCity(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const city = await cityService.createCity(req.body);

            res.json({ data: city });
        } catch (e) {
            next(e);
        }
    }

    public async deleteCityById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const city = await cityService.deleteCityById(Number(id));

            res.json({ data: city });
        } catch (e) {
            next(e);
        }
    }
}

export const cityController = new CityController();
