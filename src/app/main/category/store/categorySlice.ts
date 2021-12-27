import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { CategoriesState } from '../interfaces/stores';
import { IDialogCategory } from '../interfaces/props';
// import axios from 'axios';
import { CategoryApi } from 'api/Category/index';
import i18n from 'i18next';

export const createCategory = createAsyncThunk(
	'categoryApp/category/create',
	async (
		{
			title,
			englishTitle,
			description,
			mediaFiles,
			parentId,
			saveMessage,
			cancelMessage,
			additionalData,
			isMainPageCategory,
			moduleType
		}: IDialogCategory,
		{ dispatch }
	) => {
		const request = await CategoryApi.addCategory({
			title,
			englishTitle,
			description,
			mediaFiles,
			parentId,
			additionalData,
			isMainPageCategory,
			moduleType
		});

		const { data, status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: saveMessage,

					variant: 'success'
				})
			);
			dispatch(getAllCategories({}));
		} else {
			dispatch(
				showMessage({
					message: cancelMessage,

					variant: 'error'
				})
			);
		}

		return { data, status };
	}
);
export const editCategory = createAsyncThunk(
	'categoryApp/category/edit',
	async (
		{
			id,
			title,
			englishTitle,
			description,
			mediaFiles,
			isMainPageCategory,
			moduleType,
			parentId,
			additionalData
		}: ICategory.ICategoryData,
		{ dispatch }
	) => {
		const request = await CategoryApi.editCategory({
			id,
			title,
			englishTitle,
			description,
			mediaFiles,
			parentId,
			additionalData,
			isMainPageCategory,
			moduleType
		});
		const { data, status } = await request;
		if (status == 1) {
			dispatch(showMessage({ message: i18n.t('category_updated', { ns: 'categoryApp' }), variant: 'sucess' }));
			dispatch(getAllCategories({}));
		}
		return { data, status };
	}
);
export const getAllCategories = createAsyncThunk(
	'categoryApp/category/getcategories',
	async ({ title, englishTitle, description, mediaFiles, parentId, id }: ICategory.ICategoryData) => {
		const request = await CategoryApi.getAllCategories({
			title,
			englishTitle,
			description,
			mediaFiles,
			parentId,
			Flated: false,
			count: 2000,
			id
		});
		const { data, status } = await request;
		return { data, status };
	}
);
export const getOneCategory = createAsyncThunk(
	'categoryApp/category/getOneCategory',
	async ({ id }: ICategory.ICategoryData) => {
		const request = await CategoryApi.getCategoryById({
			id
		});
		const { data } = await request;
		return { data };
	}
);
export const getParentCategory = createAsyncThunk(
	'categoryApp/category/getParaneCategory',
	async ({ parentId }: ICategory.ICategoryData, { dispatch }) => {
		if (!parentId) {
			return {};
		}
		const request = await CategoryApi.getParentCategories({ parentId });

		const { data, status } = await request;
		return { data, status };
	}
);

const initialState: CategoriesState = {
	categoryDialog: {
		type: 'new',
		parentId: '',
		props: {
			open: false
		},
		data: null
	},
	entities: [],
	hasError: false,
	loading: false,
	loadingOne: false,
	searchText: '',
	selectedcategory: null
};
const categorySilce = createSlice({
	name: 'categoryApp/category',
	initialState,
	reducers: {
		setLoadingState: (state, action: any) => {
			state.loadingOne = true;
		},
		setSelected: {
			reducer: (state, action: any) => {
				state.selectedcategory = state.entities.find(x => x.id === action.payload);
			},
			prepare: ({ id }) => ({ payload: id })
		},
		setSearchText: {
			reducer: (state, action: any) => {
				state.searchText = action.payload;
			},
			prepare: (value: string) => ({ payload: value })
		},
		openNewCategoryDialog: {
			reducer: (state, action: any) => {
				state.loadingOne = false;
				state.categoryDialog = {
					type: 'new',
					parentId: action.payload,
					props: {
						open: true
					},
					data: null
				};
			},
			prepare: id => ({ payload: id })
		},
		closeNewCategoryDialog: (state, action) => {
			state.loadingOne = false;
			state.categoryDialog = {
				type: 'new',
				parentId: '',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditCategoryDialog: (state, action) => {
			state.loadingOne = false;
			state.categoryDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditCategoryDialog: (state, action) => {
			state.loadingOne = false;
			state.categoryDialog = {
				type: 'edit',
				parentId: '',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAllCategories.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
				state.entities = [];
			});
		builder
			.addCase(getOneCategory.pending, (state, action) => {
				state.loadingOne = true;
			})
			.addCase(getOneCategory.fulfilled, (state, action) => {
				state.loadingOne = false;
				state.selectedcategory = action.payload.data;
			})
			.addCase(getOneCategory.rejected, (state, action) => {
				state.loadingOne = false;
				state.hasError = true;
			});
		builder
			.addCase(createCategory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.entities.push(action.payload.data);
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
			});

		builder
			.addCase(editCategory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(editCategory.rejected, (state, action) => {
				state.loading = false;
				state.hasError = true;
			});
	}
});

export const {
	setSelected,
	setSearchText,
	closeEditCategoryDialog,
	closeNewCategoryDialog,
	openEditCategoryDialog,
	openNewCategoryDialog,
	setLoadingState
} = categorySilce.actions;
export default categorySilce.reducer;
