import { Request, Response, NextFunction } from 'express';

import { UploadedFile } from 'express-fileupload';
import { categoryService, fileService } from '../service';
import { IRequestExtended } from '../interface';
import { ICategory } from '../entity';

class CategoryController {
    public async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categories = await categoryService.getAllCategories();

            res.json({ data: categories });
        } catch (e) {
            next(e);
        }
    }

    public async getCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const category = await categoryService.getCategoryById(Number(id));

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async createCategory(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categoryPhoto = req.files?.logo as UploadedFile;

            const categoryFilePath = await fileService.saveFile(categoryPhoto);

            const category = await categoryService.createCategory({
                ...req.body,
                logo: categoryFilePath,
            });

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async updateCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.category as ICategory;

            const category = await categoryService.updateCategoryById(id, req.body.name);

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async deleteCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.category as ICategory;

            const category = await categoryService.deleteCategoryById(Number(id));

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }
}

export const categoryController = new CategoryController();
