import { IUser } from './userList';

export interface IUsersState {
	entities: IUser[];
	loading: boolean;
	addUserModal: {
		open: boolean;
	};
	rolesModal: {
		open: boolean;
		data: {
			roles: string[];
			userId: string;
			username: string;
		};
	};
	passwordModal: {
		open: boolean;
		data: {
			userId: string;
			username: string;
		};
	};
	editModal: {
		open: boolean;
		data: {
			userId: string;
			fullName: string;
		};
		loading: boolean;
		error: string;
	};
}
