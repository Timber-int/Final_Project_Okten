import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { IUserOrder, UserOrder } from '../../entity';
import { IUserOrderRepository } from './userOrderRepositoryInterface';

@EntityRepository(UserOrder)
class UserOrderRepository extends Repository<UserOrder> implements IUserOrderRepository {
    public async createUserOrder(orderData: IUserOrder): Promise<IUserOrder> {
        return getManager()
            .getRepository(UserOrder)
            .save(orderData);
    }

    public async deleteUserOrder(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(UserOrder)
            .delete({ id });
    }

    public async getUserOrderById(id: number): Promise<IUserOrder | undefined> {
        return getManager()
            .getRepository(UserOrder)
            .findOne({ id });
    }

    public async getAllUserOrder(): Promise<IUserOrder[]> {
        return getManager()
            .getRepository(UserOrder)
            .find();
    }
}

export const userOrderRepository = new UserOrderRepository();