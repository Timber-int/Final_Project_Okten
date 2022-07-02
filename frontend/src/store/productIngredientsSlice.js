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
        selectedProductIngredients: {},
        selectedProductIngredientsId: [],
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

            if (!state.selectedProductIngredientsId.includes(ingredient.id)) {
                state.selectedProductIngredientsId.push(ingredient.id);
            }

            state.selectedProductIngredients = Object.assign(state.selectedProductIngredients, { [ingredient.id]: ingredient });
        },

        deleteChosenSelectedIngredients: (state, action) => {
            const id = action.payload.id;

            const ingredient = state.productIngredients.find(element => element.id === id);

            state.selectedProductIngredientsTotalCount = state.selectedProductIngredientsTotalCount - ingredient.productPrice;

            state.productIngredients = state.productIngredients.map(element => element.id === id ? {
                ...element,
                status: false
            } : element);

            state.selectedProductIngredientsId = state.selectedProductIngredientsId.filter(selectedId => selectedId !== id);
        },

        clearSelectedIngredientsArray: (state, action) => {
            state.selectedProductIngredients = {};
            state.selectedProductIngredientsTotalCount = 0;
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
    }
});

const productIngredientReducer = productIngredientSlice.reducer;

const {
    setSelectedProductIngredients,
    deleteChosenSelectedIngredients,
    clearSelectedIngredientsArray
} = productIngredientSlice.actions;

export const productIngredientAction = {
    setSelectedProductIngredients,
    deleteChosenSelectedIngredients,
    clearSelectedIngredientsArray
};

export default productIngredientReducer;
