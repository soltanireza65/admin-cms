import { combineReducers } from '@reduxjs/toolkit';
import bubbleStore from './bubbleSlice';
import riskStore from './riskIndexSlice';
const reducer = combineReducers({
	bubbleStore,
	riskStore
});

export default reducer;
