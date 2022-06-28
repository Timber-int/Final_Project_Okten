import { UploadedFile } from 'express-fileupload';
import { NextFunction, Response } from 'express';
import { CONSTANTS } from '../constants';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { IRequestExtended } from '../interface';
import { STATUS } from '../errorCode';

class FileMiddleware {
    async checkIsProductPhotoFileExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (!req.files?.productPhoto) {
                next(new ErrorHandler(MESSAGE.PRODUCT_PHOTO_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            const {
                name,
                size,
                mimetype,
            } = req.files.productPhoto as UploadedFile;

            if (size > CONSTANTS.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`${MESSAGE.TO_BIG_PHOTO_FILE}: ${name}`));
                return;
            }

            if (!CONSTANTS.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler(MESSAGE.WRONG_FILE_FORMAT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    async checkIsProductBigPhotoFileExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (!req.files?.productBigPhoto) {
                next(new ErrorHandler(MESSAGE.PRODUCT_PHOTO_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            const {
                name,
                size,
                mimetype,
            } = req.files.productBigPhoto as UploadedFile;

            if (size > CONSTANTS.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`${MESSAGE.TO_BIG_PHOTO_FILE}: ${name}`));
                return;
            }

            if (!CONSTANTS.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler(MESSAGE.WRONG_FILE_FORMAT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
