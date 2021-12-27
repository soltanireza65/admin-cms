import OIDC, { Log, User, UserManager, UserManagerSettings } from 'oidc-client';
import { setWithExpiry } from 'utils/localStorageHelper';
import { Constants } from './auth';
let userManager: UserManager;
export class AuthService {
	constructor() {
		if (!userManager) {
			console.log('reIniatite class');
			console.log('CLIENT ID : ' + Constants.clientId);

			const settings: UserManagerSettings = {
				authority: Constants.stsAuthority,
				client_id: Constants.clientId,
				redirect_uri: `${Constants.clientRoot}auth/login`,
				silent_redirect_uri: `${Constants.clientRoot}auth/login`,
				// tslint:disable-next-line:object-literal-sort-keys
				post_logout_redirect_uri: `${Constants.clientRoot}auth/logout`,
				response_mode: 'query',
				response_type: 'code',
				scope: Constants.clientScope,
				loadUserInfo: true,

				automaticSilentRenew: true,
				validateSubOnSilentRenew: true,

				filterProtocolClaims: true,
				revokeAccessTokenOnSignout: true,
				userStore: new OIDC.WebStorageStateStore({
					store: window.localStorage
				})
			};
			userManager = new UserManager(settings);

			userManager.events.addAccessTokenExpiring(function () {
				console.log('token expiring');
				userManager
					.signinSilent()
					.then(x => {
						if (x && x.access_token) {
							setWithExpiry('access_token', x.access_token, 86400000);
						}
						return x;
					})
					.catch(e => {
						console.log('error : ', e);
						return null;
					});
			});

			userManager.events.addAccessTokenExpired(function () {
				console.log('token expired');
			});
			Log.logger = console;
			Log.level = Log.ERROR;
			Log.level = Log.INFO;
			Log.level = Log.WARN;
		}
	}

	public getUser(): Promise<User | null> {
		return userManager.getUser();
	}

	navigateToScreen = () => {
		window.location.replace('/');
	};
	public getToken = async (): Promise<string> => {
		try {
			const { access_token, expired } = await userManager.getUser();
			if (access_token && !expired) {
				return access_token;
			} else if (expired) {
				const { access_token } = await this.renewToken();
				return access_token;
			} else {
				return null;
			}
		} catch {
			return null;
		}
	};
	public login(): Promise<void> {
		userManager
			.signinRedirect({
				state: 'some data',
				data: {
					path: window.location.href
				}
			})
			.then(x => console.log(x));
		return;
	}
	public async loginPopup(): Promise<void> {
		await userManager.signinPopup({
			state: 'some data',
			data: {
				path: window.location.href
			}
		});
		return;
	}
	public async signinSilentCallback(): Promise<User | undefined> {
		const user = await userManager.signinRedirectCallback();
		if (user && user.access_token) {
			setWithExpiry('access_token', user.access_token, 86400000);
		}
		return user;
	}
	public async signinCallback(): Promise<User | undefined> {
		const user = await userManager.signinCallback();
		if (user && user.access_token) {
			setWithExpiry('access_token', user.access_token, 86400000);
		}
		return user;
	}
	public signInSilent(): Promise<User | undefined> {
		return userManager.signinSilent();
	}

	public async renewToken(): Promise<User> {
		return userManager
			.signinSilent()
			.then(x => {
				if (x && x.access_token) {
					setWithExpiry('access_token', x.access_token, 86400000);
				}
				return x;
			})
			.catch(e => {
				console.log('error : ', e);
				return null;
			});
	}

	public async logout(): Promise<void> {
		await userManager.removeUser();
		await userManager.revokeAccessToken();
		localStorage.removeItem('access_token');
		return;
	}
}
