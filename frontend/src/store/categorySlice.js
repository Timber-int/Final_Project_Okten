import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CONSTANTS } from '../constants';
import { categoryService, productService } from '../service';

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
            return rejectWithValue(e.message);
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
            return rejectWithValue(e.message);
        }
    }
);


const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        categories: [],
        products: [],
        productIngredients: [],
        selectedProductIngredientsId: [],
        selectedProductIngredients: {},
        selectedProductIngredientsTotalCount: 0,
        categoryDataToUpdate: null,
        serverErrors: null,
        status: null,
        category: null,
        productDetails: null,
    },
    reducers: {
        setProductCount: (state, action) => {
            const {
                id,
            } = action.payload.setProduct;

            const count = Number(action.payload.setProduct.count);

            state.products = state.products.map(product => product.id === id ? {
                ...product,
                totalCount: count <= 0 ? product.totalCount = count - count + 1 : product.totalCount = count,
                productPrice: product.productPrice = state.selectedProductIngredientsId.length > 0
                    ? product.defaultPrice * product.totalCount + state.selectedProductIngredientsTotalCount
                    : product.defaultPrice * product.totalCount,
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
            const {
                id,
                totalCount
            } = action.payload.minusProduct;

            if (totalCount === 1) return;

            state.products = state.products.map(product => product.id === id ? {
                ...product,
                totalCount: product.totalCount === 1 || product.totalCount <= 0 ? 1 : product.totalCount - 1,
                productPrice: product.totalCount === 1 || product.totalCount <= 0 ? product.defaultPrice : product.productPrice - product.defaultPrice,
            } : product);
        },
        setSelectedProductIngredients: (state, action) => {
            const {
                productId,
                ingredient
            } = action.payload.chosenData;

            state.products = state.products.map(product => product.id === productId ? {
                ...product,
                productPrice: product.productPrice + ingredient.productPrice,
                productWeight: product.productWeight + ingredient.productWeight,
            } : product);

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
            const {
                id,
                productId
            } = action.payload.deletedData;

            const ingredient = state.productIngredients.find(element => element.id === id);

            state.products = state.products.map(product => product.id === productId ? {
                ...product,
                productPrice: product.productPrice - ingredient.productPrice,
                productWeight: product.productWeight - ingredient.productWeight,
            } : product);

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
            const productArray = action.payload.categoryData.data.products;

            state.products = productArray.map(product => Object.assign(product, {
                totalCount: 1,
                defaultPrice: product.productPrice,
            }));

            state.productIngredients = action.payload.categoryData.data.productIngredients;

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
    minusProductCount,
    setProductCount,
    plusProductCount,
    deleteChosenSelectedIngredients,
    setSelectedProductIngredients,
    clearSelectedIngredientsArray,
    deleteSingleCategoryById,
    updateCategoryGetData,
    updateSingleCategoryById,
} = categorySlice.actions;

export const categoryAction = {
    minusProductCount,
    setProductCount,
    plusProductCount,
    deleteChosenSelectedIngredients,
    setSelectedProductIngredients,
    clearSelectedIngredientsArray,
    deleteSingleCategoryById,
    updateCategoryGetData,
    updateSingleCategoryById,
};

export default categoryReducer;
