import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { productInformationService } from '../service';

class ProductInformationController {
    public async getAllProductInformation(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productInformation = await productInformationService.getAllProductInformation();

            res.json(productInformation);
        } catch (e) {
            next(e);
        }
    }

    public async getProductInformationById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productInformation = await productInformationService.getProductInformationById(Number(id));

            res.json(productInformation);
        } catch (e) {
            next(e);
        }
    }

    public async createProductInformation(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productInformation = await productInformationService.createProductInformation(req.body);

            res.json(productInformation);
        } catch (e) {
            next(e);
        }
    }

    public async updateProductInformationById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;
            const productInformation = await productInformationService.updateProductInformationById(Number(id), req.body);

            res.json(productInformation);
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductInformationById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;
            const productInformation = await productInformationService.deleteProductInformationById(Number(id));

            res.json(productInformation);
        } catch (e) {
            next(e);
        }
    }
}

export const productInformationController = new ProductInformationController();
