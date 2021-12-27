import { stringify } from 'query-string';
import axios from 'axios';
import { AuthService } from './authService';
import { getWithExpiry } from 'utils/localStorageHelper';
export type Method =
	| 'get'
	| 'GET'
	| 'delete'
	| 'DELETE'
	| 'head'
	| 'HEAD'
	| 'options'
	| 'OPTIONS'
	| 'post'
	| 'POST'
	| 'put'
	| 'PUT'
	| 'patch'
	| 'PATCH'
	| 'link'
	| 'LINK'
	| 'unlink'
	| 'UNLINK';

let CORSURL = process.env.REACT_APP_LOCAL_HOST_CORS;
export const Http = {
	request: async <A>(
		methodType: Method,
		needAuth: boolean,
		url: string,
		params?: any,
		payload?: any
	): Promise<IGlobalData.IServiceResult<A>> => {
		let token = '';
		if (needAuth) {
			const authService = new AuthService();
			token = await authService.getToken();
		}
		return new Promise((resolve, reject) => {
			const query = params ? `?${stringify({ ...params })}` : '';

			let headers: any = {
				'Content-Type': 'application/json'
			};
			let body = undefined;

			if (token && token.length > 10) {
				headers = {
					...headers,
					Authorization: `Bearer ${token}`
				};
			}
			body = payload;

			if (CORSURL == undefined || CORSURL == null) {
				CORSURL = '';
			}
			axios({
				method: methodType,
				url: `${url}${query}`,
				data: body,
				headers
			})
				.then(async x => {
					if (x.status === 200) {
						let response: IGlobalData.IServiceResult<A>;
						const data = x.data;
						response = data;
						if (response.status === 1) {
							return resolve(response);
						} else {
							return reject(response);
						}
					}

					return reject(x);
				})
				.catch(e => {
					if (e.response && e.response.status == 401) {
						let auth = new AuthService();
						auth.renewToken().then(console.log);
					}

					return reject(e.response);
				});
		});
	}
};
