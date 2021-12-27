import { IStatusState } from '../interfaces/states';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { NewsApi } from 'api/News/index';
import { manageNews, setLoading } from './newsSlice';
import i18n from 'i18next';

export const deleteNews = createAsyncThunk(
	'newsApp/news/deleteNews',
	async ({ id, titr }: IStatusState, { dispatch }) => {
		const request = await NewsApi.deleteNews({ id });
		const { status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({ message: i18n.t('news_deleted', { ns: 'newsApp', title: titr }), variant: 'success' })
			);
			dispatch(manageNews({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('news_location_delete', { ns: 'newsApp' }),
					variants: 'error'
				})
			);
		}

		return {};
	}
);

export const suspendNews = createAsyncThunk(
	'newsApp/news/suspendNews',
	async ({ id, titr }: IStatusState, { dispatch }) => {
		dispatch(setLoading(true));
		const request = await NewsApi.suspendNews({ id });
		const { data, status } = await request;

		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('news_suspended', { ns: 'newsApp', title: titr }),
					variant: 'success'
				})
			);
			dispatch(manageNews({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('news_status_failed', { ns: 'newsApp', title: titr }),
					variant: 'error'
				})
			);
		}
		return { data };
	}
);

const initialState: IStatusState = {
	id: '',
	titr: '',
	titleStatus: 'حذف',
	status: 1,
	statusDialog: {
		props: {
			open: false
		}
	},
	hasError: false,
	loading: false
};

const statusSlice = createSlice({
	name: 'newsApp/news/delete',
	initialState,
	reducers: {
		openDeleteDialog: {
			reducer: (state, action: any) => {
				state.id = action.payload.id;
				state.titr = action.payload.titr;
				state.status = action.payload.status;
				state.titleStatus = action.payload.titleStatus;
				state.statusDialog = {
					props: {
						open: true
					}
				};
			},
			prepare: ({ titr, id, status, titleStatus }: IStatusState) => ({
				payload: { titr, id, status, titleStatus }
			})
		},
		closeDeleteDialog: (state, action) => {
			state.id = '';
			state.titr = '';
			state.statusDialog = {
				props: {
					open: false
				}
			};
		}
	},
	extraReducers: builder => {
		builder
			.addCase(deleteNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteNews.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.id = '';
				state.titr = '';

				state.statusDialog = {
					props: {
						open: false
					}
				};
			})
			.addCase(deleteNews.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
			});
	}
});
export const { closeDeleteDialog, openDeleteDialog } = statusSlice.actions;
export default statusSlice.reducer;
