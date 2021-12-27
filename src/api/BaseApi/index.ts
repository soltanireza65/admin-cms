import { IUser } from 'app/main/users/interfaces/userList';
import { Http } from '../Http/index';
const prefixUrlProfile = `${process.env.REACT_APP_AUTH_URL}/baseapi/api/User`;
const prefixUrlAccount = `${process.env.REACT_APP_AUTH_URL}/baseapi/api/Account`;

export const baseApi = {
	getUser: async (
		filterData: BaseApiNameSpace.IFilter
	): Promise<IGlobalData.IServiceResult<BaseApiNameSpace.IUser[]>> => {
		let response: IGlobalData.IServiceResult<BaseApiNameSpace.IUser[]>;

		try {
			response = await Http.request('get', true, `${prefixUrlProfile}/GetUsers`, { ...filterData });
		} catch (e) {
			return {
				status: 2,
				data: []
			};
		}
		return response;
	},
	createUser: async (
		user: BaseApiNameSpace.IUserForm
	): Promise<IGlobalData.IServiceResult<BaseApiNameSpace.IUserResponse>> => {
		let response: IGlobalData.IServiceResult<BaseApiNameSpace.IUserResponse>;
		try {
			response = await Http.request('post', true, `${prefixUrlAccount}/Register`, null, { ...user });
		} catch (e) {
			return {
				status: 2,
				data: null,
				message: e.message
			};
		}
		return response;
	},
	resetPassword: async ({
		confirmPassword,
		password,
		userId
	}: BaseApiNameSpace.IPasswordData): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;

		try {
			response = await Http.request('post', true, `${prefixUrlProfile}/ResetUserPassword`, null, {
				confirmPassword,
				password,
				userId
			});
		} catch (e) {
			return {
				status: 2,
				message: e.message,
				errors: e
			};
		}
		return response;
	},
	addRoleToUser: async ({
		roleName,
		userId
	}: BaseApiNameSpace.IUserBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;

		try {
			response = await Http.request('post', true, `${prefixUrlProfile}/AddRoleToUser`, null, {
				roleName,
				userId
			});
		} catch (e) {
			return {
				status: 2
			};
		}
		return response;
	},
	editUserProfile: async ({
		fullName,
		userId
	}: BaseApiNameSpace.IUserBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;

		try {
			response = await Http.request('post', true, `${prefixUrlProfile}/EditUserProfileById`, null, {
				fullName,
				userId
			});
		} catch (e) {
			return {
				status: 2,
				message: e.message
			};
		}
		return response;
	},
	removeRoleFromUser: async ({
		roleName,
		userId
	}: BaseApiNameSpace.IRoleRemoveData): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;

		try {
			response = await Http.request('post', true, `${prefixUrlProfile}/RemoveRoleFromUser`, null, {
				roleName,
				userId
			});
		} catch (e) {
			return {
				status: 2
			};
		}
		return response;
	}
};
