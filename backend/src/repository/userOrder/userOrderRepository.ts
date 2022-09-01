import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
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

    public async plusOrderProduct(id: number, userOrderFromDB: IUserOrder): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserOrder)
            .update({ id }, {
                ...userOrderFromDB,
                productPrice: userOrderFromDB.productPrice + userOrderFromDB.productPrice / userOrderFromDB.totalCount,
                totalCount: userOrderFromDB.totalCount + 1,
            });
    }

    public async minusOrderProduct(id: number, userOrderFromDB: IUserOrder): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserOrder)
            .update({ id }, {
                ...userOrderFromDB,
                productPrice: userOrderFromDB.productPrice - userOrderFromDB.productPrice / userOrderFromDB.totalCount,
                totalCount: userOrderFromDB.totalCount <= 1 ? userOrderFromDB.totalCount : userOrderFromDB.totalCount - 1,
            });
    }

    public async getUserOrderById(id: number): Promise<IUserOrder | undefined> {
        return getManager()
            .getRepository(UserOrder)
            .findOne({ id });
    }

    public async updateUserOrderById(id: number, orderDataToUpdate: IUserOrder, orderFromDB: IUserOrder): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserOrder)
            .update({ id }, {
                ...orderFromDB,
                totalCount: orderFromDB.totalCount + orderDataToUpdate.totalCount,
                productPrice: orderFromDB.productPrice + orderDataToUpdate.productPrice,
            });
    }

    public async getUserOrderByProductName(productName: string, productIngredients: string): Promise<IUserOrder | undefined> {
        return getManager()
            .getRepository(UserOrder)
            .createQueryBuilder('order')
            .where('order.productName = :productName', { productName })
            .andWhere('order.productIngredients = :productIngredients', { productIngredients })
            .getOne();
    }

    public async getAllUserOrder(): Promise<IUserOrder[]> {
        return getManager()
            .getRepository(UserOrder)
            .find();
    }

    public async deleteAllUserOrders(): Promise<void> {
        await getManager()
            .getRepository(UserOrder)
            .find()
            .then((data) => data.forEach((element) => getManager()
                .getRepository(UserOrder)
                .delete({ id: element.id })));
    }
}

export const userOrderRepository = new UserOrderRepository();
