import { IState } from '../interfaces/states';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { CommentApi } from 'api/Comment/index';
import { NewsApi } from 'api/News';
import i18next from 'i18next';

export const adminReplayComment = createAsyncThunk(
	'commentApp/comments/newComment',
	async (body: CommentAPIInterface.IBody, { dispatch }) => {
		dispatch(setLoadingOneState(true));
		const request = await CommentApi.replayAdminComment(body);
		const { data, status, message } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18next.t('comment_registered', { ns: 'commentsApp' }),

					variant: 'success'
				})
			);
			dispatch(setLoadingOneState(false));
			dispatch(openStateCommentDialog(null, false, ''));
			dispatch(getComments({}));
			return { data };
		} else {
			dispatch(
				showMessage({
					message: message,

					variant: 'error'
				})
			);

			dispatch(setLoadingOneState(false));
			return {};
		}
	}
);

export const getComments = createAsyncThunk(
	'commentApp/comments/getComments',
	async (filterData: CommentAPIInterface.IFilterBody, { dispatch, getState }) => {
		// console.log(filterData.status);
		dispatch(setLoadingState(true));
		const state: any = getState();
		const { commentsApp } = state;
		const { comment } = commentsApp;

		if (filterData.status !== 0) {
			filterData.status = filterData.status ? filterData.status : comment.status;
			dispatch(setStatus(filterData.status));
		} else {
			delete filterData.status;
			dispatch(setStatus(0));
		}

		const request = await CommentApi.getComments({ ...filterData });
		const { data } = await request;
		let newsId: string[] = [];
		data.map(x => {
			if (x.moduleType === 1) {
				newsId.push(x.contentId);
			}
		});
		let newsRequest;
		if (newsId.length > 0) {
			newsRequest = await NewsApi.getBulkNews({ contentId: newsId });
		}
		let tempData: CommentAPIInterface.IComment[] = data;

		tempData = tempData.map(item => {
			if (item.moduleType === 1) {
				const news = newsRequest.data.find(x => x.id == item.contentId);
				if (news) item.contentParentTitle = news.titr;
			}
			return item;
		});

		console.log(tempData, 'temp data');

		dispatch(setLoadingState(false));
		//return { data: tempData };
		return { data };
	}
);

export const deleteComment = createAsyncThunk(
	'commentApp/comments/deleteComment',
	async ({ id, content }: CommentAPIInterface.IBody, { dispatch }) => {
		dispatch(setDeleteLoadingOneState(true));
		const request = await CommentApi.deleteComment({ id });
		const { status, message } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18next.t('comment_deleted', { ns: 'commentsApp', content }),

					variant: 'success'
				})
			);
			dispatch(getComments({}));
			dispatch(setDeleteLoadingOneState(false));
			dispatch(openStateDeleteDialog(null, false));
			return {};
		} else {
			dispatch(
				showMessage({
					message: message,

					variant: 'error'
				})
			);

			dispatch(openStateDeleteDialog(null, false));
			dispatch(setDeleteLoadingOneState(false));
			return {};
		}
	}
);

export const editComment = createAsyncThunk(
	'commentApp/comments/editComment',
	async ({ id, content }: CommentAPIInterface.IBody, { dispatch }) => {
		dispatch(setDeleteLoadingOneState(true));
		const request = await CommentApi.editComment({ id, content });
		const { status, message } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18next.t('comment_update', { ns: 'commentsApp' }),

					variant: 'success'
				})
			);
			dispatch(getComments({}));
			dispatch(setDeleteLoadingOneState(false));
			dispatch(openStateCommentDialog(null, false, ''));
			return {};
		} else {
			dispatch(
				showMessage({
					message: message,

					variant: 'error'
				})
			);

			dispatch(setDeleteLoadingOneState(false));
			return {};
		}
	}
);

export const changeStatus = createAsyncThunk(
	'commentApp/comments/changeStatus',
	async (dataBody: CommentAPIInterface.IBody, { dispatch }) => {
		const request = await CommentApi.changeCommentStatus({ id: dataBody.id, status: dataBody.status });
		const { status, message } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18next.t('comment_update', { ns: 'commentsApp' }),

					variant: 'success'
				})
			);
			return {};
		} else {
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

const initialState: IState = {
	entities: [],
	loading: false,
	status: 0,
	commentDialog: {
		loadingOne: false,
		currentComment: null,
		type: '',
		props: {
			open: false
		}
	},

	deleteDialog: {
		loadingOne: false,
		currentComment: null,
		props: {
			open: false
		}
	}
};

export const commentSlice = createSlice({
	initialState,
	name: 'commentApi/comments',
	reducers: {
		setLoadingState: {
			reducer: (state, action: any) => {
				state.loading = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		setStatus: {
			reducer: (state, action: any) => {
				state.status = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		openStateCommentDialog: {
			reducer: (state, action: any) => {
				state.commentDialog = {
					loadingOne: false,
					currentComment: action.payload.commentData,
					type: action.payload.type,
					props: {
						open: action.payload.open
					}
				};
			},
			prepare: (commentData: CommentAPIInterface.IComment, open: boolean, type: string) => ({
				payload: { commentData, open, type }
			})
		},
		openStateDeleteDialog: {
			reducer: (state, action: any) => {
				state.deleteDialog = {
					loadingOne: false,
					currentComment: action.payload.commentData,
					props: {
						open: action.payload.open
					}
				};
			},
			prepare: (commentData: CommentAPIInterface.IComment, open: boolean) => ({
				payload: { commentData, open }
			})
		},
		setLoadingOneState: {
			reducer: (state, action: any) => {
				state.commentDialog.loadingOne = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		setDeleteLoadingOneState: {
			reducer: (state, action: any) => {
				state.deleteDialog.loadingOne = action.payload;
			},
			prepare: value => ({ payload: value })
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getComments.pending, (state, action) => {
				state.loading = true;
				state.entities = [];
			})
			.addCase(getComments.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(getComments.rejected, (state, action) => {
				state.loading = false;
				state.entities = [];
			});
	}
});

export const {
	setLoadingState,
	openStateCommentDialog,
	setLoadingOneState,
	setStatus,
	openStateDeleteDialog,
	setDeleteLoadingOneState
} = commentSlice.actions;
export default commentSlice.reducer;
