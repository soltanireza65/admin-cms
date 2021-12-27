import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { INewsListState, ILocationNewsProps } from '../interfaces/states';
import { NewsApi } from 'api/News/index';
import _ from '@lodash';
import { addLocation } from './locationsFormSlice';
// change getPublishedNews in dispatch
import { deleteAllFiles } from 'app/store/fuse/albumSlice';
import i18n from 'i18next';

export const getPublishedNews = createAsyncThunk(
	'newsApp/news/newsList',
	async ({ newsId, status, titr, defaultCategoriesID, count }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.getPublishedNews({ newsId, status, titr, defaultCategoriesID, count });
		const { data } = await request;
		return { data };
	}
);

export const manageNews = createAsyncThunk(
	'newsApp/news/newsListWithFilter',
	async (body: INewsInterface.IBodyNews, { dispatch, getState }) => {
		const state: any = getState();
		const { newsApp } = state;
		const { news } = newsApp;
		body.status = body.status ? body.status : news.status;
		const request = await NewsApi.manageNews({ ...body });
		const { data } = await request;
		body.orderByFieldName && dispatch(setColumnSorted(body.orderByFieldName, body.orderByDescending));
		return { data };
	}
);
export const createNews = createAsyncThunk(
	'newsApp/news/createNews',
	async (body: INewsInterface.INewsDTO, { dispatch }) => {
		console.log(body);
		const request = await NewsApi.createNews(body);
		const { data, status, errors, message } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('news_created', { ns: 'news_created', title: data.titr, newsCode: data.newsCode }),

					variant: 'success'
				})
			);
			dispatch(deleteAllFiles({}));
			dispatch(manageNews({}));

			return { data };
		} else {
			dispatch(setError(errors));

			dispatch(
				showMessage({
					message: message,

					variant: 'error'
				})
			);

			return {};
		}
	}
);
export const editNews = createAsyncThunk(
	'newsApp/news/editNews',
	async (body: INewsInterface.INewsDTO, { dispatch }) => {
		const request = await NewsApi.editNews(body);
		const { data, status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('news_edited', { ns: 'newsApp', title: body.titr }),

					variant: 'success'
				})
			);
			dispatch(getPublishedNews({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('news_failed', { ns: 'newsApp' }),

					variant: 'error'
				})
			);
		}
		return { data };
	}
);
export const getNewsById = createAsyncThunk(
	'newsApp/news/getNewsById',
	async ({ id }: INewsInterface.INewsDTO, { dispatch }) => {
		const request = await NewsApi.getNewsById({ id });
		const { data } = await request;

		return { data };
	}
);
export const getRelatedNewsById = createAsyncThunk(
	'newsApp/news/getRelatedNewsById',
	async ({ id, count }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.getRelatedNewsById({ id, count });
		const { data } = await request;

		return { data };
	}
);
export const getLocationNews = createAsyncThunk(
	'newsApp/news/getLocationNews',
	async ({ categoryId, locationCode }: INewsInterface.IBodyNews) => {
		const request = await NewsApi.getLocationNews({ categoryId, locationCode });
		const { data } = await request;

		return { data };
	}
);
export const publishNews = createAsyncThunk(
	'newsApp/news/publishNews',
	async ({ id, titr }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.publishNews({ id });
		const { data, status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('publish_staus', { ns: 'newsApp', title: titr }),
					variant: 'success'
				})
			);
			dispatch(manageNews({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('server_error', { ns: 'newsApp' }),

					variant: 'error'
				})
			);
		}
		return { data };
	}
);
export const publishNewsInTheFuture = createAsyncThunk(
	'newsApp/news/publishNewsInTheFuture',
	async ({ newsId, startPublishDateTimeString, titr }: INewsInterface.INewsDTO, { dispatch }) => {
		const request = await NewsApi.publishNewsInTheFuture({ newsId, startPublishDateTimeString });
		const { data, status } = await request;

		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('news_pubdata_registered', { ns: 'newsApp', title: titr }),
					variant: 'success'
				})
			);
		} else {
			dispatch(
				showMessage({
					message: i18n.t('server_error', { ns: 'newsApp' }),

					variants: 'error'
				})
			);
		}
		return { data };
	}
);
export const addLocationToNews = createAsyncThunk(
	'newsApp/news/addLocationToNews',
	async (
		{
			categoryId,
			locationCode,
			mediaFiles2,
			MediaFiles,
			newsId,
			titr,
			priority,
			categoryTitle,
			locationTitle,
			saveMessage
		}: ILocationNewsProps,
		{ dispatch }
	) => {
		const request = await NewsApi.addLocationToNews({
			categoryId,
			locationCode,
			MediaFiles,
			newsId
		});
		const { data, status } = await request;

		if (status == 1) {
			dispatch(changeNewsPriorityInLatestNews({ categoryId, locationCode, newsId, priority }));
			dispatch(
				addLocation({
					categoryId,
					locationCode,
					mediaFiles: mediaFiles2,
					newsId,
					titr,
					priority,
					categoryTitle,
					locationTitle
				})
			);
			dispatch(
				showMessage({
					message: i18n.t('news_registered', { ns: 'newsApp', title: titr, locationTitle }),
					variant: 'success'
				})
			);
		} else {
			dispatch(
				showMessage({
					message: i18n.t('data_failed', { ns: 'newsApp' }),
					variant: 'error'
				})
			);
		}
		return { data };
	}
);
export const deleteLocationFromNews = createAsyncThunk(
	'newsApp/news/deleteLocationFromNews',
	async ({ categoryId, locationCode, newsId, titr }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.deleteLocationFromNews({ categoryId, locationCode, newsId });
		const { data, status } = await request;

		if (status == 1) {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'remove_location',
					values: {
						title: titr
					},

					variants: 'success'
				})
			);
			dispatch(getPublishedNews({}));
		} else {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'cancel_save_data',
					values: {
						title: titr
					},
					variants: 'error'
				})
			);
		}
		return { data };
	}
);
export const changeNewsLocationStatus = createAsyncThunk(
	'newsApp/news/changeNewsLocationStatus',
	async ({ id, status, titr }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.changeNewsLocationStatus({ id, status });
		const response = await request;

		if (response.status == 1) {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'change_location',
					values: {
						title: titr
					},

					variants: 'success'
				})
			);
			dispatch(getPublishedNews({}));
		} else {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'cancel_save_data',
					values: {
						title: titr
					},
					variants: 'error'
				})
			);
		}
		return { data: response.data };
	}
);
export const getNewsLocationsByNewsId = createAsyncThunk(
	'newsApp/news/getNewsLocationsByNewsId',
	async ({ id, titr }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.getNewsLocationsByNewsId({ id });
		const response = await request;

		return { data: response.data };
	}
);

