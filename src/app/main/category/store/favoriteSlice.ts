import { createSlice, createAsyncThunk, createStore } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import _ from '@lodash';
import { IStateFavorite } from '../interfaces/stores';
import { Polling } from 'api/Polling/index';
import i18n from 'i18next';

export const addFavoriteCategory = createAsyncThunk(
	'favoriteApp/addFavorite',
	async ({ id, title }: any, { dispatch }) => {
		const { data, status, message } = await Polling.addFovariteCategories({ id, title });
		console.log('addFovariteCategories: ', data);
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('add_index', { ns: 'categoryApp', title }),

					variant: 'success'
				})
			);

			dispatch(getFavoriteCategories());
		} else {
			dispatch(
				showMessage({
					message: i18n.t('index_failed', { ns: 'categoryApp', title }),

					variant: 'error'
				})
			);
		}
		return {
			data
		};
	}
);
export const deleteFavoriteCategory = createAsyncThunk(
	'favoriteApp/deleteFavorite',
	async ({ id }: any, { dispatch }) => {
		const { status, message } = await Polling.deleteFavoriteYesNoPollingCategory({ id });
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('data_registered', { ns: 'categoryApp' }),

					variant: 'success'
				})
			);
			dispatch(getFavoriteCategories());
		} else {
			dispatch(
				showMessage({
					message: i18n.t('register_failed', { ns: 'categoryApp' }),

					variant: 'error'
				})
			);
		}
		return { id };
	}
);
export const getFavoriteCategories = createAsyncThunk('favoriteApp/getFavoriteCategories', async () => {
	const { data, status } = await Polling.getFavouriteYesNoPollings();

	return { data };
});
const initialState: IStateFavorite = {
	entities: [],
	loading: false,
	dialogState: {
		props: {
			open: false
		}
	}
};
const favoriteSlice = createSlice({
	name: 'favorite/app',
	initialState,
	reducers: {
		setDialogState: {
			reducer: (state, action: any) => {
				state.dialogState.props.open = action.payload;
			},
			prepare: (openState: boolean) => ({ payload: openState })
		}
	},
	extraReducers: builder => {
		builder
			.addCase(addFavoriteCategory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(addFavoriteCategory.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(addFavoriteCategory.rejected, (state, action) => {
				state.loading = false;
			});
		builder
			.addCase(getFavoriteCategories.pending, (state, action) => {
				state.loading = true;
				state.entities = [];
			})
			.addCase(getFavoriteCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(getFavoriteCategories.rejected, (state, action) => {
				state.loading = false;
				state.entities = [];
			});
		builder
			.addCase(deleteFavoriteCategory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteFavoriteCategory.fulfilled, (state, action) => {
				state.loading = true;
				state.entities = state.entities.filter(x => x.id != action.payload.id);
			})
			.addCase(deleteFavoriteCategory.rejected, (state, action) => {
				state.loading = false;
			});
	}
});
export const { setDialogState } = favoriteSlice.actions;
export default favoriteSlice.reducer;
