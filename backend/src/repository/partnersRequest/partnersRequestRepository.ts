import { EntityRepository, getManager, Repository } from 'typeorm';
import { IPartnersRequest, PartnersRequest } from '../../entity';
import { IPartnersRequestRepository } from './partnersRequestRepositoryInterface';

@EntityRepository(PartnersRequest)
class PartnersRequestRepository extends Repository<PartnersRequest> implements IPartnersRequestRepository {
    public async createPartnersRequest(data: IPartnersRequest): Promise<IPartnersRequest> {
        return getManager()
            .getRepository(PartnersRequest)
            .save(data);
    }
}

export const partnersRequestRepository = new PartnersRequestRepository();
