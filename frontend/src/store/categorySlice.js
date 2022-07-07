import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CONSTANTS } from '../constants';
import { categoryService } from '../service';

export const getAllCategories = createAsyncThunk(
    'categorySlice/getAllCategories',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await categoryService.getAllCategories();

            return { categoriesData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getCategoryById = createAsyncThunk(
    'categorySlice/getAllCategoryById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await categoryService.getCategoryById(id);

            return { categoryData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        categories: [],
        serverErrors: null,
        status: null,
        category: null,
        products: [],
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
        },
    },
    extraReducers: {
        [getAllCategories.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllCategories.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.categories = action.payload.categoriesData.data;
            state.serverErrors = null;
        },
        [getAllCategories.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [getCategoryById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getCategoryById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.category = action.payload.categoryData.data;
            const productArray = action.payload.categoryData.data.products;

            state.products = productArray.map(product => Object.assign(product, {
                totalCount: 1,
                defaultPrice: product.productPrice,
            }));
            state.serverErrors = null;
        },
        [getCategoryById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const categoryReducer = categorySlice.reducer;

const {
    minusProductCount,
    setProductCount,
    plusProductCount
} = categorySlice.actions;

export const categoryAction = {
    minusProductCount,
    setProductCount,
    plusProductCount
};

export default categoryReducer;
