import cron from 'node-cron';
import { userOrderRepository } from '../repository';

export const deleteAllUserOrders = async () => {
    cron.schedule('0 0 * * *', async () => {
        await userOrderRepository.deleteAllUserOrders();
    });
};
