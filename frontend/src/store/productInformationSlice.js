import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productInformationService } from '../service';
import { CONSTANTS } from '../constants';

export const getAllProductsInformation = createAsyncThunk(
    'productSlice/getAllProductsInformation',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productInformationService.getAllProductsInformation();

            return { productInformationData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createProductInformation = createAsyncThunk(
    'productSlice/createProductInformation',
    async ({ productInformation }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                productCalories,
                productCarbohydrates,
                productFats,
                productProteins,
                productId,
            } = productInformation;

            let formData = new FormData();

            formData.append('productCalories', productCalories);
            formData.append('productCarbohydrates', productCarbohydrates);
            formData.append('productFats', productFats);
            formData.append('productProteins', productProteins);
            formData.append('productId', productId);

            const data = await productInformationService.createProductInformation(formData);

            return { productInformationData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteProductsInformationById = createAsyncThunk(
    'productSlice/deleteProductsInformationById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await productInformationService.deleteProductInformationById(id);

            dispatch(productInformationAction.deleteSingleProductInformationById({ id }));

            return { productInformationData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const updateProductsInformationById = createAsyncThunk(
    'productSlice/updateProductsInformationById',
    async ({ productInformationDataToUpdate }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                productCalories,
                productCarbohydrates,
                productFats,
                productProteins,
                id,
            } = productInformationDataToUpdate;

            const dataToUpdate = {
                productCalories,
                productCarbohydrates,
                productFats,
                productProteins,
            };

            const data = await productInformationService.updateProductInformationById(id, dataToUpdate);

            dispatch(productInformationAction.updateSingleProductInformationById({ productInformationData: data }));

            return { productInformationData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const productInformationSlice = createSlice({
    name: 'productInformationSlice',
    initialState: {
        productInformation: [],
        productInformationDataToUpdate: null,
        serverErrors: null,
        status: null,
    },
    reducers: {
        deleteSingleProductInformationById: (state, action) => {
            state.productInformation = state.productInformation.filter(productInformation => productInformation.id !== action.payload.id);
        },
        updateProductInformationGetData: (state, action) => {
            state.productInformationDataToUpdate = action.payload.productInformationDataToUpdate;
        },
        updateSingleProductInformationById: (state, action) => {
            const updatedProductInformation = action.payload.productInformationData;
            const { id } = updatedProductInformation;
            state.productInformation = state.productInformation.map(productInformation => productInformation.id === id ? { ...updatedProductInformation } : productInformation);
            state.productInformationDataToUpdate = null;
        },
    },
    extraReducers: {
        [getAllProductsInformation.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllProductsInformation.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.productInformation = action.payload.productInformationData.data;
            state.serverErrors = null;
        },
        [getAllProductsInformation.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createProductInformation.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createProductInformation.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.productInformation.push(action.payload.productInformationData);
            state.serverErrors = null;
        },
        [createProductInformation.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [deleteProductsInformationById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteProductsInformationById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteProductsInformationById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [updateProductsInformationById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [updateProductsInformationById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [updateProductsInformationById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const productInformationReducer = productInformationSlice.reducer;

const {
    deleteSingleProductInformationById,
    updateProductInformationGetData,
    updateSingleProductInformationById
} = productInformationSlice.actions;

export const productInformationAction = {
    deleteSingleProductInformationById,
    updateProductInformationGetData,
    updateSingleProductInformationById
};

export default productInformationReducer;
