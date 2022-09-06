import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CONSTANTS } from '../constants';
import { authService } from '../service';

export const registration = createAsyncThunk(
    'authSlice/registration',
    async ({ registrationPayload }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await authService.registration(registrationPayload);

            dispatch(authAction.userRegistration({ registeredUser: data }));

            return { user: data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        registrationData: null,
        serverErrors: null,
        status: null,
    },
    reducers: {
        userRegistration: (state, action) => {

        }
    },
    extraReducers: {
        [registration.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [registration.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.user = action.payload.user;
            state.serverErrors = null;
        },
        [registration.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const authReducer = authSlice.reducer;

const {userRegistration} = authSlice.actions;

export const authAction = {userRegistration};

export default authReducer;
