import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { totalCountService } from '../service';
import { CONSTANTS } from '../constants';

export const getAllTotalOrderCount = createAsyncThunk(
    'totalOrderCountSlice/getAllTotalOrderCount',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await totalCountService.getAllOrderCount();

            return { totalCountData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteTotalOrderCount = createAsyncThunk(
    'totalOrderCountSlice/deleteTotalOrderCount',
    async ({ orderElement }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                productName,
                productIngredients
            } = orderElement;

            const uniquePath = productIngredients.replaceAll(',', '-') + '-' + productName;

            const data = await totalCountService.deleteTotalOrderCount(uniquePath);

            return { totalCountData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const createTotalOrderCount = createAsyncThunk(
    'totalOrderCountSlice/createTotalOrderCount',
    async ({ product }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                productPrice,
                productName,
                categoryId,
                id: productId,
                chosenProductIngredients
            } = product;

            const productUniqueData = chosenProductIngredients.join(',');

            const countData = {
                productPrice,
                categoryId,
                productId,
                productUniqueData: productUniqueData.replaceAll(',', '-') + '-' + productName,
            };

            const data = await totalCountService.createOrderCount(countData);

            return { totalCountData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const plusTotalOrderCount = createAsyncThunk(
    'totalOrderCountSlice/plusTotalOrderCount',
    async ({ product }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                productPrice,
                productName,
                categoryId,
                productId,
                productIngredients
            } = product;

            const countData = {
                productPrice,
                categoryId,
                productId,
                productUniqueData: productIngredients.replaceAll(',', '-') + '-' + productName,
            };

            const data = await totalCountService.plusTotalOrderCount(countData.productUniqueData, countData);

            return { totalCountData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const minusTotalOrderCount = createAsyncThunk(
    'totalOrderCountSlice/minusTotalOrderCount',
    async ({ product }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                productPrice,
                productName,
                categoryId,
                productId,
                productIngredients,
                totalCount
            } = product;

            if (totalCount <= 1) return;

            const countData = {
                productPrice,
                categoryId,
                productId,
                productUniqueData: productIngredients.replaceAll(',', '-') + '-' + productName,
            };

            const data = await totalCountService.minusTotalOrderCount(countData.productUniqueData, countData);

            return { totalCountData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const totalOrderCountSlice = createSlice({
    name: 'totalOrderCountSlice',
    initialState: {
        totalOrderCount: 0,
        serverErrors: null,
        status: null,
    },
    reducers: {
        deleteAllTotalOrderCount: (state, action) => {
            state.totalOrderCount = 0;
        }
    },
    extraReducers: {
        [getAllTotalOrderCount.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllTotalOrderCount.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const totalOrderCountArray = action.payload.totalCountData.data;
            state.totalOrderCount = totalOrderCountArray.reduce((acc, count) => {
                return acc + count.productPrice;
            }, 0);

            state.serverErrors = null;
        },
        [getAllTotalOrderCount.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createTotalOrderCount.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createTotalOrderCount.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const count = action.payload.totalCountData.data;
            state.totalOrderCount = state.totalOrderCount + count.productPrice;
            state.serverErrors = null;
        },
        [createTotalOrderCount.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [deleteTotalOrderCount.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteTotalOrderCount.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const count = action.payload.totalCountData.data;
            state.totalOrderCount = state.totalOrderCount - count.productPrice;
            state.serverErrors = null;
        },
        [deleteTotalOrderCount.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [plusTotalOrderCount.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [plusTotalOrderCount.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const count = action.payload.totalCountData.data;
            state.totalOrderCount = state.totalOrderCount + count.productPrice;
            state.serverErrors = null;
        },
        [plusTotalOrderCount.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [minusTotalOrderCount.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [minusTotalOrderCount.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const count = action.payload.totalCountData.data;
            state.totalOrderCount = state.totalOrderCount - count.productPrice;
            state.serverErrors = null;
        },
        [minusTotalOrderCount.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const totalOrderCountReducer = totalOrderCountSlice.reducer;

const {deleteAllTotalOrderCount} = totalOrderCountSlice.actions;

export const totalOrderCountActions = {deleteAllTotalOrderCount};

export default totalOrderCountReducer;
