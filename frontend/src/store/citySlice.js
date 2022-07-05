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
            rejectWithValue(e.message);
        }
    }
);

const citySlice = createSlice({
    name: 'citySlice',
    initialState: {
        cities: [],
        chosenCity: '',
        localKey: 'city',
        cityStatus: false,
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
    }
});

const cityReducer = citySlice.reducer;
const {
    setChosenCity,
    setCityStatusFalse,
    setCityStatusTrue
} = citySlice.actions;
export const cityActions = {
    setChosenCity,
    setCityStatusFalse,
    setCityStatusTrue

};

export default cityReducer;
