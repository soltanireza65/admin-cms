import { createSlice, current } from '@reduxjs/toolkit';
import { IFileProps } from 'app/main/file-manger/interfaces/index';
import _ from '@lodash';
import { IFileManagerApp } from 'app/interfaces/fileManager';
import { Crop } from 'react-image-crop';

enum MediaType {
	photo = 3,
	video = 4,
	audio = 2,
	document = 1,
	all = 0
}

const initialState: IFileManagerApp.IAlbumStates = {
	imagesEntities: [],
	videoEntities: [],
	audioEntities: [],
	documentEntities: [],
	dialogCrop: {
		id: '',
		url: '',
		cropData: null,
		props: {
			open: false
		}
	}
};
const albumSlice = createSlice({
	name: 'Album',
	initialState,
	reducers: {
		setMainItem: {
			reducer: (state, action: any) => {
				const { mediaType, id } = action.payload;
				switch (mediaType) {
					case MediaType.photo:
						state.imagesEntities.map(x => {
							if (x.item.id != action.payload.id) {
								x.mainItem = false;
							} else {
								x.mainItem = true;
							}
						});
						break;
					case MediaType.video:
						state.videoEntities.map(x => {
							if (x.item.id != action.payload.id) {
								x.mainItem = false;
							} else {
								x.mainItem = true;
							}
						});
						break;
					case MediaType.audio:
						state.audioEntities.map(x => {
							if (x.item.id != action.payload.id) {
								x.mainItem = false;
							} else {
								x.mainItem = true;
							}
						});
						break;
					case MediaType.document:
						state.documentEntities.map(x => {
							if (x.item.id != action.payload.id) {
								x.mainItem = false;
							} else {
								x.mainItem = true;
							}
						});
						break;
					default:
						break;
				}
			},
			prepare: (id: string, mediaType: number) => ({ payload: { id, mediaType } })
		},
		addFile: {
			reducer: (state, action: any) => {
				const { file, mediaType, checkState } = action.payload;
				switch (mediaType) {
					case MediaType.photo: {
						if (checkState) {
							const index = state.imagesEntities.findIndex(x => x.item.id === file.id);
							if (index == -1) {
								state.imagesEntities.push({
									item: file,
									mainItem: file.fileType === 1 ? true : false
								});
							}
						} else state.imagesEntities = current(state.imagesEntities).filter(x => x.item.id !== file.id);

						break;
					}
					case MediaType.video: {
						if (checkState) {
							const index = state.videoEntities.findIndex(x => x.item.id === file.id);
							if (index == -1) {
								state.videoEntities.push({
									item: file,
									mainItem: file.fileType === 3 ? true : false
								});
							}
						} else state.videoEntities = current(state.videoEntities).filter(x => x.item.id !== file.id);

						break;
					}
					case MediaType.audio: {
						if (checkState) {
							const index = state.audioEntities.findIndex(x => x.item.id === file.id);
							if (index == -1) {
								state.audioEntities.push({
									item: file,
									mainItem: file.fileType === 5 ? true : false
								});
							}
						} else state.audioEntities = current(state.audioEntities).filter(x => x.item.id !== file.id);

						break;
					}
					case MediaType.document: {
						if (checkState) {
							const index = state.documentEntities.findIndex(x => x.item.id === file.id);
							if (index == -1) {
								state.documentEntities.push({
									item: file,
									mainItem: file.fileType === 7 ? true : false
								});
							}
						} else
							state.documentEntities = current(state.documentEntities).filter(x => x.item.id !== file.id);

						break;
					}
					default: {
						break;
					}
				}
			},
			prepare: (file: IFileProps, mediaType: IFileManagerApp.mediaType, checkState: boolean) => ({
				payload: { file, mediaType, checkState }
			})
		},
		addCropData: {
			reducer: (state, action: any) => {
				state.dialogCrop.cropData = action.payload.crop;
				state.dialogCrop.id = action.payload.id;
			},
			prepare: (crop: Crop, id: string) => ({ payload: { crop, id } })
		},
		dialogCropState: {
			reducer: (state, action: any) => {
				state.dialogCrop = {
					...state.dialogCrop,
					id: action.payload.id,
					url: action.payload.url,
					locationHeight: action.payload.locationHeight,
					locationWidth: action.payload.locationWidth,
					props: {
						open: action.payload.openState
					}
				};
			},
			prepare: (
				id: string,
				url: string,
				openState: boolean,
				locationWidth?: number,
				locationHeight?: number
			) => ({ payload: { id, openState, locationWidth, locationHeight, url } })
		},
		deleteAllFiles: (state, action) => {
			state.audioEntities = [];
			state.imagesEntities = [];
			state.videoEntities = [];
			state.documentEntities = [];
		}
	}
});
export const { addFile, setMainItem, deleteAllFiles, addCropData, dialogCropState } = albumSlice.actions;
export default albumSlice.reducer;
