import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { partnersRequestService } from '../service';
import { CONSTANTS } from '../constants';

export const createPartnersRequest = createAsyncThunk(
    'partnersRequestSlice/createPartnersRequest',
    async ({ requestData }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await partnersRequestService.createPartnerRequest(requestData);

            return { data };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const partnersRequestSlice = createSlice({
    name: 'partnersRequestSlice',
    initialState: {},
    reducers: {},
    extraReducers: {
        [createPartnersRequest.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createPartnersRequest.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [createPartnersRequest.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const partnersRequestReducer = partnersRequestSlice.reducer;

const {} = partnersRequestSlice.actions;

export const partnersRequestActions = {};

export default partnersRequestReducer;
