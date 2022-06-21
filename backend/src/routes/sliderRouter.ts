import { Router } from 'express';
import { sliderDataController } from '../controller';

const router = Router();

router.get('/', sliderDataController.getAllSliders);

export const sliderRouter = router;
