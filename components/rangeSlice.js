import { createSlice } from '@reduxjs/toolkit';
import { values }  from "/components/lineCharts/barChartsData";
import remove from 'lodash.remove';


const rangeSlice = createSlice({
	name: 'range',
	initialState: [0,40],
	reducers: {range(state, action) {return action.payload}}
	})

export const {range} = rangeSlice.actions;

export default rangeSlice.reducer;
