import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productReducer from './productSlice';
import sliderReducer from './sliderSlice';
import productIngredientReducer from './productIngredientsSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
    reducer: {
        authReducer,
        productReducer,
        sliderReducer,
        productIngredientReducer,
        categoryReducer,
    }
});

export default store;
