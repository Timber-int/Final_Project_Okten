import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface';
import { cityService } from '../service/cityService';

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
