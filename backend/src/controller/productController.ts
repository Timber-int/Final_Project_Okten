import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { IRequestExtended } from '../interface';
import { fileService, productService } from '../service';

class ProductController {
    public async getAllProducts(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                page,
                perPage,
                ...other
            } = req.query;

            const products = await productService.getAllProducts(other, Number(page), Number(perPage));

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
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    public async createProduct(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productPhoto = req.files?.productPhoto as UploadedFile;

            const productFilePath = await fileService.saveFile(productPhoto);
            // const readStream = await fs.createReadStream(path.join(__dirname, '../', 'fileDirectory', productFilePath));
            //
            // const x = await readStream.on('data', (chunk: Buffer) => Buffer.from(chunk)
            //     .toString('base64'));
            //
            // console.log(x);
            const product = await productService.createProduct({
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

            const product = await productService.updateProductById(Number(id), req.body);

            res.json(product);
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

    public async getProductPhoto(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { photo } = req.params;
            res.sendFile(photo, { root: `${path.join(__dirname, '../', 'fileDirectory')}` });
        } catch (e) {
            next(e);
        }
    }
}

export const productController = new ProductController();
