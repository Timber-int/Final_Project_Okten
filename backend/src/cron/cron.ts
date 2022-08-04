import { deleteAllTotalOrderCount, deleteAllUserOrders } from '.';

export const cronRunner = async () => {
    await deleteAllTotalOrderCount();
    await deleteAllUserOrders();
};
