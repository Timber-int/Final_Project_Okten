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

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        categories: [],
        serverErrors: null,
        status: null,
    },
    reducers: {},
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
    }
});

const categoryReducer = categorySlice.reducer;

const {} = categorySlice.actions;

export const categoryAction = {};

export default categoryReducer;
