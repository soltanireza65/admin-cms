import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryApi } from 'api/Category/index';
export const getAllCategories = createAsyncThunk(
	'fuse/category/getcategories',
	async ({ title, englishTitle, description, mediaFiles, parentId, id, Flated }: ICategory.ICategoryData) => {
		const request = await CategoryApi.getAllCategories({
			title,
			englishTitle,
			description,
			mediaFiles,
			parentId,
			Flated: Flated,
			count: 5000,
			id
		});
		const { data, status } = await request;
		return { data, status };
	}
);
export const getOneCategory = createAsyncThunk(
	'fuse/category/getOneCategory',
	async ({ id }: ICategory.ICategoryData) => {
		const request = await CategoryApi.getCategoryById({
			id
		});
		const { data } = await request;
		return { data };
	}
);
export const getParentCategory = createAsyncThunk(
	'fuse/category/getParaneCategory',
	async ({ parentId }: ICategory.ICategoryData, { dispatch }) => {
		if (!parentId) {
			return {};
		}
		const request = await CategoryApi.getParentCategories({ parentId });

		const { data, status } = await request;
		return { data, status };
	}
);

const initialState: {
	entities: ICategory.ICategoryData[];
} = {
	entities: []
};
const categorySilce = createSlice({
	name: 'fuse/category',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllCategories.pending, (state, action) => {})
			.addCase(getAllCategories.fulfilled, (state, action) => {
				state.entities = action.payload.data;
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.entities = [];
			});
	}
});

export default categorySilce.reducer;
