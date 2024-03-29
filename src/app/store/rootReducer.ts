import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';

const createReducer = (asyncReducers: any) =>
	combineReducers({
		// auth,
		fuse,
		...asyncReducers
	});

export default createReducer;
