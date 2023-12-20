import { createSlice } from '@reduxjs/toolkit';
import { acreValues } from 'components/lineCharts/acreData';

const dataSlice = createSlice({
	name: 'data',
	initialState: acreValues,
	reducers: {range(state, action) {return action.payload}}
	})

export const {data} = dataSlice.actions;

export default dataSlice.reducer;
