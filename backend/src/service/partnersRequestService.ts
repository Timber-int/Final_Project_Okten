import { IPartnersRequest } from '../entity';
import { partnersRequestRepository } from '../repository';

class PartnersRequestService {
    public async createPartnersRequest(data: IPartnersRequest): Promise<IPartnersRequest> {
        return partnersRequestRepository.createPartnersRequest(data);
    }
}

export const partnersRequestService = new PartnersRequestService();
