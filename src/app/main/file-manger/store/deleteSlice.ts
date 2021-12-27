import { FileManagerApi } from 'api/FileManager';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { IDeleteState } from '../interfaces/states';
import _ from '@lodash';
import { deleteFile } from './fileManagerSlice';
import i18n from 'i18next';
export const deleteMediaFile = createAsyncThunk(
	'fileManger/delete',
	async ({ id, caption }: IFileManager.IFileParams, { dispatch }) => {
		let formData = new FormData();
		formData.append('id', id);
		const request = await FileManagerApi.deleteMediaFile(formData);
		const { data, status } = await request;

		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('media_deleted', { ns: 'fileManagerApp', caption }),
					variantvariant: 'success'
				})
			);

			dispatch(deleteFile({ id }));
		}
		return { data, status };
	}
);
const initialState: IDeleteState = {
	loading: false,
	title: '',
	id: '0',
	deleteDialog: {
		props: {
			open: false
		}
	}
};

const deleteSlice = createSlice({
	name: 'fileManagerApp/delete',
	initialState,
	reducers: {
		openDeleteDialog: {
			reducer: (state, action: any) => {
				state.title = action.payload.title;
				state.id = action.payload.id;
				state.deleteDialog = {
					props: {
						open: true
					}
				};
			},
			prepare: ({ id, title }) => ({
				payload: { id, title }
			})
		},
		closeDeleteDialog: (state, action) => {
			state.title = '';
			state.id = '0';

			state.deleteDialog = {
				props: {
					open: false
				}
			};
		}
	},
	extraReducers: builder => {
		builder
			.addCase(deleteMediaFile.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteMediaFile.fulfilled, (state, action) => {
				state.loading = false;
				state.title = '';
				state.id = '0';

				state.deleteDialog = {
					props: {
						open: false
					}
				};
			})
			.addCase(deleteMediaFile.rejected, (state, action) => {
				state.loading = false;
			});
	}
});
export const { closeDeleteDialog, openDeleteDialog } = deleteSlice.actions;
export default deleteSlice.reducer;
