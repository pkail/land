import { configureStore } from '@reduxjs/toolkit';
import acreReducer from './acreSlice';
import {createWrapper} from 'next-redux-wrapper';
import logger from "redux-logger";


const makeStore = () => configureStore( {reducer: {
								acre: acreReducer
							},
								middleware: (getDefaultMiddleware) =>
								getDefaultMiddleware().concat(logger)
})

export const wrapper = createWrapper(makeStore);
