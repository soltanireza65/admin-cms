import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { IUploadStates, IFile, ISubFilesPayload } from './interfaces/states';
import { FileUtils } from 'utils/fileUtils';
import axios from 'axios';
import _ from '@lodash';
import { getWithExpiry } from 'utils/localStorageHelper';
import { AuthService } from 'api/Http/authService';
let filesData = new FileUtils();

export const uploadFile = createAsyncThunk('upload', async (file: IFile, { dispatch }) => {
	const formPayload = new FormData();
	const fileData = filesData.fileToUpload.filter(x => x.id == file.id);
	// const token = getWithExpiry('access_token');
	const authService = new AuthService();
	const token = await authService.getToken();

	if (!fileData) {
		return null;
	}
	formPayload.append('File', fileData[0].file);
	formPayload.append('Caption', file.caption);
	formPayload.append('ModuleOwner', file.moduleOwner);
	formPayload.append('Status', `${file.status}`);

	//filter by Parent id to get all subfiles
	filesData.fileToUpload
		.filter(x => x.idparent == file.id)
		.map(item => {
			return formPayload.append('Attachments', item.file, item.title);
		});
	const request = await axios.post(`${process.env.REACT_APP_UPLOAD}/api/Upload/upload`, formPayload, {
		headers: {
			Authorization: `Bearer ${token}`
		},
		onUploadProgress: progress => {
			const { loaded, total } = progress;
			const percentageProgress = Math.floor((loaded / total) * 100);
			dispatch(setUploadProgress({ id: file.id, progress: percentageProgress }));
		}
	});

	const response = await request;
	if (response.status == 200) {
		const responseData: IGlobalData.IServiceResult<any> = response.data;
		if (responseData.status == 1) {
			dispatch(successUploadFile(file.id));
		} else {
			dispatch(failureUploadFile(file.id, JSON.stringify(responseData.data)));
		}
		return { data: responseData.data };
	} else {
		dispatch(failureUploadFile(file.id, 'امکان اتصال به سرور فراهم نمی باشد' + ' ---- ' + response.status));
		return { data: null };
	}
});

export const uploadFileManually = createAsyncThunk('upload/manually', async (file: IFile, { dispatch }) => {
	const formPayload = new FormData();
	const token = getWithExpiry('access_token');

	formPayload.append('File', file.file);
	formPayload.append('Caption', file.caption);
	formPayload.append('ModuleOwner', file.moduleOwner);
	formPayload.append('Status', `${file.status}`);
	formPayload.append('Attachments', file.file, file.caption);
	const request = await axios.post(`${process.env.REACT_APP_UPLOAD}/api/Upload/upload`, formPayload, {
		headers: {
			Authorization: `Bearer ${token}`
		},
		onUploadProgress: progress => {
			const { loaded, total } = progress;
			const percentageProgress = Math.floor((loaded / total) * 100);
			dispatch(setUploadManuallyProgress({ progress: percentageProgress }));
		}
	});

	const response = await request;
	if (response.status == 200) {
		const responseData: IGlobalData.IServiceResult<any> = response.data;
		if (responseData.status == 1) {
		} else {
			dispatch(failureUploadFile(file.id, JSON.stringify(responseData.data)));
		}
		return { data: responseData.data };
	} else {
		dispatch(failureUploadFile(file.id, 'امکان اتصال به سرور فراهم نمی باشد' + ' ---- ' + response.status));
		return { data: null };
	}
});

let initialState: IUploadStates = {
	fileProgress: [],
	fileManuallyProgress: null,
	uploadDialog: {
		type: '',
		parentId: '',
		props: {
			open: false
		},
		data: null
	},
	updateData: 0
};

