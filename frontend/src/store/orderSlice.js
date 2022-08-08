import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CONSTANTS } from '../constants';
import { categoryService, orderService } from '../service';

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
    async ({ productData }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const {
                id,
            } = productData;

            const data = await orderService.plusOrderProduct(id, productData);

            dispatch(orderAction.plusOrderSingleProduct({ updatedOrderData: data }));

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
                defaultPrice
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
                defaultPrice,
            };

            const data = await orderService.createOrder(orderData);

            return { createdOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        chosenOrderProducts: [],
        serverErrors: null,
        status: null,
        usedOrderType: '',
        discount: 0,
    },
    reducers: {
        setOrderType: (state, action) => {
            state.usedOrderType = action.payload.orderType;
        },
        deleteSingleOrderProductById: (state, action) => {
            state.chosenOrderProducts = state.chosenOrderProducts.filter(element => element.id !== action.payload.id);
        },
        plusOrderSingleProduct: (state, action) => {
            const orderFromDB = action.payload.updatedOrderData.data;

            state.chosenOrderProducts = state.chosenOrderProducts.map(element => element.id === orderFromDB.id? {...orderFromDB}:element);
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
            console.log(action.payload.createdOrderData.data);
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
    }
});

const orderReducer = orderSlice.reducer;

const {
    setOrderType,
    deleteSingleOrderProductById,
    plusOrderSingleProduct,
} = orderSlice.actions;

export const orderAction = {
    setOrderType,
    deleteSingleOrderProductById,
    plusOrderSingleProduct,
};

export default orderReducer;
