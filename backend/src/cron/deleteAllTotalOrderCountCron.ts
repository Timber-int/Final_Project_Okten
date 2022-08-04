import cron from 'node-cron';
import { totalOrderCountRepository } from '../repository';

export const deleteAllTotalOrderCount = async () => {
    cron.schedule('0 0 * * *', async () => {
        await totalOrderCountRepository.deleteAllTotalOrderCount();
    });
};
