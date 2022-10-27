import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CONSTANTS, TokenType } from '../constants';
import { authService } from '../service';
import { baseURL, urls } from '../config';

export const registration = createAsyncThunk(
    'authSlice/registration',
    async ({ registrationPayload }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await authService.registration(registrationPayload);

            dispatch(authAction.userRegistration({ loginUser: data }));
            dispatch(authAction.setUser({ loginUser: data }));
            dispatch(authAction.setAuth({ loginUser: data }));

            return { user: data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const login = createAsyncThunk(
    'authSlice/login',
    async ({ loginPayload }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await authService.login(loginPayload);

            dispatch(authAction.userRegistration({ loginUser: data }));
            dispatch(authAction.setUser({ loginUser: data }));
            dispatch(authAction.setAuth({ loginUser: data }));
            return { user: data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await authService.logout();

            await dispatch(authAction.userLogout());

            return { user: data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const checkAuth = createAsyncThunk(
    'authSlice/checkAuth',
    async (_, {
        dispatch,
        rejectWithValue,
    }) => {
        try {

            const data = await authService.refresh(baseURL + urls.auth + urls.refresh);
            await dispatch(authAction.setUser({ loginUser: data }));
            await dispatch(authAction.setAuth({ loginUser: data }));

            return { user: data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    'authSlice/changePassword',
    async ({ emailData }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await authService.changePassword(emailData);

            await dispatch(authAction.setDataForChangePassword({ changePasswordData: data }));

            return { data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const setNewPassword = createAsyncThunk(
    'authSlice/setNewPassword',
    async ({ passwordData }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await authService.setNewPassword(passwordData);

            await dispatch(authAction.deleteChangePasswordUserLocalStorageData());

            return { data };

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: localStorage.getItem(CONSTANTS.USER) ? JSON.parse(localStorage.getItem(CONSTANTS.USER)) : null,
        registrationData: null,
        changePasswordUserData: null,
        serverErrors: null,
        status: null,
        isAuth: false,
    },
    reducers: {
        userRegistration: (state, action) => {
            localStorage.setItem(TokenType.ACCESS, action.payload.loginUser.accessToken);
            localStorage.setItem(TokenType.REFRESH, action.payload.loginUser.refreshToken);
            localStorage.setItem(CONSTANTS.USER, JSON.stringify(action.payload.loginUser.user));
        },
        userLogout: (state, action) => {
            localStorage.removeItem(TokenType.ACCESS);
            localStorage.removeItem(TokenType.REFRESH);
            localStorage.removeItem(CONSTANTS.USER);
            state.user = null;
            state.isAuth = false;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload.loginUser.user.isActivated;
        },
        setUser: (state, action) => {
            localStorage.setItem(CONSTANTS.USER, JSON.stringify(action.payload.loginUser.user));
            state.user = JSON.parse(localStorage.getItem(CONSTANTS.USER));
        },
        setLoading: (state, action) => {
            state.status = CONSTANTS.LOADING;
        },
        setDataForChangePassword: (state, action) => {
            const {
                user,
                actionToken
            } = action.payload.changePasswordData;

            state.changePasswordUserData = user;

            localStorage.setItem(TokenType.ACTION, actionToken);
            localStorage.setItem(CONSTANTS.CHANGE_USER_PASSWORD_DATA, JSON.stringify(user));
        },

        deleteChangePasswordUserData: (state, action) => {
            state.changePasswordUserData = null;
        },
        deleteChangePasswordUserLocalStorageData:(state,action)=>{
            localStorage.removeItem(CONSTANTS.CHANGE_USER_PASSWORD_DATA);
            localStorage.removeItem(TokenType.ACTION);
        }
    },
    extraReducers: {
        [registration.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [registration.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [registration.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [login.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [login.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [login.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [checkAuth.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.user = action.payload.user;
            state.serverErrors = null;
        },
        [checkAuth.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [changePassword.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [changePassword.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [setNewPassword.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [setNewPassword.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [setNewPassword.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const authReducer = authSlice.reducer;

const {
    userRegistration,
    setAuth,
    setUser,
    userLogout,
    setDataForChangePassword,
    deleteChangePasswordUserData,
    deleteChangePasswordUserLocalStorageData
} = authSlice.actions;

export const authAction = {
    userRegistration,
    setAuth,
    setUser,
    userLogout,
    setDataForChangePassword,
    deleteChangePasswordUserData,
    deleteChangePasswordUserLocalStorageData
};

export default authReducer;
