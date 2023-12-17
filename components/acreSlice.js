import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './localStorage';
import { values }  from "/components/lineCharts/barChartsData";
import { acreValues }  from "/components/lineCharts/acreData";
import remove from 'lodash.remove';

// const localStorageState = loadState()

// var  persistedValues = (typeof(localStorageState) === 'undefined') ? values : localStorageState.values;

	acreValues.forEach((item) => item.cost = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/(item.ACREAGE * 100)));
	acreValues.forEach((item) => item.price = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/100));
	acreValues.forEach((item) => item.acres = item.ACREAGE);
	// acreValues.forEach((item) => item.cost = item.cost/item.acres);
	acreValues.forEach((item, index) => item.key = index);

const acreSlice = createSlice({
	name: 'acre',
	initialState: acreValues,
	reducers: {acreFilter(state, action) {remove(state, item => item.key == action.payload)}}
	})

export const {acreFilter} = acreSlice.actions;

export default acreSlice.reducer;
