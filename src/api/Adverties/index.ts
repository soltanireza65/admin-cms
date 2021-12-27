import { Http } from '../Http/index';
import FormData from 'form-data';
const prefixUrl = `${process.env.REACT_APP_URL}/advertise/api/AdvertiseAdmin`;
export const AdvertiesApi = {
	addAdverties: async (
		data?: AdvertiesInterface.IAdvertiesBody
	): Promise<IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>> => {
		let response: IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>;

		response = await Http.request('post', true, `${prefixUrl}/AddAdvertise`, null, data);

		return response;
	},
	editAdverties: async (
		data?: AdvertiesInterface.IAdvertiesBody
	): Promise<IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>> => {
		let response: IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>;

		response = await Http.request('put', true, `${prefixUrl}/EditAdvertise`, null, data);

		return response;
	},
	deleteAdverties: async ({
		id
	}: AdvertiesInterface.IAdvertiesBody): Promise<IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>> => {
		let response: IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>;

		let formData = new FormData();
		formData.append('id', id);
		response = await Http.request('delete', true, `${prefixUrl}/DeleteAdvertise`, null, formData);

		return response;
	},
	changeAdvertiseStatus: async ({
		id,
		status
	}: AdvertiesInterface.IAdvertiesBody): Promise<IGlobalData.IServiceResult<any>> => {
		let response: IGlobalData.IServiceResult<any>;

		response = await Http.request('put', true, `${prefixUrl}/ChangeAdvertiseStatus`, null, { id, status });

		return response;
	},
	getAdvertisesList: async ({
		status,
		linkUrl,
		title,
		count,
		page,
		categoryId,
		locationCode,
		FromCreatedDateTime,
		Id,
		TillCreatedDateTime
	}: AdvertiesInterface.IFilterAdverties): Promise<
		IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody[]>
	> => {
		let response: IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody[]>;

		response = await Http.request('get', true, `${prefixUrl}/GetAdvertises`, {
			status,
			linkUrl,
			title,
			count,
			page,
			categoryId,
			locationCode,
			FromCreatedDateTime,
			Id,
			TillCreatedDateTime
		});

		return response;
	},
	getAdvertiseById: async ({
		Id
	}: AdvertiesInterface.IFilterAdverties): Promise<IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>> => {
		let response: IGlobalData.IServiceResult<AdvertiesInterface.IAdvertiesBody>;

		response = await Http.request('get', true, `${prefixUrl}/GetAdvertiseById/${Id}`);

		return response;
	}
};
