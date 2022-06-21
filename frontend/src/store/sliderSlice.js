import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CONSTANTS } from '../constants';
import { sliderService } from '../service';

export const getAllSliders = createAsyncThunk(
    'sliderSlice/getAllSliders',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const data = await sliderService.getAllSliders();

            return { sliders: data };

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const sliderSlice = createSlice({
    name: 'sliderSlice',
    initialState: {
        slides: [],
        serverErrors: null,
        status: null,
    },
    reducers: {},
    extraReducers: {
        [getAllSliders.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllSliders.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.slides = action.payload.sliders.data;
            state.serverErrors = null;
        },
        [getAllSliders.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const sliderReducer = sliderSlice.reducer;

const {} = sliderSlice.actions;

export const sliderAction = {};

export default sliderReducer;
