import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productReducer from './productSlice';
import sliderReducer from './sliderSlice';

const store = configureStore({
    reducer: {
        authReducer,
        productReducer,
        sliderReducer,
    }
});

export default store;
