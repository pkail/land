import { configureStore } from '@reduxjs/toolkit';
import acreReducer from './acreSlice';
import outlierReducer from './outlierSlice';
import rangeReducer from './rangeSlice';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import logger from "redux-logger";
import { acreValues }  from "/components/lineCharts/acreData";
import { loadState } from './localStorage';


const makeStore = () => configureStore( {reducer: {
								acre: acreReducer,
								range: rangeReducer
},
								middleware: (getDefaultMiddleware) =>
								getDefaultMiddleware().concat(logger)
})

export const wrapper = createWrapper(makeStore);
