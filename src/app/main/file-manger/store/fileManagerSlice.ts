import { FileManagerApi } from 'api/FileManager';
import { createSlice, createAsyncThunk, current, PayloadAction } from '@reduxjs/toolkit';
import { IState } from '../interfaces/states';
import { IFileProps } from '../interfaces/index';
import _ from '@lodash';
import { videoExtention } from 'utils/videoUtils';
import { IFileManagerApp } from 'app/interfaces/fileManager';
export const getMediaFiles = createAsyncThunk(
	'fileManger/getFiles',
	async (
		{ count, id, page, applicationId, FileType, nextPage, prevPage, caption }: IFileManager.IFileParams,
		{ dispatch, getState }
	) => {
		dispatch(setLoadingState);

		const state: any = getState();
		const { fuse } = state;
		const { fileManagerApp } = fuse;
		const { fileManager } = fileManagerApp;
		if (!FileType) {
			FileType = fileManager.mediaType;
		}
		const request = await FileManagerApi.getMediaFiles({
			count,
			id,
			page,
			applicationId,
			FileType,
			nextPage,
			prevPage,
			caption
		});

		const { data, status } = await request;
		if (data && data.length < count) {
			dispatch(limitLoadMore(true));
		} else {
			dispatch(limitLoadMore(false));
		}
		return { data, status };
	}
);
export const getMediaFileByMediaFileId = createAsyncThunk(
	'fileManger/getMediaFileByMediaFileId',
	async ({ id }: IFileManager.IFileParams) => {
		const request = await FileManagerApi.getMediaFileByMediaFileId({ id });

		const { data, status } = await request;
		return { data, status };
	}
);
export const getMediaFileById = createAsyncThunk(
	'fileManger/getMediaFileById',
	async ({ id }: IFileManager.IFileParams) => {
		const request = await FileManagerApi.getMediaFileById({ id });

		const { data, status } = await request;
		return { data, status };
	}
);
export const editMediaFile = createAsyncThunk(
	'fileManger/editMediaFile',
	async ({ id, caption }: IFileManager.IFileBody, { dispatch }) => {
		dispatch(setCaptionLoading(id));
		const request = await FileManagerApi.editMediaFile({ id, caption });

		const { data, status } = await request;
		if (status === 1) return { data, id, caption };
		else return { data: null, id: null, caption: null };
	}
);
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
		getFiles(state, action: any) {
			// const { fuse } = state;
			// const { fileManagerApp } = fuse;
			// state.value += action.payload
			state.entities = action.payload.data;
		},
		setSelectedFiles: {
			reducer: (state, action: any) => {
				try {
					state.entities.find(x => x.id === action.payload.id).checked = action.payload.checkState;
				} catch {}
			},
			prepare: (id: string, checkState: boolean) => ({ payload: { id, checkState } })
		},
		setLoadingState: (state, action) => {
			state.entities = [];
			state.loading = true;
		},
		deleteFile: {
			reducer: (state, action: any) => {
				state.entities = state.entities.filter(x => x.id !== action.payload);
			},
			prepare: ({ id }) => ({ payload: id })
		},
		setCaptionLoading: {
			reducer: (state, action: any) => {
				state.entities.find(x => x.id === action.payload).captionLoading = true;
			},
			prepare: (id: string) => ({ payload: id })
		},
		setDialogState: {
			reducer: (state, action: any) => {
				state.entities = [];
				state.dialogState = action.payload.dialogState;
				state.mediaType = action.payload.mediaType;
				state.moduleType = action.payload.moduleType;
			},
			prepare: (dialogState: boolean, mediaType: IFileManagerApp.mediaType, moduleType: number) => ({
				payload: { dialogState, mediaType, moduleType }
			})
		},
		setMediaType: {
			reducer: (state, action: any) => {
				state.mediaType = action.payload;
			},
			prepare: (value: IFileManagerApp.mediaType) => ({ payload: value })
		},
		limitLoadMore: {
			reducer: (state, action: any) => {
				state.limitLoadMoreButton = action.payload;
			},
			prepare: (value: boolean) => ({ payload: value })
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getMediaFiles.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getMediaFiles.fulfilled, (state, action) => {
				state.loading = false;
				const data = _.map(action.payload.data, x => {
					try {
						x.isVideo = videoExtention.findIndex(y => y == x.extension.toLowerCase()) > -1;
						return x;
					} catch {}
				});
				state.entities = data;
			})
			.addCase(getMediaFiles.rejected, (state, action) => {
				state.loading = false;
				state.entities = [];
			});
		builder.addCase(editMediaFile.fulfilled, (state, action) => {
			state.loading = false;
			state.entities.find(x => x.id === action.payload.id).caption = action.payload.caption;
			state.entities.find(x => x.id === action.payload.id).captionLoading = false;
		});
	}
});
export const {
	setSelectedFiles,
	setLoadingState,
	limitLoadMore,
	deleteFile,
	setCaptionLoading,
	setDialogState,
	setMediaType
} = fileManagerSlice.actions;
export default fileManagerSlice.reducer;
