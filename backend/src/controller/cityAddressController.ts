import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { cityAddressService } from '../service';

class CityAddressController {
    public async getAllCitiesAddress(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const cityAddress = await cityAddressService.getAllCitiesAddress();

            res.json({ data: cityAddress });
        } catch (e) {
            next(e);
        }
    }

    public async getCityAddressById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const cityAddress = await cityAddressService.getCityAddressById(Number(id));

            res.json({ data: cityAddress });
        } catch (e) {
            next(e);
        }
    }

    public async createCityAddress(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const cityAddress = await cityAddressService.createCityAddress(req.body);

            res.json({ data: cityAddress });
        } catch (e) {
            next(e);
        }
    }

    public async deleteCityAddressById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const cityAddress = await cityAddressService.deleteCityAddressById(Number(id));

            res.json({ data: cityAddress });
        } catch (e) {
            next(e);
        }
    }
}

export const cityAddressController = new CityAddressController();
