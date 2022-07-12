import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CONSTANTS } from '../constants';
import { productIngredientService } from '../service';

export const getAllProductIngredients = createAsyncThunk(
    'productIngredientSlice/getAllProductIngredients',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productIngredientService.getAllProductIngredients();

            return { productIngredientsData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
export const createProductIngredient = createAsyncThunk(
    'productIngredientSlice/createProductIngredient',
    async ({ productIngredient }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                categoryId,
                productIngredientName,
                productPhoto,
                productPrice,
                productWeight
            } = productIngredient;

            let formData = new FormData();

            formData.append('categoryId', categoryId);
            formData.append('productIngredientName', productIngredientName);
            formData.append('productPrice', productPrice);
            formData.append('productWeight', productWeight);
            formData.append('productPhoto', productPhoto[0]);

            const data = await productIngredientService.createProductIngredient(formData);

            return { productIngredientsData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
export const updateProductIngredientById = createAsyncThunk(
    'productIngredientSlice/updateProductIngredientById',
    async ({ productIngredientDataToUpdate }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                id,
                categoryId,
                productIngredientName,
                productIngredientUniqueName,
                productPhoto,
                productPrice,
                productWeight
            } = productIngredientDataToUpdate;

            console.log(productIngredientDataToUpdate,'sdf');
            let formData = new FormData();

            formData.append('categoryId', categoryId);

            if (productIngredientName !== productIngredientUniqueName) {
                formData.append('productIngredientName', productIngredientName);
            }

            formData.append('productPrice', productPrice);
            formData.append('productWeight', productWeight);

            if (typeof productPhoto === 'string') {
                formData.append('logo', productPhoto);
            } else {
                formData.append('logo', productPhoto[0]);
            }

            const data = await productIngredientService.updateProductIngredientById(id, formData);
            console.log(data);
            dispatch(productIngredientAction.updateSingleProductIngredientById({ productIngredientsData: data }));

            return { productIngredientsData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteProductIngredientById = createAsyncThunk(
    'productIngredientSlice/deleteProductIngredientById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productIngredientService.deleteProductIngredientById(id);

            dispatch(productIngredientAction.deleteSingleProductIngredientById({ id }));

            return { productIngredientsData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const productIngredientSlice = createSlice({
    name: 'productIngredientSlice',
    initialState: {
        productIngredients: [],
        status: null,
        serverErrors: null,
        productIngredientDataToUpdate: null,
    },
    reducers: {
        deleteSingleProductIngredientById: (state, action) => {
            state.productIngredients = state.productIngredients.filter(productIngredient => productIngredient.id !== action.payload.id);
        },
        updateProductIngredientGetData: (state, action) => {
            state.productIngredientDataToUpdate = action.payload.productDataToUpdate;
        },
        updateSingleProductIngredientById: (state, action) => {
            const updatedProductIngredient = action.payload.productIngredientsData.data;
            const { id } = updatedProductIngredient;
            state.productIngredients = state.productIngredients.map(productIngredient => productIngredient.id === id ? { ...updatedProductIngredient } : productIngredient);
            state.productIngredientDataToUpdate = null;
        },
    },
    extraReducers: {
        [getAllProductIngredients.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllProductIngredients.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.productIngredients = action.payload.productIngredientsData.data;
            state.serverErrors = null;
        },
        [getAllProductIngredients.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [deleteProductIngredientById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteProductIngredientById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteProductIngredientById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createProductIngredient.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createProductIngredient.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.productIngredients.push(action.payload.productIngredientsData);
            state.serverErrors = null;
        },
        [createProductIngredient.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const productIngredientReducer = productIngredientSlice.reducer;

const {
    deleteSingleProductIngredientById,
    updateSingleProductIngredientById,
    updateProductIngredientGetData
} = productIngredientSlice.actions;

export const productIngredientAction = {
    deleteSingleProductIngredientById,
    updateSingleProductIngredientById,
    updateProductIngredientGetData
};

export default productIngredientReducer;
