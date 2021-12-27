import { baseApi } from 'api/BaseApi/index';

export const createUser = async (user: BaseApiNameSpace.IUserForm) => {
	try {
		const { status, data, message } = await baseApi.createUser(user);
		if (status === 1) {
			return { data };
		} else {
			return { message };
		}
	} catch (e) {}
};

export const filterUsers = async (filterData: BaseApiNameSpace.IFilter): Promise<BaseApiNameSpace.IUser[]> => {
	const { status, data } = await baseApi.getUser({ ...filterData });
	if (status === 1) {
		return data;
	} else {
		return [];
	}
};
export const changeRole = async ({ roleName, userId }: BaseApiNameSpace.IUserBody) => {
	const { status, data } = await baseApi.addRoleToUser({ roleName, userId });
	if (status === 1) {
		return true;
	}
	return false;
};

export const changePassword = async ({ confirmPassword, password, userId }: BaseApiNameSpace.IPasswordData) => {
	return await baseApi.resetPassword({ confirmPassword, password, userId });
};

export const editProfile = async ({ fullName, userId }: BaseApiNameSpace.IUserBody) => {
	return await baseApi.editUserProfile({ fullName, userId });
};
