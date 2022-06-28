import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        totalOrderCount: 0,
        chosenProduct: {},
        chosenProductIdArray: [],
    },
    reducers: {
        setTotalOrderCount: (state, action) => {
            const {
                productPrice,
                product,
                id,
            } = action.payload.productData;

            if (!state.chosenProductIdArray.includes(id)) {
                state.chosenProductIdArray.push(id);
            }

            state.chosenProduct = Object.assign(state.chosenProduct, { [id]: product });

            state.totalOrderCount = state.totalOrderCount + productPrice;

        }
    },
});

const orderReducer = orderSlice.reducer;

const { setTotalOrderCount } = orderSlice.actions;

export const orderAction = { setTotalOrderCount };

export default orderReducer;
