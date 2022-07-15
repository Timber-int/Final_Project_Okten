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

export const deleteProductById = createAsyncThunk(
    'productSlice/deleteProductById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await productService.deleteProductById(id);

            dispatch(productAction.deleteSingleProductById({ id }));

            return { productData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const updateProductById = createAsyncThunk(
    'productSlice/updateProductById',
    async ({ productDataToUpdate }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            let formData = new FormData();

            const {
                id,
                productWeight,
                productPrice,
                categoryId,
                description,
                productName,
                productPhoto,
                productBigPhoto,
                uniqueProductName
            } = productDataToUpdate;

            if (productName !== uniqueProductName) {
                formData.append('productName', productName);
            }

            if (typeof productPhoto === 'string') {
                formData.append('productPhoto', productPhoto);
            } else {
                formData.append('productPhoto', productPhoto[0]);
            }

            if (productBigPhoto !== null) {
                if (typeof productBigPhoto === 'string') {
                    formData.append('productBigPhoto', productBigPhoto);
                } else {
                    const { length } = productBigPhoto;
                    if (length > 0) {
                        formData.append('productBigPhoto', productBigPhoto[0]);
                    }
                }
            }

            formData.append('description', description);
            formData.append('categoryId', categoryId);
            formData.append('productPrice', productPrice);
            formData.append('productWeight', productWeight);

            const data = await productService.updateProductById(id, formData);

            dispatch(productAction.updateSingleProductById({ updatedProduct: data }));

            return { productData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'productSlice/createProduct',
    async ({ productData }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            let formData = new FormData();

            const {
                productWeight,
                productPrice,
                categoryId,
                description,
                productName,
                productPhoto,
                productBigPhoto
            } = productData;

            const { length } = productBigPhoto;

            formData.append('productName', productName);
            formData.append('productPhoto', productPhoto[0]);
            if (length > 0) {
                formData.append('productBigPhoto', productBigPhoto[0]);
            }
            formData.append('description', description);
            formData.append('categoryId', categoryId);
            formData.append('productPrice', productPrice);
            formData.append('productWeight', productWeight);

            const data = await productService.createProduct(formData);

            return { productData: data };
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
        productDataToUpdate: null,

        productIngredients: [],
        selectedProductIngredientsId: [],
        selectedProductIngredients: {},
        selectedProductIngredientsTotalCount: 0,
        categoryDataToUpdate: null,
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


        deleteSingleProductById: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        },
        updateProductGetData: (state, action) => {
            state.productDataToUpdate = action.payload.productDataToUpdate;
        },
        updateSingleProductById: (state, action) => {
            const updatedProduct = action.payload.updatedProduct.data;
            const { id } = updatedProduct;
            state.products = state.products.map(product => product.id === id ? { ...updatedProduct } : product);
            state.productDataToUpdate = null;
        },
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
        [deleteProductById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteProductById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteProductById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createProduct.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.products.push(action.payload.productData);
            state.serverErrors = null;
        },
        [createProduct.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [updateProductById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [updateProductById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.products.push(action.payload.productData);
            state.serverErrors = null;
        },
        [updateProductById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const productReducer = productSlice.reducer;

const {
    deleteSingleProductById,
    updateProductGetData,
    updateSingleProductById,
    clearSelectedIngredientsArray,
    deleteChosenSelectedIngredients,
    setSelectedProductIngredients,
    minusProductCount,
    plusProductCount,
    setProductCount,

} = productSlice.actions;

export const productAction = {
    deleteSingleProductById,
    updateProductGetData,
    updateSingleProductById,
    clearSelectedIngredientsArray,
    deleteChosenSelectedIngredients,
    setSelectedProductIngredients,
    minusProductCount,
    plusProductCount,
    setProductCount,
};

export default productReducer;
