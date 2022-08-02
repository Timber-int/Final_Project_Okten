import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cityService } from '../service';
import { CONSTANTS } from '../constants';

export const getAllCities = createAsyncThunk(
    'citySlice/getAllCities',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const cities = await cityService.getAllCities();
            return cities;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const getCityByName = createAsyncThunk(
    'citySlice/getCityByName',
    async ({ cityName }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const city = await cityService.getCityByName(cityName);

            return { city };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteCityById = createAsyncThunk(
    'citySlice/deleteCityById',
    async ({ id }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const city = await cityService.deleteCityById(id);

            dispatch(cityActions.deleteSingleCityById({ id }));

            return city;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const createCity = createAsyncThunk(
    'citySlice/createCity',
    async ({ cityData }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            let formData = new FormData();

            const { cityName } = cityData;

            formData.append('cityName', cityName);

            const city = await cityService.createCity(formData);

            return { city };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const citySlice = createSlice({
    name: 'citySlice',
    initialState: {
        cities: [],
        chosenCity: '',
        localKey: 'city',
        city: {},
        filterCityAddress: [],
        cityStatus: false,
        serverErrors: null,
    },
    reducers: {
        setChosenCity: (state, action) => {
            state.chosenCity = action.payload.data.city;
            localStorage.setItem(state.localKey, action.payload.data.city);
            state.cityStatus = false;
        },
        setCityStatusTrue: (state, action) => {
            state.cityStatus = true;
        },
        setCityStatusFalse: (state, action) => {
            state.cityStatus = false;
        },
        deleteSingleCityById: (state, action) => {
            state.cities = state.cities.filter(city => city.id !== action.payload.id);
        }
    },
    extraReducers: {
        [getAllCities.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllCities.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const citiesArray = action.payload.data;
            state.cities = citiesArray.map(city => Object.assign(city, {
                label: city.cityName,
                value: city.cityName
            }));
            state.serverErrors = null;
        },
        [getAllCities.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [deleteCityById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteCityById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteCityById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [getCityByName.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getCityByName.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.city = action.payload.city.data;
            state.filterCityAddress = action.payload.city.filterCityAddress.map(address => Object.assign(address, {
                label: address.addressName,
                value: address.addressName
            }));
            state.serverErrors = null;
        },
        [getCityByName.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createCity.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createCity.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            const city = action.payload.city.data;
            state.cities.push(Object.assign(city, {
                label: city.cityName,
                value: city.cityName,
            }));
            state.serverErrors = null;
        },
        [createCity.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const cityReducer = citySlice.reducer;
const {
    setChosenCity,
    setCityStatusFalse,
    setCityStatusTrue,
    deleteSingleCityById
} = citySlice.actions;

export const cityActions = {
    setChosenCity,
    setCityStatusFalse,
    setCityStatusTrue,
    deleteSingleCityById,
};

export default cityReducer;
