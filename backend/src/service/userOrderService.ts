import { DeleteResult, UpdateResult } from 'typeorm';
import { IUserOrder } from '../entity';
import { userOrderRepository } from '../repository';

class UserOrderService {
    public async createUserOrder(orderData: IUserOrder): Promise<IUserOrder> {
        return userOrderRepository.createUserOrder(orderData);
    }

    public async deleteUserOrder(id: number): Promise<DeleteResult> {
        return userOrderRepository.deleteUserOrder(id);
    }

    public async getUserOrderById(id: number): Promise<IUserOrder | undefined> {
        return userOrderRepository.getUserOrderById(id);
    }

    public async updateUserOrderById(id: number, orderDataToUpdate: IUserOrder, orderFromDB: IUserOrder): Promise<UpdateResult> {
        return userOrderRepository.updateUserOrderById(id, orderDataToUpdate, orderFromDB);
    }

    public async getUserOrderByProductName(productName: string, productIngredients: string): Promise<IUserOrder | undefined> {
        return userOrderRepository.getUserOrderByProductName(productName, productIngredients);
    }

    public async getAllUserOrder(): Promise<IUserOrder[]> {
        return userOrderRepository.getAllUserOrder();
    }
}

export const userOrderService = new UserOrderService();
