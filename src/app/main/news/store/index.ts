import { combineReducers } from '@reduxjs/toolkit';
import news from './newsSlice';
import locationsForm from './locationsFormSlice';
import statusDialog from './statusSlice';
const reducer = combineReducers({
	news,
	locationsForm,
	statusDialog
});

export default reducer;
