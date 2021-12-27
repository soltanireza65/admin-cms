import { combineReducers } from '@reduxjs/toolkit';
import category from './categorySlice';
import location from './locationSlice';
import deleteStore from './deleteSlice';
import favorite from './favoriteSlice';
const reducer = combineReducers({
	category,
	location,
	deleteStore,
	favorite
});

export default reducer;
