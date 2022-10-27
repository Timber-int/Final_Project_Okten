import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customerOrderService } from '../service';
import { CONSTANTS } from '../constants';
import { orderAction } from './orderSlice';
import { totalOrderCountActions } from './totalOrderCountSlice';

export const createCustomerOrder = createAsyncThunk(
    'customerOrderSlice/createCustomerOrder',
    async ({ payload }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await customerOrderService.createCustomerOrder(payload);
            dispatch(orderAction.deleteAllOrderProduct());
            dispatch(totalOrderCountActions.deleteAllTotalOrderCount());

            return { customerOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const getCustomerOrder = createAsyncThunk(
    'customerOrderSlice/getCustomerOrder',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await customerOrderService.getCustomerOrders();

            return { customerOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const getCustomerOrderSelfPickup = createAsyncThunk(
    'customerOrderSlice/getCustomerOrderSelfPickup',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await customerOrderService.getCustomerOrdersSelfPickup();

            return { customerOrderDataSelfPickup: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const createCustomerOrderSelfPickup = createAsyncThunk(
    'customerOrderSlice/createCustomerOrderSelfPickup',
    async ({ payload }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await customerOrderService.createCustomerOrderSelfPickup(payload);
            dispatch(orderAction.deleteAllOrderProduct());
            dispatch(totalOrderCountActions.deleteAllTotalOrderCount());

            return { customerOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const customerOrderSlice = createSlice({
    name: 'customerOrderSlice',
    initialState: {
        userData: null,
        serverErrors: null,
        status: null,
        servetStatus: false,
        orders: [],
        selfPickupOrders: [],
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload.userData;
        },
        setServeStatus: (state, action) => {
            state.servetStatus = !state.servetStatus;
        },
        deleteUserData: (state, action) => {
            state.userData = null;
        },
        sortAllCustomerOrderByTotalCount: (state, action) => {
            state.orders = state.orders.sort((a, b) => b.totalOrderCount - a.totalOrderCount);
            state.selfPickupOrders = state.selfPickupOrders.sort((a, b) => b.totalOrderCount - a.totalOrderCount);
        },
        sortAllCustomerOrderByProductsCount: (state, action) => {
            state.orders = state.orders.sort((a, b) => b.products.length - a.products.length);
            state.selfPickupOrders = state.selfPickupOrders.sort((a, b) => b.products.length - a.products.length);
        },
        sortAllCustomerOrderDate: (state, action) => {
            state.orders = state.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            state.selfPickupOrders = state.selfPickupOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        sortAllCustomerOrderByAddress: (state, action) => {
        }
    },
    extraReducers: {
        [createCustomerOrder.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createCustomerOrder.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [createCustomerOrder.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createCustomerOrderSelfPickup.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createCustomerOrderSelfPickup.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [createCustomerOrderSelfPickup.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [getCustomerOrderSelfPickup.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getCustomerOrderSelfPickup.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.selfPickupOrders = action.payload.customerOrderDataSelfPickup;
            state.serverErrors = null;
        },
        [getCustomerOrderSelfPickup.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [getCustomerOrder.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getCustomerOrder.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.orders = action.payload.customerOrderData;
            state.serverErrors = null;
        },
        [getCustomerOrder.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const customerOrderReducer = customerOrderSlice.reducer;
const {
    setUserData,
    setServeStatus,
    deleteUserData,
    sortAllCustomerOrderByTotalCount,
    sortAllCustomerOrderDate,
    sortAllCustomerOrderByAddress,
    sortAllCustomerOrderByProductsCount,
} = customerOrderSlice.actions;

export const customerOrderAction = {
    setUserData,
    setServeStatus,
    deleteUserData,
    sortAllCustomerOrderByTotalCount,
    sortAllCustomerOrderDate,
    sortAllCustomerOrderByAddress,
    sortAllCustomerOrderByProductsCount
};
export default customerOrderReducer;
