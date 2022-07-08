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
        status: null,
    },
    reducers: {

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

} = productIngredientSlice.actions;

export const productIngredientAction = {

};

export default productIngredientReducer;
