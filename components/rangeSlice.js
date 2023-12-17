import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './localStorage';
import { values }  from "/components/lineCharts/barChartsData";
import { acreValues }  from "/components/lineCharts/acreData";
import remove from 'lodash.remove';


const rangeSlice = createSlice({
	name: 'range',
	initialState: [0,100],
	reducers: {range(state, action) {return action.payload}}
	})

export const {range} = rangeSlice.actions;

export default rangeSlice.reducer;
