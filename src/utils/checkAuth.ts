import { validateToken } from './localStorageHelper';
export const checkAuth = async (): Promise<boolean> => {
	const { isExpired, token } = validateToken('access_token');

	if (!token) {
		return false;
	}
	if (!isExpired) {
		if (token) {
			{
				console.log('token is valid');
				return true;
			}
		} else {
			console.log('token is invalid');
			return false;
		}
	} else {
		return false;
	}
};
