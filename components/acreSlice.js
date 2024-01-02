import { createSlice } from '@reduxjs/toolkit';
import { acreValues }  from "/components/lineCharts/acreData";
import { loadState, saveState } from './localStorage';
// import remove from 'lodash.remove';
import { orderBy, remove } from "lodash";

const localStorageState = loadState()
var  persistedValueswithHeader = (typeof(localStorageState) === 'undefined') ?  acreValues : localStorageState.acre;
var  persistedValues = persistedValueswithHeader.slice(0, persistedValueswithHeader.length-1);
	persistedValues.forEach((item) => item.cost = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/(item.ACREAGE * 100)));
	persistedValues.forEach((item) => item.price = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/100));
	// persistedValues.forEach((item) => item.acres = item.ACREAGE.replace(/[^0-9]/g, ""));
	persistedValues.forEach((item) => item.acres = parseInt(item.ACREAGE.replace(/[^0-9]/g, ""))/10);
	// acreValues.forEach((item) => item.cost = item.cost/item.acres);
	persistedValues.forEach((item, index) => item.key = index);
const persistedValuesSorted = orderBy(persistedValues, ["cost"], ["desc"]);

const acreSlice = createSlice({
	name: 'acre',
	initialState: persistedValuesSorted,
	reducers: {acreFilter(state, action) {remove(state, item => item.key == action.payload)},
acreData(state, action) {return action.payload}}
	})

export const {acreFilter, acreData} = acreSlice.actions;

export default acreSlice.reducer;
