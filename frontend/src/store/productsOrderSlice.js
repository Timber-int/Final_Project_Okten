import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productOrderService, productSelfPickupService } from '../service';
import { CONSTANTS } from '../constants';

export const getProductsOrder = createAsyncThunk(
    'productsOrderSlice/getProductsOrder',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productOrderService.getAllProductOrder();

            return { productOrderData: data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const getProductsSelfPickup = createAsyncThunk(
    'productsOrderSlice/getProductsSelfPickup',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productSelfPickupService.getAllProductSelfPickup();

            return { productSelfPickupData: data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const productsOrderSlice = createSlice({
    name: 'productsOrderSlice',
    initialState: {
        productsOrder: [],
        productSelfPickup: [],
    },
    reducers: {},
    extraReducers: {
        [getProductsOrder.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getProductsOrder.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.productsOrder = action.payload.productOrderData.productsForOrder;
            state.serverErrors = null;
        },
        [getProductsOrder.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [getProductsSelfPickup.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getProductsSelfPickup.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.productSelfPickup = action.payload.productSelfPickupData.productsForSelfPickup;
            state.serverErrors = null;
        },
        [getProductsSelfPickup.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const productOrderReducer = productsOrderSlice.reducer;

const {} = productsOrderSlice.actions;

export const productsOrderAction = {};

export default productOrderReducer;
