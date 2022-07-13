import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productReducer from './productSlice';
import productIngredientReducer from './productIngredientsSlice';
import categoryReducer from './categorySlice';
import orderReducer from './orderSlice';
import cityReducer from './citySlice';
import cityAddressReducer from './cityAddressSlice';

const store = configureStore({
    reducer: {
        authReducer,
        productReducer,
        productIngredientReducer,
        categoryReducer,
        orderReducer,
        cityReducer,
        cityAddressReducer
    }
});

export default store;
