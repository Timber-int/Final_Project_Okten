import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interface';
import { fileService, productService } from '../service';

class ProductController {
    public async getAllProducts(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const products = await productService.getAllProducts();

            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    public async getProductById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const product = await productService.getProductById(Number(id));
            //     res.sendFile(product?.productPhoto, { root: `${path.join(__dirname, '../', 'fileDirectory')}` });
            res.json({ data: product });
        } catch (e) {
            next(e);
        }
    }

    public async createProduct(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productPhoto = req.files?.productPhoto as UploadedFile;
            const productBigPhoto = req.files?.productBigPhoto as UploadedFile;

            const productFilePath = await fileService.saveFile(productPhoto);

            let productBigFilePath = null;

            if (productBigPhoto) {
                productBigFilePath = await fileService.saveFile(productBigPhoto);
            }

            const product = await productService.createProduct(productBigFilePath ? {
                ...req.body,
                productPhoto: productFilePath,
                productBigPhoto: productBigFilePath,
            } : {
                ...req.body,
                productPhoto: productFilePath,
            });

            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    public async updateProductById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productPhoto = req.files?.productPhoto as UploadedFile;
            const productBigPhoto = req.files?.productBigPhoto as UploadedFile;

            let productPhotoFilePath;
            let productBigPhotoFilePath;

            if (productPhoto) {
                productPhotoFilePath = await fileService.saveFile(productPhoto);
            }

            if (productBigPhoto) {
                productBigPhotoFilePath = await fileService.saveFile(productBigPhoto);
            }

            await productService.updateProductById(Number(id),
                productPhoto && productBigPhoto
                    ? {
                        ...req.body,
                        productPhoto: productPhotoFilePath,
                        productBigPhoto: productBigPhotoFilePath,
                    } : { ...req.body }
                        ? productPhoto
                            ? {
                                ...req.body,
                                productPhoto: productPhotoFilePath,
                            } : { ...req.body }
                                ? productBigPhoto
                                    ? {
                                        ...req.body,
                                        productBigPhoto: productBigPhotoFilePath,
                                    } : { ...req.body } : { ...req.body } : { ...req.body },
            );
            const product = await productService.getProductById(Number(id));

            res.json({ data: product });
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const product = await productService.deleteProductById(Number(id));

            res.json(product);
        } catch (e) {
            next(e);
        }
    }
}

export const productController = new ProductController();
