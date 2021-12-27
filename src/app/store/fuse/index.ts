import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';
import upload from './uploadSlice';
import album from './albumSlice';
import category from './categorySlice';
import fileManagerApp from 'app/main/file-manger/store/index';
const fuseReducers = combineReducers({
	navigation,
	category,
	settings,
	navbar,
	message,
	dialog,
	upload,
	album,
	fileManagerApp
});

export default fuseReducers;