const uploadFileSlice = createSlice({
	name: 'uploadFile',
	initialState,
	reducers: {
		setUploadFile: {
			reducer: (state, action: any) => {
				let tempData = filesData.addFiles(action.payload.files);
				state.fileProgress = state.fileProgress.concat(tempData);
			},
			prepare: (files: File[]) => ({ payload: { files } })
		},
		setSubUploadFile: {
			reducer: (state, action: any) => {
				let subFiles = state.fileProgress.find(x => x.id == action.payload.id).files;

				const tempData = filesData.addSubFiles(
					subFiles ? subFiles : [],
					action.payload.files,
					action.payload.id
				);
				if (state.fileProgress.length > 0)
					state.fileProgress.find(x => x.id == action.payload.id).files = tempData;
			},
			prepare: ({ id, files, caption }: ISubFilesPayload) => ({ payload: { id, files, caption } })
		},
		deleteUploadFile: {
			reducer: (state, action: any) => {
				state.fileProgress = filesData.deleteFile(current(state.fileProgress), action.payload.id);
			},
			prepare: (id: number) => ({ payload: { id } })
		},
		deleteSubUploadFile: {
			reducer: (state, action: any) => {
				const tempfiles = _.find(current(state.fileProgress), x => x.id == action.payload.idparent).files;
				if (state.fileProgress.length > 0)
					state.fileProgress.find(x => x.id == action.payload.idparent).files = filesData.deleteSubFile(
						tempfiles,
						action.payload.id
					);
			},
			prepare: (idparent: number, id: number) => ({ payload: { idparent, id } })
		},
		setUploadProgress: {
			reducer: (state, action: any) => {
				if (action.payload.progress && action.payload.id) {
					if (action.payload.progress < 90)
						if (state.fileProgress.length > 0)
							state.fileProgress.find(x => x.id == parseInt(action.payload.id)).progress = parseInt(
								action.payload.progress
							);
					if (state.fileProgress.length > 0)
						state.fileProgress.find(x => x.id == parseInt(action.payload.id)).uploadStarted = true;
				}
			},
			prepare: ({ id, progress }) => ({ payload: { id, progress } })
		},
		setUploadManuallyProgress: {
			reducer: (state, action: any) => {
				state.fileManuallyProgress = action.payload;
			},
			prepare: ({ progress }) => ({ payload: { progress } })
		},
		successUploadFile: {
			reducer: (state, action: any) => {
				if (state.fileProgress.length > 0) {
					state.fileProgress.find(x => x.id == parseInt(action.payload)).isUploaded = true;
					state.fileProgress.find(x => x.id == parseInt(action.payload)).progress = 100;
					state.fileProgress = filesData.deleteFile(current(state.fileProgress), action.payload);
				}
			},
			prepare: value => ({ payload: value })
		},
		failureUploadFile: {
			reducer: (state, action: any) => {
				const { id, errorMessage } = action.payload;
				if (state.fileProgress.length > 0) {
					state.fileProgress.find(x => x.id == parseInt(id)).isUploaded = false;
					state.fileProgress.find(x => x.id == parseInt(id)).hasError = true;
					state.fileProgress.find(x => x.id == parseInt(id)).errorMessage = errorMessage;
				}
			},
			prepare: (id, errorMessage) => ({ payload: { id, errorMessage } })
		},
		openNewDialog: {
			reducer: (state, action: any) => {
				state.uploadDialog = {
					type: 'new',
					parentId: action.payload.id,
					moduleOwner: action.payload.moduleOwner,
					status: action.payload.status,
					props: {
						open: true
					},
					data: null
				};
			},
			prepare: (id?: string, moduleOwner?: string, status?: number) => ({
				payload: {
					id,
					moduleOwner,
					status
				}
			})
		},
		closeNewDialog: (state, action) => {
			state.uploadDialog = {
				type: 'new',
				parentId: '',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: builder => {}
});
export const {
	failureUploadFile,
	closeNewDialog,
	openNewDialog,
	setUploadFile,
	setUploadProgress,
	successUploadFile,
	deleteSubUploadFile,
	deleteUploadFile,
	setSubUploadFile,
	setUploadManuallyProgress
} = uploadFileSlice.actions;
export default uploadFileSlice.reducer;
