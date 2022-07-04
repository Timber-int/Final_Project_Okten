import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { cityService } from '../service/cityService';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class CityMiddleware {
    public async checkIsCityExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const city = await cityService.getCityByName(req.body.cityName);

            if (city) {
                next(new ErrorHandler(MESSAGE.CITY_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const cityMiddleware = new CityMiddleware();
