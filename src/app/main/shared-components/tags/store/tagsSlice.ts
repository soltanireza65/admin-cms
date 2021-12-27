import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { TagsApi } from 'api/Tags/index';
import { ITags } from 'api/Interfaces/tags';
import { ITagsStates } from '../interfaces/states';
import i18n from 'i18next';
export const addTag = createAsyncThunk(
	'tagApp/tag/newTag',
	async ({ label, title, callback, description }: ITags.ITagsDTO, { dispatch }) => {
		try {
			const request = await TagsApi.addtag({ title, label, description });
			const { status, data } = request;

			if (status === 1) {
				dispatch(
					showMessage({ message: i18n.t('tag_registered', { ns: 'tagApp', title }), variant: 'success' })
				);
				if (callback) {
					callback();
				}
			} else {
				dispatch(
					showMessage({
						message: i18n.t('server_error', { ns: 'tagApp' }),
						variant: 'error'
					})
				);
			}
			return { data, status };
		} catch (error) {
			dispatch(
				showMessage({
					message: error.message || i18n.t('server_error', { ns: 'tagApp' }),
					variant: 'error'
				})
			);
			return { status: -1 };
		}
	}
);
export const editTag = createAsyncThunk(
	'tagApp/tag/ediyTag',
	async ({ label, title, id, description }: ITags.ITagsDTO, { dispatch }) => {
		const request = await TagsApi.editTag({ id, label, description });
		const { status, data } = await request;
		if (status === 1) {
			dispatch(showMessage({ message: i18n.t('tag_updated', { ns: 'tagApp', title }), variant: 'success' }));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('server_error', { ns: 'tagApp' }),
					variant: 'error'
				})
			);
		}
		return { data, tag: { label, title, id, description } };
	}
);

export const getTags = createAsyncThunk(
	'tagApp/tag/getTags',
	async ({
		title,
		label,
		count,
		fromDateTime,
		moduleType,
		orderByDescending,
		orderByFieldName,
		page,
		tillDateTime,
		totalPage
	}: ITags.ITagsParams) => {
		const request = await TagsApi.getTags({
			title,
			label,
			count,
			fromDateTime,
			moduleType,
			orderByDescending,
			orderByFieldName,
			page,
			tillDateTime,
			totalPage
		});
		const { status, data } = await request;

		return { data };
	}
);

export const manageTags = createAsyncThunk(
	'tagApp/tag/manageTags',
	async ({
		title,
		label,
		count,
		fromDateTime,
		moduleType,
		orderByDescending,
		orderByFieldName,
		page,
		tillDateTime,
		totalPage
	}: ITags.ITagsParams) => {
		const request = await TagsApi.manageTags({
			title,
			label,
			count,
			fromDateTime,
			moduleType,
			orderByDescending,
			orderByFieldName,
			page,
			tillDateTime,
			totalPage
		});
		const { status, data } = await request;

		return { data };
	}
);

export const getTagByTitle = createAsyncThunk('tagApp/tag/getTagByTitle', async ({ title }: ITags.ITagsParams) => {
	const request = await TagsApi.getTagByTitle({ title });
	const { status, data } = await request;

	return { data };
});

export const getSuggestTagsByTitle = createAsyncThunk(
	'tagApp/tag/getSuggestTagsByTitle',
	async ({ title }: ITags.ITagsParams) => {
		const request = await TagsApi.getSuggestTagsByTitle({ title });
		const { status, data } = await request;

		return { data };
	}
);
const initialState: ITagsStates = {
	entities: [],
	tagDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	},
	loading: true,
	submitLoading: false
};
const tagSlice = createSlice({
	name: 'tagsApp/tags',
	initialState,
	reducers: {
		openNewTagDialog: {
			reducer: (state, action: any) => {
				state.tagDialog = {
					type: 'new',
					props: {
						open: true
					},
					data: action.payload
				};
			},
			prepare: value => ({ payload: value })
		},
		openEditTagDialog: (state, action) => {
			state.tagDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeTagDialog: (state, action: any) => {
			state.tagDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getTagByTitle.fulfilled, (state, action) => {
				state.entities = action.payload.data;
			})
			.addCase(getTagByTitle.rejected, (state, action) => {
				state.entities = null;
			});
		builder
			.addCase(getTags.fulfilled, (state, action) => {
				state.entities = action.payload.data;
				state.loading = false;
			})
			.addCase(getTags.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getTags.rejected, (state, action) => {
				state.entities = null;
				state.loading = false;
			});
		builder
			.addCase(getSuggestTagsByTitle.fulfilled, (state, action) => {
				state.entities = action.payload.data;
				state.loading = false;
			})
			.addCase(getSuggestTagsByTitle.rejected, (state, action) => {
				state.entities = null;
				state.loading = false;
			})
			.addCase(getSuggestTagsByTitle.pending, state => {
				state.loading = true;
			});
		builder
			.addCase(manageTags.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(manageTags.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(manageTags.rejected, (state, action) => {
				state.loading = false;
				state.entities = null;
			});
		builder
			.addCase(addTag.fulfilled, (state, action) => {
				state.submitLoading = false;
				if (action.payload.status === 1) {
					state.tagDialog.props.open = false;
					state.entities.pop();
					state.entities.unshift(action.payload.data);
				}
			})
			.addCase(addTag.rejected, state => {
				state.submitLoading = false;
			})
			.addCase(addTag.pending, state => {
				state.submitLoading = true;
			});
		builder
			.addCase(editTag.fulfilled, (state, action) => {
				state.submitLoading = false;
				state.tagDialog.props.open = false;
				state.tagDialog.data = null;

				const { description, id, label, title } = action.payload.tag;
				const tag = state.entities.find(tag => tag.id == id);
				tag.title = title;
				tag.description = description;
				tag.label = label;
			})
			.addCase(editTag.pending, state => {
				state.submitLoading = true;
			})
			.addCase(editTag.rejected, state => {
				state.submitLoading = false;
			});
	}
});
export const { closeTagDialog, openNewTagDialog, openEditTagDialog } = tagSlice.actions;
export default tagSlice.reducer;
