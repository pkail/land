import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './localStorage';
import { values }  from "/components/lineCharts/barChartsData";
import remove from 'lodash.remove';


const outlierSlice = createSlice({
	name: 'outlier',
	initialState: [],
	reducers: {outlier(state, action) {return action.payload}}
	})

export const {outlier} = outlierSlice.actions;

export default outlierSlice.reducer;
