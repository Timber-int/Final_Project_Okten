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

const productIngredientSlice = createSlice({
    name: 'productIngredientSlice',
    initialState: {
        productIngredients: [],
        serverErrors: null,
        status: null,
        selectedProductIngredients: [],
        selectedProductIngredientsTotalCount: 0,
    },
    reducers: {
        setSelectedProductIngredients: (state, action) => {
            let ingredient = action.payload.ingredient;

            state.selectedProductIngredientsTotalCount = state.selectedProductIngredientsTotalCount + ingredient.productPrice;

            state.productIngredients = state.productIngredients.map(element => element.id === ingredient.id ? {
                ...element,
                status: true
            } : element);

            state.selectedProductIngredients.push(ingredient);
        },

        deleteChosenSelectedIngredients: (state, action) => {
            const id = action.payload.id;

            const ingredient = state.productIngredients.find(element => element.id === id);

            state.selectedProductIngredientsTotalCount = state.selectedProductIngredientsTotalCount - ingredient.productPrice;

            state.productIngredients = state.productIngredients.map(element => element.id === id ? {
                ...element,
                status: false
            } : element);

            state.selectedProductIngredients = state.selectedProductIngredients.filter(ingredient => ingredient.id !== id);
        }
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
    }
});

const productIngredientReducer = productIngredientSlice.reducer;

const {
    setSelectedProductIngredients,
    deleteChosenSelectedIngredients
} = productIngredientSlice.actions;

export const productIngredientAction = {
    setSelectedProductIngredients,
    deleteChosenSelectedIngredients
};

export default productIngredientReducer;
