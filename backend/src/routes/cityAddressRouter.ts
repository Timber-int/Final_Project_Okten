import { NextFunction, Response, Router } from 'express';
import { cityAddressController } from '../controller';
import { IRequestExtended } from '../interface';
import { createCityAddressValidator } from '../validator';
import { cityAddressMiddleware, dataValidatorMiddleware } from '../middlewares';

const router = Router();

router.get('/', cityAddressController.getAllCitiesAddress);
router.get('/:id', cityAddressController.getCityAddressById);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createCityAddressValidator;
    next();
}, dataValidatorMiddleware.dataValidator, cityAddressMiddleware.checkIsCityAddressExist, cityAddressMiddleware.checkIsCityExistById, cityAddressController.createCityAddress);
router.delete('/:id', cityAddressController.deleteCityAddressById);

export const cityAddressRouter = router;