export const AddNewsToLatestNews = createAsyncThunk(
	'newsApp/news/AddNewsToLatestNews',
	async ({ categoryId, locationCode, newsId, titr, priority }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.AddNewsToLatestNews({
			categoryId,
			locationCode,
			newsId,
			priority
		});
		const response = await request;

		if (response.status == 1) {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'add_to_last_news',
					values: {
						title: titr
					},

					variants: 'success'
				})
			);
			dispatch(getPublishedNews({}));
		} else {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'cancel_save_data',
					values: {
						title: titr
					},
					variants: 'error'
				})
			);
		}
		return { data: response.data };
	}
);

export const deleteNewsFromLatestNews = createAsyncThunk(
	'newsApp/news/deleteNewsFromLatestNews',
	async ({ categoryId, locationCode, newsId, titr }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.deleteNewsFromLatestNews({
			categoryId,
			locationCode,
			newsId
		});
		const response = await request;

		if (response.status == 1) {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'delete_from_lastnews',
					values: {
						title: titr
					},

					variants: 'success'
				})
			);
			dispatch(getPublishedNews({}));
		} else {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'cancel_save_data',
					values: {
						title: titr
					},
					variants: 'error'
				})
			);
		}
		return { data: response.data };
	}
);

export const changeNewsPriorityInLatestNews = createAsyncThunk(
	'newsApp/news/changeNewsPriorityInLatestNews',
	async ({ categoryId, locationCode, newsId, priority, titr }: INewsInterface.IBodyNews, { dispatch }) => {
		const request = await NewsApi.changeNewsPriorityInLatestNews({
			categoryId,
			locationCode,
			newsId,
			priority
		});
		const response = await request;

		if (response.status == 1) {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'change_news_priority',
					values: {
						title: titr
					},

					variants: 'success'
				})
			);
			dispatch(getPublishedNews({}));
		} else {
			dispatch(
				showMessage({
					languageSrc: 'newsMessege',
					keyWord: 'cancel_save_data',
					values: {
						title: titr
					},
					variants: 'error'
				})
			);
		}
		return { data: response.data };
	}
);

