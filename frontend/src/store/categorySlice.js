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
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const createCategory = createAsyncThunk(
    'categorySlice/createCategory',
    async ({ category }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                name,
                logo
            } = category;

            let formData = new FormData();

            formData.append('name', name);
            formData.append('logo', logo[0]);

            const data = await categoryService.createCategory(formData);

            return { categoriesData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
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
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteCategoryById = createAsyncThunk(
    'categorySlice/deleteCategoryById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await categoryService.deleteCategoryById(id);

            dispatch(categoryAction.deleteSingleCategoryById({ id }));

            return { categoryData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const updateCategoryById = createAsyncThunk(
    'categorySlice/updateCategoryById',
    async ({ categoryDataToUpdate }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                name,
                logo,
                id,
                uniqueName,
            } = categoryDataToUpdate;

            let formData = new FormData();

            if (name !== uniqueName) {
                formData.append('name', name);
            }
            if (typeof logo === 'string') {
                formData.append('logo', logo);
            } else {
                formData.append('logo', logo[0]);
            }

            const data = await categoryService.updateCategoryById(id, formData);

            dispatch(categoryAction.updateSingleCategoryById({ updatedCategory: data }));

            return { categoryData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        categories: [],
        category: null,
    },
    reducers: {
        deleteSingleCategoryById: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload.id);
        },
        updateSingleCategoryById: (state, action) => {
            const updatedCategory = action.payload.updatedCategory.data;
            const { id } = updatedCategory;
            state.categories = state.categories.map(category => category.id === id ? { ...updatedCategory } : category);
            state.categoryDataToUpdate = null;
        },
        updateCategoryGetData: (state, action) => {
            state.categoryDataToUpdate = action.payload.category;
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
            state.serverErrors = null;
        },
        [getCategoryById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createCategory.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const category = action.payload.categoriesData.data;
            state.categories.push(category);
            state.serverErrors = null;
        },
        [createCategory.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const categoryReducer = categorySlice.reducer;

const {
    deleteSingleCategoryById,
    updateCategoryGetData,
    updateSingleCategoryById,
} = categorySlice.actions;

export const categoryAction = {
    deleteSingleCategoryById,
    updateCategoryGetData,
    updateSingleCategoryById,
};

export default categoryReducer;
