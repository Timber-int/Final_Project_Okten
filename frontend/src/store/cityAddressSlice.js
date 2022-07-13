import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cityAddressService, cityService } from '../service';
import { CONSTANTS } from '../constants';

export const getAllCityAddress = createAsyncThunk(
    'cityAddressSlice/getAllCityAddress',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await cityAddressService.getAllCityAddress();
            return { cityAddressData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
export const deleteCityAddressById = createAsyncThunk(
    'cityAddressSlice/deleteCityAddressById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {

            const data = await cityAddressService.deleteCityAddressById(id);

            dispatch(cityAddressAction.deleteSingleCityAddressById({ id }));

            return { cityAddressData: data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createCityAddress = createAsyncThunk(
    'citySlice/createCityAddress',
    async ({ cityAddressData }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            let formData = new FormData();

            const {
                addressName,
                cityId
            } = cityAddressData;

            formData.append('addressName', addressName);
            formData.append('cityId', cityId);

            const data = await cityAddressService.createCityAddress(formData);

            return { cityAddressData: data };
        } catch (e) {
            rejectWithValue(e.message);
        }
    }
);

const cityAddressSlice = createSlice({
    name: 'cityAddressSlice',
    initialState: {
        cityAddress: [],
        status: null,
        serverErrors: null,
    },
    reducers: {
        deleteSingleCityAddressById: (state, action) => {
            state.cityAddress = state.cityAddress.filter(address => address.id !== action.payload.id);
        }
    },
    extraReducers: {
        [getAllCityAddress.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllCityAddress.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const cityAddressData = action.payload.cityAddressData.data;
            state.cityAddress = cityAddressData.map(address => Object.assign(address, {
                label: address.addressName,
                value: address.addressName
            }));
            state.serverErrors = null;
        },
        [getAllCityAddress.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [deleteCityAddressById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteCityAddressById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteCityAddressById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createCityAddress.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createCityAddress.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const cityAddress = action.payload.cityAddressData.data;
            console.log(cityAddress,'sdf');
            state.cityAddress.push(Object.assign(cityAddress, {
                label: cityAddress.addressName,
                value: cityAddress.addressName,
            }));
            state.serverErrors = null;
        },
        [createCityAddress.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const cityAddressReducer = cityAddressSlice.reducer;

const { deleteSingleCityAddressById } = cityAddressSlice.actions;

export const cityAddressAction = { deleteSingleCityAddressById };

export default cityAddressReducer;
