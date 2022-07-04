import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface';
import { cityService } from '../service/cityService';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { cityAddressService } from '../service';

class CityAddressMiddleware {
    public async checkIsCityAddressExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const cityAddress = await cityAddressService.getCityAddressByName(req.body.addressName);

            if (cityAddress) {
                next(new ErrorHandler(MESSAGE.CITY_ADDRESS_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCityExistById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const city = await cityService.getCityById(req.body.cityId);

            if (!city) {
                next(new ErrorHandler(MESSAGE.CITY_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const cityAddressMiddleware = new CityAddressMiddleware();
