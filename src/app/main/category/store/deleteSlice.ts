import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { IDeleteState } from '../interfaces/stores';
import { CategoryApi } from 'api/Category/index';
import { getAllCategories, getOneCategory } from './categorySlice';
import i18n from 'i18next';

export const deleteCategory = createAsyncThunk(
	'categoryApp/category/delete',
	async ({ id, title }: ICategory.ICategoryData, { dispatch }) => {
		const formData = new FormData();
		formData.append('id', id);
		const request = await CategoryApi.deleteCategory(formData);
		const { data, status } = await request;

		if (status == 1) {
			dispatch(showMessage({ message: i18n.t('category_deleted', { ns: 'categoryApp' }), variant: 'success' }));
			dispatch(getAllCategories({}));
		}
		return { title, status, id };
	}
);
export const deleteLocation = createAsyncThunk(
	'categoryApp/location/delete',
	async ({ title, categoryId, locationCode, locationModuleType }: IGlobalData.ILocation, { dispatch }) => {
		const request = await CategoryApi.deleteLocationFromCategory({ categoryId, locationCode, locationModuleType });
		const { status } = await request;
		if (status == 1) {
			dispatch(showMessage({ message: i18n.t('location_deleted', { ns: 'categoryApp' }) }));
			dispatch(getOneCategory({ id: categoryId }));
		}
		return { locationCode, title, status, categoryId };
	}
);
const initialState: IDeleteState = {
	hasError: false,
	error: '',
	loading: false,
	title: '',
	title2: '',
	id: '0',
	locationCode: '',
	locationModuleType: 0,
	type: 'category',
	deleteDialog: {
		props: {
			open: false
		}
	}
};

const deleteSlice = createSlice({
	name: 'categoryApp/delete',
	initialState,
	reducers: {
		openDeleteDialog: {
			reducer: (state, action: any) => {
				state.type = action.payload.type;
				state.title = action.payload.title;
				state.title2 = action.payload.title2;
				state.id = action.payload.id;
				state.locationCode = action.payload.locationCode;
				state.locationModuleType = action.payload.locationModuleType;
				state.deleteDialog = {
					props: {
						open: true
					}
				};
			},
			prepare: ({ id, type, title, title2, locationCode, locationModuleType }) => ({
				payload: { id, type, title, title2, locationCode, locationModuleType }
			})
		},
		closeDeleteDialog: (state, action) => {
			state.type = 'category';
			state.title = '';
			state.title2 = '';
			state.id = '0';
			state.error = '';

			state.locationCode = '';
			state.locationModuleType = 0;
			state.deleteDialog = {
				props: {
					open: false
				}
			};
		}
	},
	extraReducers: builder => {
		builder
			.addCase(deleteCategory.pending, (state, action) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.type = 'category';
				state.title = '';
				state.title2 = '';
				state.id = '0';

				state.locationCode = '';
				state.locationModuleType = 0;
				state.deleteDialog = {
					props: {
						open: false
					}
				};
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
				state.error = action.error.message;
			});
		builder
			.addCase(deleteLocation.pending, (state, action) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(deleteLocation.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.type = 'category';
				state.title = '';
				state.title2 = '';
				state.id = '0';

				state.locationCode = '';
				state.locationModuleType = 0;
				state.deleteDialog = {
					props: {
						open: false
					}
				};
			})
			.addCase(deleteLocation.rejected, (state, action: any) => {
				state.loading = false;
				state.hasError = true;
				state.error = action.payload.message;
			});
	}
});
export const { closeDeleteDialog, openDeleteDialog } = deleteSlice.actions;
export default deleteSlice.reducer;
