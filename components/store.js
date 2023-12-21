import { configureStore } from '@reduxjs/toolkit';
import acreReducer from './acreSlice';
import dataReducer from './addDataSlice';
import outlierReducer from './outlierSlice';
import rangeReducer from './rangeSlice';
import {createWrapper} from 'next-redux-wrapper';
import logger from "redux-logger";
import { acreValues }  from "/components/lineCharts/acreData";
import { loadState } from './localStorage';

const localStorageState = loadState()
console.log('localStorageState >>>', localStorageState)

var  persistedValues = (typeof(localStorageState) === 'undefined') ?  [] : localStorageState;
// var  persistedValues = (typeof(localStorageState) === 'undefined') ? acreValues : localStorageState;
console.log('persistedValues >>>', persistedValues)

	acreValues.forEach((item) => item.cost = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/(item.ACREAGE * 100)));
	acreValues.forEach((item) => item.price = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/100));
	acreValues.forEach((item) => item.acres = item.ACREAGE);
	// acreValues.forEach((item) => item.cost = item.cost/item.acres);
	acreValues.forEach((item, index) => item.key = index);
console.log('acreValues in store >>>', acreValues)


const makeStore = () => configureStore( {reducer: {
								acre: acreReducer,
								addData: dataReducer,
								range: rangeReducer,
								outlier: outlierReducer
},
								middleware: (getDefaultMiddleware) =>
								getDefaultMiddleware().concat(logger)
})

export const wrapper = createWrapper(makeStore);
