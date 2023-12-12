import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './localStorage';
import { values }  from "/components/lineCharts/barChartsData";
import remove from 'lodash.remove';

// const localStorageState = loadState()

// var  persistedValues = (typeof(localStorageState) === 'undefined') ? values : localStorageState.values;

const acreSlice = createSlice({
	name: 'acre',
	initialState: values,
	reducers: {acreFilter(state, action) {remove(state, item => item.key == action.payload)}}
	})

export const {acreFilter} = acreSlice.actions;

export default acreSlice.reducer;
