import { NextFunction, Response, Router } from 'express';
import { partnersRequestController } from '../controller';
import { IRequestExtended } from '../interface';
import { dataValidatorMiddleware } from '../middlewares';
import { partnersRequestValidator } from '../validator';

const router = Router();

router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = partnersRequestValidator;
    next();
}, dataValidatorMiddleware.dataValidator, partnersRequestController.createPartnersRequest);

export const partnersRequestRouter = router;
