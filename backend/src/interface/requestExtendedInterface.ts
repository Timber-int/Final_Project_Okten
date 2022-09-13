import { Request } from 'express';

import { ICategory, IUser } from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    userRoles?: string[],
    user?: IUser,
    category?: ICategory,
}
