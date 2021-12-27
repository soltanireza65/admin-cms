namespace BaseApiNameSpace {
	interface IFilter {
		page?: number;
		count?: number;
		userId?: string;
		email?: string;
		phoneNumber?: string;
	}
	interface IUserResponse {
		id: string;
		userName: string;
		normalizedUserName: string;
		email: string;
		normalizedEmail: string;
		emailConfirmed: boolean;
		passwordHash: string;
		securityStamp: string;
		concurrencyStamp: string;
		phoneNumber: string;
		phoneNumberConfirmed: boolean;
		twoFactorEnabled: boolean;
		lockoutEnd: string;
		lockoutEnabled: boolean;
		accessFailedCount: number;
		message: string;
	}
	interface IUserForm {
		mobile: string;
		fullName: string;
		email: string;
		password: string;
		confirmPassword: string;
	}
	interface IUser {
		userId?: string;
		userName?: string;
		email?: string;
		phoneNumber?: string;
		emailConfirmed?: boolean;
		phoneNumberConfirmed?: boolean;
		twoFactorEnabled?: boolean;
		lockoutEnabled?: boolean;
		profile?: {
			userId?: string;
			fullName?: string;
			roles: string[];
		};
	}
	interface IUserBody extends IUser {
		roleName?: string;
		fullName?: string;
	}
	interface IPasswordData {
		userId?: string;
		password?: string;
		confirmPassword?: string;
	}
	interface IRole {
		id: string;
		name: string;
		normalizedName: string;
		concurrencyStamp: string;
	}
	interface IRoleRemoveData {
		roleName: string;
		userId: string;
	}
	interface IEditProfileBody {
		userId: string;
		fullName: string;
	}
}
