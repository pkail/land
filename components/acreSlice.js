import { createSlice } from '@reduxjs/toolkit';
import { acreValues }  from "/components/lineCharts/acreData";

	acreValues.forEach((item) => item.cost = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/(item.ACREAGE * 100)));
	acreValues.forEach((item) => item.price = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/100));
	acreValues.forEach((item) => item.acres = item.ACREAGE);
	// acreValues.forEach((item) => item.cost = item.cost/item.acres);
	acreValues.forEach((item, index) => item.key = index);
console.log('acreValues in acreslice >>>', acreValues)

const acreSlice = createSlice({
	name: 'acre',
	// initialState: acreValues,
	initialState: acreValues,
	reducers: {acreFilter(state, action) {remove(state, item => item.key == action.payload)}}
	})

export const {acreFilter} = acreSlice.actions;

export default acreSlice.reducer;
