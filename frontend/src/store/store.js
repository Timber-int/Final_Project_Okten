import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import orderReducer from './orderSlice';
import cityReducer from './citySlice';
import cityAddressReducer from './cityAddressSlice';
import productInformationReducer from './productInformationSlice';
import totalOrderCountReducer from './totalOrderCountSlice';
import partnersRequestReducer from './partnersRequestSlice';

const store = configureStore({
    reducer: {
        authReducer,
        productReducer,
        categoryReducer,
        orderReducer,
        cityReducer,
        cityAddressReducer,
        productInformationReducer,
        totalOrderCountReducer,
        partnersRequestReducer
    }
});

export default store;
