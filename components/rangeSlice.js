import { createSlice } from '@reduxjs/toolkit';


const rangeSlice = createSlice({
	name: 'range',
	initialState: [0,50],
	reducers: {range(state, action) {return action.payload}}
	})

export const {range} = rangeSlice.actions;

export default rangeSlice.reducer;
