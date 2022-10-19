import { NextFunction, Response, Router } from 'express';
import { cityAddressController } from '../controller';
import { IRequestExtended } from '../interface';
import { createCityAddressValidator } from '../validator';
import { authMiddleware, cityAddressMiddleware, dataValidatorMiddleware } from '../middlewares';

const router = Router();

router.get('/', cityAddressController.getAllCitiesAddress);
router.get('/:id', cityAddressController.getCityAddressById);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createCityAddressValidator;
    next();
}, authMiddleware.checkIsUserHasLawAdministrator, dataValidatorMiddleware.dataValidator, cityAddressMiddleware.checkIsCityAddressExist, cityAddressMiddleware.checkIsCityExistByCityId, cityAddressController.createCityAddress);
router.delete('/:id', authMiddleware.checkIsUserHasLawAdministrator, cityAddressController.deleteCityAddressById);

export const cityAddressRouter = router;
