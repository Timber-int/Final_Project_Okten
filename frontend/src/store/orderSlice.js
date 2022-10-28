import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { CONSTANTS } from '../constants';
import { orderService } from '../service';
import { createTotalOrderCount, minusTotalOrderCount, plusTotalOrderCount } from './totalOrderCountSlice';

export const getAllOrder = createAsyncThunk(
    'orderSlice/getAllOrder',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await orderService.getAllOrder();

            return { createdOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const plusOrderProduct = createAsyncThunk(
    'orderSlice/plusOrderProduct',
    async ({
        productDataId,
        productData
    }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const {
                id,
            } = productDataId;

            const {
                productId,
                categoryId,
                productPrice,
                totalCount,
                productName,
                productIngredients,
            } = productData;

            const data = await orderService.plusOrderProduct(id, productDataId);

            await dispatch(orderAction.plusOrderSingleProduct({ updatedOrderData: data }));

            await dispatch(plusTotalOrderCount({
                product: {
                    productId,
                    categoryId,
                    productPrice: productPrice / totalCount,
                    productName,
                    productIngredients,
                }
            }));

            return { createdOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const minusOrderProduct = createAsyncThunk(
    'orderSlice/minusOrderProduct',
    async ({
        productDataId,
        productData
    }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const {
                id,
            } = productDataId;

            const {
                productId,
                totalCount,
                categoryId,
                productPrice,
                productName,
                productIngredients,
            } = productData;

            if (totalCount <= 1) return;

            const data = await orderService.minusOrderProduct(id, productDataId);

            await dispatch(orderAction.minusOrderSingleProduct({ updatedOrderData: data }));

            await dispatch(minusTotalOrderCount({
                product: {
                    productId,
                    categoryId,
                    productPrice: productPrice / totalCount,
                    productName,
                    productIngredients,
                    totalCount
                }
            }));

            return { createdOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteOrderProductById = createAsyncThunk(
    'orderSlice/deleteOrderProductById',
    async ({
        orderElement
    }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const { id } = orderElement;

            const data = await orderService.deleteOrderById(id);

            dispatch(orderAction.deleteSingleOrderProductById({ id }));

            return { createdOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const setProductToOrder = createAsyncThunk(
    'orderSlice/setProductToOrder',
    async ({
        product,
        id,
    }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const {
                productName,
                productPhoto,
                productBigPhoto,
                productPrice,
                productWeight,
                description,
                totalCount,
                chosenProductIngredients,
                id,
                categoryId
            } = product;

            const productIngredients = chosenProductIngredients.join(',');

            const orderData = {
                productName,
                productPhoto,
                productBigPhoto,
                productPrice,
                productWeight,
                description,
                totalCount,
                productIngredients,
                productId: id,
                categoryId,
            };
            await dispatch(orderAction.setProductToTheCard({ productData: orderData }));

            const data = await orderService.createOrder(orderData);

            await dispatch(createTotalOrderCount({ product }));

            return { createdOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        chosenOrderProducts: JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [],
        serverErrors: null,
        status: null,
        usedOrderType: CONSTANTS.ORDER,
        discount: 0,
    },
    reducers: {
        setOrderType: (state, action) => {
            state.usedOrderType = action.payload.orderType;
        },
        deleteSingleOrderProductById: (state, action) => {
            let productsCard = JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [];
            state.chosenOrderProducts = state.chosenOrderProducts.filter(product => product.id !== action.payload.id);
            productsCard = productsCard.filter(product => product.id !== action.payload.id);
            localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
            localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
        },
        plusOrderSingleProduct: (state, action) => {

            const productData = action.payload.productData;

            let productsCard = JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [];

            productsCard = productsCard.map(product => product.id === productData.id ? {
                ...product,
                productPrice: product.productPrice + product.productPrice / product.totalCount,
                totalCount: product.totalCount + 1,
            } : product);

            const updatedProduct = productsCard.find(product => product.id === productData.id);

            state.chosenOrderProducts = state.chosenOrderProducts.map(product => product.id === updatedProduct.id ? { ...updatedProduct } : product);

            localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
            localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
        },
        minusOrderSingleProduct: (state, action) => {
            const productData = action.payload.productData;
            console.log(productData);
            let productsCard = JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [];

            if (productData.totalCount <= 1) return;

            productsCard = productsCard.map(product => product.id === productData.id ? {
                ...product,
                productPrice: product.productPrice - product.productPrice / product.totalCount,
                totalCount: product.totalCount <= 1 ? product.totalCount : product.totalCount - 1,
            } : product);

            const updatedProduct = productsCard.find(product => product.id === productData.id);

            state.chosenOrderProducts = state.chosenOrderProducts.map(product => product.id === updatedProduct.id ? { ...updatedProduct } : product);

            localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
            localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
        },
        deleteAllOrderProduct: (state, action) => {
            // localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
            state.chosenOrderProducts = [];
        },
        setProductToTheCard: (state, action) => {
            const product = action.payload.productToCard;

            let productsCard = JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [];

            const {
                productName,
                productPhoto,
                productBigPhoto,
                productPrice,
                productWeight,
                description,
                totalCount,
                chosenProductIngredients,
                id,
                categoryId
            } = product;

            const productIngredients = chosenProductIngredients.join(',');

            const productData = {
                productName,
                productPhoto,
                productBigPhoto,
                productPrice,
                productWeight,
                description,
                totalCount,
                productIngredients,
                productId: id,
                categoryId,
            };
            if (productsCard.length === 0) {
                productsCard.push({ id: uuidv4(), ...productData });
                localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
                return;
            }

            const productFromLocalStorage = productsCard.find(product => {
                return product.productName === productData.productName
                    &&
                    product.productIngredients === productData.productIngredients;
            });

            if (
                productFromLocalStorage
            ) {
                localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
                productsCard = productsCard.map(product => product.productName === productData.productName
                    &&
                    product.productIngredients === productData.productIngredients
                        ?
                        {
                            ...productData,
                            id: productFromLocalStorage.id,
                            totalCount: productData.totalCount + product.totalCount,
                            productPrice: productData.productPrice + product.productPrice,
                        }
                        :
                        product
                );
                localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
                return;
            }

            productsCard.push({ id: uuidv4(), ...productData });
            localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
        }

    },
    extraReducers: {
        [setProductToOrder.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [setProductToOrder.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.chosenOrderProducts.push(action.payload.createdOrderData.data);
            state.serverErrors = null;
        },
        [setProductToOrder.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [getAllOrder.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllOrder.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.chosenOrderProducts = action.payload.createdOrderData.data;
            state.serverErrors = null;
        },
        [getAllOrder.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [deleteOrderProductById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteOrderProductById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteOrderProductById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [plusOrderProduct.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [plusOrderProduct.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [plusOrderProduct.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [minusOrderProduct.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [minusOrderProduct.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [minusOrderProduct.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const orderReducer = orderSlice.reducer;

const {
    setOrderType,
    deleteSingleOrderProductById,
    plusOrderSingleProduct,
    minusOrderSingleProduct,
    deleteAllOrderProduct,
    setProductToTheCard,

} = orderSlice.actions;

export const orderAction = {
    setOrderType,
    deleteSingleOrderProductById,
    plusOrderSingleProduct,
    minusOrderSingleProduct,
    deleteAllOrderProduct,
    setProductToTheCard,
};

export default orderReducer;
