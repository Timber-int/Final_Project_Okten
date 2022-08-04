import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { emailService, partnersRequestService } from '../service';
import { EmailActionEnum } from '../emailInformation';

class PartnersRequestController {
    public async createPartnersRequest(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const requestData = await partnersRequestService.createPartnersRequest(req.body);

            const x = await emailService.sendMail(req.body.email, EmailActionEnum.REQUEST_PARTNERS_MESSAGE, {
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
            });
            console.log(x);

            res.json({ data: requestData });
        } catch (e) {
            next(e);
        }
    }
}

export const partnersRequestController = new PartnersRequestController();
