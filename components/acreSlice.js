import { createSlice } from '@reduxjs/toolkit';
import { acreValues }  from "/components/lineCharts/acreData";
import { loadState } from './localStorage';
import remove from 'lodash.remove';
console.log('remove >>>', remove)

const localStorageState = loadState()
console.log('localStorageState in acre slice>>>', localStorageState)

var  persistedValues = (typeof(localStorageState) === 'undefined') ?  acreValues : localStorageState;
// var  persistedValues = (typeof(localStorageState) === 'undefined') ? acreValues : localStorageState;
console.log('persistedValues >>>', persistedValues)

	persistedValues.forEach((item) => item.cost = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/(item.ACREAGE * 100)));
	persistedValues.forEach((item) => item.price = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/100));
	persistedValues.forEach((item) => item.acres = parseInt(item.ACREAGE.replace(/[^0-9]/g, "")));
	// acreValues.forEach((item) => item.cost = item.cost/item.acres);
	persistedValues.forEach((item, index) => item.key = index);
console.log('acreValues in acreslice >>>', acreValues)

const acreSlice = createSlice({
	name: 'acre',
	initialState: persistedValues,
	reducers: {acreFilter(state, action) {remove(state, item => item.key == action.payload)}}
	})

export const {acreFilter} = acreSlice.actions;

export default acreSlice.reducer;
