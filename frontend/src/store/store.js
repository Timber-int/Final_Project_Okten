import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import orderReducer from './orderSlice';
import cityReducer from './citySlice';
import cityAddressReducer from './cityAddressSlice';
import productInformationReducer from './productInformationSlice';
import partnersRequestReducer from './partnersRequestSlice';
import customerOrderReducer from './customerOrderSlice';
import productOrderReducer from './productsOrderSlice';

const store = configureStore({
    reducer: {
        authReducer,
        productReducer,
        categoryReducer,
        orderReducer,
        cityReducer,
        cityAddressReducer,
        productInformationReducer,
        partnersRequestReducer,
        customerOrderReducer,
        productOrderReducer,
    }
});

export default store;
