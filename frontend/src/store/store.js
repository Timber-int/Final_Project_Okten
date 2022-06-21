import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        authReducer,
        productReducer,
    }
});

export default store;
