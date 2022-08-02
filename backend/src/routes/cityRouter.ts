import { NextFunction, Response, Router } from 'express';
import { cityController } from '../controller';
import { cityMiddleware, dataValidatorMiddleware } from '../middlewares';
import { IRequestExtended } from '../interface';
import { createCityValidator } from '../validator';

const router = Router();

router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.get('/city/:cityName', cityController.getCityByName);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createCityValidator;
    next();
}, dataValidatorMiddleware.dataValidator, cityMiddleware.checkIsCityExist, cityController.createCity);
router.delete('/:id', cityController.deleteCityById);

export const cityRouter = router;
