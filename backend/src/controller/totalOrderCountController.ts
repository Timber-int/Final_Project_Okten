import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { totalOrderCountService } from '../service';

class TotalOrderCountController {
    public async getAllTotalOrderCount(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const totalOrderCountData = await totalOrderCountService.getAllTotalOrderCount();

            res.json({ data: totalOrderCountData });
        } catch (e) {
            next(e);
        }
    }

    public async deleteTotalOrderCount(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const totalOrderCountData = await totalOrderCountService.getTotalCountByUniqueData(req.params.deletePath);
            await totalOrderCountService.deleteTotalOrderCount(req.params.deletePath);

            res.json({ data: totalOrderCountData });
        } catch (e) {
            next(e);
        }
    }

    public async createTotalOrderCount(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            let totalOrderCountData;

            const totalOrderCountDataFromDB = await totalOrderCountService.getTotalCountByUniqueData(req.body.productUniqueData);

            if (totalOrderCountDataFromDB) {
                await totalOrderCountService
                    .updateTotalOrderCountById(totalOrderCountDataFromDB.id, req.body, totalOrderCountDataFromDB.productPrice);
                totalOrderCountData = totalOrderCountService.getTotalOrderCountById(totalOrderCountDataFromDB.id);
            } else {
                totalOrderCountData = await totalOrderCountService.createTotalOrderCount(req.body);
            }

            res.json({ data: totalOrderCountData });
        } catch (e) {
            next(e);
        }
    }

    public async plusTotalOrderCount(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            let totalOrderCountData;

            const totalOrderCountDataFromDB = await totalOrderCountService.getTotalCountByUniqueData(req.body.productUniqueData);

            if (totalOrderCountDataFromDB) {
                await totalOrderCountService
                    .plusTotalOrderCountById(totalOrderCountDataFromDB.id, req.body, totalOrderCountDataFromDB.productPrice);
                totalOrderCountData = totalOrderCountService.getTotalOrderCountById(totalOrderCountDataFromDB.id);
            } else {
                totalOrderCountData = await totalOrderCountService.createTotalOrderCount(req.body);
            }

            res.json({ data: totalOrderCountData });
        } catch (e) {
            next(e);
        }
    }

    public async minusTotalOrderCount(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            let totalOrderCountData;

            const { totalCount } = req.body;

            if (totalCount <= 1) return;

            const totalOrderCountDataFromDB = await totalOrderCountService.getTotalCountByUniqueData(req.body.productUniqueData);

            if (totalOrderCountDataFromDB) {
                await totalOrderCountService
                    .minusTotalOrderCountById(totalOrderCountDataFromDB.id, req.body, totalOrderCountDataFromDB.productPrice);
                totalOrderCountData = totalOrderCountService.getTotalOrderCountById(totalOrderCountDataFromDB.id);
            } else {
                totalOrderCountData = await totalOrderCountService.createTotalOrderCount(req.body);
            }

            res.json({ data: totalOrderCountData });
        } catch (e) {
            next(e);
        }
    }
}

export const totalOrderCountController = new TotalOrderCountController();
