import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { CategoryApi } from 'api/Category/index';
import { LocationsStates } from '../interfaces/stores';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { getOneCategory } from './categorySlice';
import i18n from 'i18next';
export const createLocation = createAsyncThunk(
	'categoryApp/location/create',
	async (
		{
			categoryId,
			title,
			locationCode,
			viewCount,
			locationModuleType,
			locationWidth,
			locationHeight
		}: IGlobalData.ILocation,
		{ dispatch }
	) => {
		const request = await CategoryApi.addLocation({
			categoryId,
			title,
			locationCode,
			viewCount,
			locationModuleType,
			locationWidth,
			locationHeight
		});
		const { data, status } = await request;
		if (status === 1) {
			dispatch(getOneCategory({ id: categoryId }));
			dispatch(showMessage({ message: i18n.t('data_registered', { ns: 'categoryApp' }) }));
		}
		return { data, status };
	}
);
export const editLocation = createAsyncThunk(
	'categoryApp/location/edit',
	async (
		{
			categoryId,
			title,
			locationCode,
			viewCount,
			locationModuleType,
			locationWidth,
			locationHeight
		}: IGlobalData.ILocation,
		{ dispatch }
	) => {
		const request = await CategoryApi.editLocation({
			categoryId,
			title,
			locationCode,
			viewCount,
			locationModuleType,
			locationWidth,
			locationHeight
		});
		const { data, status } = await request;
		if (status === 1) {
			dispatch(getOneCategory({ id: categoryId }));
			dispatch(showMessage({ message: i18n.t('location_updated', { ns: 'categoryApp' }) }));
		}
		return { data, status };
	}
);

export const getAllLocations = createAsyncThunk(
	'categoryApp/location/getAllLocations',
	async ({ id }: ICategory.ICategoryData) => {
		const request = await CategoryApi.getAllCategories({
			id
		});
		const { data } = await request;
		const categoryDetial = data[0];
		const { locations } = categoryDetial;

		return { locations, categoryDetial };
	}
);

const initialState: LocationsStates = {
	entities: [],
	categoryDetail: null,
	hasError: false,
	loading: false,
	locationDialog: {
		type: 'new',
		id: '0',
		props: {
			open: false
		},
		data: null
	}
};
const locationSilce = createSlice({
	name: 'categoryApp/location',
	initialState,
	reducers: {
		openNewLocationDialog: (state, action) => {
			state.locationDialog = {
				type: 'new',
				id: action.payload,
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewLocationDialog: (state, action) => {
			state.locationDialog = {
				type: 'new',
				id: '0',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditLocationDialog: {
			reducer: (state, action: any) => {
				state.locationDialog = {
					type: 'edit',
					id: action.payload.id,
					props: {
						open: true
					},
					data: action.payload.data
				};
			},
			prepare: ({ data, id }) => ({ payload: { data, id } })
		},
		closeEditLocationDialog: (state, action) => {
			state.locationDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAllLocations.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllLocations.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.locations;
				state.categoryDetail = action.payload.categoryDetial;
			})
			.addCase(getAllLocations.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
				state.entities = [];
			});
		builder
			.addCase(createLocation.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(createLocation.fulfilled, (state, action) => {
				state.loading = false;
				state.entities.push(action.payload.data);
			})
			.addCase(createLocation.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
			});
		builder
			.addCase(editLocation.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(editLocation.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(editLocation.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
			});
	}
});
export const {
	closeEditLocationDialog,
	closeNewLocationDialog,
	openEditLocationDialog,
	openNewLocationDialog
} = locationSilce.actions;
export default locationSilce.reducer;
