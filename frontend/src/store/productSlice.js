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
    reducers: {
        setProductCount: (state, action) => {
            const id = action.payload.id;
            const count = Number(action.payload.count);

            state.products = state.products.map(product => product.id === id ? {
                ...product,
                totalCount: count <= 0 ? product.totalCount = count - count + 1 : product.totalCount = count,
                productPrice: product.productPrice = product.totalCount <= 0 ? 0 : product.defaultPrice * product.totalCount,
            } : product);

        },
        plusProductCount: (state, action) => {
            const id = action.payload.id;

            state.products = state.products.map(product => product.id === id ? {
                ...product,
                totalCount: product.totalCount + 1,
                productPrice: product.productPrice + product.defaultPrice,
            } : product);

        },
        minusProductCount: (state, action) => {
            const id = action.payload.id;

            state.products = state.products.map(product => product.id === id ? {
                ...product,
                totalCount: product.totalCount === 1 || product.totalCount <= 0 ? 1 : product.totalCount - 1,
                productPrice: product.totalCount === 1 || product.totalCount <= 0 ? product.defaultPrice : product.productPrice - product.defaultPrice,
            } : product);
        }
    },
    extraReducers: {
        [getAllProducts.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const productArray = action.payload.productData.data;

            state.products = productArray.map(product => Object.assign(product, {
                totalCount: 1,
                defaultPrice: product.productPrice,
            }));
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
            state.productDetails = action.payload.productDetailsData.data.productInformation;
            state.serverErrors = null;
        },
        [getProductInformationById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const productReducer = productSlice.reducer;

const {
    plusProductCount,
    minusProductCount,
    setProductCount
} = productSlice.actions;

export const productAction = {
    plusProductCount,
    minusProductCount,
    setProductCount
};

export default productReducer;
