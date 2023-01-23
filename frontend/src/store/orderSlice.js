import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { CONSTANTS } from '../constants';

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        chosenOrderProducts: JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [],
        totalOrderCount: JSON.parse(localStorage.getItem(CONSTANTS.TOTAL_ORDER_COUNT)) || 0,
        serverErrors: null,
        status: null,
        usedOrderType: CONSTANTS.ORDER,
        discount: 0,
    },
    reducers: {
        setOrderType: (state, action) => {
            state.usedOrderType = action.payload.orderType;
        },
        setOrderTypeDefault: (state, action) => {
            state.usedOrderType = CONSTANTS.ORDER;
        },
        deleteSingleOrderProductById: (state, action) => {
            let productsCard = JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [];
            if (productsCard.length === 0) return;
            const id = action.payload.id;
            const productToRemove = productsCard.find(product => product.id === id);
            state.totalOrderCount -= productToRemove.productPrice;
            state.chosenOrderProducts = state.chosenOrderProducts.filter(product => product.id !== id);
            productsCard = productsCard.filter(product => product.id !== action.payload.id);
            localStorage.removeItem(CONSTANTS.TOTAL_ORDER_COUNT);
            localStorage.setItem(CONSTANTS.TOTAL_ORDER_COUNT, JSON.stringify(state.totalOrderCount));
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

            state.totalOrderCount += updatedProduct.productPrice / updatedProduct.totalCount;

            state.chosenOrderProducts = state.chosenOrderProducts.map(product => product.id === updatedProduct.id ? { ...updatedProduct } : product);

            localStorage.removeItem(CONSTANTS.TOTAL_ORDER_COUNT);
            localStorage.setItem(CONSTANTS.TOTAL_ORDER_COUNT, JSON.stringify(state.totalOrderCount));
            localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
            localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
        },
        minusOrderSingleProduct: (state, action) => {
            const productData = action.payload.productData;

            let productsCard = JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)) || [];

            if (productData.totalCount <= 1) return;

            productsCard = productsCard.map(product => product.id === productData.id ? {
                ...product,
                productPrice: product.productPrice - product.productPrice / product.totalCount,
                totalCount: product.totalCount <= 1 ? product.totalCount : product.totalCount - 1,
            } : product);

            const updatedProduct = productsCard.find(product => product.id === productData.id);

            state.totalOrderCount -= updatedProduct.productPrice / updatedProduct.totalCount;

            state.chosenOrderProducts = state.chosenOrderProducts.map(product => product.id === updatedProduct.id ? { ...updatedProduct } : product);

            localStorage.removeItem(CONSTANTS.TOTAL_ORDER_COUNT);
            localStorage.setItem(CONSTANTS.TOTAL_ORDER_COUNT, JSON.stringify(state.totalOrderCount));
            localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
            localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
        },
        deleteAllOrderProduct: (state, action) => {
            localStorage.removeItem(CONSTANTS.PRODUCT_CARD);
            localStorage.removeItem(CONSTANTS.TOTAL_ORDER_COUNT);
            state.chosenOrderProducts = [];
            state.totalOrderCount = 0;
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
                state.totalOrderCount += productData.productPrice;
                localStorage.setItem(CONSTANTS.TOTAL_ORDER_COUNT, JSON.stringify(productData.productPrice));
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
                state.totalOrderCount += productData.productPrice;
                localStorage.removeItem(CONSTANTS.TOTAL_ORDER_COUNT);
                localStorage.setItem(CONSTANTS.TOTAL_ORDER_COUNT, JSON.stringify(state.totalOrderCount));
                localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
                return;
            }

            productsCard.push({ id: uuidv4(), ...productData });
            state.totalOrderCount += productData.productPrice;
            localStorage.removeItem(CONSTANTS.TOTAL_ORDER_COUNT);
            localStorage.setItem(CONSTANTS.TOTAL_ORDER_COUNT, JSON.stringify(state.totalOrderCount));
            localStorage.setItem(CONSTANTS.PRODUCT_CARD, JSON.stringify(productsCard));
        }

    },
    extraReducers: {}
});

const orderReducer = orderSlice.reducer;

const {
    setOrderType,
    deleteSingleOrderProductById,
    plusOrderSingleProduct,
    minusOrderSingleProduct,
    deleteAllOrderProduct,
    setProductToTheCard,
    setOrderTypeDefault,
} = orderSlice.actions;

export const orderAction = {
    setOrderType,
    deleteSingleOrderProductById,
    plusOrderSingleProduct,
    minusOrderSingleProduct,
    deleteAllOrderProduct,
    setProductToTheCard,
    setOrderTypeDefault,
};

export default orderReducer;
