import { configureStore } from '@reduxjs/toolkit';
import acreReducer from './acreSlice';
import dataReducer from './dataSlice';
import outlierReducer from './outlierSlice';
import rangeReducer from './rangeSlice';
import {createWrapper} from 'next-redux-wrapper';
import logger from "redux-logger";


const makeStore = () => configureStore( {reducer: {
								acre: acreReducer,
								range: rangeReducer,
								outlier: outlierReducer
							},
								middleware: (getDefaultMiddleware) =>
								getDefaultMiddleware().concat(logger)
})

export const wrapper = createWrapper(makeStore);
