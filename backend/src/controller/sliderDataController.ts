import { Request, Response, NextFunction } from 'express';
import { sliderDataService } from '../service';

class SliderDataController {
    public async getAllSliders(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const sliders = await sliderDataService.getAllSliders();

            res.json({ data: sliders });
        } catch (e) {
            next(e);
        }
    }
}

export const sliderDataController = new SliderDataController();
