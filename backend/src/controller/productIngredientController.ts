import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interface';
import { fileService, productIngredientService } from '../service';

class ProductIngredientController {
    public async getAllProductIngredients(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productIngredients = await productIngredientService.getAllProductIngredients();

            res.json({ data: productIngredients });
        } catch (e) {
            next(e);
        }
    }

    public async getProductIngredientById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productIngredient = await productIngredientService.getProductIngredientById(Number(id));

            res.json({ data: productIngredient });
        } catch (e) {
            next(e);
        }
    }

    public async createProductIngredient(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productPhoto = req.files?.productPhoto as UploadedFile;

            const productFilePath = await fileService.saveFile(productPhoto);

            const productIngredient = await productIngredientService.createProductIngredient({
                ...req.body,
                productPhoto: productFilePath,
            });

            res.json(productIngredient);
        } catch (e) {
            next(e);
        }
    }

    public async updateProductIngredientById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productIngredient = await productIngredientService.updateProductIngredientById(Number(id), req.body);

            res.json(productIngredient);
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductIngredientById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productIngredient = await productIngredientService.deleteProductIngredientById(Number(id));

            res.json(productIngredient);
        } catch (e) {
            next(e);
        }
    }
}

export const productIngredientController = new ProductIngredientController();
