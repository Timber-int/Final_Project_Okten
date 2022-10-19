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

    public async plusOrderProduct(id: number, userOrderFromDB: IUserOrder): Promise<UpdateResult> {
        return userOrderRepository.plusOrderProduct(id, userOrderFromDB);
    }

    public async minusOrderProduct(id: number, userOrderFromDB: IUserOrder): Promise<UpdateResult> {
        return userOrderRepository.minusOrderProduct(id, userOrderFromDB);
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

    public async deleteAllUserOrders(): Promise<DeleteResult> {
        return userOrderRepository.deleteAllUserOrders();
    }
}

export const userOrderService = new UserOrderService();
