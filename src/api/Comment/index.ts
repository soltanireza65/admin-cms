import { Http } from '../Http/index';
import FormData from 'form-data';
const prefixUrl = `${process.env.REACT_APP_URL}/comment/api/Comment`;
export const CommentApi = {
	addComment: async (
		data?: CommentAPIInterface.IBody
	): Promise<IGlobalData.IServiceResult<CommentAPIInterface.IComment>> => {
		let response: IGlobalData.IServiceResult<CommentAPIInterface.IComment>;

		response = await Http.request('post', true, `${prefixUrl}/AddComment`, data);

		return response;
	},

	likeComment: async ({ id }: CommentAPIInterface.IBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;
		let formData = new FormData();
		formData.append('id', id);

		response = await Http.request('put', true, `${prefixUrl}/LikeComment`, null, formData);

		return response;
	},
	disLikeComment: async ({ id }: CommentAPIInterface.IBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;
		let formData = new FormData();
		formData.append('id', id);

		response = await Http.request('put', true, `${prefixUrl}/DisLikeComment`, null, formData);

		return response;
	},
	changeCommentStatus: async ({
		id,
		status
	}: CommentAPIInterface.IBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;

		response = await Http.request('put', true, `${prefixUrl}/ChangeCommentStatus`, null, { id, status });

		return response;
	},

	deleteComment: async ({ id }: CommentAPIInterface.IBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;
		let formData = new FormData();
		formData.append('id', id);

		response = await Http.request('delete', true, `${prefixUrl}/DeleteComment`, null, formData);

		return response;
	},
	editComment: async ({ id, content }: CommentAPIInterface.IBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;

		response = await Http.request('put', true, `${prefixUrl}/EditComment`, null, { id, content });

		return response;
	},
	replayComment: async (
		data?: CommentAPIInterface.IBody
	): Promise<IGlobalData.IServiceResult<CommentAPIInterface.IComment>> => {
		let response: IGlobalData.IServiceResult<CommentAPIInterface.IComment>;

		response = await Http.request('post', true, `${prefixUrl}/AddCommentReply`, null, data);

		return response;
	},
	replayAdminComment: async (
		data?: CommentAPIInterface.IBody
	): Promise<IGlobalData.IServiceResult<CommentAPIInterface.IComment>> => {
		let response: IGlobalData.IServiceResult<CommentAPIInterface.IComment>;

		response = await Http.request('post', true, `${prefixUrl}/AddAdminCommentReply`, null, data);

		return response;
	},
	getComments: async (
		data?: CommentAPIInterface.IFilterBody
	): Promise<IGlobalData.IServiceResult<CommentAPIInterface.IComment[]>> => {
		let response: IGlobalData.IServiceResult<CommentAPIInterface.IComment[]>;
		response = await Http.request('get', true, `${prefixUrl}/GetComments`, data);

		return response;
	},
	getModuleComment: async (
		data?: CommentAPIInterface.IFilterBody
	): Promise<IGlobalData.IServiceResult<CommentAPIInterface.IComment[]>> => {
		let response: IGlobalData.IServiceResult<CommentAPIInterface.IComment[]>;
		response = await Http.request('get', false, `${prefixUrl}/GetModuleComment`, data);

		return response;
	}
};
