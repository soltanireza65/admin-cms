import { combineReducers } from '@reduxjs/toolkit';
import fileManager from './fileManagerSlice';
// import fileManager from './newFileManagerSlice';
import deleteStore from './deleteSlice';
const reducer = combineReducers({
	fileManager,
	deleteStore
});

export default reducer;