export const getcat = createAsyncThunk('newsApp/news/getcat', async ({ id }: INewsInterface.IBodyNews) => {
	const request = await NewsApi.getcat({
		id
	});
	const response = await request;

	return { data: response.data };
});

let initialState: INewsListState = {
	entities: [],
	defaultCategoriesID: [],
	tags: [],
	newsCreated: {},
	currentNews: {},
	authorUserID: '',
	columnSorted: '',
	editorLoading: false,
	fromStartPublishDateTime: '',
	tillStartPublishDateTime: '',
	errorList: {},
	datePublishDialog: {
		props: {
			open: false
		},
		id: '',
		title: '',
		newsCode: 0
	},
	loading: false,
	orderDescending: false,
	searchText: '',
	status: 1
};
const newsSlice = createSlice({
	name: 'NewsApp/news',
	initialState,
	reducers: {
		setColumnSorted: {
			reducer: (state, action: any) => {
				state.columnSorted = action.payload.id;
				state.orderDescending = action.payload.desc;
			},
			prepare: (id, desc) => ({ payload: { id, desc } })
		},
		setError: {
			reducer: (state, action: any) => {
				state.errorList = {
					keys: Object.keys(action.payload.data),
					messages: Object.values(action.payload.data)
				};
			},
			prepare: (errordata: any) => ({ payload: errordata })
		},
		setStatus: {
			reducer: (state, action: any) => {
				state.status = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		setLoading: {
			reducer: (state, action: any) => {
				state.loading = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		openPublishDialog: {
			reducer: (state, action: any) => {
				state.datePublishDialog = {
					props: {
						open: true
					},
					title: action.payload.title,
					id: action.payload.id,
					newsCode: parseInt(action.payload.newsCode)
				};
			},
			prepare: (id: string, title: string, newsCode: number) => ({ payload: { id, title, newsCode } })
		},
		closePublishDialog: (state, action) => {
			state.datePublishDialog = {
				props: {
					open: false
				},
				title: '',
				id: '',
				newsCode: 0
			};
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getPublishedNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getPublishedNews.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(getPublishedNews.rejected, (state, action) => {
				state.loading = false;
				state.entities = [];
			});
		builder
			.addCase(manageNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(manageNews.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(manageNews.rejected, (state, action) => {
				state.loading = false;
				state.entities = [];
			});
		builder
			.addCase(publishNewsInTheFuture.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(publishNewsInTheFuture.fulfilled, (state, action) => {
				state.loading = false;
				state.datePublishDialog = {
					id: '',
					props: {
						open: false
					},
					newsCode: 0,
					title: ''
				};
			})
			.addCase(publishNewsInTheFuture.rejected, (state, action) => {
				state.loading = false;
				state.datePublishDialog = {
					id: '',
					props: {
						open: false
					},
					newsCode: 0,
					title: ''
				};
			});
		builder
			.addCase(createNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(createNews.fulfilled, (state, action) => {
				state.loading = false;
				state.newsCreated = action.payload.data;
			})
			.addCase(createNews.rejected, (state, action) => {
				state.loading = false;
			});
		builder
			.addCase(editNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(editNews.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(editNews.rejected, (state, action) => {
				state.loading = false;
			});
		builder
			.addCase(getNewsById.pending, (state, action) => {
				state.editorLoading = true;
			})
			.addCase(getNewsById.fulfilled, (state, action) => {
				state.editorLoading = false;
				state.currentNews = action.payload.data;
			})
			.addCase(getNewsById.rejected, (state, action) => {
				state.editorLoading = false;
			});
	}
});
export const {
	setStatus,
	setLoading,
	closePublishDialog,
	openPublishDialog,
	setError,
	setColumnSorted
} = newsSlice.actions;
export default newsSlice.reducer;
