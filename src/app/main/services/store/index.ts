import { combineReducers } from '@reduxjs/toolkit';
import services from './servicesSlice';
const reducer = combineReducers({
	services
});

export default reducer;
