import { createSlice, createAsyncThunk, createStore } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { IRiskStates, ICategoriesList, IRiskChartData } from '../interfaces/states';
import { CategoryApi } from 'api/Category/index';
import _ from '@lodash';
import { BourseDataApi } from 'api/BourseModule/index';
import i18n from 'i18next';

export const getAllData = createAsyncThunk(
	'riskIndeicesChart/getData',
	async ({ Flated, page, title, categoryId }: ICategory.ICategoryData, { dispatch }) => {
		let categoriesData: ICategory.ICategoryData[] = [];
		{
			const request = await CategoryApi.getAllCategories({
				Flated,
				count: 200,
				moduleType: 5,
				page,
				title,
				categoryId
			});
			const { data, status } = await request;
			categoriesData = data;
		}
		{
			const request2 = await CategoryApi.getAllCategories({
				Flated,
				count: 200,
				moduleType: 17,
				page,
				title,
				categoryId
			});
			const { data, status } = await request2;
			data.map(item => {
				categoriesData.push(item);
			});
		}
		return { data: categoriesData };
	}
);

export const getPoints = createAsyncThunk(
	'riskIndeicesChart/getPoints',
	async ({ categoryTitle, categoryID, isDaily }: IBourseData.IFilter, { dispatch }) => {
		const request = await BourseDataApi.getRiskIndex({
			count: 200,
			categoryID,
			isDaily
		});
		const { data, status } = await request;
		return { data };
	}
);

export const addNewPoint = createAsyncThunk(
	'riskIndeicesChart/addNewPoint',
	async ({ riskIndexNumber, categoryID, categoryTitle, isDaily }: IBourseData.IRiskParams, { dispatch }) => {
		dispatch(setDialogLoadingState(true));
		const request = await BourseDataApi.addRiskIndex({ riskIndexNumber, categoryID, categoryTitle, isDaily });
		const { data, status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('index_updated', { ns: 'chartApp', title: categoryTitle }),
					variant: 'success'
				})
			);
			setTimeout(() => {
				dispatch(hideMessage({}));
			}, 1000);
			dispatch(
				getPoints({
					categoryID,
					categoryTitle
				})
			);
		} else {
			dispatch(
				showMessage({
					message: i18n.t('index_failed', { ns: 'chartApp', title: categoryTitle }),
					variant: 'error'
				})
			);

			setTimeout(() => {
				dispatch(hideMessage({}));
			}, 1000);
		}

		dispatch(setDialogLoadingState(false));
		return {};
	}
);

export const deletePoint = createAsyncThunk(
	'riskIndeicesChart/deletePoint',
	async ({ id, categoryID, categoryTitle }: IBourseData.IBazarPredication, { dispatch }) => {
		const request = await BourseDataApi.deleteRiskIndex({ id });
		const { status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('index_updated', { ns: 'chartApp', title: categoryTitle }),
					variant: 'success'
				})
			);

			setTimeout(() => {
				dispatch(hideMessage({}));
			}, 1000);
			dispatch(
				getPoints({
					categoryID,
					categoryTitle
				})
			);
		} else {
			dispatch(
				showMessage({
					message: i18n.t('index_failed', { ns: 'chartApp', title: categoryTitle }),
					variant: 'error'
				})
			);

			setTimeout(() => {
				dispatch(hideMessage({}));
			}, 1000);
		}

		return {};
	}
);

const initialState: IRiskStates = {
	entities: [],
	dialog: {
		loading: false,
		categoryID: '0',
		categoryTitle: '',
		listData: [],
		props: {
			open: false
		}
	},
	loading: false
};

const bubbleSlice = createSlice({
	name: 'riskIndices',
	initialState,
	reducers: {
		addNewPointToListData: {
			reducer: (state, action: any) => {
				state.dialog.listData.push(action.payload.value);
			},
			prepare: value => ({ payload: value })
		},
		setDialogLoadingState: {
			reducer: (state, action: any) => {
				state.dialog.loading = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		setLoadingState: {
			reducer: (state, action: any) => {
				state.loading = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		setDialogOpenState: {
			reducer: (state, action: any) => {
				state.dialog.props.open = action.payload.openState;
				state.dialog.categoryID = action.payload.categoryID;
				state.dialog.categoryTitle = action.payload.categoryTitle;
			},
			prepare: (categoryTitle, categoryID, openState) => ({
				payload: { categoryTitle, categoryID, openState }
			})
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAllData.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllData.fulfilled, (state, action) => {
				state.loading = false;
				let data: ICategoriesList[] = [];
				if (action.payload.data) {
					action.payload.data.map(item => {
						data.push({ categoryID: item.id, categoryTitle: item.title });
					});
					console.log(data);
				}
				state.entities = data;
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.loading = false;
			});

		builder
			.addCase(getPoints.pending, (state, action) => {
				state.dialog.loading = true;
				state.dialog.listData = [];
			})
			.addCase(getPoints.fulfilled, (state, action) => {
				state.dialog.loading = false;
				let data: IRiskChartData[] = [];
				if (action.payload.data) {
					action.payload.data.map(item => {
						data.push({
							createdDateTime: item.createdDateTime,
							riskIndexNumber: item.riskIndexNumber,
							categoryID: item.categoryID,
							categoryTitle: item.categoryTitle,

							id: item.id,
							persianCreatedDateTime: item.persianCreatedDateTime
						});
					});
				}
				state.dialog.listData = data;
			})
			.addCase(getPoints.rejected, (state, action) => {
				state.dialog.loading = false;
				state.dialog.listData = [];
			});
	}
});

export const {
	setLoadingState,
	setDialogLoadingState,
	setDialogOpenState,
	addNewPointToListData
} = bubbleSlice.actions;
export default bubbleSlice.reducer;
