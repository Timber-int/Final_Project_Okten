import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customerOrderService } from '../service';
import { CONSTANTS } from '../constants';

export const createCustomerOrder = createAsyncThunk(
    'customerOrderSlice/createCustomerOrder',
    async ({ payload }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await customerOrderService.createCustomerOrder(payload);

            return { customerOrderData: data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const customerOrderSlice = createSlice({
    name: 'customerOrderSlice',
    initialState: {
        userData: null,
        serverErrors: null,
        status: null,
        servetStatus: false,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload.userData;
        },
        setServeStatus: (state, action) => {
            state.servetStatus = !state.servetStatus;
        },
    },
    extraReducers: {
        [createCustomerOrder.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createCustomerOrder.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [createCustomerOrder.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const customerOrderReducer = customerOrderSlice.reducer;
const {
    setUserData,
    setServeStatus
} = customerOrderSlice.actions;
export const customerOrderAction = {
    setUserData,
    setServeStatus
};
export default customerOrderReducer;
