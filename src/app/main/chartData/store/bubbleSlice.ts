import { createSlice, createAsyncThunk, createStore } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { IData, IStates, IChartData } from '../interfaces/states';
import { CategoryApi } from 'api/Category/index';
import _ from '@lodash';
import { BourseDataApi } from 'api/BourseModule/index';
import Async from 'async';
import i18n from 'i18next';

export const getAllData = createAsyncThunk(
	'bubbleIndices/getData',
	async ({ Flated, page, title, categoryId }: ICategory.ICategoryData, { dispatch }) => {
		const request = await CategoryApi.getAllCategories({
			Flated,
			count: 200,
			moduleType: 5,
			page,
			title,
			categoryId
		});
		const { data, status } = await request;
		//Check for recieve categories list

		if (status == 1) {
			let listIndices: IData[] = [];
			Async.each(
				data,
				(item, done) => {
					// Use tempIndex just for map data easily

					BourseDataApi.getBubbleIndex({
						categoryID: item.id,
						count: 1
					})
						.then(({ data, status }) => {
							if (status == 1) {
								listIndices = _.concat(listIndices, {
									categoryID: item.id,
									categoryTitle: item.title,
									bubbleEdge: data && data.length > 0 ? data[0].bubbleEdge : 0
								});
							}

							return done();
						})
						.catch(x => {
							return done(x);
						});
				},
				err => {
					dispatch(addEntities(listIndices));
					dispatch(setLoadingState(false));
				}
			);
		}
		return { data };
	}
);

export const addNewPoint = createAsyncThunk(
	'bubbleIndices/addNewPoint',
	async ({ bubbleEdge, currentBazaar, categoryID, categoryTitle }: IBourseData.IBubbleParams, { dispatch }) => {
		const request = await BourseDataApi.addBubbleIndex({ bubbleEdge, currentBazaar, categoryID, categoryTitle });
		const { data, status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('index_updated', { ns: 'chartApp', title: categoryTitle }),
					variant: 'success'
				})
			);
		} else {
			dispatch(
				showMessage({
					message: i18n.t('index_failed', { ns: 'chartApp', title: categoryTitle }),
					variant: 'error'
				})
			);
		}

		return {};
	}
);

export const addZeroPoint = createAsyncThunk(
	'bubbleIndices/addZeroPoint',
	async ({ categoryID, categoryTitle }: IBourseData.IBubbleParams, { dispatch }) => {
		const request = await BourseDataApi.addBubbleIndex({
			bubbleEdge: 0,
			currentBazaar: 0,
			categoryID,
			categoryTitle
		});
		const { status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('index_updated', { ns: 'chartApp', title: categoryTitle }),
					variant: 'success'
				})
			);
		} else {
			dispatch(
				showMessage({
					message: i18n.t('index_failed', { ns: 'chartApp', title: categoryTitle }),
					variant: 'error'
				})
			);
		}

		return {};
	}
);

const initialState: IStates = {
	entities: [],
	loading: false
};

const bubbleSlice = createSlice({
	name: 'bubbleIndices',
	initialState,
	reducers: {
		addEntities: {
			reducer: (state, action: any) => {
				state.entities = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		setLoadingState: {
			reducer: (state, action: any) => {
				state.loading = action.payload;
			},
			prepare: value => ({ payload: value })
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAllData.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllData.fulfilled, (state, action) => {})
			.addCase(getAllData.rejected, (state, action) => {
				state.loading = false;
			});
	}
});

export const { addEntities, setLoadingState } = bubbleSlice.actions;
export default bubbleSlice.reducer;
