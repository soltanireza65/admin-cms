import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { ICategoryForm, LocationItem } from '../interfaces/states';
import { NewsApi } from 'api/News/index';
import _ from '@lodash';
import i18n from 'i18next';

export const getLocationsByNewsId = createAsyncThunk(
	'newsApp/news/getLocationsByNewsId',
	async ({ id }: INewsInterface.IBodyNews) => {
		const request = await NewsApi.getLocationByNewsId({ id });
		const { data } = await request;

		return { data };
	}
);

export const deleteLocationFromNews = createAsyncThunk(
	'newsApp/news/deleteLocationFromNews',
	async ({ categoryId, locationCode, newsId }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.deleteLocationFromNews({ categoryId, locationCode, newsId });
		const { data, status } = await request;

		if (status == 1) {
			dispatch(removeLocation({ categoryId, locationCode }));
			dispatch(
				showMessage({
					message: i18n.t('location_deleted', { ns: 'newsApp' }),
					variant: 'success'
				})
			);
		} else {
			dispatch(
				showMessage({
					message: i18n.t('delete_failed', { ns: 'newsApp' }),

					variant: 'error'
				})
			);
		}
		return { data };
	}
);

const initialState: ICategoryForm = {
	entities: [],
	loading: false,
	image: null,
	openDialog: {
		currentNews: null,
		props: {
			open: false
		}
	}
};

const locationsFormSlice = createSlice({
	name: 'news/locationsForm',
	initialState,
	reducers: {
		setDialogCategoryState: {
			reducer: (state, action: any) => {
				state.openDialog.props.open = action.payload.open;
				state.openDialog.currentNews = action.payload.currentNews;
			},
			prepare: (open: boolean, currentNews: INewsInterface.INewsDTO) => ({ payload: { open, currentNews } })
		},
		setImage: {
			reducer: (state, action: any) => {
				state.image = action.payload;
			},
			prepare: (image: IFileManager.IFile) => ({ payload: image })
		},
		addLocation: {
			reducer: (state, action: any) => {
				state.entities.push(action.payload);
			},
			prepare: (locationItem: LocationItem) => ({ payload: locationItem })
		},
		removeLocation: {
			reducer: (state, action: any) => {
				state.entities = state.entities.filter(
					x => x.categoryId !== action.payload.categoryId && x.locationCode !== action.payload.locationCode
				);
			},
			prepare: ({ categoryId, locationCode }: LocationItem) => ({ payload: { categoryId, locationCode } })
		}
	},
	extraReducers: builder => {
		builder.addCase(getLocationsByNewsId.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(getLocationsByNewsId.fulfilled, (state, action) => {
			state.loading = false;
			state.entities = action.payload.data && action.payload.data.locations;
		});
		builder.addCase(getLocationsByNewsId.rejected, (state, action) => {
			state.loading = false;
			state.entities = [];
		});
		builder.addCase(deleteLocationFromNews.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(deleteLocationFromNews.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(deleteLocationFromNews.rejected, (state, action) => {
			state.loading = false;
		});
	}
});

export const { setDialogCategoryState, setImage, addLocation, removeLocation } = locationsFormSlice.actions;
export default locationsFormSlice.reducer;
