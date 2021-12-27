export interface IUser {
	userId: string;
	fullname: string;
	phone: string;
	email: string;
	roles?: string[];
	password?: string;
}
