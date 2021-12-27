import { FileManagerApi } from 'api/FileManager';
import { createSlice, createAsyncThunk, current, PayloadAction } from '@reduxjs/toolkit';
import { IState } from '../interfaces/states';
import { IFileProps } from '../interfaces/index';
import { videoExtention } from 'utils/videoUtils';
import { IFileManagerApp } from 'app/interfaces/fileManager';

const initialState: IState = {
	entities: [],
	moduleType: 0,
	mediaType: 0,
	dialogState: false,
	loading: false,
	limitLoadMoreButton: false
};

const fileManagerSlice = createSlice({
	name: 'fileManager',
	initialState,
	reducers: {
		getMediaFiles(state, action: any) {
			// const { fuse } = state;
			// const { fileManagerApp } = fuse;
			// state.value += action.payload
			state.entities = action.payload.data;
		}
	}
});

export const { getMediaFiles } = fileManagerSlice.actions;
export default fileManagerSlice.reducer;
