import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CONSTANTS } from '../constants';
import { productService } from '../service';

export const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productService.getAllProducts();

            return { productData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getProductInformationById = createAsyncThunk(
    'productSlice/getProductInformationById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productService.getProductById(id);
            console.log(data);
            return { productDetailsData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        products: [],
        page: null,
        perPage: null,
        itemCount: null,
        serverErrors: null,
        status: null,
        productDetails: null,
    },
    reducers: {},
    extraReducers: {
        [getAllProducts.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.products = action.payload.productData.data;
            state.page = action.payload.productData.page;
            state.perPage = action.payload.productData.perPage;
            state.itemCount = action.payload.productData.itemCount;
            state.serverErrors = null;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [getProductInformationById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getProductInformationById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.productDetails = action.payload.productDetailsData.data.productInformation ;
            state.serverErrors = null;
        },
        [getProductInformationById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const productReducer = productSlice.reducer;

const {} = productSlice.actions;

export const productAction = {};

export default productReducer;
