import { AuthService } from 'api/Http/authService';
import axios from 'axios';
import { Http } from '../Http/index';
const prefix = `${process.env.REACT_APP_URL}/polling/api`;
const prefixUrl = `${process.env.REACT_APP_URL}/polling/api/YesNoPollingAdmin`;
const prefixUrl2 = `${process.env.REACT_APP_URL}/polling/api/YesNoPolling`;

export const Polling = {
	addPolling: async ({
		title,
		moduleType,
		contentId,
		options
	}: PollingInterface.IAddPolling): Promise<IGlobalData.IServiceResult<PollingInterface.IPolling>> => {
		const authService = new AuthService();
		const token = await authService.getToken();

		let response: IGlobalData.IServiceResult<PollingInterface.IPolling>;
		try {
			const request = await axios({
				method: 'post',
				url: `${prefix}/PollingAdmin/AddPolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { title, moduleType, contentId, options }
			});

			response = {
				data: request.data.data,
				message: request.data.message,
				status: request.data.status
			};
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		console.log('request: ', response);
		return response;
	},
	deletePolling: async ({ id }: PollingInterface.IDeletePolling) => {
		const authService = new AuthService();
		const token = await authService.getToken();

		let response: IGlobalData.IServiceResult<PollingInterface.IPolling>;
		try {
			const request = await axios({
				method: 'delete',
				url: `${prefix}/PollingAdmin/DeletePolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { id }
			});

			response = {
				data: request.data.data,
				message: request.data.message,
				status: request.data.status
			};
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		console.log('request: ', response);
		return response;
	},

	deleteOptionsFromPolling: async ({ pollingId, optionsId }: PollingInterface.IEditAddOptions) => {
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		try {
			const request = await axios({
				method: 'delete',
				url: `${prefix}/PollingAdmin/DeleteOptionsFromPolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { pollingId, optionsId }
			});

			response = {
				data: request.data.data,
				message: request.data.message,
				status: request.data.status
			};
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		console.log('request: ', response);
		return response;
	},

	addOptionsToPolling: async ({ pollingId, optionsTitle }: PollingInterface.IEditAddOptions) => {
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		try {
			const request = await axios({
				method: 'put',
				url: `${prefix}/PollingAdmin/addOptionsToPolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { pollingId, optionsTitle }
			});

			response = {
				data: request.data.data,
				message: request.data.message,
				status: request.data.status
			};
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		console.log('request: ', response);
		return response;
	},

	getPollings: async (): Promise<IGlobalData.IServiceResult<PollingInterface.IPolling[]>> => {
		let response: IGlobalData.IServiceResult<PollingInterface.IPolling[]>;
		response = await Http.request('get', true, `${prefix}/PollingAdmin/GetPollings`);
		return response;
	},

	addFovariteCategories: async ({
		id,
		title
	}: ICategory.ICategoryData): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData>;
		try {
			response = await Http.request('post', true, `${prefixUrl}/AddFavoriteYesNoPollingCategory`, null, {
				categoryId: id,
				title
			});
		} catch (e) {
			response = {
				data: {},
				message: e,
				status: 2
			};
		}
		return response;
	},
	deleteFavoriteYesNoPollingCategory: async ({
		id
	}: ICategory.ICategoryData): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData>;

		let formData = new FormData();
		formData.append('id', id);
		response = await Http.request(
			'delete',
			true,
			`${prefixUrl}/DeleteFavoriteYesNoPollingCategory`,
			null,
			formData
		);

		return response;
	},
	getFavoriteYesNoPollingCategories: async ({
		id
	}: ICategory.ICategoryData): Promise<IGlobalData.IServiceResult<PollingInterface.IPolling[]>> => {
		let response: IGlobalData.IServiceResult<PollingInterface.IPolling[]>;

		response = await Http.request('get', true, `${prefixUrl}/GetFavoriteYesNoPollingCategories`);

		return response;
	},
	getYesNoPollings: async ({
		categoriesId,
		count,
		fromDateTime,
		tillDateTime
	}: PollingInterface.IBody): Promise<IGlobalData.IServiceResult<PollingInterface.IPollingList[]>> => {
		let response: IGlobalData.IServiceResult<PollingInterface.IPollingList[]>;

		response = await Http.request('get', true, `${prefixUrl}/GetYesNoPollings`, {
			categoriesId,
			count,
			fromDateTime,
			tillDateTime
		});

		return response;
	},
	getFavouriteYesNoPollings: async (): Promise<IGlobalData.IServiceResult<PollingInterface.IPollingFavorites[]>> => {
		let response: IGlobalData.IServiceResult<PollingInterface.IPollingFavorites[]>;

		response = await Http.request('get', true, `${prefixUrl2}/GetFavouriteYesNoPollings`);

		return response;
	}
};
